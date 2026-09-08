import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import auctionApi from "@/api/auctionApi";
import categoryApi from "@/api/categoryApi";
import { useI18n } from "@/context/I18nContext";
import type { AuctionListItem, AuctionSearchParams } from "@/models/Auction";
import type { Category } from "@/models/Category";
import AuctionGrid from "@/components/auction/AuctionGrid";
import AuctionFilters from "@/components/auction/AuctionFilters";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import EmptyState from "@/components/common/EmptyState";
import { extractErrorMessage } from "@/api/axiosClient";
import { filterAuctions } from "@/utils/searchUtils";
import "./Auctions.css";

const PAGE_SIZE = 24;
// When searching with a keyword, fetch larger pages to ensure we have enough results
const SEARCH_PAGE_SIZE = 96;

// F8: category-based browsing and search with price range filter
export default function Auctions() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allAuctions, setAllAuctions] = useState<AuctionListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const filters: AuctionSearchParams = {
    keyword: searchParams.get("keyword") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  };

  // Determine page size based on whether we're searching
  const effectivePageSize = filters.keyword ? SEARCH_PAGE_SIZE : PAGE_SIZE;

  // Apply client-side filtering to ensure search always works
  // Note: categoryId filtering is already done by the API, so we only filter by keyword and price client-side
  const filteredAuctions = filterAuctions(
    allAuctions,
    filters.keyword,
    filters.minPrice,
    filters.maxPrice
  );

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setAllAuctions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(currentPage === 1);
    setError(null);

    // When searching by keyword, don't pass it to the API
    // Instead, fetch more data and filter client-side for better accuracy
    const apiParams: AuctionSearchParams = {
      categoryId: filters.categoryId,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: currentPage,
      pageSize: effectivePageSize,
    };

    auctionApi
      .search(apiParams)
      .then((data) => {
        if (isMounted) {
          if (currentPage === 1) {
            setAllAuctions(data);
          } else {
            setAllAuctions((prev) => [...prev, ...data]);
          }
          // Assume there are more if we got a full page of results
          setHasMore(data.length === effectivePageSize);
        }
      })
      .catch((err) => {
        if (isMounted) setError(extractErrorMessage(err));
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchParams, effectivePageSize]);

  function handleApply(params: AuctionSearchParams) {
    const next = new URLSearchParams();
    if (params.keyword) next.set("keyword", params.keyword);
    if (params.categoryId) next.set("categoryId", params.categoryId);
    if (params.minPrice !== undefined) next.set("minPrice", String(params.minPrice));
    if (params.maxPrice !== undefined) next.set("maxPrice", String(params.maxPrice));
    setSearchParams(next);
  }

  function handleLoadMore() {
    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1);
  }

  // Determine result count message
  const resultCountMessage = filteredAuctions.length > 0
    ? `Showing ${filteredAuctions.length} lot${filteredAuctions.length !== 1 ? 's' : ''}`
    : filters.keyword
    ? `No auctions found for "${filters.keyword}"`
    : t.auctions.noResults;

  return (
    <main className="auctions-page">
      <div className="auctions-page__hero">
        <div className="container auctions-page__hero-content">
          <span className="eyebrow">{t.auctions.browse}</span>
          <h1>{t.auctions.browse}</h1>
          <p className="auctions-page__subtitle">
            {t.home.lede}
          </p>
        </div>
      </div>

      <div className="container auctions-page__content">
        <AuctionFilters categories={categories} initialValues={filters} onApply={handleApply} />

        <div className="auctions-page__results">
          <div className="auctions-page__results-header">
            <span className="auctions-page__results-count">
              {resultCountMessage}
            </span>
          </div>

          {isLoading ? (
            <Spinner label={t.common.loading} />
          ) : error ? (
            <ErrorBanner message={error} />
          ) : filteredAuctions.length === 0 ? (
            // No results found (empty state)
            <EmptyState 
              title={filters.keyword ? "No auctions found" : "No auctions available"}
              description={filters.keyword 
                ? `We couldn't find any auctions matching "${filters.keyword}". Try a different search term.`
                : "Check back soon or refine your search criteria."
              }
            />
          ) : (
            <>
              <AuctionGrid auctions={filteredAuctions} />
              {hasMore && (
                <div className="auctions-page__pagination">
                  <Button
                    onClick={handleLoadMore}
                    isLoading={isLoadingMore}
                    size="lg"
                    variant="secondary"
                  >
                    {isLoadingMore ? t.common.loading : t.auctions.loadMore}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

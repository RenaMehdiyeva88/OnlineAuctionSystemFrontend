import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auctionApi from "@/api/auctionApi";
import categoryApi from "@/api/categoryApi";
import { useI18n } from "@/context/I18nContext";
import type { AuctionListItem } from "@/models/Auction";
import type { Category } from "@/models/Category";
import AuctionGrid from "@/components/auction/AuctionGrid";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import EmptyState from "@/components/common/EmptyState";
import { extractErrorMessage } from "@/api/axiosClient";
import { HERO_BACKGROUND_IMAGE, getCategoryThumbnail } from "@/utils/imageFallback";
import "./Home.css";

export default function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<AuctionListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let isMounted = true;

        Promise.all([
      auctionApi.search({ page: 1, pageSize: 8 }).then((r) => r.items).catch(() => []), // Return empty array on error
      categoryApi.getAll().catch(() => [] as Category[]),
    ])
      .then(([auctions, cats]) => {
        if (!isMounted) return;
        setFeatured(auctions || []);
        setCategories(cats || []);
      })
      .catch((err) => {
        if (isMounted) {
          console.error("[Home] Error loading featured auctions:", err);
          setError(extractErrorMessage(err));
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/auctions${searchValue ? `?keyword=${encodeURIComponent(searchValue)}` : ""}`);
  }

  return (
    <main className="home-page">
      {/* ---- HERO SECTION ---- */}
      <section className="hero">
        <div className="hero__inner">
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="hero__content">
            <span className="eyebrow hero__eyebrow">{t.home.tagline}</span>
            <h1 className="hero__headline">
              {t.home.headline1}
              <br />
              {t.home.headline2}
            </h1>
            <p className="hero__lede">{t.home.lede}</p>

            <form className="hero__search" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder={t.home.searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label={t.common.search}
                className="hero__search-input"
              />
              <Button type="submit" size="lg" className="hero__search-button">
                {t.home.searchButton}
              </Button>
            </form>

            <div className="hero__ctas">
              <Link to="/auctions" className="hero__cta-link">
                <Button variant="secondary">
                  {t.auctions.browse}
                  <span className="hero__cta-icon">→</span>
                </Button>
              </Link>
              <Link to="/register" className="hero__cta-link">
                <Button variant="ghost">
                  {t.auth.joinFloor}
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: VISUAL ELEMENT */}
          <div className="hero__visual">
            <img 
              src={HERO_BACKGROUND_IMAGE} 
              alt={t.ui.homeHeroAlt}
              loading="lazy"
              className="hero__visual-image"
            />
          </div>
        </div>

        {/* Hero Background Decorations */}
        <div className="hero__decoration hero__decoration--1" />
        <div className="hero__decoration hero__decoration--2" />
      </section>

      {/* ---- CATEGORIES SECTION ---- */}
      {categories.length > 0 && (
        <section className="container categories-section">
          <div className="categories-section__header">
            <div>
              <span className="eyebrow">{t.ui.homeExploreEyebrow}</span>
              <h2>{t.ui.homePopularCollections}</h2>
            </div>
          </div>
          <div className="categories-grid">
            {categories.slice(0, 6).map((c) => (
              <Link 
                key={c.id} 
                to={`/auctions?categoryId=${c.id}`} 
                className="category-card"
              >
                <div 
                  className="category-card__image"
                  style={{ backgroundImage: `url('${getCategoryThumbnail(c.name)}')` }}
                >
                  <div className="category-card__overlay" />
                </div>
                <h3 className="category-card__name">{c.name}</h3>
                <span className="category-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---- FEATURED AUCTIONS SECTION ---- */}
      <section className="container featured-section">
        <div className="featured-section__header">
          <div>
            <span className="eyebrow">{t.ui.homeClosingSoon}</span>
            <h2>{t.ui.homeFeaturedLots}</h2>
            <p className="featured-section__subtitle">
              {t.ui.homeFeaturedSubtitle}
            </p>
          </div>
          <Link to="/auctions" className="featured-section__view-all">
            {t.ui.homeViewAll}
            <span>→</span>
          </Link>
        </div>

        {isLoading ? (
          <Spinner label={t.ui.homeLoadingFeatured} />
        ) : error ? (
          // Show message but don't crash - user can still browse
          <div className="featured-section__error">
            <p>{t.ui.homeFeaturedError}</p>
            <Link to="/auctions">
              <Button size="sm">{t.ui.homeBrowseInstead}</Button>
            </Link>
          </div>
        ) : featured.length === 0 ? (
          <EmptyState
            title={t.ui.homeNoLiveTitle}
            description={t.ui.homeNoLiveDesc}
          />
        ) : (
          <AuctionGrid auctions={featured} />
        )}
      </section>

      {/* ---- STATISTICS SECTION ---- */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-card__value">12.5K+</div>
            <div className="stat-card__label">{t.ui.homeStatActive}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">$50M+</div>
            <div className="stat-card__label">{t.ui.homeStatVolume}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">98%</div>
            <div className="stat-card__label">{t.ui.homeStatSatisfaction}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">24/7</div>
            <div className="stat-card__label">{t.ui.homeStatSupport}</div>
          </div>
        </div>
      </section>

      {/* ---- CTA SECTION ---- */}
      <section className="cta-section">
        <div className="container cta-section__inner">
          <div className="cta-section__content">
            <span className="eyebrow">{t.ui.homeSellEyebrow}</span>
            <h2>{t.ui.homeSellTitle}</h2>
            <p>
              {t.ui.homeSellText}
            </p>
            <Link to="/register">
              <Button size="lg">{t.ui.homeSellButton}</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
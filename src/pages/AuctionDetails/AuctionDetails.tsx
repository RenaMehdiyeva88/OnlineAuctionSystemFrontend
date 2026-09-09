import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import auctionApi from "@/api/auctionApi";
import bidApi from "@/api/bidApi";
import { useI18n } from "@/context/I18nContext";
import type { Auction } from "@/models/Auction";
import type { Bid } from "@/models/Bid";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useAuctionHub } from "@/hooks/useAuctionHub";
import { formatCurrency } from "@/utils/formatters";
import { getGalleryImages } from "@/utils/imageFallback";
import StatusBadge from "@/components/common/Badge";
import CountdownTimer from "@/components/auction/CountdownTimer";
import ImageGallery from "@/components/auction/ImageGallery";
import BidForm from "@/components/bid/BidForm";
import BidHistoryList from "@/components/bid/BidHistoryList";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import "./AuctionDetails.css";

const BID_HISTORY_PAGE_SIZE = 20;

export default function AuctionDetails() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { pushToast } = useToast();

  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidPage, setBidPage] = useState(1);
  const [hasMoreBids, setHasMoreBids] = useState(false);
  const [isLoadingMoreBids, setIsLoadingMoreBids] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const loadAuction = useCallback(() => {
    if (!id) return Promise.resolve();
    return Promise.all([auctionApi.getById(id), bidApi.getHistory(id, 1, BID_HISTORY_PAGE_SIZE)]).then(
      ([a, bidPageResult]) => {
        setAuction(a);
        setBids(bidPageResult.items);
        setBidPage(1);
        setHasMoreBids(bidPageResult.hasNextPage);
        setHasEnded(a.status !== "Active");
      }
    );
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    loadAuction()
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [loadAuction]);

  async function handleLoadMoreBids() {
    if (!id || isLoadingMoreBids) return;
    setIsLoadingMoreBids(true);
    try {
      const nextPage = bidPage + 1;
      const result = await bidApi.getHistory(id, nextPage, BID_HISTORY_PAGE_SIZE);
      setBids((prev) => [...prev, ...result.items]);
      setBidPage(nextPage);
      setHasMoreBids(result.hasNextPage);
    } catch (err) {
      pushToast(extractErrorMessage(err), "error");
    } finally {
      setIsLoadingMoreBids(false);
    }
  }

  // F3: real backend SignalR feed — no simulated/fake real-time behavior.
  // NOTE: the backend only pushes OutBid/AuctionWon/AuctionClosed to the
  // specific user affected, not a live "NewBid" broadcast to every viewer
  // (see useAuctionHub for details) — so we refetch on outbid to bring this
  // page's price/history back in sync for the person who was just outbid.
  useAuctionHub(id, {
    onOutbid: (payload) => {
      if (payload.auctionId === id) {
        pushToast("You've just been outbid! Place a higher bid to stay in the running.", "outbid");
        loadAuction().catch((err) => setError(extractErrorMessage(err)));
      }
    },
    onAuctionWon: (payload) => {
      if (payload.auctionId === id && user) {
        pushToast(`Congratulations — you won this lot for ${formatCurrency(payload.winningAmount)}!`, "success");
      }
      setHasEnded(true);
    },
    onAuctionClosed: (payload) => {
      if (payload.auctionId === id) {
        setHasEnded(true);
        loadAuction();
      }
    },
  });

  async function handlePlaceBid(amount: number) {
    if (!id) return;
    setIsSubmittingBid(true);
    try {
      await bidApi.place({ auctionId: id, amount });
      pushToast("Your bid was placed successfully.", "success");
      // No live "NewBid" broadcast from the backend yet — refetch to reflect
      // our own bid immediately instead of waiting for one.
      await loadAuction();
    } catch (err) {
      // F3/RowVersion: the backend now guards against two people bidding on
      // the same auction at nearly the same instant via optimistic
      // concurrency, surfaced to the client as 409 Conflict. That's a
      // meaningfully different situation from "your bid was too low" — the
      // person did everything right, they just lost a race — so it gets its
      // own message and an automatic refresh instead of a generic error.
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        pushToast(
          "Someone just placed a bid on this auction before yours went through. Refreshing the latest price…",
          "outbid"
        );
        await loadAuction().catch((loadErr) => setError(extractErrorMessage(loadErr)));
      } else {
        pushToast(extractErrorMessage(err), "error");
      }
    } finally {
      setIsSubmittingBid(false);
    }
  }

  if (isLoading) return <Spinner fullPage label={t.common.loading} />;
  if (error || !auction) return <div className="container"><ErrorBanner message={error ?? "Auction not found."} /></div>;

  // Seller identity check using sellerId (safe and permanent)
  const isSeller = user?.id === auction.sellerId;

  return (
    <div className="container auction-details">
      <div className="auction-details__grid">
        <div className="auction-details__media">
          <ImageGallery
            images={
              auction.images && auction.images.length > 0
                ? auction.images
                : getGalleryImages(auction.title, auction.categoryName, 5)
            }
            title={auction.title}
          />
        </div>

        <div className="auction-details__info">
          <span className="eyebrow">{auction.categoryName}</span>
          <div className="auction-details__title-row">
            <h1>{auction.title}</h1>
            <StatusBadge status={hasEnded ? "Closed" : auction.status} />
          </div>

          <p className="auction-details__seller">{t.auction.listedBy} {auction.sellerName}</p>

          <div className="auction-details__bid-panel">
            <div>
              <span className="auction-details__bid-label">{t.auction.currentHighestBid}</span>
              <span className="auction-details__bid-value mono">{formatCurrency(auction.currentHighestBid)}</span>
              <span className="auction-details__starting">{t.auction.startingPrice} {formatCurrency(auction.startingPrice)}</span>
            </div>
            <CountdownTimer endTime={auction.endTime} size="lg" onEnded={() => setHasEnded(true)} />
          </div>

          {hasEnded && auction.winnerName ? (
            <div className="auction-details__winner">
              🏆 {t.auction.winner}: <strong>{auction.winnerName}</strong> for {formatCurrency(auction.currentHighestBid)}
            </div>
          ) : null}

          <BidForm
            currentHighestBid={auction.currentHighestBid}
            isEnded={hasEnded}
            isSeller={isSeller}
            isAuthenticated={isAuthenticated}
            isSubmitting={isSubmittingBid}
            onSubmit={handlePlaceBid}
          />

          <div className="auction-details__description">
            <h3>{t.auction.description}</h3>
            <p>{auction.description}</p>
          </div>
        </div>
      </div>

      <section className="auction-details__history">
        <h2>{t.auction.bidHistory}</h2>
        <BidHistoryList
          bids={bids}
          hasMore={hasMoreBids}
          isLoadingMore={isLoadingMoreBids}
          onLoadMore={handleLoadMoreBids}
        />
      </section>
    </div>
  );
}
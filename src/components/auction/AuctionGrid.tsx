import type { AuctionListItem } from "@/models/Auction";
import AuctionCard from "./AuctionCard";
import { AuctionErrorBoundary } from "@/components/common/AuctionErrorBoundary";
import EmptyState from "@/components/common/EmptyState";
import { useI18n } from "@/context/I18nContext";
import "./AuctionGrid.css";

interface AuctionGridProps {
  auctions: AuctionListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function AuctionGrid({
  auctions,
  emptyTitle,
  emptyDescription,
}: AuctionGridProps) {
  const { t } = useI18n();

  if (auctions.length === 0) {
    return (
      <EmptyState
        title={emptyTitle ?? t.ui.gridEmptyTitle}
        description={emptyDescription ?? t.ui.gridEmptyDesc}
      />
    );
  }

  return (
    <div className="auction-grid">
      {auctions.map((auction) => (
        <AuctionErrorBoundary key={auction.id}>
          <AuctionCard auction={auction} />
        </AuctionErrorBoundary>
      ))}
    </div>
  );
}
import type { AuctionListItem } from "@/models/Auction";
import AuctionCard from "./AuctionCard";
import { AuctionErrorBoundary } from "@/components/common/AuctionErrorBoundary";
import EmptyState from "@/components/common/EmptyState";
import "./AuctionGrid.css";

interface AuctionGridProps {
  auctions: AuctionListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function AuctionGrid({
  auctions,
  emptyTitle = "No lots to show",
  emptyDescription = "Try adjusting your filters or check back soon for new listings.",
}: AuctionGridProps) {
  if (auctions.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
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
import type { Bid } from "@/models/Bid";
import { formatCurrency, formatDateTime } from "@/utils/formatters";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import "./BidHistoryList.css";

interface BidHistoryListProps {
  bids: Bid[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

// F7: bid history per auction item — bidder, amount, timestamp, highest first.
// Backend paginates this list now, so a "Load more" button appends the next
// page instead of everything loading at once.
export default function BidHistoryList({ bids, hasMore, isLoadingMore, onLoadMore }: BidHistoryListProps) {
  if (bids.length === 0) {
    return <EmptyState title="No bids yet" description="Be the first to place a bid on this lot." />;
  }

  return (
    <>
      <ol className="bid-history">
        {bids.map((bid, index) => (
          <li key={bid.id} className={`bid-history__row ${index === 0 ? "bid-history__row--top" : ""}`}>
            <span className="bid-history__bidder">
              {bid.bidderName}
              {index === 0 ? <span className="bid-history__top-tag">Highest</span> : null}
            </span>
            <span className="bid-history__time">{formatDateTime(bid.createdAt)}</span>
            <span className="bid-history__amount mono">{formatCurrency(bid.amount)}</span>
          </li>
        ))}
      </ol>

      {hasMore ? (
        <div className="bid-history__load-more">
          <Button variant="secondary" size="sm" isLoading={isLoadingMore} onClick={onLoadMore}>
            Load more bids
          </Button>
        </div>
      ) : null}
    </>
  );
}
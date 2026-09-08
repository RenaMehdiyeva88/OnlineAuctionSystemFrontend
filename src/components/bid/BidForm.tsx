import { useState, type FormEvent } from "react";
import Button from "@/components/common/Button";
import { formatCurrency } from "@/utils/formatters";
import { validateBidAmount } from "@/utils/validators";
import "./BidForm.css";

interface BidFormProps {
  currentHighestBid: number;
  isEnded: boolean;
  isSeller: boolean;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  onSubmit: (amount: number) => void;
}

// F3: bid input — enforces "must be higher than current highest bid" on the
// client for immediate feedback; the backend re-validates authoritatively.
export default function BidForm({
  currentHighestBid,
  isEnded,
  isSeller,
  isAuthenticated,
  isSubmitting,
  onSubmit,
}: BidFormProps) {
  const minBid = currentHighestBid + 1;
  const [amount, setAmount] = useState(minBid.toString());
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validateBidAmount(amount, currentHighestBid);
    if (validationError) {
      setError(`Your bid must be higher than ${formatCurrency(currentHighestBid)}.`);
      return;
    }
    setError(null);
    onSubmit(Number(amount));
  }

  if (!isAuthenticated) {
    return <p className="bid-form__notice">Log in as a buyer to place a bid on this lot.</p>;
  }

  if (isSeller) {
    return <p className="bid-form__notice">You listed this lot — sellers can't bid on their own auctions.</p>;
  }

  if (isEnded) {
    return <p className="bid-form__notice">Bidding has closed on this lot.</p>;
  }

  return (
    <form className="bid-form" onSubmit={handleSubmit}>
      <div className="bid-form__input-row">
        <span className="bid-form__currency">$</span>
        <input
          type="number"
          className="bid-form__input mono"
          value={amount}
          min={minBid}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Your bid amount"
        />
        <Button type="submit" isLoading={isSubmitting}>
          Place bid
        </Button>
      </div>
      {error ? <span className="bid-form__error">{error}</span> : <span className="bid-form__hint">Minimum bid: {formatCurrency(minBid)}</span>}
    </form>
  );
}
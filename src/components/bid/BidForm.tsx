import { useState, type FormEvent } from "react";
import Button from "@/components/common/Button";
import { formatCurrency } from "@/utils/formatters";
import { validateBidAmount } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import { fmt } from "@/i18n/translations";
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
  const { t } = useI18n();
  const minBid = currentHighestBid + 1;
  const [amount, setAmount] = useState(minBid.toString());
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validateBidAmount(amount, currentHighestBid);
    if (validationError) {
      setError(fmt(t.ui.bidMustExceed, { amount: formatCurrency(currentHighestBid) }));
      return;
    }
    setError(null);
    onSubmit(Number(amount));
  }

  if (!isAuthenticated) {
    return <p className="bid-form__notice">{t.ui.bidLoginNotice}</p>;
  }

  if (isSeller) {
    return <p className="bid-form__notice">{t.ui.bidSellerNotice}</p>;
  }

  if (isEnded) {
    return <p className="bid-form__notice">{t.ui.bidClosedNotice}</p>;
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
          aria-label={t.ui.bidAria}
        />
        <Button type="submit" isLoading={isSubmitting}>
          {t.auction.placeBid}
        </Button>
      </div>
      {error ? <span className="bid-form__error">{error}</span> : <span className="bid-form__hint">{t.auction.minBid}: {formatCurrency(minBid)}</span>}
    </form>
  );
}
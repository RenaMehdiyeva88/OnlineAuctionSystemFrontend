import { currentT, fmt } from "@/i18n/translations";

// Small, dependency-free validation helpers shared across forms (Login,
// Register, CreateAuction, AuctionFilters). Each returns a user-facing
// message string on failure, or null when the value is valid — so callers
// can do `const err = validateX(value); if (err) { setError(err); return; }`
// without a separate boolean + message pair.
//
// Messages come from the translation table (currentT() reads the language
// the user has selected at the moment the validator runs).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  const { ui } = currentT();
  if (!value.trim()) return ui.valEmailRequired;
  if (!EMAIL_PATTERN.test(value.trim())) return ui.valEmailInvalid;
  return null;
}

export function validatePassword(value: string, minLength = 6): string | null {
  const { ui } = currentT();
  if (!value) return ui.valPasswordRequired;
  if (value.length < minLength) return fmt(ui.valPasswordMin, { n: minLength });
  return null;
}

export function validateUsername(value: string, minLength = 2): string | null {
  const { ui } = currentT();
  if (!value.trim()) return ui.valUsernameRequired;
  if (value.trim().length < minLength) return fmt(ui.valUsernameMin, { n: minLength });
  return null;
}

export function validateRequired(value: string, fieldLabel: string): string | null {
  return value.trim() ? null : fmt(currentT().ui.valRequired, { field: fieldLabel });
}

// F2 — starting price must be a positive number.
export function validatePositivePrice(value: string, fieldLabel = currentT().ui.valDefaultPrice): string | null {
  const { ui } = currentT();
  if (!value.trim()) return fmt(ui.valRequired, { field: fieldLabel });
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return fmt(ui.valNumber, { field: fieldLabel });
  if (parsed <= 0) return fmt(ui.valGreaterThanZero, { field: fieldLabel });
  return null;
}

// F2 — auction end time must be in the future (mirrors the backend's own check).
export function validateFutureDateTime(value: string, fieldLabel = currentT().ui.valDefaultDate): string | null {
  const { ui } = currentT();
  if (!value) return fmt(ui.valRequired, { field: fieldLabel });
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fmt(ui.valInvalidDate, { field: fieldLabel });
  if (parsed.getTime() <= Date.now()) return fmt(ui.valMustBeFuture, { field: fieldLabel });
  return null;
}

// F3 — a bid must be strictly higher than the current highest bid.
export function validateBidAmount(value: string, currentHighestBid: number): string | null {
  const { ui } = currentT();
  if (!value.trim()) return ui.valBidRequired;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return ui.valBidNumber;
  if (parsed <= currentHighestBid) return fmt(ui.bidMustExceed, { amount: String(currentHighestBid) });
  return null;
}

// F8 — min/max price filter: if both are set, min must not exceed max.
export function validatePriceRange(minPrice: string, maxPrice: string): string | null {
  if (!minPrice || !maxPrice) return null;
  const { ui } = currentT();
  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (Number.isNaN(min) || Number.isNaN(max)) return ui.valRangeNumeric;
  if (min > max) return ui.valRangeOrder;
  return null;
}

// F2 — image URL must be a valid URL (if provided).
export function validateImageUrl(value: string): string | null {
  if (!value.trim()) return null; // Optional field
  const { ui } = currentT();
  try {
    new URL(value.trim());
    // Basic check for common image extensions or data URL
    const url = value.trim().toLowerCase();
    if (!url.match(/\.(jpg|jpeg|png|gif|webp|svg)($|\?)|^data:image\//)) {
      return ui.valImageType;
    }
    return null;
  } catch {
    return ui.valImageInvalid;
  }
}

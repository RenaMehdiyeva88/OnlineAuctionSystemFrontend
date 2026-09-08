// Small, dependency-free validation helpers shared across forms (Login,
// Register, CreateAuction, AuctionFilters). Each returns a user-facing
// message string on failure, or null when the value is valid — so callers
// can do `const err = validateX(value); if (err) { setError(err); return; }`
// without a separate boolean + message pair.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address.";
  return null;
}

export function validatePassword(value: string, minLength = 6): string | null {
  if (!value) return "Password is required.";
  if (value.length < minLength) return `Password must be at least ${minLength} characters.`;
  return null;
}

export function validateUsername(value: string, minLength = 2): string | null {
  if (!value.trim()) return "Username is required.";
  if (value.trim().length < minLength) return `Username must be at least ${minLength} characters.`;
  return null;
}

export function validateRequired(value: string, fieldLabel: string): string | null {
  return value.trim() ? null : `${fieldLabel} is required.`;
}

// F2 — starting price must be a positive number.
export function validatePositivePrice(value: string, fieldLabel = "Price"): string | null {
  if (!value.trim()) return `${fieldLabel} is required.`;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return `${fieldLabel} must be a number.`;
  if (parsed <= 0) return `${fieldLabel} must be greater than 0.`;
  return null;
}

// F2 — auction end time must be in the future (mirrors the backend's own check).
export function validateFutureDateTime(value: string, fieldLabel = "Date"): string | null {
  if (!value) return `${fieldLabel} is required.`;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return `${fieldLabel} is not a valid date.`;
  if (parsed.getTime() <= Date.now()) return `${fieldLabel} must be in the future.`;
  return null;
}

// F3 — a bid must be strictly higher than the current highest bid.
export function validateBidAmount(value: string, currentHighestBid: number): string | null {
  if (!value.trim()) return "Enter a bid amount.";
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return "Bid amount must be a number.";
  if (parsed <= currentHighestBid) return `Your bid must be higher than ${currentHighestBid}.`;
  return null;
}

// F8 — min/max price filter: if both are set, min must not exceed max.
export function validatePriceRange(minPrice: string, maxPrice: string): string | null {
  if (!minPrice || !maxPrice) return null;
  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (Number.isNaN(min) || Number.isNaN(max)) return "Price range must be numeric.";
  if (min > max) return "Minimum price can't be greater than maximum price.";
  return null;
}

// F2 — image URL must be a valid URL (if provided).
export function validateImageUrl(value: string): string | null {
  if (!value.trim()) return null; // Optional field
  try {
    new URL(value.trim());
    // Basic check for common image extensions or data URL
    const url = value.trim().toLowerCase();
    if (!url.match(/\.(jpg|jpeg|png|gif|webp|svg)($|\?)|^data:image\//)) {
      return "Image URL should point to a valid image file (jpg, png, gif, webp, svg).";
    }
    return null;
  } catch {
    return "Image URL must be a valid web address (e.g., https://example.com/image.jpg).";
  }
}
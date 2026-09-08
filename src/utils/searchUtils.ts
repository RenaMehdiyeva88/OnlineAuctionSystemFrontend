import type { AuctionListItem } from "@/models/Auction";

/**
 * Normalize text for search:
 * - Convert to lowercase
 * - Trim whitespace
 * - Handle common plural forms
 */
function normalizeSearchTerm(term: string): string[] {
  const normalized = term.toLowerCase().trim();
  
  if (!normalized) return [];
  
  // Generate plural variations
  const variations: string[] = [normalized];
  
  // Simple plural rules
  if (normalized.endsWith("y")) {
    variations.push(normalized.slice(0, -1) + "ies");
  } else if (normalized.endsWith("s")) {
    // "watches" -> also search for "watch"
    variations.push(normalized.slice(0, -1));
  } else {
    // Add "s" plural
    variations.push(normalized + "s");
  }
  
  return variations;
}

/**
 * Check if any search term matches the text (case-insensitive, partial match)
 */
function matchesAny(text: string | undefined | null, searchTerms: string[]): boolean {
  if (!text) return false;
  
  const normalized = text.toLowerCase();
  return searchTerms.some(term => normalized.includes(term));
}

/**
 * Search auctions by keyword across title and category name
 * This is client-side search that works with AuctionListItem data
 */
export function searchAuctions(
  auctions: AuctionListItem[],
  keyword?: string
): AuctionListItem[] {
  // Empty keyword means no filtering
  if (!keyword || !keyword.trim()) {
    return auctions;
  }

  const searchTerms = normalizeSearchTerm(keyword);
  
  return auctions.filter(auction => {
    // Search in title
    if (matchesAny(auction.title, searchTerms)) return true;
    
    // Search in category name
    if (matchesAny(auction.categoryName, searchTerms)) return true;
    
    return false;
  });
}

/**
 * Filter auctions by price range
 */
export function filterByPriceRange(
  auctions: AuctionListItem[],
  minPrice?: number,
  maxPrice?: number
): AuctionListItem[] {
  return auctions.filter(auction => {
    if (minPrice !== undefined && auction.currentHighestBid < minPrice) return false;
    if (maxPrice !== undefined && auction.currentHighestBid > maxPrice) return false;
    return true;
  });
}

/**
 * Apply filters: keyword search and price range
 * 
 * NOTE: categoryId filtering is already done by the API, so we don't duplicate it here.
 * The API is called with categoryId as a query parameter, so the returned auctions
 * are already filtered by category. Client-side filtering only applies keyword and price.
 */
export function filterAuctions(
  auctions: AuctionListItem[],
  keyword?: string,
  minPrice?: number,
  maxPrice?: number
): AuctionListItem[] {
  let filtered = auctions;
  
  // Apply keyword search (client-side)
  if (keyword) {
    filtered = searchAuctions(filtered, keyword);
  }
  
  // Apply price range filter (client-side)
  if (minPrice !== undefined || maxPrice !== undefined) {
    filtered = filterByPriceRange(filtered, minPrice, maxPrice);
  }
  
  return filtered;
}

export type AuctionStatus = "Active" | "Closed" | "Cancelled";

// Full detail view (Auction Details page)
export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  // New: array of local images for gallery
  images?: string[];
  startingPrice: number;
  currentHighestBid: number;
  endTime: string; // ISO date string
  status: AuctionStatus;
  sellerId: string;
  sellerName: string;
  categoryName: string;
  winnerName: string | null;
}

// Lightweight card used on browse/search/home pages
export interface AuctionListItem {
  id: string;
  title: string;
  imageUrl: string | null;
  // New: array of local images for gallery
  images?: string[];
  currentHighestBid: number;
  endTime: string;
  status: AuctionStatus;
  sellerId: string;
  categoryName: string;
}

// Extended projection used on the seller dashboard
export interface SellerAuction {
  id: string;
  title: string;
  imageUrl: string | null;
  startingPrice: number;
  currentHighestBid: number;
  totalBids: number;
  endTime: string;
  status: AuctionStatus;
  winnerId: string | null;
  winnerName: string | null;
}

export interface CreateAuctionRequest {
  title: string;
  description: string;
  imageUrl: string | null;
  startingPrice: number;
  endTime: string;
  categoryId: string;
}

export interface AuctionSearchParams {
  keyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}
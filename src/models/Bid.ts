export interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
}

export interface PlaceBidRequest {
  auctionId: string;
  amount: number;
}
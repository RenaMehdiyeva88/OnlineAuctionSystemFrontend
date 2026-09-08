export interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  bidderName: string;
}

export interface PlaceBidRequest {
  auctionId: string;
  amount: number;
}
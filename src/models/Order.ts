export type OrderStatus = "PendingPayment" | "AwaitingSellerConfirmation" | "Paid" | "Cancelled";

export interface Order {
  id: string;
  auctionId: string;
  auctionTitle: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
}

export interface CreateOrderRequest {
  auctionId: string;
}

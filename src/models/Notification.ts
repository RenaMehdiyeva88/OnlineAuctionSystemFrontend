export interface AppNotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  auctionId: string | null;
}
// Mirrors OnlineAuctionSystem.Contracts.Common.PagedResult<T> on the backend.
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
}
import axiosClient from "./axiosClient";
import type { AxiosResponse } from "axios";
import type {
  Auction,
  AuctionListItem,
  AuctionSearchParams,
  CreateAuctionRequest,
} from "@/models/Auction";
import type { PagedResult } from "@/models/Common";

const auctionApi = {
  // F8: category-based browsing and search with price range filter.
  // Backend now returns PagedResult<AuctionListItemDto> (not a bare array) —
  // matches bid history / notifications pagination shape, so callers can
  // build real "load more" / page-count UI instead of guessing from array length.
  search: (params: AuctionSearchParams) =>
    axiosClient
      .get<PagedResult<AuctionListItem>>("/auctions", { params })
      .then((res: AxiosResponse<PagedResult<AuctionListItem>>) => res.data),

  getById: (id: string) =>
    axiosClient.get<Auction>(`/auctions/${id}`).then((res: AxiosResponse<Auction>) => res.data),

  // F2: only Sellers may create auctions — enforced server-side too
  create: (payload: CreateAuctionRequest) =>
    axiosClient.post<Auction>("/auctions", payload).then((res: AxiosResponse<Auction>) => res.data),
};

export default auctionApi;
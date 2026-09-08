import axiosClient from "./axiosClient";
import type { AxiosResponse } from "axios";
import type {
  Auction,
  AuctionListItem,
  AuctionSearchParams,
  CreateAuctionRequest,
} from "@/models/Auction";

const auctionApi = {
  // F8: category-based browsing and search with price range filter
  search: (params: AuctionSearchParams) =>
    axiosClient
      .get<AuctionListItem[]>("/auctions", { params })
      .then((res: AxiosResponse<AuctionListItem[]>) => res.data),

  getById: (id: string) =>
    axiosClient.get<Auction>(`/auctions/${id}`).then((res: AxiosResponse<Auction>) => res.data),

  // F2: only Sellers may create auctions — enforced server-side too
  create: (payload: CreateAuctionRequest) =>
    axiosClient.post<Auction>("/auctions", payload).then((res: AxiosResponse<Auction>) => res.data),
};

export default auctionApi;
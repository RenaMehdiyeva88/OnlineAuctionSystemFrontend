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
  search: (params: AuctionSearchParams) =>
    axiosClient
      .get<PagedResult<AuctionListItem>>("/auctions", { params })
      .then((res: AxiosResponse<PagedResult<AuctionListItem>>) => res.data),

  getById: (id: string) =>
    axiosClient.get<Auction>(`/auctions/${id}`).then((res: AxiosResponse<Auction>) => res.data),

  // F2: only Sellers may create auctions — enforced server-side too
  create: (payload: CreateAuctionRequest) =>
    axiosClient.post<Auction>("/auctions", payload).then((res: AxiosResponse<Auction>) => res.data),

  // Cancel — only works server-side while the auction has zero bids; the
  // backend rejects with 403 otherwise, which the caller shows as an error.
  cancel: (id: string) => axiosClient.delete(`/auctions/${id}`),

  // Uploads a photo and returns its URL, for use as imageUrl in create/update.
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient
      .post<{ url: string }>("/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res: AxiosResponse<{ url: string }>) => res.data.url);
  },
};

export default auctionApi;
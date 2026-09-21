import axiosClient from "./axiosClient";
import type { Bid, PlaceBidRequest } from "@/models/Bid";
import type { PagedResult } from "@/models/Common";

const bidApi = {
  // F3: place a bid — must be strictly higher than the current highest bid
  place: (payload: PlaceBidRequest) =>
    axiosClient.post<Bid>("/bids", payload).then((res) => res.data),

  // F7: paginated bid history for an auction, most recent first.
  // Backend now returns PagedResult<BidDto>, not a bare array.
    getHistory: (auctionId: string, page = 1, pageSize = 20) =>
    axiosClient
      .get<PagedResult<Bid>>(`/auctions/${auctionId}/bids`, { params: { page, pageSize } })
      .then((res) => res.data),
};

export default bidApi;
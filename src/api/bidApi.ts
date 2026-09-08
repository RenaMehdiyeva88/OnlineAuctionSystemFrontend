import axiosClient from "./axiosClient";
import type { Bid, PlaceBidRequest } from "@/models/Bid";

const bidApi = {
  // F3: place a bid — must be strictly higher than the current highest bid
  place: (payload: PlaceBidRequest) =>
    axiosClient.post<Bid>("/bids", payload).then((res) => res.data),

  // F7: full bid history for an auction, most recent first
  getHistory: (auctionId: string) =>
    axiosClient.get<Bid[]>(`/auctions/${auctionId}/bids`).then((res) => res.data),
};

export default bidApi;

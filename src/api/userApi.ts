import axiosClient from "./axiosClient";
import type { SellerAuction } from "@/models/Auction";

const userApi = {
  // F6: seller dashboard — backend derives the seller from the JWT, no id in the URL,
  // and returns a flat list (frontend splits it into active/completed by status).
  getSellerDashboard: () =>
    axiosClient.get<SellerAuction[]>("/seller/dashboard").then((res) => res.data),
};

export default userApi;
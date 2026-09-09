import axiosClient from "./axiosClient";
import type { SellerAuction } from "@/models/Auction";
import type { User } from "@/models/User";

// F6: shape returned by GET /api/seller/dashboard — matches backend's
// SellerDashboardDto (ActiveAuctions/CompletedAuctions), NOT a flat list.
// A previous version of this file assumed a flat SellerAuction[] and split
// it client-side by status — that never matched what the backend actually
// returns.
export interface SellerDashboard {
  activeAuctions: SellerAuction[];
  completedAuctions: SellerAuction[];
}

const userApi = {
  // Backend endpoint added: GET /api/users/{id} (previously GetUserProfileQuery
  // existed in the Application layer but had no controller action calling it).
  getProfile: (id: string) => axiosClient.get<User>(`/users/${id}`).then((res) => res.data),

  // F6: seller dashboard — backend derives the seller from the JWT, no id in the URL.
  getSellerDashboard: () =>
    axiosClient.get<SellerDashboard>("/seller/dashboard").then((res) => res.data),
};

export default userApi;
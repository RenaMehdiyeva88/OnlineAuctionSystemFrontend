import axiosClient from "./axiosClient";
import type { AppNotification } from "@/models/Notification";

// Maps to OnlineAuctionSystem.Presentation NotificationsController.
// The backend derives the current user from the JWT — no id in the URL or query.
const notificationApi = {
  getMine: () => axiosClient.get<AppNotification[]>("/notifications").then((res) => res.data),
};

export default notificationApi;
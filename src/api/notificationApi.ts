import axiosClient from "./axiosClient";
import type { AppNotification } from "@/models/Notification";
import type { PagedResult } from "@/models/Common";

// Maps to OnlineAuctionSystem.Presentation NotificationsController.
// The backend derives the current user from the JWT — no id in the URL or query.
const notificationApi = {
  // F3/F5: paginated notification history. Backend now returns
  // PagedResult<NotificationDto>, not a bare array.
    getMine: (page = 1, pageSize = 20) =>
    axiosClient
      .get<PagedResult<AppNotification>>("/notifications", { params: { page, pageSize } })
      .then((res) => res.data),

  // PATCH /api/notifications/{id}/read — marks a single notification read.
  markAsRead: (id: string) =>
    axiosClient.patch<void>(`/notifications/${id}/read`).then((res) => res.data),
};

export default notificationApi;
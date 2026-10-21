import axiosClient from "./axiosClient";
import type { CreateOrderRequest, Order } from "@/models/Order";
import type { PagedResult } from "@/models/Common";

const orderApi = {
  create: (payload: CreateOrderRequest) =>
    axiosClient.post<Order>("/orders", payload).then((res) => res.data),

  getByAuction: (auctionId: string) =>
    axiosClient.get<Order>(`/orders/auction/${auctionId}`).then((res) => res.data),

  getMine: (page = 1, pageSize = 20) =>
    axiosClient
      .get<PagedResult<Order>>("/orders/mine", { params: { page, pageSize } })
      .then((res) => res.data),

  getSelling: (page = 1, pageSize = 20) =>
    axiosClient
      .get<PagedResult<Order>>("/orders/selling", { params: { page, pageSize } })
      .then((res) => res.data),

  markAsPaid: (id: string) =>
    axiosClient.post<void>(`/orders/${id}/mark-paid`).then((res) => res.data),

  confirm: (id: string) =>
    axiosClient.post<void>(`/orders/${id}/confirm`).then((res) => res.data),
};

export default orderApi;

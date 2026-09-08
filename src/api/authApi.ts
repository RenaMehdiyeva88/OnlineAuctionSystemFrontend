import axiosClient from "./axiosClient";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/models/User";

// Maps to OnlineAuctionSystem.Presentation AuthController.
const authApi = {
  register: (payload: RegisterRequest) =>
    axiosClient.post<AuthResponse>("/auth/register", payload).then((res) => res.data),

  login: (payload: LoginRequest) =>
    axiosClient.post<AuthResponse>("/auth/login", payload).then((res) => res.data),

  refreshToken: (accessToken: string, refreshToken: string) =>
    axiosClient
      .post<AuthResponse>("/auth/refresh", { accessToken, refreshToken })
      .then((res) => res.data),
};

export default authApi;
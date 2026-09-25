import axiosClient from "./axiosClient";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/models/User";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

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

  // POST /api/auth/change-password — requires auth; ChangePasswordCommand
  // reads the user id from the JWT itself, so only current/new password go here.
  changePassword: (payload: ChangePasswordRequest) =>
    axiosClient.post<void>("/auth/change-password", payload).then((res) => res.data),

  // POST /api/auth/forgot-password — sends a reset link/token to the user's email.
  forgotPassword: (payload: ForgotPasswordRequest) =>
    axiosClient.post<void>("/auth/forgot-password", payload).then((res) => res.data),

  // POST /api/auth/reset-password — consumes the token from the emailed link.
  resetPassword: (payload: ResetPasswordRequest) =>
    axiosClient.post<void>("/auth/reset-password", payload).then((res) => res.data),
};

export default authApi;
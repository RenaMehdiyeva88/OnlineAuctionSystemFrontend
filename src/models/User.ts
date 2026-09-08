export type UserRole = "Buyer" | "Seller";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
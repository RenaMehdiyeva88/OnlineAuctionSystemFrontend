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

// Step 1 of login. requiresCode=true -> a 6-digit code was emailed and `auth`
// is absent; requiresCode=false -> email codes are off on the server and
// `auth` already holds the tokens.
export interface LoginStartResponse {
  requiresCode: boolean;
  email?: string | null;
  auth?: AuthResponse | null;
}

export interface VerifyLoginCodeRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
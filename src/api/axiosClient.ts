import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  API_BASE_URL,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_REFRESH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
} from "@/utils/constants";
import type { AuthResponse } from "@/models/User";

// Single axios instance used by every api/*Api.ts file. Keeping the base
// URL and interceptors here means the whole app's backend wiring lives in
// one file — change VITE_API_BASE_URL and everything follows.
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// F1 — access token expired → use the refresh token → retry the original
// request once with the new access token. If the refresh token itself is
// invalid/expired, clear the session and let ProtectedRoute redirect to
// /login on the next render (no direct window.location hop from here, so
// this file stays framework-agnostic).
let refreshPromise: Promise<string> | null = null;

function clearSession() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
}

async function refreshAccessToken(): Promise<string> {
  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_STORAGE_KEY);

  if (!accessToken || !refreshToken) {
    throw new Error("No refresh token available.");
  }

  // Plain axios (not axiosClient) — avoids re-triggering the request
  // interceptor/Authorization header with the now-expired access token.
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/refresh`, {
    accessToken,
    refreshToken,
  });

  const auth = response.data;
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, auth.accessToken);
  localStorage.setItem(AUTH_REFRESH_TOKEN_STORAGE_KEY, auth.refreshToken);
  return auth.accessToken;
}

// NOTE: the backend does NOT wrap responses in an envelope like
// { data, statusCode, isSuccess } — controllers return the DTO directly via
// Ok(result). An earlier version of this interceptor unwrapped a
// non-existent "ApiResponse<T>" shape; that check silently never matched
// anything, so it's removed rather than left as confusing dead code.
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        // Coalesce concurrent 401s into a single refresh call.
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newAccessToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch {
        clearSession();
        // Notify the app so AuthContext can clear its in-memory user state too.
        window.dispatchEvent(new CustomEvent("auth:session-expired"));
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

// Shape returned by ExceptionHandlingMiddleware / ValidationFilter on the
// backend: { status, message, errors } where errors is a dictionary of
// field name -> array of messages (System.Text.Json camelCases the C#
// property names, so it arrives as lowercase "status"/"message"/"errors").
interface BackendErrorPayload {
  status?: number;
  message?: string;
  errors?: Record<string, string[]> | null;
}

// Normalizes backend error responses (ValidationException / NotFoundException /
// ForbiddenException / ConflictException / etc.) into a single readable
// message so every page can display errors consistently.
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorPayload | string | undefined;

    if (typeof data === "string") return data;
    if (data?.errors) {
      const firstFieldErrors = Object.values(data.errors)[0];
      if (firstFieldErrors?.length) return firstFieldErrors[0];
    }
    if (data?.message) return data.message;

    const status = error.response?.status;
    switch (status) {
      case 401:
        return "Please log in to continue.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The item you're looking for doesn't exist.";
      case 409:
        return "There was a conflict with your request. Please try again.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "Server is temporarily unavailable. Please try again later.";
      case undefined:
        if (!navigator.onLine) {
          return "No internet connection. Please check your network and try again.";
        }
        return "Unable to connect to the server. Please check your connection and try again.";
      default:
        return error.response?.statusText || "An error occurred. Please try again.";
    }
  }

  if (error instanceof Error) return error.message;
  return "An unexpected error occurred. Please try again.";
}

// Field-level companion to extractErrorMessage — returns { fieldName: message }
// so forms can show an error under the specific input instead of (or in
// addition to) a generic banner. Field names come straight from FluentValidation's
// PropertyName, so they match the request DTO's property names exactly
// (e.g. "Email", "Password", "Title") — case-sensitive.
export function extractFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError(error)) return {};
  const data = error.response?.data as BackendErrorPayload | undefined;
  if (!data?.errors) return {};

  const fieldErrors: Record<string, string> = {};
  for (const [field, messages] of Object.entries(data.errors)) {
    if (messages?.length) fieldErrors[field] = messages[0];
  }
  return fieldErrors;
}
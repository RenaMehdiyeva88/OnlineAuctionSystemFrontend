import axios, { AxiosError, AxiosResponse, type InternalAxiosRequestConfig } from "axios";
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

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log raw response for debugging
    console.log("[API Response]", response.config.url, response.status, response.data);

    // Unwrap ApiResponse<T> wrapper if present (backend wraps responses)
    // Pattern: { data: T, statusCode, isSuccess, message }
    if (
      response.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data) &&
      "data" in response.data &&
      "statusCode" in response.data
    ) {
      console.log("[Interceptor] Unwrapping ApiResponse, extracted:", response.data.data);
      response.data = (response.data as { data: unknown }).data;
    } else {
      console.log("[Interceptor] Response is already unwrapped or is raw data");
    }
    return response;
  },
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

// Normalizes backend error responses (ValidationException / NotFoundException /
// ForbiddenException / etc. from the API) into a single readable message so
// every page can display errors consistently.
export function extractErrorMessage(error: unknown): string {
  // Log full error to console for debugging
  if (axios.isAxiosError(error)) {
    console.error('[API Error]', error.response?.status, error.response?.data);
  } else {
    console.error('[Error]', error);
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const responseData = axiosError.response?.data as Record<string, unknown> | undefined;
    
    // Try to extract specific error message from response
    if (responseData?.message) {
      return String(responseData.message);
    }
    if (responseData?.error) {
      return String(responseData.error);
    }
    if (responseData?.detail) {
      return String(responseData.detail);
    }
    if (responseData?.errors && typeof responseData.errors === 'object') {
      const errors = responseData.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        return String(errors[0]);
      } else if (typeof errors === 'object') {
        const firstError = Object.values(errors)[0];
        if (typeof firstError === 'string') {
          return firstError;
        }
        if (Array.isArray(firstError) && firstError.length > 0) {
          return String(firstError[0]);
        }
      }
    }
    
    if (typeof responseData === 'string') {
      return responseData;
    }
    
    // Provide user-friendly messages based on status code
    const status = axiosError.response?.status;
    switch (status) {
      case 400:
        return "Invalid request. Please check your input and try again.";
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
        // Network error
        if (!navigator.onLine) {
          return "No internet connection. Please check your network and try again.";
        }
        return "Unable to connect to the server. Please check your connection and try again.";
      default:
        return axiosError.response?.statusText || "An error occurred. Please try again.";
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred. Please try again.";
}
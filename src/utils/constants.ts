// Central place to configure the backend URLs. Change these via .env
// (VITE_API_BASE_URL / VITE_SIGNALR_HUB_URL) — never hardcode elsewhere.
export const API_BASE_URL: string = "http://localhost:5201/api";

// Matches Program.cs: app.MapHub<NotificationHub>("/hubs/notifications")
export const SIGNALR_HUB_URL: string = "http://localhost:5201/hubs/notifications";

export const AUTH_TOKEN_STORAGE_KEY = "oas_access_token";
export const AUTH_REFRESH_TOKEN_STORAGE_KEY = "oas_refresh_token";
export const AUTH_USER_STORAGE_KEY = "oas_user";
// Central place to configure the backend URLs. Change these via .env
// (VITE_API_BASE_URL / VITE_SIGNALR_HUB_URL) — never hardcode elsewhere.
//
// The backend has two launch profiles (see OnlineAuctionSystem.Presentation/
// Properties/launchSettings.json): "http" on port 5201 and "https" on port
// 7201. Whichever one you actually run in Visual Studio (check the dropdown
// next to the green Run button, or which URL Swagger opens to) is the one
// these values must match.
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7201/api";

// Matches Program.cs: app.MapHub<NotificationHub>("/hubs/notifications")
export const SIGNALR_HUB_URL: string =
  import.meta.env.VITE_SIGNALR_HUB_URL ?? "https://localhost:7201/hubs/notifications";

export const AUTH_TOKEN_STORAGE_KEY = "oas_access_token";
export const AUTH_REFRESH_TOKEN_STORAGE_KEY = "oas_refresh_token";
export const AUTH_USER_STORAGE_KEY = "oas_user";
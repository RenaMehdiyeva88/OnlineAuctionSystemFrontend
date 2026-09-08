import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import authApi from "@/api/authApi";
import type { AuthResponse, LoginRequest, RegisterRequest, User, UserRole } from "@/models/User";
import { AUTH_TOKEN_STORAGE_KEY, AUTH_REFRESH_TOKEN_STORAGE_KEY, AUTH_USER_STORAGE_KEY } from "@/utils/constants";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function persistSession(auth: AuthResponse) {
  // Note: backend doesn't return email in AuthResponse, so we'll store username as email
  // This should be fixed in the backend to include email in AuthResponse
  const user: User = { id: auth.userId, username: auth.username, email: auth.username, role: auth.role };
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, auth.accessToken);
  localStorage.setItem(AUTH_REFRESH_TOKEN_STORAGE_KEY, auth.refreshToken);
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  return user;
}

function clearStoredSession() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (storedUser && token) {
      setUser(JSON.parse(storedUser) as User);
    }
    setIsLoading(false);
  }, []);

  // F1 — if the refresh token itself turns out to be invalid/expired,
  // axiosClient's response interceptor clears storage and fires this event
  // so the in-memory user state (and thus every ProtectedRoute) reacts too.
  useEffect(() => {
    function handleSessionExpired() {
      setUser(null);
    }
    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () => window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const auth = await authApi.login(payload);
    setUser(persistSession(auth));
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    const auth = await authApi.register(payload);
    setUser(persistSession(auth));
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
    setUser(null);
  }, []);

  const hasRole = useCallback((role: UserRole) => user?.role === role, [user]);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, login, register, logout, hasRole }),
    [user, isLoading, login, register, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/common/Spinner";

// Guards Seller-only routes (F2: only sellers create auctions, F6: dashboard).
export default function SellerRoute() {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) return <Spinner fullPage label="Checking your session…" />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole("Seller")) return <Navigate to="/" replace />;

  return <Outlet />;
}

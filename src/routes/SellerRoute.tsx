import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/common/Spinner";
import { useI18n } from "@/context/I18nContext";

// Guards Seller-only routes (F2: only sellers create auctions, F6: dashboard).
export default function SellerRoute() {
  const { t } = useI18n();
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) return <Spinner fullPage label={t.ui.sessionChecking} />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole("Seller")) return <Navigate to="/" replace />;

  return <Outlet />;
}

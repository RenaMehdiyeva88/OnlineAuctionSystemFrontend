import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/common/Spinner";
import { useI18n } from "@/context/I18nContext";

// Guards any route that requires a logged-in user (F1: protected pages).
export default function ProtectedRoute() {
  const { t } = useI18n();
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Spinner fullPage label={t.ui.sessionChecking} />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

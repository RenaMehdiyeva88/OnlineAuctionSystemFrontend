import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { useLiveNotifications } from "@/hooks/useLiveNotifications";
import Button from "@/components/common/Button";
import LanguageThemeSwitcher from "@/components/common/LanguageThemeSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, hasRole, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { unreadCount, markAllSeen } = useLiveNotifications();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleNotificationsClick() {
    markAllSeen();
    navigate("/notifications");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-mark">⚒</span>
          <span className="navbar__brand-text">
            Auction<span className="navbar__brand-accent">house</span>
          </span>
        </NavLink>

        <nav className="navbar__links">
          <NavLink to="/auctions" className={({ isActive }) => (isActive ? "is-active" : "")}>
            {t.auctions.browse}
          </NavLink>
          {hasRole("Seller") && (
            <NavLink to="/seller/dashboard" className={({ isActive }) => (isActive ? "is-active" : "")}>
              {t.ui.navSellerDashboard}
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/orders/mine" className={({ isActive }) => (isActive ? "is-active" : "")}>
              {t.orders.myOrdersTitle}
            </NavLink>
          )}
          {hasRole("Seller") && (
            <NavLink to="/seller/sales" className={({ isActive }) => (isActive ? "is-active" : "")}>
              {t.orders.mySalesTitle}
            </NavLink>
          )}
        </nav>

        <div className="navbar__actions">
          <LanguageThemeSwitcher />
          {isAuthenticated ? (
            <>
              {hasRole("Seller") && (
                <Button size="sm" onClick={() => navigate("/seller/auctions/new")}>
                  {t.ui.navNewAuction}
                </Button>
              )}

              {/*
                The badge used to live INSIDE Button's children, which
                Button.tsx wraps in its own <span>. Button.css styles that
                span (width/height for centering label text), and those
                rules were stretching our badge span to fill the whole
                button. Moving the badge to a sibling of <Button>, inside a
                small positioning wrapper, keeps it completely outside
                Button's internal markup so Button.css can't touch it.
              */}
              <span className="navbar__bell-wrap">
                <Button size="sm" variant="ghost" onClick={handleNotificationsClick}>
                  🔔 {t.common.notifications}
                </Button>
                {unreadCount > 0 ? (
                  <span className="navbar__bell-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
                ) : null}
              </span>

              <NavLink to="/profile" className="navbar__user">
                {user?.username}
              </NavLink>
              <Button size="sm" variant="ghost" onClick={handleLogout}>
                {t.ui.navLogout}
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate("/login")}>
                {t.ui.navLogin}
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                {t.ui.navSignup}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import Button from "@/components/common/Button";
import LanguageThemeSwitcher from "@/components/common/LanguageThemeSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, hasRole, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
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
              Seller Dashboard
            </NavLink>
          )}
        </nav>

        <div className="navbar__actions">
          <LanguageThemeSwitcher />
          {isAuthenticated ? (
            <>
              {hasRole("Seller") && (
                <Button size="sm" onClick={() => navigate("/seller/auctions/new")}>
                  + New Auction
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => navigate("/notifications")}>
                🔔 Notifications
              </Button>
              <NavLink to="/profile" className="navbar__user">
                {user?.username}
              </NavLink>
              <Button size="sm" variant="ghost" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
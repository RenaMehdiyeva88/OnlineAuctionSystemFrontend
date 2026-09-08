import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RoleBadge } from "@/components/common/Badge";
import Button from "@/components/common/Button";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="container profile-page">
      <span className="eyebrow">Your account</span>
      <h1>{user.username}</h1>

      <div className="profile-card">
        <div className="profile-card__row">
          <span>Username</span>
          <strong>{user.username}</strong>
        </div>
        <div className="profile-card__row">
          <span>Account type</span>
          <RoleBadge role={user.role} />
        </div>
        <div className="profile-card__row">
          <span>User ID</span>
          <strong className="mono profile-card__id">{user.id}</strong>
        </div>
      </div>

      <div className="profile-page__actions">
        {user.role === "Seller" ? (
          <Button variant="secondary" onClick={() => navigate("/seller/dashboard")}>
            Go to seller dashboard
          </Button>
        ) : null}
        <Button variant="danger" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}

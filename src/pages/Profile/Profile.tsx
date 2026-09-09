import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "@/api/userApi";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/models/User";
import { RoleBadge } from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { useI18n } from "@/context/I18nContext";
import "./Profile.css";

export default function Profile() {
  const { user: sessionUser, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionUser) return;
    userApi
      .getProfile(sessionUser.id)
      .then(setProfile)
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [sessionUser]);

  if (!sessionUser) return null;
  if (isLoading) return <Spinner fullPage label={t.pages.profileLoading} />;

  const user = profile ?? sessionUser;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="container profile-page">
      <span className="eyebrow">{t.pages.profileEyebrow}</span>
      <h1>{user.username}</h1>

      {error ? <ErrorBanner message={`${t.pages.profileRefreshError}${error}`} /> : null}

      <div className="profile-card">
        <div className="profile-card__row">
          <span>{t.pages.profileUsername}</span>
          <strong>{user.username}</strong>
        </div>
        <div className="profile-card__row">
          <span>{t.pages.profileEmail}</span>
          <strong>{user.email}</strong>
        </div>
        <div className="profile-card__row">
          <span>{t.pages.profileAccountType}</span>
          <RoleBadge role={user.role} />
        </div>
        <div className="profile-card__row">
          <span>{t.pages.profileUserId}</span>
          <strong className="mono profile-card__id">{user.id}</strong>
        </div>
      </div>

      <div className="profile-page__actions">
        {user.role === "Seller" ? (
          <Button variant="secondary" onClick={() => navigate("/seller/dashboard")}>
            {t.pages.profileGoToDashboard}
          </Button>
        ) : null}
        <Button variant="danger" onClick={handleLogout}>
          {t.pages.profileLogout}
        </Button>
      </div>
    </div>
  );
}
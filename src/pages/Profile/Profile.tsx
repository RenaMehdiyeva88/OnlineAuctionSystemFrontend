import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "@/api/userApi";
import authApi from "@/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/models/User";
import { RoleBadge } from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import PasswordInput from "@/components/common/PasswordInput";
import { extractErrorMessage } from "@/api/axiosClient";
import { validatePassword } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import "./Profile.css";

export default function Profile() {
  const { user: sessionUser, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Change password form state ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from the current password.");
      return;
    }

    setIsChangingPassword(true);
    try {
      await authApi.changePassword({ currentPassword, newPassword });
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(extractErrorMessage(err));
    } finally {
      setIsChangingPassword(false);
    }
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

      <div className="profile-card profile-card--form">
        <h2 className="profile-card__title">Change password</h2>

        {passwordSuccess ? (
          <p className="auth-card__success">Your password was updated.</p>
        ) : null}
        {passwordError ? <ErrorBanner message={passwordError} /> : null}

        <form onSubmit={handleChangePassword}>
          <PasswordInput
            label="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <PasswordInput
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Button type="submit" isLoading={isChangingPassword}>
            Update password
          </Button>
        </form>
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
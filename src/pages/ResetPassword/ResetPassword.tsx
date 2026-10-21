import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authApi from "@/api/authApi";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validatePassword } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import "@/pages/Login/Login.css";

// Expects the emailed reset link to look like:
//   /reset-password?email=<user@example.com>&token=<the token>
// This matches ForgotPasswordCommandHandler's resetLink on the backend.
export default function ResetPassword() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !token) {
      setError(t.ui.resetInvalidLink);
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t.ui.resetMismatch);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await authApi.resetPassword({ email, token, newPassword });
      // 8: after a successful reset, send the user back to login
      navigate("/login", { replace: true, state: { justReset: true } });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">🔑</div>
        <span className="auth-card__eyebrow">{t.ui.forgotEyebrow}</span>
        <h1>{t.ui.resetTitle}</h1>
        <p>{t.ui.resetText}</p>

        {(!email || !token) ? (
          <ErrorBanner message="This reset link is invalid or has expired." />
        ) : null}

        {error ? <ErrorBanner message={error} /> : null}

        <form onSubmit={handleSubmit}>
          <PasswordInput
            label={t.ui.profileNewPassword}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <PasswordInput
            label={t.ui.profileConfirmNewPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Button type="submit" size="lg" isLoading={isSubmitting} className="auth-card__submit">
            {t.ui.resetTitle}
          </Button>
        </form>

        <p className="auth-card__switch">
          <Link to="/login">{t.ui.resetBack}</Link>
        </p>
      </div>
    </div>
  );
}
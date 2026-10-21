import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { InputField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateEmail, validatePassword } from "@/utils/validators";
import { fmt } from "@/i18n/translations";
import "./Login.css";

export default function Login() {
  const { login, verifyLoginCode } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
  const justReset = (location.state as { justReset?: boolean })?.justReset ?? false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Step 2 of login: the server emailed a 6-digit code to `email`.
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validateEmail(email) ?? validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      const result = await login({ email, password });
      if (result.requiresCode) {
        setAwaitingCode(true);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();

    if (!/^\d{6}$/.test(code.trim())) {
      setError(t.ui.loginCodeInvalidFormat);
      return;
    }

    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      await verifyLoginCode({ email, code: code.trim() });
      navigate(from, { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      setCode("");
      setNotice(t.ui.loginCodeResent);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    setAwaitingCode(false);
    setCode("");
    setError(null);
    setNotice(null);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">🔐</div>
        <span className="auth-card__eyebrow">{t.auth.welcomeBack}</span>
        <h1>{awaitingCode ? t.ui.loginCodeTitle : t.auth.login}</h1>
        <p>{awaitingCode ? fmt(t.ui.loginCodeText, { email }) : t.auth.loginDesc}</p>

        {justReset ? (
          <p className="auth-card__success">
            {t.ui.loginResetSuccess}
          </p>
        ) : null}

        {notice ? <p className="auth-card__success">{notice}</p> : null}
        {error ? <ErrorBanner message={error} /> : null}

        {awaitingCode ? (
          <form onSubmit={handleVerify}>
            <InputField
              label={t.ui.loginCodeLabel}
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
              autoFocus
              autoComplete="one-time-code"
            />
            <Button type="submit" size="lg" isLoading={isSubmitting} className="auth-card__submit">
              {t.ui.loginCodeSubmit}
            </Button>
            <div className="auth-card__forgot">
              <button type="button" className="auth-card__link-button" onClick={handleResend} disabled={isSubmitting}>
                {t.ui.loginCodeResend}
              </button>
              {" · "}
              <button type="button" className="auth-card__link-button" onClick={handleBack} disabled={isSubmitting}>
                {t.ui.loginCodeBack}
              </button>
            </div>
          </form>
        ) : (
        <form onSubmit={handleSubmit}>
          <InputField
            label={t.auth.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <InputField
            label={t.auth.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <div className="auth-card__forgot">
            <Link to="/forgot-password">{t.ui.loginForgot}</Link>
          </div>

          <Button type="submit" size="lg" isLoading={isSubmitting} className="auth-card__submit">
            {t.auth.login}
          </Button>
        </form>
        )}

        <p className="auth-card__switch">
          {t.auth.newToAuctionhouse}{" "}
          <Link to="/register">{t.auth.register}</Link>
        </p>
      </div>
    </div>
  );
}
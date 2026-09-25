import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { InputField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateEmail, validatePassword } from "@/utils/validators";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
  const justReset = (location.state as { justReset?: boolean })?.justReset ?? false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validateEmail(email) ?? validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">🔐</div>
        <span className="auth-card__eyebrow">{t.auth.welcomeBack}</span>
        <h1>{t.auth.login}</h1>
        <p>{t.auth.loginDesc}</p>

        {justReset ? (
          <p className="auth-card__success">
            Your password was reset. Log in with your new password.
          </p>
        ) : null}

        {error ? <ErrorBanner message={error} /> : null}

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
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" size="lg" isLoading={isSubmitting} className="auth-card__submit">
            {t.auth.login}
          </Button>
        </form>

        <p className="auth-card__switch">
          {t.auth.newToAuctionhouse}{" "}
          <Link to="/register">{t.auth.register}</Link>
        </p>
      </div>
    </div>
  );
}
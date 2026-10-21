import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import authApi from "@/api/authApi";
import { InputField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateEmail } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import "@/pages/Login/Login.css";

export default function ForgotPassword() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await authApi.forgotPassword({ email });
      setIsSent(true);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">✉️</div>
        <span className="auth-card__eyebrow">{t.ui.forgotEyebrow}</span>
        <h1>{t.ui.loginForgot}</h1>
        <p>{t.ui.forgotText}</p>

        {error ? <ErrorBanner message={error} /> : null}

        {isSent ? (
          <p className="auth-card__success">
            {t.ui.forgotSent.split("{email}")[0]}
            <strong>{email}</strong>
            {t.ui.forgotSent.split("{email}")[1] ?? ""}
          </p>
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
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="auth-card__submit"
            >
              {t.ui.forgotSend}
            </Button>
          </form>
        )}

        <p className="auth-card__switch">
          {t.ui.forgotRemembered} <Link to="/login">{t.auth.login}</Link>
        </p>
      </div>
    </div>
  );
}
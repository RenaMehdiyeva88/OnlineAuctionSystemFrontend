import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { InputField, SelectField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateEmail, validatePassword, validateUsername } from "@/utils/validators";
import type { UserRole } from "@/models/User";
import "./Register.css";

export default function Register() {
  const { register } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Buyer");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError =
      validateUsername(username) ?? validateEmail(email) ?? validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await register({ username, email, password, role });
      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      {/* LEFT SIDE: VISUAL */}
      <div className="auth-page__visual">
        <div className="auth-page__visual-content">
          <div className="auth-page__visual-icon">🚀</div>
          <p className="auth-page__visual-text">
            Join our thriving auction community. Bid, sell, and win with confidence.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="auth-page__form">
        <div className="auth-card">
          <span className="auth-card__eyebrow">{t.auth.joinFloor}</span>
          <h1>{t.auth.createAccount}</h1>
          <p>{t.auth.createAccountDesc}</p>

          {error ? <ErrorBanner message={error} /> : null}

          <form onSubmit={handleSubmit}>
            <InputField
              label={t.auth.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={2}
              autoComplete="username"
            />
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
              minLength={6}
              hint={t.auth.passwordHint}
              autoComplete="new-password"
            />
            <SelectField label={t.auth.role} value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value="Buyer">{t.auth.buyerOption}</option>
              <option value="Seller">{t.auth.sellerOption}</option>
            </SelectField>

            <Button type="submit" size="lg" isLoading={isSubmitting} className="auth-card__submit">
              {t.auth.register}
            </Button>
          </form>

          <p className="auth-card__switch">
            {t.auth.alreadyRegistered}{" "}
            <Link to="/login">{t.auth.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

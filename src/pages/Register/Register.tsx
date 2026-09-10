import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { InputField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage, extractFieldErrors } from "@/api/axiosClient";
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
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
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      await register({ username, email, password, role });
      navigate("/", { replace: true });
    } catch (err) {
      const backendFieldErrors = extractFieldErrors(err);
      if (Object.keys(backendFieldErrors).length > 0) {
        setFieldErrors(backendFieldErrors);
      } else {
        setError(extractErrorMessage(err));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">🚀</div>
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
            error={fieldErrors.Username}
          />
          <InputField
            label={t.auth.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            error={fieldErrors.Email}
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
            error={fieldErrors.Password}
          />
          <div className="role-select">
            <span className="field__label">{t.auth.role}</span>
            <div className="role-select__options" role="radiogroup" aria-label={t.auth.role}>
              <button
                type="button"
                role="radio"
                aria-checked={role === "Buyer"}
                className={`role-select__card ${role === "Buyer" ? "role-select__card--active" : ""}`}
                onClick={() => setRole("Buyer")}
              >
                <span className="role-select__icon">🛍️</span>
                <span className="role-select__label">{t.auth.buyerOption}</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={role === "Seller"}
                className={`role-select__card ${role === "Seller" ? "role-select__card--active" : ""}`}
                onClick={() => setRole("Seller")}
              >
                <span className="role-select__icon">🏷️</span>
                <span className="role-select__label">{t.auth.sellerOption}</span>
              </button>
            </div>
          </div>

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
  );
}
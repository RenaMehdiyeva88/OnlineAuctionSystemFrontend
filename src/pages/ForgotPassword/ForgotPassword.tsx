import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import authApi from "@/api/authApi";
import { InputField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateEmail } from "@/utils/validators";
import "@/pages/Login/Login.css";

export default function ForgotPassword() {
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
        <span className="auth-card__eyebrow">Password Recovery</span>
        <h1>Forgot password?</h1>
        <p>Enter the email on your account and we&apos;ll send you a reset link.</p>

        {error ? <ErrorBanner message={error} /> : null}

        {isSent ? (
          <p className="auth-card__success">
            If an account exists for <strong>{email}</strong>, a reset link is on its way. Check
            your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
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
              Send reset link
            </Button>
          </form>
        )}

        <p className="auth-card__switch">
          Remembered your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
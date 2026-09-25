import { useState, type InputHTMLAttributes } from "react";
import "./PasswordInput.css";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: string;
  id?: string;
}

export default function PasswordInput({ label, id, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? `pw-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="password-field">
      <label htmlFor={inputId} className="password-field__label">
        {label}
      </label>
      <div className="password-field__wrap">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className="password-field__input"
          {...rest}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? "🙈" : "👁"}
        </button>
      </div>
    </div>
  );
}
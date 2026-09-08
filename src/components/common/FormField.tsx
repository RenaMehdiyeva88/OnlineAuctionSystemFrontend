import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./FormField.css";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrapper({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && !error ? <span className="field__hint">{hint}</span> : null}
      {error ? (
        <span className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function InputField({ label, error, hint, id, className = "", ...rest }: InputFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id ?? label} error={error} hint={hint}>
      <input id={id ?? label} className={`field__control ${error ? "field__control--error" : ""} ${className}`} {...rest} />
    </FieldWrapper>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextareaField({ label, error, hint, id, className = "", ...rest }: TextareaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id ?? label} error={error} hint={hint}>
      <textarea id={id ?? label} className={`field__control field__control--textarea ${error ? "field__control--error" : ""} ${className}`} {...rest} />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function SelectField({ label, error, hint, id, className = "", children, ...rest }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id ?? label} error={error} hint={hint}>
      <select id={id ?? label} className={`field__control ${error ? "field__control--error" : ""} ${className}`} {...rest}>
        {children}
      </select>
    </FieldWrapper>
  );
}
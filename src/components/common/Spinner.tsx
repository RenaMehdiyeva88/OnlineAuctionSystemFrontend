import "./Spinner.css";

interface SpinnerProps {
  fullPage?: boolean;
  label?: string;
}

export default function Spinner({ fullPage = false, label = "Loading…" }: SpinnerProps) {
  const content = (
    <div className="spinner">
      <span className="spinner__ring" aria-hidden />
      <span className="spinner__label">{label}</span>
    </div>
  );

  if (fullPage) {
    return <div className="spinner__fullpage">{content}</div>;
  }
  return content;
}
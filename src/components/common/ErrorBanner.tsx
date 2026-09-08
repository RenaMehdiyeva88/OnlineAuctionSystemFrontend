import "./ErrorBanner.css";

export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="error-banner" role="alert">
      <strong>Couldn't complete that.</strong> {message}
    </div>
  );
}
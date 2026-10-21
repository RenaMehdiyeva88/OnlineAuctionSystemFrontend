import { useI18n } from "@/context/I18nContext";
import "./ErrorBanner.css";

export default function ErrorBanner({ message }: { message: string }) {
  const { t } = useI18n();
  return (
    <div className="error-banner" role="alert">
      <strong>{t.ui.errorBannerTitle}</strong> {message}
    </div>
  );
}
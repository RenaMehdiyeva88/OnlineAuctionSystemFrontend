import { useToast } from "@/hooks/useToast";
import { useI18n } from "@/context/I18nContext";
import "./ToastContainer.css";

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();
  const { t } = useI18n();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label={t.ui.toastRegionAria}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.variant}`} role="status">
          <span>{toast.message}</span>
          <button className="toast__dismiss" onClick={() => dismissToast(toast.id)} aria-label={t.ui.dismiss}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
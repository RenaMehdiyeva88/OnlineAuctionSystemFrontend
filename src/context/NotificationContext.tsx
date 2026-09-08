import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export type ToastVariant = "success" | "error" | "info" | "outbid";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface NotificationContextValue {
  toasts: Toast[];
  pushToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

// Holds transient toast/outbid notifications (real-time, in-memory only).
// This is intentionally separate from the persisted notification history
// fetched via notificationApi — that's the durable inbox, this is the
// live "you were just outbid" pop-up layer.
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => dismissToast(id), 6000);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ toasts, pushToast, dismissToast }), [toasts, pushToast, dismissToast]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
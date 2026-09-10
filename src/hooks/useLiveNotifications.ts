import { useContext } from "react";
import { LiveNotificationsContext } from "@/context/LiveNotificationsContext";

export function useLiveNotifications() {
  const context = useContext(LiveNotificationsContext);
  if (!context) throw new Error("useLiveNotifications must be used within a LiveNotificationsProvider");
  return context;
}
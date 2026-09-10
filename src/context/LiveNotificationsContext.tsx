import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useNotificationHub } from "@/hooks/useNotificationHub";
import notificationApi from "@/api/notificationApi";

interface LiveNotificationsContextValue {
  unreadCount: number;
  markAllSeen: () => void;
}

export const LiveNotificationsContext = createContext<LiveNotificationsContextValue | undefined>(
  undefined
);

// F3/F5: site-wide unread notification badge + live toast popups.
// Wraps the whole app (below AuthProvider) so the bell in the navbar has a
// real number, not just a static link, and outbid/won/closed events show up
// immediately no matter what page the user is on.
export function LiveNotificationsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const { pushToast } = useToast();
  const [unreadCount, setUnreadCount] = useState(0);

  // Seed the badge with the real persisted count on login/reload, so it's
  // not just live-events-since-page-load — a notification that arrived
  // while the user was logged out still shows up.
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setUnreadCount(0);
      return;
    }

    notificationApi
      .getMine(1, 100)
      .then((result) => {
        const unread = result.items.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      })
      .catch(() => {
        // Non-fatal — badge just starts at 0 and grows from live events.
      });
  }, [isAuthenticated, user]);

  useNotificationHub(isAuthenticated, {
    onOutbid: (payload) => {
      pushToast("You've just been outbid! Place a higher bid to stay in the running.", "outbid");
      setUnreadCount((count) => count + 1);
      void payload;
    },
    onAuctionWon: () => {
      pushToast("Congratulations — you won an auction!", "success");
      setUnreadCount((count) => count + 1);
    },
    onAuctionClosed: () => {
      pushToast("One of your auctions has closed.", "info");
      setUnreadCount((count) => count + 1);
    },
    onNewBid: (payload) => {
      pushToast(`${payload.bidderName} placed a new bid on your auction.`, "info");
      setUnreadCount((count) => count + 1);
    },
  });

  const markAllSeen = useCallback(() => setUnreadCount(0), []);

  const value = useMemo(() => ({ unreadCount, markAllSeen }), [unreadCount, markAllSeen]);

  return (
    <LiveNotificationsContext.Provider value={value}>{children}</LiveNotificationsContext.Provider>
  );
}
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationApi from "@/api/notificationApi";
import { extractErrorMessage } from "@/api/axiosClient";
import { useAuth } from "@/hooks/useAuth";
import ErrorBanner from "@/components/common/ErrorBanner";
import Spinner from "@/components/common/Spinner";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import type { AppNotification } from "@/models/Notification";
import { useI18n } from "@/context/I18nContext";
import "./Notifications.css";

const PAGE_SIZE = 20;

type FilterKey = "all" | "unread";

/**
 * There's no `type` field on AppNotification yet — the backend only sends a
 * plain `message` string. Until that changes, we infer an icon from the
 * message text. Safe to delete this the day a real `type` field lands.
 */
function inferIcon(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("won") || m.includes("qalib")) return "🏆";
  if (m.includes("outbid") || m.includes("üstələ")) return "⚡";
  if (m.includes("ending") || m.includes("bitir") || m.includes("expir")) return "⏱";
  return "💬";
}

function groupLabel(date: Date, t: ReturnType<typeof useI18n>["t"]): string {
  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);

  if (diffDays === 0) return t.pages.notificationsToday;
  if (diffDays === 1) return t.pages.notificationsYesterday;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "long" });
}

export default function Notifications() {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  async function loadNotifications() {
    setIsLoading(true);
    setError(null);
    try {
      const result = await notificationApi.getMine(1, PAGE_SIZE);
      setNotifications(result.items);
      setPage(1);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoadMore() {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await notificationApi.getMine(nextPage, PAGE_SIZE);
      setNotifications((prev) => [...prev, ...result.items]);
      setPage(nextPage);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function handleMarkAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    try {
      await notificationApi.markAsRead(id);
    } catch {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)));
    }
  }

  async function handleMarkAllAsRead() {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (unreadIds.length === 0) return;

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await Promise.all(unreadIds.map((id) => notificationApi.markAsRead(id)));
    } catch (err) {
      setError(extractErrorMessage(err));
      // don't roll back individually here — a reload is simpler and safer
      // than guessing which of the parallel calls failed
      loadNotifications();
    }
  }

  function handleViewAuction(notification: AppNotification) {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (notification.auctionId) {
      navigate(`/auctions/${notification.auctionId}`);
    }
  }

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  const visibleNotifications = useMemo(
    () => (filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications),
    [notifications, filter]
  );

  // Group the (already newest-first) list into day buckets without
  // re-sorting — we trust the API's ordering.
  const groups = useMemo(() => {
    const result: { label: string; items: AppNotification[] }[] = [];
    for (const n of visibleNotifications) {
      const label = groupLabel(new Date(n.createdAt), t);
      const lastGroup = result[result.length - 1];
      if (lastGroup && lastGroup.label === label) {
        lastGroup.items.push(n);
      } else {
        result.push({ label, items: [n] });
      }
    }
    return result;
  }, [visibleNotifications, t]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container notifications-page">
      <div className="notifications-header">
        <span className="eyebrow">{t.pages.notificationsEyebrow}</span>
        <h1>{t.pages.notificationsTitle}</h1>
        <p>{t.pages.notificationsSubtitle}</p>
      </div>

      {error && <ErrorBanner message={error} />}

      {isLoading ? (
        <Spinner fullPage label={t.pages.notificationsLoading} />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title={t.pages.notificationsEmptyTitle}
          description={t.pages.notificationsEmptyDesc}
        />
      ) : (
        <>
          <div className="notifications-toolbar">
            <div className="notifications-filters">
              <button
                type="button"
                className={`filter-chip ${filter === "all" ? "filter-chip--active" : ""}`}
                onClick={() => setFilter("all")}
              >
                {t.pages.notificationsFilterAll}
                <span className="filter-chip__count">{notifications.length}</span>
              </button>
              <button
                type="button"
                className={`filter-chip ${filter === "unread" ? "filter-chip--active" : ""}`}
                onClick={() => setFilter("unread")}
              >
                {t.pages.notificationsFilterUnread}
                <span className="filter-chip__count">{unreadCount}</span>
              </button>
            </div>

            {unreadCount > 0 && (
              <button type="button" className="mark-all-link" onClick={handleMarkAllAsRead}>
                ✓ {t.pages.notificationsMarkAllRead}
              </button>
            )}
          </div>

          {visibleNotifications.length === 0 ? (
            <EmptyState
              icon="✅"
              title={t.pages.notificationsEmptyUnreadTitle}
              description={t.pages.notificationsEmptyUnreadDesc}
            />
          ) : (
            <div className="notifications-groups">
              {groups.map((group) => (
                <div key={group.label} className="notifications-group">
                  <div className="notifications-group__label">{group.label}</div>
                  <div className="notifications-list">
                    {group.items.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-card ${
                          notification.isRead ? "notification-card--read" : "notification-card--unread"
                        }`}
                      >
                        <div className="notification-icon" aria-hidden="true">
                          {inferIcon(notification.message)}
                        </div>

                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <div className="notification-meta">
                            <span className="notification-time">
                              {new Date(notification.createdAt).toLocaleString()}
                            </span>
                            <div className="notification-actions">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  {t.pages.notificationsMarkRead}
                                </Button>
                              )}
                              {notification.auctionId && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleViewAuction(notification)}
                                >
                                  {t.pages.notificationsViewLot}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore && filter === "all" ? (
            <div className="notifications-load-more">
              <Button variant="secondary" isLoading={isLoadingMore} onClick={handleLoadMore}>
                {t.pages.notificationsLoadMore}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
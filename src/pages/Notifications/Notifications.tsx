import { useEffect, useState } from "react";
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

  function handleViewAuction(notification: AppNotification) {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (notification.auctionId) {
      navigate(`/auctions/${notification.auctionId}`);
    }
  }

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
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${notification.isRead ? "notification-card--read" : ""}`}
              >
                <div className="notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="notification-actions">
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                      {t.pages.notificationsMarkRead}
                    </Button>
                  )}
                  {notification.auctionId && (
                    <Button variant="ghost" size="sm" onClick={() => handleViewAuction(notification)}>
                      {t.pages.notificationsViewLot}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore ? (
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
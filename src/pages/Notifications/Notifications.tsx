import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationApi from "@/api/notificationApi";
import { extractErrorMessage } from "@/api/axiosClient";
import { useAuth } from "@/hooks/useAuth";
import ErrorBanner from "@/components/common/ErrorBanner";
import Spinner from "@/components/common/Spinner";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import type { AppNotification } from "@/models/Notification";
import "./Notifications.css";

export default function Notifications() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadNotifications();
  }, [isAuthenticated, navigate]);

  async function loadNotifications() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await notificationApi.getMine();
      setNotifications(data);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  function handleViewAuction(auctionId: string | null) {
    if (auctionId) {
      navigate(`/auctions/${auctionId}`);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container notifications-page">
      <div className="notifications-header">
        <span className="eyebrow">Stay Updated</span>
        <h1>Your Notifications</h1>
        <p>Track your auction activity, bids, and seller updates.</p>
      </div>

      {error && <ErrorBanner message={error} />}

      {isLoading ? (
        <Spinner fullPage label="Loading notifications…" />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications yet"
          description="You'll see activity updates here when you bid, win, or get outbid."
        />
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="notification-actions">
                {notification.auctionId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewAuction(notification.auctionId)}
                  >
                    View Lot
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

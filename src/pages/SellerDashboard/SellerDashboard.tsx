import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi, { type SellerDashboard as SellerDashboardData } from "@/api/userApi";
import auctionApi from "@/api/auctionApi";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, formatDateTime } from "@/utils/formatters";
import StatusBadge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import EmptyState from "@/components/common/EmptyState";
import { extractErrorMessage } from "@/api/axiosClient";
import { useI18n } from "@/context/I18nContext";
import "./SellerDashboard.css";

export default function SellerDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [dashboard, setDashboard] = useState<SellerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  async function handleCancel(auctionId: string) {
    setCancellingId(auctionId);
    try {
      await auctionApi.cancel(auctionId);
      setDashboard((prev) =>
        prev
          ? {
              ...prev,
              activeAuctions: prev.activeAuctions.filter((a) => a.id !== auctionId),
            }
          : prev
      );
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setCancellingId(null);
    }
  }

  useEffect(() => {
    if (!user) return;
    userApi
      .getSellerDashboard()
      .then(setDashboard)
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) return <Spinner fullPage label={t.pages.sellerDashboardLoading} />;
  if (error) return <div className="container"><ErrorBanner message={error} /></div>;
  if (!dashboard) return null;

  const rows = tab === "active" ? dashboard.activeAuctions : dashboard.completedAuctions;

  return (
    <div className="container seller-dashboard">
      <div className="seller-dashboard__heading">
        <div>
          <span className="eyebrow">{t.pages.sellerDashboardEyebrow}</span>
          <h1>{t.pages.sellerDashboardTitle}</h1>
        </div>
        <Link to="/seller/auctions/new">
          <Button>{t.pages.sellerDashboardNewAuction}</Button>
        </Link>
      </div>

      <div className="seller-dashboard__tabs">
        <button
          className={`seller-dashboard__tab ${tab === "active" ? "is-active" : ""}`}
          onClick={() => setTab("active")}
        >
          {t.pages.sellerDashboardActiveTab} ({dashboard.activeAuctions.length})
        </button>
        <button
          className={`seller-dashboard__tab ${tab === "completed" ? "is-active" : ""}`}
          onClick={() => setTab("completed")}
        >
          {t.pages.sellerDashboardCompletedTab} ({dashboard.completedAuctions.length})
        </button>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={tab === "active" ? t.pages.sellerDashboardNoActive : t.pages.sellerDashboardNoCompleted}
          description={
            tab === "active"
              ? t.pages.sellerDashboardNoActiveDesc
              : t.pages.sellerDashboardNoCompletedDesc
          }
          action={
            tab === "active" ? (
              <Link to="/seller/auctions/new">
                <Button>{t.pages.sellerDashboardListFirst}</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <table className="seller-table">
          <thead>
            <tr>
              <th>{t.pages.sellerDashboardColLot}</th>
              <th>{t.pages.sellerDashboardColStatus}</th>
              <th>{t.pages.sellerDashboardColCurrentBid}</th>
              <th>{t.pages.sellerDashboardColBids}</th>
              <th>{t.pages.sellerDashboardColCloses}</th>
              {tab === "completed" && <th>{t.pages.sellerDashboardColWinner}</th>}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((auction) => (
              <tr key={auction.id}>
                <td className="seller-table__title">{auction.title}</td>
                <td>
                  <StatusBadge status={auction.status} />
                </td>
                <td className="mono">{formatCurrency(auction.currentHighestBid)}</td>
                <td className="mono">{auction.totalBids}</td>
                <td>{formatDateTime(auction.endTime)}</td>
                {tab === "completed" && <td>{auction.winnerName ?? t.pages.sellerDashboardNoBids}</td>}
                <td>
                  <Link to={`/auctions/${auction.id}`}>
                    <Button size="sm" variant="secondary">
                      {t.pages.sellerDashboardView}
                    </Button>
                  </Link>
                  {tab === "active" && auction.totalBids === 0 ? (
                    <Button
                      size="sm"
                      variant="danger"
                      isLoading={cancellingId === auction.id}
                      onClick={() => handleCancel(auction.id)}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
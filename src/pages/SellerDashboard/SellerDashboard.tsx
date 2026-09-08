import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "@/api/userApi";
import { useAuth } from "@/hooks/useAuth";
import type { SellerAuction } from "@/models/Auction";
import { formatCurrency, formatDateTime } from "@/utils/formatters";
import StatusBadge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import EmptyState from "@/components/common/EmptyState";
import { extractErrorMessage } from "@/api/axiosClient";
import "./SellerDashboard.css";

// F6: seller dashboard — active + completed auctions, status, current
// highest bid, bid count, winner for completed lots.
// Backend returns a flat list (GET /api/seller/dashboard, scoped to the
// current user via the JWT) — split into active/completed here by status.
export default function SellerDashboard() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<SellerAuction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"active" | "completed">("active");

  useEffect(() => {
    if (!user) return;
    userApi
      .getSellerDashboard()
      .then(setAuctions)
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [user]);

  const dashboard = useMemo(() => {
    const activeAuctions = (auctions ?? []).filter((a) => a.status === "Active");
    const completedAuctions = (auctions ?? []).filter((a) => a.status !== "Active");
    return { activeAuctions, completedAuctions };
  }, [auctions]);

  if (isLoading) return <Spinner fullPage label="Loading your dashboard…" />;
  if (error) return <div className="container"><ErrorBanner message={error} /></div>;
  if (!auctions) return null;

  const rows: SellerAuction[] = tab === "active" ? dashboard.activeAuctions : dashboard.completedAuctions;

  return (
    <div className="container seller-dashboard">
      <div className="seller-dashboard__heading">
        <div>
          <span className="eyebrow">Your listings</span>
          <h1>Seller dashboard</h1>
        </div>
        <Link to="/seller/auctions/new">
          <Button>+ New auction</Button>
        </Link>
      </div>

      <div className="seller-dashboard__tabs">
        <button
          className={`seller-dashboard__tab ${tab === "active" ? "is-active" : ""}`}
          onClick={() => setTab("active")}
        >
          Active ({dashboard.activeAuctions.length})
        </button>
        <button
          className={`seller-dashboard__tab ${tab === "completed" ? "is-active" : ""}`}
          onClick={() => setTab("completed")}
        >
          Completed ({dashboard.completedAuctions.length})
        </button>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={tab === "active" ? "No active listings" : "No completed auctions yet"}
          description={
            tab === "active"
              ? "Create your first lot to start receiving bids."
              : "Once your active lots close, they'll show up here with the final winner."
          }
          action={
            tab === "active" ? (
              <Link to="/seller/auctions/new">
                <Button>List your first lot</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <table className="seller-table">
          <thead>
            <tr>
              <th>Lot</th>
              <th>Status</th>
              <th>Current bid</th>
              <th>Bids</th>
              <th>Closes</th>
              {tab === "completed" && <th>Winner</th>}
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
                {tab === "completed" && <td>{auction.winnerName ?? "No bids placed"}</td>}
                <td>
                  <Link to={`/auctions/${auction.id}`}>
                    <Button size="sm" variant="secondary">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

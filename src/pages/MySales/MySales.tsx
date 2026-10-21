import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import orderApi from "@/api/orderApi";
import type { Order } from "@/models/Order";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/context/I18nContext";
import { useToast } from "@/hooks/useToast";
import { formatCurrency, formatDateTime } from "@/utils/formatters";
import { extractErrorMessage } from "@/api/axiosClient";
import { OrderStatusBadge } from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorBanner from "@/components/common/ErrorBanner";
import EmptyState from "@/components/common/EmptyState";
import "../MyOrders/MyOrders.css";

const PAGE_SIZE = 20;

// Phase3: seller's completed-sales view + the "confirm payment received"
// step — the one action that actually marks an order Paid. Nothing here
// is automatic: a human on each side has to say so.
export default function MySales() {
  const { isAuthenticated, hasRole } = useAuth();
  const { t } = useI18n();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    return orderApi
      .getSelling(1, PAGE_SIZE)
      .then((result) => {
        setOrders(result.items);
        setPage(1);
        setHasMore(result.hasNextPage);
      })
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !hasRole("Seller")) {
      navigate("/");
      return;
    }
    load();
  }, [isAuthenticated, hasRole, navigate, load]);

  async function handleLoadMore() {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await orderApi.getSelling(nextPage, PAGE_SIZE);
      setOrders((prev) => [...prev, ...result.items]);
      setPage(nextPage);
      setHasMore(result.hasNextPage);
    } catch (err) {
      pushToast(extractErrorMessage(err), "error");
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function handleConfirm(order: Order) {
    if (!window.confirm(t.orders.confirmPaymentConfirm)) return;
    setConfirmingId(order.id);
    try {
      await orderApi.confirm(order.id);
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "Paid", paidAt: new Date().toISOString() } : o))
      );
      pushToast(t.orders.confirmPaymentDone, "success");
    } catch (err) {
      pushToast(extractErrorMessage(err), "error");
    } finally {
      setConfirmingId(null);
    }
  }

  if (!isAuthenticated || !hasRole("Seller")) return null;
  if (isLoading) return <Spinner fullPage label={t.orders.loading} />;

  return (
    <div className="container my-orders">
      <div className="my-orders__header">
        <span className="eyebrow">{t.orders.mySalesEyebrow}</span>
        <h1>{t.orders.mySalesTitle}</h1>
      </div>

      {error && <ErrorBanner message={error} />}

      {orders.length === 0 ? (
        <EmptyState icon="💰" title={t.orders.emptySalesTitle} description={t.orders.emptySalesDesc} />
      ) : (
        <>
          <table className="orders-table">
            <thead>
              <tr>
                <th>{t.orders.colLot}</th>
                <th>{t.orders.colAmount}</th>
                <th>{t.orders.colStatus}</th>
                <th>{t.orders.colDate}</th>
                <th aria-label={t.ui.actions} />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/auctions/${order.auctionId}`} className="orders-table__title">
                      {order.auctionTitle}
                    </Link>
                  </td>
                  <td className="mono">{formatCurrency(order.amount)}</td>
                  <td>
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td>
                    {order.status === "Paid" && order.paidAt
                      ? `${t.orders.paidOn} ${formatDateTime(order.paidAt)}`
                      : formatDateTime(order.createdAt)}
                  </td>
                  <td>
                    {order.status === "AwaitingSellerConfirmation" ? (
                      <Button
                        size="sm"
                        isLoading={confirmingId === order.id}
                        onClick={() => handleConfirm(order)}
                      >
                        {t.orders.confirmPayment}
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {hasMore ? (
            <div className="my-orders__load-more">
              <Button variant="secondary" isLoading={isLoadingMore} onClick={handleLoadMore}>
                {t.orders.loadMore}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

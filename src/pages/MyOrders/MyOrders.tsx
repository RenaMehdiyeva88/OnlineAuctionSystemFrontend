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
import "./MyOrders.css";

const PAGE_SIZE = 20;

// Phase3: buyer's order history + the "I've sent the payment" step. This
// is a declaration, not a payment gateway charge — the seller still has to
// confirm receipt (see MySales.tsx) before the order is actually Paid.
export default function MyOrders() {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    return orderApi
      .getMine(1, PAGE_SIZE)
      .then((result) => {
        setOrders(result.items);
        setPage(1);
        setHasMore(result.hasNextPage);
      })
      .catch((err) => setError(extractErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    load();
  }, [isAuthenticated, navigate, load]);

  async function handleLoadMore() {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await orderApi.getMine(nextPage, PAGE_SIZE);
      setOrders((prev) => [...prev, ...result.items]);
      setPage(nextPage);
      setHasMore(result.hasNextPage);
    } catch (err) {
      pushToast(extractErrorMessage(err), "error");
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function handleMarkAsPaid(order: Order) {
    if (!window.confirm(t.orders.markAsPaidConfirm)) return;
    setMarkingId(order.id);
    try {
      await orderApi.markAsPaid(order.id);
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "AwaitingSellerConfirmation" } : o))
      );
      pushToast(t.orders.markAsPaidDone, "success");
    } catch (err) {
      pushToast(extractErrorMessage(err), "error");
    } finally {
      setMarkingId(null);
    }
  }

  if (!isAuthenticated) return null;
  if (isLoading) return <Spinner fullPage label={t.orders.loading} />;

  return (
    <div className="container my-orders">
      <div className="my-orders__header">
        <span className="eyebrow">{t.orders.myOrdersEyebrow}</span>
        <h1>{t.orders.myOrdersTitle}</h1>
      </div>

      {error && <ErrorBanner message={error} />}

      {orders.length === 0 ? (
        <EmptyState icon="🧾" title={t.orders.emptyOrdersTitle} description={t.orders.emptyOrdersDesc} />
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
                    {order.status === "PendingPayment" ? (
                      <Button
                        size="sm"
                        isLoading={markingId === order.id}
                        onClick={() => handleMarkAsPaid(order)}
                      >
                        {t.orders.markAsPaid}
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

import type { AuctionStatus } from "@/models/Auction";
import type { OrderStatus } from "@/models/Order";
import { useI18n } from "@/context/I18nContext";
import "./Badge.css";

export default function StatusBadge({ status }: { status: AuctionStatus }) {
  const { t } = useI18n();
  const labels: Record<AuctionStatus, string> = {
    Active: t.ui.statusLive,
    Closed: t.ui.statusEnded,
    Cancelled: t.ui.statusCancelled,
  };
  return <span className={`badge badge--${status.toLowerCase()}`}>{labels[status]}</span>;
}

export function RoleBadge({ role }: { role: "Buyer" | "Seller" }) {
  const { t } = useI18n();
  const label = role === "Seller" ? t.ui.roleSeller : t.ui.roleBuyer;
  return <span className={`badge badge--role-${role.toLowerCase()}`}>{label}</span>;
}

// Phase3: manual payment-confirmation order lifecycle. Css classes reuse
// the same color vocabulary as auction StatusBadge (success/info/muted/danger).
const ORDER_STATUS_CLASS: Record<OrderStatus, string> = {
  PendingPayment: "pending",
  AwaitingSellerConfirmation: "awaiting",
  Paid: "paid",
  Cancelled: "cancelled",
};

export function OrderStatusBadge({ status, label }: { status: OrderStatus; label?: string }) {
  const { t } = useI18n();
  const labels: Record<OrderStatus, string> = {
    PendingPayment: t.orders.statusPendingPayment,
    AwaitingSellerConfirmation: t.orders.statusAwaitingSellerConfirmation,
    Paid: t.orders.statusPaid,
    Cancelled: t.orders.statusCancelled,
  };
  return (
    <span className={`badge badge--order-${ORDER_STATUS_CLASS[status]}`}>
      {label ?? labels[status]}
    </span>
  );
}
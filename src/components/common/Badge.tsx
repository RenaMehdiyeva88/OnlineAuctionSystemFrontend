import type { AuctionStatus } from "@/models/Auction";
import "./Badge.css";

const STATUS_LABEL: Record<AuctionStatus, string> = {
  Active: "Live",
  Closed: "Ended",
  Cancelled: "Cancelled",
};

export default function StatusBadge({ status }: { status: AuctionStatus }) {
  return <span className={`badge badge--${status.toLowerCase()}`}>{STATUS_LABEL[status]}</span>;
}

export function RoleBadge({ role }: { role: "Buyer" | "Seller" }) {
  return <span className={`badge badge--role-${role.toLowerCase()}`}>{role}</span>;
}
import { useState } from "react";
import { Link } from "react-router-dom";
import type { AuctionListItem } from "@/models/Auction";
import { formatCurrency } from "@/utils/formatters";
import { getPrimaryImage, getPlaceholderImage } from "@/utils/imageFallback";
import StatusBadge from "@/components/common/Badge";
import CountdownTimer from "./CountdownTimer";
import "./AuctionCard.css";

interface AuctionCardProps {
  auction: AuctionListItem;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = imageError 
    ? getPlaceholderImage(auction.categoryName)
    : getPrimaryImage(auction, "card");

  return (
    <Link to={`/auctions/${auction.id}`} className="auction-card">
      <div className="auction-card__media-wrapper">
        <div className="auction-card__media">
          {!imageError ? (
            <img 
              src={imageSrc} 
              alt={auction.title} 
              loading="lazy" 
              className="auction-card__image"
              onError={handleImageError}
            />
          ) : (
            <div className="auction-card__placeholder">
              <div className="auction-card__placeholder-content">
                <span className="auction-card__placeholder-icon">📸</span>
                <span className="auction-card__placeholder-text">{auction.categoryName}</span>
              </div>
            </div>
          )}
          <div className="auction-card__overlay" />
        </div>

        <div className="auction-card__badges">
          <div className="auction-card__status-badge">
            <StatusBadge status={auction.status} />
          </div>
          {auction.endTime && new Date(auction.endTime).getTime() - Date.now() < 3600000 && (
            <div className="auction-card__urgent-badge">🔥 Ending soon</div>
          )}
        </div>
      </div>

      <div className="auction-card__body">
        <div className="auction-card__category">
          <span className="eyebrow">{auction.categoryName}</span>
        </div>

        <h3 className="auction-card__title">{auction.title}</h3>

        <div className="auction-card__price-section">
          <div className="auction-card__price-info">
            <span className="auction-card__label">Current bid</span>
            <span className="auction-card__price mono">
              {formatCurrency(auction.currentHighestBid)}
            </span>
          </div>
        </div>

        <div className="auction-card__timer">
          <CountdownTimer endTime={auction.endTime} />
        </div>

        <button className="auction-card__cta">
          View auction
          <span className="auction-card__cta-arrow">→</span>
        </button>
      </div>
    </Link>
  );
}
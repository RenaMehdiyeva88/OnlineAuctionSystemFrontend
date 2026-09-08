/**
 * EXAMPLE: How to integrate ImageGallery into AuctionDetails.tsx
 * 
 * This shows the minimal changes needed to add the gallery component
 * to the existing AuctionDetails page.
 */

// ============================================
// CURRENT (Before) - Single Image Display
// ============================================

/* 
  Current code structure:

  export default function AuctionDetails() {
    const { id } = useParams();
    const [auction, setAuction] = useState<Auction | null>(null);
    
    return (
      <div className="auction-details">
        <div className="auction-details__image">
          <img 
            src={getAuctionImage(auction)} 
            alt={auction.title}
          />
        </div>
        
        <div className="auction-details__info">
          {/* Title, price, bid form, etc. */}
        </div>
      </div>
    );
  }
*/

// ============================================
// UPDATED (After) - Full Gallery Support
// ============================================

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Auction } from "@/models/Auction";
import { auctionApi } from "@/api/auctionApi";
import { getPrimaryImage, getGalleryImages } from "@/utils/imageFallback";
import ImageGallery from "@/components/auction/ImageGallery";
import BidForm from "@/components/bid/BidForm";
import "./AuctionDetails.css";

export default function AuctionDetails() {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data = await auctionApi.getById(id!);
        setAuction(data);
      } catch (err) {
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!auction) return <div className="error">Auction not found</div>;

  // Get images array: prefer API images, fall back to local gallery
  const images = auction.images && auction.images.length > 0
    ? auction.images
    : getGalleryImages(auction.categoryName || "vintage", 10);

  return (
    <div className="auction-details">
      {/* GALLERY - NEW! Replaces single image with carousel */}
      <div className="auction-details__gallery-section">
        <ImageGallery 
          images={images}
          title={auction.title}
          onImageChange={(index) => {
            console.log(`User viewing image ${index + 1} of ${images.length}`);
            // Optional: Track image viewing for analytics
          }}
        />
      </div>

      {/* Rest of the detail page */}
      <div className="auction-details__content">
        <div className="auction-details__header">
          <h1>{auction.title}</h1>
          <p className="auction-details__category">{auction.categoryName}</p>
        </div>

        <div className="auction-details__info">
          <div className="auction-details__price-section">
            <p className="auction-details__price-label">Current Highest Bid</p>
            <p className="auction-details__price">
              ${auction.currentHighestBid.toFixed(2)}
            </p>
            <p className="auction-details__starting">
              Starting: ${auction.startingPrice.toFixed(2)}
            </p>
          </div>

          <div className="auction-details__time-section">
            <p className="auction-details__ends-in">
              Ends: {new Date(auction.endTime).toLocaleString()}
            </p>
            {/* Add CountdownTimer if needed */}
          </div>
        </div>

        <div className="auction-details__description">
          <h2>Description</h2>
          <p>{auction.description}</p>
        </div>

        {/* Bidding Form */}
        {auction.status === "Active" && (
          <div className="auction-details__bid-section">
            <BidForm auctionId={auction.id} />
          </div>
        )}

        {/* Bid History */}
        <div className="auction-details__history-section">
          {/* BidHistoryList component */}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CSS UPDATE for AuctionDetails.css
// ============================================

/*
Add this to auction-details.css:

.auction-details__gallery-section {
  width: 100%;
  margin-bottom: var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

@media (max-width: 768px) {
  .auction-details__gallery-section {
    padding: var(--space-md);
  }
}
*/

// ============================================
// LAYOUT OPTION 1: Side-by-Side (Desktop)
// ============================================

/*
For a two-column layout:

.auction-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  padding: var(--space-lg);
}

.auction-details__gallery-section {
  grid-column: 1;
  margin-bottom: 0;
}

.auction-details__content {
  grid-column: 2;
}

@media (max-width: 1024px) {
  .auction-details {
    grid-template-columns: 1fr;
  }

  .auction-details__gallery-section {
    grid-column: 1;
  }

  .auction-details__content {
    grid-column: 1;
  }
}
*/

// ============================================
// NOTES
// ============================================

/*
1. ImageGallery Component Features:
   - Keyboard navigation (← → arrow keys)
   - Thumbnail thumbnails at the bottom
   - Responsive design (mobile & desktop)
   - Automatic image counter
   - Empty state handling

2. Images Priority:
   a) auction.images array (from backend) - 10 local images
   b) getGalleryImages() fallback - Local gallery for category
   
3. Migration Path:
   - Old code: Single image from imageUrl
   - New code: Full gallery with fallback chain
   - FULLY BACKWARD COMPATIBLE if images array is missing

4. Backend Integration:
   - Backend populates auction.images via API
   - Include like: ["/images/lots/airpods/1.jpg", ..., "/images/lots/airpods/10.jpg"]
   - If not available, frontend uses getGalleryImages() with category name

5. Performance:
   - Images loaded lazily
   - Thumbnails scroll horizontally
   - No heavy dependencies
   - Works on mobile with touch swipe (future enhancement)
*/

export default AuctionDetails;

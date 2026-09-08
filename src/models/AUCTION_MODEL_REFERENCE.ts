/**
 * Updated Auction Model with Local Gallery Images
 * 
 * This is a REFERENCE showing how the backend should return auction data
 * with the new `images` array alongside existing `imageUrl` field.
 * 
 * Backend Mapping (C#):
 * - Auction.ImageUrl: Primary image from Unsplash (for legacy compatibility)
 * - Auction.Images: New array property with paths to /public/images/lots/<category>/*.jpg
 */

// Example: Featured Lot Response from Backend
const exampleAuctionFromBackend = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Apple AirPods Pro (2nd Generation)",
  description: "Latest generation Apple AirPods Pro with active noise cancellation...",
  imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&q=80",
  images: [
    "/images/lots/airpods/1.jpg",
    "/images/lots/airpods/2.jpg",
    "/images/lots/airpods/3.jpg",
    "/images/lots/airpods/4.jpg",
    "/images/lots/airpods/5.jpg",
    "/images/lots/airpods/6.jpg",
    "/images/lots/airpods/7.jpg",
    "/images/lots/airpods/8.jpg",
    "/images/lots/airpods/9.jpg",
    "/images/lots/airpods/10.jpg",
  ],
  startingPrice: 200,
  currentHighestBid: 230.50,
  endTime: "2026-09-08T18:30:00Z",
  status: "Active",
  sellerId: "user-123",
  sellerName: "demo_seller",
  categoryName: "Electronics",
  winnerName: null,
};

// Example: List Item (lightweight, used in grids)
const exampleAuctionListItem = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Apple AirPods Pro (2nd Generation)",
  imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&q=80",
  images: [
    "/images/lots/airpods/1.jpg",
    "/images/lots/airpods/2.jpg",
    "/images/lots/airpods/3.jpg",
    "/images/lots/airpods/4.jpg",
    "/images/lots/airpods/5.jpg",
    "/images/lots/airpods/6.jpg",
    "/images/lots/airpods/7.jpg",
    "/images/lots/airpods/8.jpg",
    "/images/lots/airpods/9.jpg",
    "/images/lots/airpods/10.jpg",
  ],
  currentHighestBid: 230.50,
  endTime: "2026-09-08T18:30:00Z",
  status: "Active",
  sellerId: "user-123",
  categoryName: "Electronics",
};

/**
 * BACKEND UPDATE INSTRUCTIONS
 * 
 * In OnlineAuctionSystem.Domain/Entities/Auction.cs:
 * 
 * public class Auction
 * {
 *     public string Id { get; set; }
 *     public string Title { get; set; }
 *     public string Description { get; set; }
 *     public string? ImageUrl { get; set; }  // Keep existing field
 *     
 *     // NEW: Local gallery images
 *     public List<string>? Images { get; set; }  
 *         = new List<string>();  // Initialize as empty list
 *     
 *     // ... rest of properties
 * }
 * 
 * In Mapping (AutoMapper profile or manual):
 * 
 * auctionDto.Images = new List<string>
 * {
 *     "/images/lots/airpods/1.jpg",
 *     "/images/lots/airpods/2.jpg",
 *     // ... up to 10 images
 * };
 */

/**
 * FRONTEND INTEGRATION
 * 
 * // Component receives auction with images array:
 * <ImageGallery images={auction.images} title={auction.title} />
 * 
 * // Card displays primary image:
 * const imageSrc = getPrimaryImage(auction); // Returns images[0] or imageUrl
 * <img src={imageSrc} alt={auction.title} />
 * 
 * // Images are served from Vite public folder:
 * /public/images/lots/airpods/1.jpg → http://localhost:5173/images/lots/airpods/1.jpg
 */

export { exampleAuctionFromBackend, exampleAuctionListItem };

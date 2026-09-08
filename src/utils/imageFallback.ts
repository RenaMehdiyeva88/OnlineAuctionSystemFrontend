/**
 * Image Fallback System for Auctions
 * Uses loremflickr.com which searches by keyword to provide relevant images per category
 * Provides deterministic, category-based fallback images when auction.imageUrl is null/empty
 */

// Real image URLs mapped to actual database categories (12 per category from loremflickr.com)
// loremflickr.com searches by keyword and lock parameter ensures deterministic/stable results
export const CATEGORY_IMAGES: Record<string, string[]> = {
  // Art - painting keyword
  art: [
    "https://loremflickr.com/600/450/painting/all?lock=1",
    "https://loremflickr.com/600/450/painting/all?lock=2",
    "https://loremflickr.com/600/450/painting/all?lock=3",
    "https://loremflickr.com/600/450/painting/all?lock=4",
    "https://loremflickr.com/600/450/painting/all?lock=5",
    "https://loremflickr.com/600/450/painting/all?lock=6",
    "https://loremflickr.com/600/450/painting/all?lock=7",
    "https://loremflickr.com/600/450/painting/all?lock=8",
    "https://loremflickr.com/600/450/painting/all?lock=9",
    "https://loremflickr.com/600/450/painting/all?lock=10",
    "https://loremflickr.com/600/450/painting/all?lock=11",
    "https://loremflickr.com/600/450/painting/all?lock=12",
  ],
  // Collectibles - antique keyword
  collectibles: [
    "https://loremflickr.com/600/450/antique/all?lock=1",
    "https://loremflickr.com/600/450/antique/all?lock=2",
    "https://loremflickr.com/600/450/antique/all?lock=3",
    "https://loremflickr.com/600/450/antique/all?lock=4",
    "https://loremflickr.com/600/450/antique/all?lock=5",
    "https://loremflickr.com/600/450/antique/all?lock=6",
    "https://loremflickr.com/600/450/antique/all?lock=7",
    "https://loremflickr.com/600/450/antique/all?lock=8",
    "https://loremflickr.com/600/450/antique/all?lock=9",
    "https://loremflickr.com/600/450/antique/all?lock=10",
    "https://loremflickr.com/600/450/antique/all?lock=11",
    "https://loremflickr.com/600/450/antique/all?lock=12",
  ],
  // Electronics - electronics keyword
  electronics: [
    "https://loremflickr.com/600/450/electronics/all?lock=1",
    "https://loremflickr.com/600/450/electronics/all?lock=2",
    "https://loremflickr.com/600/450/electronics/all?lock=3",
    "https://loremflickr.com/600/450/electronics/all?lock=4",
    "https://loremflickr.com/600/450/electronics/all?lock=5",
    "https://loremflickr.com/600/450/electronics/all?lock=6",
    "https://loremflickr.com/600/450/electronics/all?lock=7",
    "https://loremflickr.com/600/450/electronics/all?lock=8",
    "https://loremflickr.com/600/450/electronics/all?lock=9",
    "https://loremflickr.com/600/450/electronics/all?lock=10",
    "https://loremflickr.com/600/450/electronics/all?lock=11",
    "https://loremflickr.com/600/450/electronics/all?lock=12",
  ],
  // Fashion - fashion keyword
  fashion: [
    "https://loremflickr.com/600/450/fashion/all?lock=1",
    "https://loremflickr.com/600/450/fashion/all?lock=2",
    "https://loremflickr.com/600/450/fashion/all?lock=3",
    "https://loremflickr.com/600/450/fashion/all?lock=4",
    "https://loremflickr.com/600/450/fashion/all?lock=5",
    "https://loremflickr.com/600/450/fashion/all?lock=6",
    "https://loremflickr.com/600/450/fashion/all?lock=7",
    "https://loremflickr.com/600/450/fashion/all?lock=8",
    "https://loremflickr.com/600/450/fashion/all?lock=9",
    "https://loremflickr.com/600/450/fashion/all?lock=10",
    "https://loremflickr.com/600/450/fashion/all?lock=11",
    "https://loremflickr.com/600/450/fashion/all?lock=12",
  ],
  // Home & Garden - furniture keyword
  "home & garden": [
    "https://loremflickr.com/600/450/furniture/all?lock=1",
    "https://loremflickr.com/600/450/furniture/all?lock=2",
    "https://loremflickr.com/600/450/furniture/all?lock=3",
    "https://loremflickr.com/600/450/furniture/all?lock=4",
    "https://loremflickr.com/600/450/furniture/all?lock=5",
    "https://loremflickr.com/600/450/furniture/all?lock=6",
    "https://loremflickr.com/600/450/furniture/all?lock=7",
    "https://loremflickr.com/600/450/furniture/all?lock=8",
    "https://loremflickr.com/600/450/furniture/all?lock=9",
    "https://loremflickr.com/600/450/furniture/all?lock=10",
    "https://loremflickr.com/600/450/furniture/all?lock=11",
    "https://loremflickr.com/600/450/furniture/all?lock=12",
  ],
  // Sports - sports keyword
  sports: [
    "https://loremflickr.com/600/450/sports/all?lock=1",
    "https://loremflickr.com/600/450/sports/all?lock=2",
    "https://loremflickr.com/600/450/sports/all?lock=3",
    "https://loremflickr.com/600/450/sports/all?lock=4",
    "https://loremflickr.com/600/450/sports/all?lock=5",
    "https://loremflickr.com/600/450/sports/all?lock=6",
    "https://loremflickr.com/600/450/sports/all?lock=7",
    "https://loremflickr.com/600/450/sports/all?lock=8",
    "https://loremflickr.com/600/450/sports/all?lock=9",
    "https://loremflickr.com/600/450/sports/all?lock=10",
    "https://loremflickr.com/600/450/sports/all?lock=11",
    "https://loremflickr.com/600/450/sports/all?lock=12",
  ],
};

// General fallback images for categories without specific mapping
export const GENERAL_FALLBACK_IMAGES: string[] = [
  "https://loremflickr.com/600/450/vintage/all?lock=1",
  "https://loremflickr.com/600/450/vintage/all?lock=2",
  "https://loremflickr.com/600/450/vintage/all?lock=3",
  "https://loremflickr.com/600/450/vintage/all?lock=4",
  "https://loremflickr.com/600/450/vintage/all?lock=5",
  "https://loremflickr.com/600/450/vintage/all?lock=6",
];

// Category thumbnail images for "Popular collections" section (4:3 aspect ratio)
export const CATEGORY_THUMBNAILS: Record<string, string> = {
  art: "https://loremflickr.com/400/300/painting/all?lock=1",
  collectibles: "https://loremflickr.com/400/300/antique/all?lock=1",
  electronics: "https://loremflickr.com/400/300/electronics/all?lock=1",
  fashion: "https://loremflickr.com/400/300/fashion/all?lock=1",
  "home & garden": "https://loremflickr.com/400/300/furniture/all?lock=1",
  sports: "https://loremflickr.com/400/300/sports/all?lock=1",
};

// Hero section background - auction gavel/premium theme from Unsplash
export const HERO_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1551836022-4ad2b3d9790a?w=1600&q=80";

/**
 * Deterministic hash function: converts string to number for consistent image selection
 * Ensures same auction always gets same image on reload
 * @param str Input string (typically auction.id)
 * @returns Numeric hash
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get image URL for an auction with smart fallback logic
 * 1. If auction has imageUrl - use it
 * 2. If categoryName matches CATEGORY_IMAGES - use category image (deterministic if multiple)
 * 3. Otherwise - use random-but-deterministic GENERAL_FALLBACK_IMAGES
 *
 * @param auction Auction object with id, imageUrl, and optional categoryName
 * @param size Optional size parameter ("card" or "detail") - for future use
 * @returns Final image URL (never null or empty)
 */
export function getAuctionImage(
  auction: {
    id: string;
    imageUrl: string | null | undefined;
    categoryName?: string;
  },
  size?: "card" | "detail"
): string {
  // 1. If auction has a real image URL, use it immediately
  if (auction.imageUrl && auction.imageUrl.trim() !== "") {
    return auction.imageUrl;
  }

  // 2. Try to find category-specific fallback
  if (auction.categoryName) {
    const categoryKey = auction.categoryName.toLowerCase();

    // Check all category keys for a match
    for (const [key, images] of Object.entries(CATEGORY_IMAGES)) {
      if (categoryKey.includes(key) || key.includes(categoryKey)) {
        // If category has multiple images, pick deterministically based on auction.id
        const imageIndex = simpleHash(auction.id) % images.length;
        return images[imageIndex];
      }
    }
  }

  // 3. Fallback to random-but-deterministic general image
  const imageIndex = simpleHash(auction.id) % GENERAL_FALLBACK_IMAGES.length;
  return GENERAL_FALLBACK_IMAGES[imageIndex];
}

/**
 * Get category preview image (for category cards/thumbnails)
 * Always returns the first image from category's image array
 * @param categoryName Category name from database (e.g., "Electronics", "Art")
 * @returns Image URL suitable for category preview
 */
export function getCategoryImage(categoryName: string): string {
  const categoryKey = categoryName.toLowerCase();

  for (const [key, images] of Object.entries(CATEGORY_IMAGES)) {
    if (categoryKey.includes(key) || key.includes(categoryKey)) {
      return images[0]; // Always first image for category preview
    }
  }

  return GENERAL_FALLBACK_IMAGES[0]; // Default fallback
}

/**
 * Get category thumbnail image for "Popular collections" section
 * Uses CATEGORY_THUMBNAILS or falls back to first image in category
 * @param categoryName Category name from database
 * @returns Thumbnail image URL for category preview
 */
export function getCategoryThumbnail(categoryName: string): string {
  const categoryKey = categoryName.toLowerCase();

  // First check CATEGORY_THUMBNAILS
  for (const [key, url] of Object.entries(CATEGORY_THUMBNAILS)) {
    if (categoryKey.includes(key) || key.includes(categoryKey)) {
      return url;
    }
  }

  // Fall back to first image from category
  return getCategoryImage(categoryName);
}

/**
 * Get placeholder image when primary image fails to load
 * Returns loremflickr fallback with category context
 * @param categoryName Category name from database
 * @returns Placeholder loremflickr URL for failed image state
 */
export function getPlaceholderImage(categoryName: string): string {
  // Use loremflickr with category-appropriate keyword, deterministic lock
  const categoryKey = categoryName.toLowerCase();

  // Map categories to keywords for loremflickr
  const keywordMap: Record<string, string> = {
    art: "painting",
    collectibles: "antique",
    electronics: "electronics",
    fashion: "fashion",
    "home & garden": "furniture",
    sports: "sports",
  };

  let keyword = "vintage"; // default fallback

  for (const [key, kw] of Object.entries(keywordMap)) {
    if (categoryKey.includes(key) || key.includes(categoryKey)) {
      keyword = kw;
      break;
    }
  }

  // Return loremflickr URL with placeholder lock
  return `https://loremflickr.com/600/450/${keyword}/all?lock=13`;
}

/**
 * Map database category names to gallery folder IDs
 * Used to locate local images in /public/images/lots/<folderID>/
 */
const CATEGORY_TO_FOLDER_ID: Record<string, string> = {
  // Premium auction categories (5 categories × 5 images each)
  "ancient-coins": "ancient-coins",
  "omega-watch": "omega-watch",
  "nes-console": "nes-console",
  "nike-shoes": "nike-shoes",
  "canon-camera": "canon-camera",
  
  // Keywords/aliases for category detection
  "ancient": "ancient-coins",
  "coin": "ancient-coins",
  "coins": "ancient-coins",
  "numismatic": "ancient-coins",
  
  "omega": "omega-watch",
  "watch": "omega-watch",
  "speedmaster": "omega-watch",
  "seamaster": "omega-watch",
  "luxury watch": "omega-watch",
  
  "nes": "nes-console",
  "nintendo": "nes-console",
  "console": "nes-console",
  "gaming": "nes-console",
  "retro gaming": "nes-console",
  
  "nike": "nike-shoes",
  "shoes": "nike-shoes",
  "sneaker": "nike-shoes",
  "air jordan": "nike-shoes",
  "dunk": "nike-shoes",
  
  "camera": "canon-camera",
  "canon": "canon-camera",
  "lens": "canon-camera",
  "photography": "canon-camera",
  "film": "canon-camera",
  "electronics": "canon-camera",
};

/**
 * Get local gallery images for an auction
 * Returns array of paths to local images: /images/lots/<category>/1.jpg through 5.jpg
 * 
 * @param title Auction title (for exact matching)
 * @param categoryName Category from database or product name
 * @param limit Number of images to return (default 5)
 * @returns Array of image URLs/paths
 */
export function getGalleryImages(
  title?: string,
  categoryName?: string,
  limit: number = 5
): string[] {
  let folderId: string | null = null;

  // First, try exact match on title
  if (title) {
    const titleKey = title.toLowerCase();
    for (const [key, folder] of Object.entries(CATEGORY_TO_FOLDER_ID)) {
      if (titleKey.includes(key)) {
        folderId = folder;
        break;
      }
    }
  }

  // If no match from title, try category
  if (!folderId && categoryName) {
    const categoryKey = categoryName.toLowerCase();
    for (const [key, folder] of Object.entries(CATEGORY_TO_FOLDER_ID)) {
      if (categoryKey.includes(key) || key.includes(categoryKey)) {
        folderId = folder;
        break;
      }
    }
  }

  // Default fallback to ancient-coins (always exists)
  if (!folderId) {
    folderId = "ancient-coins";
  }

  // Build array of local image paths (5 per lot)
  const images: string[] = [];
  for (let i = 1; i <= Math.min(limit, 5); i++) {
    images.push(`/images/lots/${folderId}/${i}.jpg`);
  }

  return images;
}

/**
 * Get primary image URL for an auction
 * Prefers local gallery first image, then imageUrl, then loremflickr fallback
 * 
 * @param auction Auction object with title, imageUrl and optional images array
 * @param size Optional size hint (unused, for future optimization)
 * @returns Single image URL to display as primary
 */
export function getPrimaryImage(
  auction: {
    title?: string;
    imageUrl?: string | null;
    images?: string[];
    categoryName?: string;
  },
  size?: "card" | "detail"
): string {
  // 1. If images array exists and has items, use first image
  if (auction.images && auction.images.length > 0) {
    return auction.images[0];
  }

  // 2. If imageUrl provided, use it
  if (auction.imageUrl && auction.imageUrl.trim() !== "") {
    return auction.imageUrl;
  }

  // 3. Try to get first local gallery image
  const gallery = getGalleryImages(auction.title, auction.categoryName, 1);
  if (gallery.length > 0) {
    return gallery[0];
  }

  // 4. Fall back to generic placeholder
  return getPlaceholderImage(auction.categoryName || "vintage");
}

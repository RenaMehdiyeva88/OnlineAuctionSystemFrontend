/**
 * Image Fallback System for Auctions
 *
 * Provides deterministic images for auctions when no real image is available.
 *
 * Priority:
 * 1. Existing auction image
 * 2. Local product gallery for known products
 * 3. Category-based loremflickr images
 * 4. Generic fallback image
 */

/* =========================================================
   CATEGORY IMAGES
   ========================================================= */

const createLoremFlickrImages = (
  keyword: string,
  count: number = 12,
  width: number = 600,
  height: number = 450
): string[] => {
  return Array.from({ length: count }, (_, index) => {
    const lock = index + 1;
    return `https://loremflickr.com/${width}/${height}/${keyword}/all?lock=${lock}`;
  });
};

export const CATEGORY_IMAGES: Record<string, string[]> = {
  art: createLoremFlickrImages("painting"),
  collectibles: createLoremFlickrImages("antique"),
  electronics: createLoremFlickrImages("electronics"),
  fashion: createLoremFlickrImages("fashion"),
  "home & garden": createLoremFlickrImages("furniture"),
  sports: createLoremFlickrImages("sports"),
};

/* =========================================================
   GENERAL FALLBACK
   ========================================================= */

export const GENERAL_FALLBACK_IMAGES: string[] =
  createLoremFlickrImages("vintage", 6);

/* =========================================================
   CATEGORY THUMBNAILS
   ========================================================= */

export const CATEGORY_THUMBNAILS: Record<string, string> = {
  art: "/images/lots/category-art/1.jpg",
  collectibles: "/images/lots/ancient-coins/1.jpg",
  electronics: "/images/lots/canon-camera/1.jpg",
  fashion: "/images/lots/rayban-sunglasses/1.jpg",
  "home & garden": "/images/lots/category-home-garden/1.jpg",
  sports: "/images/lots/baseball-glove/1.jpg",
};

/* =========================================================
   HERO IMAGE
   ========================================================= */

// Now using a real, locally-downloaded photo (via download-images.js,
// category "auction-hero") instead of an external CDN — images.unsplash.com
// was failing to load in the browser for this project, so this removes
// that dependency entirely for the hero banner.
export const HERO_BACKGROUND_IMAGE = "/images/lots/auction-hero/1.jpg";

/* =========================================================
   HELPERS
   ========================================================= */

/**
 * Normalize text for reliable comparisons.
 *
 * Examples:
 * "Home & Garden" -> "home garden"
 * "  Electronics  " -> "electronics"
 */
function normalize(value?: string | null): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Deterministic hash.
 *
 * Same string always produces the same number.
 */
function simpleHash(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

/**
 * Safely get an image from an array.
 */
function getDeterministicImage(images: string[], seed: string): string {
  if (images.length === 0) {
    return GENERAL_FALLBACK_IMAGES[0];
  }

  const index = simpleHash(seed) % images.length;
  return images[index];
}

/**
 * Find category images using normalized exact/partial matching.
 *
 * IMPORTANT:
 * Empty category names never match anything.
 */
function findCategoryImages(categoryName?: string | null): string[] | null {
  const category = normalize(categoryName);

  if (!category) {
    return null;
  }

  for (const [key, images] of Object.entries(CATEGORY_IMAGES)) {
    const normalizedKey = normalize(key);

    if (
      category === normalizedKey ||
      category.includes(normalizedKey) ||
      normalizedKey.includes(category)
    ) {
      return images;
    }
  }

  return null;
}

/* =========================================================
   AUCTION IMAGE
   ========================================================= */

/**
 * Get the best available image for an auction.
 *
 * Priority:
 * 1. auction.imageUrl
 * 2. category-specific fallback
 * 3. general fallback
 */
export function getAuctionImage(
  auction: {
    id?: string;
    imageUrl?: string | null;
    categoryName?: string | null;
  },
  _size?: "card" | "detail"
): string {
  // 1. Real image from backend
  if (typeof auction.imageUrl === "string" && auction.imageUrl.trim() !== "") {
    return auction.imageUrl.trim();
  }

  // 2. Category-specific fallback
  const categoryImages = findCategoryImages(auction.categoryName);

  if (categoryImages) {
    return getDeterministicImage(
      categoryImages,
      auction.id ?? auction.categoryName ?? "auction"
    );
  }

  // 3. Generic fallback
  return getDeterministicImage(GENERAL_FALLBACK_IMAGES, auction.id ?? "auction");
}

/* =========================================================
   CATEGORY IMAGE
   ========================================================= */

/**
 * Get category preview image.
 */
export function getCategoryImage(categoryName?: string | null): string {
  const categoryImages = findCategoryImages(categoryName);

  if (categoryImages && categoryImages.length > 0) {
    return categoryImages[0];
  }

  return GENERAL_FALLBACK_IMAGES[0];
}

/* =========================================================
   CATEGORY THUMBNAIL
   ========================================================= */

/**
 * Get thumbnail for Popular Collections.
 */
export function getCategoryThumbnail(categoryName?: string | null): string {
  const category = normalize(categoryName);

  if (!category) {
    return GENERAL_FALLBACK_IMAGES[0];
  }

  for (const [key, url] of Object.entries(CATEGORY_THUMBNAILS)) {
    const normalizedKey = normalize(key);

    if (
      category === normalizedKey ||
      category.includes(normalizedKey) ||
      normalizedKey.includes(category)
    ) {
      return url;
    }
  }

  return getCategoryImage(categoryName);
}

/* =========================================================
   PLACEHOLDER
   ========================================================= */

const CATEGORY_KEYWORDS: Record<string, string> = {
  art: "painting",
  collectibles: "antique",
  electronics: "electronics",
  fashion: "fashion",
  "home & garden": "furniture",
  sports: "sports",
};

/**
 * Get placeholder image for a failed image.
 */
export function getPlaceholderImage(categoryName?: string | null): string {
  const category = normalize(categoryName);

  let keyword = "vintage";

  if (category) {
    for (const [key, value] of Object.entries(CATEGORY_KEYWORDS)) {
      const normalizedKey = normalize(key);

      if (
        category === normalizedKey ||
        category.includes(normalizedKey) ||
        normalizedKey.includes(category)
      ) {
        keyword = value;
        break;
      }
    }
  }

  return `https://loremflickr.com/600/450/${keyword}/all?lock=13`;
}

/* =========================================================
   LOCAL PRODUCT GALLERIES
   ========================================================= */

/**
 * Local folders:
 *
 * /public/images/lots/
 *   ancient-coins/
 *   omega-watch/
 *   nes-console/
 *   nike-shoes/
 *   canon-camera/
 *   airpods/
 *   baseball-glove/
 *   rayban-sunglasses/
 *   auction-hero/        (used directly by HERO_BACKGROUND_IMAGE, not via gallery lookup)
 *
 * All 90 images (10 per folder x 9 folders) downloaded via download-images.js
 * against the official Unsplash Search API — no more scraping the
 * unofficial /napi/.../download redirect endpoint, which was silently
 * returning non-image responses (0-byte / bot-blocked) for some products.
 */

const PRODUCT_KEYWORDS: Record<string, string[]> = {
  "ancient-coins": [
    "ancient-coins",
    "ancient coin",
    "ancient coins",
    "coin",
    "coins",
    "numismatic",
  ],

  "omega-watch": [
    "omega-watch",
    "omega",
    "speedmaster",
    "seamaster",
    "luxury watch",
  ],

  "nes-console": [
    "nes",
    "nintendo",
    "console",
    "gaming",
    "retro gaming",
  ],

  "nike-shoes": [
    "nike",
    "shoes",
    "sneaker",
    "air jordan",
    "dunk",
  ],

  "canon-camera": [
    "canon",
    "camera",
    "lens",
    "photography",
    "film camera",
  ],

  airpods: [
    "airpods",
    "air pods",
    "earbuds",
  ],

  "baseball-glove": [
    "baseball glove",
    "baseball",
    "glove",
    "rawlings",
  ],

  "rayban-sunglasses": [
    "ray-ban",
    "rayban",
    "ray ban",
    "sunglasses",
  ],
};

/**
 * Find local folder based on auction title.
 */
function findLocalProductFolder(title?: string | null): string | null {
  const normalizedTitle = normalize(title);

  if (!normalizedTitle) {
    return null;
  }

  /*
   * Check longer/more specific keywords first.
   * This prevents "camera" from winning over "canon camera".
   */
  const entries = Object.entries(PRODUCT_KEYWORDS)
    .flatMap(([folder, keywords]) =>
      keywords.map((keyword) => ({
        folder,
        keyword: normalize(keyword),
      }))
    )
    .sort((a, b) => b.keyword.length - a.keyword.length);

  for (const entry of entries) {
    if (normalizedTitle.includes(entry.keyword)) {
      return entry.folder;
    }
  }

  return null;
}

/* =========================================================
   GALLERY
   ========================================================= */

/**
 * Get gallery images for an auction.
 *
 * Priority:
 *
 * 1. Local product images for known products
 * 2. Category-specific loremflickr images
 * 3. Generic loremflickr images
 */
export function getGalleryImages(
  title?: string,
  categoryName?: string,
  limit: number = 5,
  auctionId?: string
): string[] {
  /*
   * Protect against invalid limit values.
   */
  const safeLimit = Math.max(1, Math.min(Math.floor(limit), 20));

  /* ---------------------------------------------
     1. LOCAL PRODUCT GALLERY
     --------------------------------------------- */

  const folderId = findLocalProductFolder(title);

  if (folderId) {
    const localImages: string[] = [];

    /*
     * We have at least 5 local images per product
     * (10 for the 9 folders downloaded via download-images.js).
     */
    const imageCount = Math.min(safeLimit, 5);

    for (let i = 1; i <= imageCount; i++) {
      localImages.push(`/images/lots/${folderId}/${i}.jpg`);
    }

    return localImages;
  }

  /* ---------------------------------------------
     2. CATEGORY GALLERY
     --------------------------------------------- */

  const categoryImages = findCategoryImages(categoryName);

  const pool = categoryImages ?? GENERAL_FALLBACK_IMAGES;

  const seed = auctionId ?? title ?? categoryName ?? "auction";

  const startIndex = simpleHash(seed) % pool.length;

  const gallery: string[] = [];

  for (let i = 0; i < Math.min(safeLimit, pool.length); i++) {
    gallery.push(pool[(startIndex + i) % pool.length]);
  }

  return gallery;
}

/* =========================================================
   PRIMARY IMAGE
   ========================================================= */

/**
 * Get primary image for an auction.
 *
 * Priority:
 *
 * 1. images[0]
 * 2. imageUrl
 * 3. local/category gallery
 * 4. placeholder
 */
export function getPrimaryImage(
  auction: {
    id?: string;
    title?: string;
    imageUrl?: string | null;
    images?: string[] | null;
    categoryName?: string | null;
  },
  _size?: "card" | "detail"
): string {
  /* ---------------------------------------------
     1. Existing images array
     --------------------------------------------- */

  if (Array.isArray(auction.images) && auction.images.length > 0) {
    const firstImage = auction.images.find(
      (image) => typeof image === "string" && image.trim() !== ""
    );

    if (firstImage) {
      return firstImage.trim();
    }
  }

  /* ---------------------------------------------
     2. Backend imageUrl
     --------------------------------------------- */

  if (typeof auction.imageUrl === "string" && auction.imageUrl.trim() !== "") {
    return auction.imageUrl.trim();
  }

  /* ---------------------------------------------
     3. Gallery fallback
     --------------------------------------------- */

  const gallery = getGalleryImages(
    auction.title,
    auction.categoryName ?? undefined,
    1,
    auction.id
  );

  if (gallery.length > 0) {
    return gallery[0];
  }

  /* ---------------------------------------------
     4. Final placeholder
     --------------------------------------------- */

  return getPlaceholderImage(auction.categoryName);
}
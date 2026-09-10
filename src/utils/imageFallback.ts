/**
 * Image Fallback System for Auctions
 *
 * Provides deterministic images for auctions when no real image is available.
 *
 * Priority:
 * 1. Existing auction image
 * 2. Local product gallery for known products
 * 3. Category-based local images
 * 4. Generic fallback image
 */

/* =========================================================
   CATEGORY IMAGES
   ========================================================= */

const localCategoryImages = (folderId: string, count: number = 10): string[] =>
  Array.from({ length: count }, (_, index) => `/images/lots/${folderId}/${index + 1}.jpg`);

export const CATEGORY_IMAGES: Record<string, string[]> = {
  art: localCategoryImages("category-art"),
  collectibles: localCategoryImages("category-collectibles"),
  electronics: localCategoryImages("category-electronics"),
  fashion: localCategoryImages("category-fashion"),
  "home & garden": localCategoryImages("category-home-garden"),
  sports: localCategoryImages("category-sports"),
};

/* =========================================================
   GENERAL FALLBACK
   ========================================================= */

export const GENERAL_FALLBACK_IMAGES: string[] = localCategoryImages("category-collectibles");

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

export const HERO_BACKGROUND_IMAGE = "/images/lots/auction-hero/1.jpg";

/* =========================================================
   HELPERS
   ========================================================= */

function normalize(value?: string | null): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function simpleHash(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getDeterministicImage(images: string[], seed: string): string {
  if (images.length === 0) {
    return GENERAL_FALLBACK_IMAGES[0];
  }

  const index = simpleHash(seed) % images.length;
  return images[index];
}

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

export function getAuctionImage(
  auction: {
    id?: string;
    imageUrl?: string | null;
    categoryName?: string | null;
  },
  _size?: "card" | "detail"
): string {
  if (typeof auction.imageUrl === "string" && auction.imageUrl.trim() !== "") {
    return auction.imageUrl.trim();
  }

  const categoryImages = findCategoryImages(auction.categoryName);

  if (categoryImages) {
    return getDeterministicImage(
      categoryImages,
      auction.id ?? auction.categoryName ?? "auction"
    );
  }

  return getDeterministicImage(GENERAL_FALLBACK_IMAGES, auction.id ?? "auction");
}

/* =========================================================
   CATEGORY IMAGE
   ========================================================= */

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

const CATEGORY_FOLDER_MAP: Record<string, string> = {
  art: "category-art",
  collectibles: "category-collectibles",
  electronics: "category-electronics",
  fashion: "category-fashion",
  "home & garden": "category-home-garden",
  sports: "category-sports",
};

export function getPlaceholderImage(categoryName?: string | null): string {
  const category = normalize(categoryName);

  let folder = "category-collectibles";

  if (category) {
    for (const [key, value] of Object.entries(CATEGORY_FOLDER_MAP)) {
      const normalizedKey = normalize(key);

      if (
        category === normalizedKey ||
        category.includes(normalizedKey) ||
        normalizedKey.includes(category)
      ) {
        folder = value;
        break;
      }
    }
  }

  return `/images/lots/${folder}/10.jpg`;
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
 *   rolex-watch/
 *   nes-console/
 *   nike-shoes/
 *   canon-camera/
 *   airpods/
 *   baseball-glove/
 *   rayban-sunglasses/
 *   auction-hero/
 *   category-art/
 *   category-collectibles/
 *   category-electronics/
 *   category-fashion/
 *   category-home-garden/
 *   category-sports/
 *   silk-scarf/
 *   quilted-handbag/
 *   wrought-iron-lamp/
 *   antique-book/
 *   wooden-desk/
 *   van-gogh-painting/
 *   monet-painting/
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

  "rolex-watch": [
    "rolex",
    "submariner",
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

  "silk-scarf": [
    "silk scarf",
    "scarf",
    "hermes",
    "hermès",
  ],

  "quilted-handbag": [
    "quilted handbag",
    "handbag",
    "chanel",
    "quilted",
  ],

  "wrought-iron-lamp": [
    "wrought iron",
    "garden lamp",
    "lamp",
  ],

  "antique-book": [
    "harry potter",
    "philosopher's stone",
    "first edition",
    "book",
  ],

  "wooden-desk": [
    "wooden desk",
    "desk",
    "victorian",
  ],

  "van-gogh-painting": [
    "van gogh",
    "starry night",
  ],

  "monet-painting": [
    "monet",
    "water lilies",
  ],
};

function findLocalProductFolder(title?: string | null): string | null {
  const normalizedTitle = normalize(title);

  if (!normalizedTitle) {
    return null;
  }

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

export function getGalleryImages(
  title?: string,
  categoryName?: string,
  limit: number = 5,
  auctionId?: string
): string[] {
  const safeLimit = Math.max(1, Math.min(Math.floor(limit), 20));

  const folderId = findLocalProductFolder(title);

  if (folderId) {
    const localImages: string[] = [];
    const imageCount = Math.min(safeLimit, 5);

    for (let i = 1; i <= imageCount; i++) {
      localImages.push(`/images/lots/${folderId}/${i}.jpg`);
    }

    return localImages;
  }

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
  if (Array.isArray(auction.images) && auction.images.length > 0) {
    const firstImage = auction.images.find(
      (image) => typeof image === "string" && image.trim() !== ""
    );

    if (firstImage) {
      return firstImage.trim();
    }
  }

  if (typeof auction.imageUrl === "string" && auction.imageUrl.trim() !== "") {
    return auction.imageUrl.trim();
  }

  const gallery = getGalleryImages(
    auction.title,
    auction.categoryName ?? undefined,
    1,
    auction.id
  );

  if (gallery.length > 0) {
    return gallery[0];
  }

  return getPlaceholderImage(auction.categoryName);
}
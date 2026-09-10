#!/usr/bin/env node
/**
 * Unsplash Image Downloader for Auction Lots
 * 
 * Usage:
 * 1. Get your free Unsplash API key at: https://unsplash.com/oauth/applications
 * 2. Set environment variable: export UNSPLASH_ACCESS_KEY="your_key_here"
 * 3. Run: node download-images.js
 * 
 * Downloads 10 images per category to /public/images/lots/<category>/
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

// Categories with their Unsplash search queries
const CATEGORIES = [
  { id: 'airpods', query: 'apple airpods pro' },
  { id: 'nes-console', query: 'nintendo nes console retro' },
  { id: 'baseball-glove', query: 'baseball glove leather' },
  { id: 'canon-camera', query: 'vintage film camera canon' },
  { id: 'omega-watch', query: 'luxury chronograph watch' },
  { id: 'rayban-sunglasses', query: 'vintage sunglasses' },
  { id: 'nike-shoes', query: 'nike running shoes' },
  { id: 'ancient-coins', query: 'ancient roman coins' },
  { id: 'auction-hero', query: 'auction gavel' },
  { id: 'category-art', query: 'abstract oil painting canvas art' },
  { id: 'category-home-garden', query: 'cozy living room interior' },
  { id: 'category-collectibles', query: 'antique collectibles vintage items' },
  { id: 'category-fashion', query: 'vintage fashion clothing accessories' },
  { id: 'category-electronics', query: 'modern electronics gadgets technology' },
  { id: 'category-sports', query: 'sports equipment gear vintage' },
  { id: 'silk-scarf', query: 'silk scarf luxury fashion' },
  { id: 'quilted-handbag', query: 'quilted leather handbag vintage' },
  { id: 'wrought-iron-lamp', query: 'wrought iron vintage lamp' },
  { id: 'antique-book', query: 'antique first edition book' },
  { id: 'wooden-desk', query: 'antique wooden writing desk' },
  { id: 'rolex-watch', query: 'rolex submariner vintage watch' },
  { id: 'van-gogh-painting', query: 'van gogh starry night painting' },
  { id: 'monet-painting', query: 'claude monet water lilies painting' },
  { id: 'auth-visual', query: 'auction bidding paddle raised crowd' },
];

const IMAGES_PER_CATEGORY = 10;

// Validate API key
if (!API_KEY) {
  console.error('❌ Error: UNSPLASH_ACCESS_KEY environment variable not set');
  console.error('Get your free API key at: https://unsplash.com/oauth/applications');
  process.exit(1);
}

/**
 * Download a single image from URL to local file
 */
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Fetch photos from Unsplash API
 */
function fetchUnsplashPhotos(query) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL);
    url.searchParams.set('query', query);
    url.searchParams.set('per_page', IMAGES_PER_CATEGORY.toString());
    url.searchParams.set('client_id', API_KEY);

    https.get(url.toString(), (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          
          if (response.statusCode === 401) {
            reject(new Error('Unauthorized: Invalid API key. Get one at https://unsplash.com/oauth/applications'));
          } else if (!json.results) {
            reject(new Error(`No results field in response: ${data.substring(0, 100)}`));
          } else {
            resolve(json.results);
          }
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Process a single category
 */
async function processCategory(category) {
  const categoryDir = path.join(__dirname, 'public', 'images', 'lots', category.id);

  // Create directory
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  console.log(`\n📥 Fetching images for: ${category.id} (query: "${category.query}")`);

  try {
    const photos = await fetchUnsplashPhotos(category.query);

    if (photos.length === 0) {
      console.warn(`  ⚠️  No results found for "${category.query}"`);
      return 0;
    }

    if (photos.length < IMAGES_PER_CATEGORY) {
      console.warn(`  ⚠️  Only ${photos.length}/${IMAGES_PER_CATEGORY} images found`);
    }

    let downloaded = 0;

    // Download each image
    for (let i = 0; i < photos.length && i < IMAGES_PER_CATEGORY; i++) {
      const photo = photos[i];
      const imageUrl = photo.urls.regular;
      const fileName = `${i + 1}.jpg`;
      const filePath = path.join(categoryDir, fileName);

      try {
        await downloadImage(imageUrl, filePath);
        process.stdout.write('.');
        downloaded++;
      } catch (err) {
        console.error(`\n  ❌ Failed to download image ${i + 1}: ${err.message}`);
      }
    }

    console.log(`\n  ✅ Downloaded ${downloaded} images`);
    return downloaded;
  } catch (err) {
    console.error(`  ❌ Error: ${err.message}`);
    return 0;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎬 Unsplash Image Downloader for Auction Lots');
  console.log('='.repeat(50));
  console.log(`API Key: ${API_KEY.substring(0, 10)}...`);

  const results = {};
  let totalDownloaded = 0;

  for (const category of CATEGORIES) {
    const count = await processCategory(category);
    results[category.id] = count;
    totalDownloaded += count;
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Download Summary:');
  console.log('='.repeat(50));

  for (const category of CATEGORIES) {
    const count = results[category.id];
    const status = count === IMAGES_PER_CATEGORY ? '✅' : count > 0 ? '⚠️ ' : '❌';
    console.log(`${status} ${category.id.padEnd(20)} ${count}/${IMAGES_PER_CATEGORY}`);
  }

  console.log('='.repeat(50));
  console.log(`📦 Total images downloaded: ${totalDownloaded}`);

  if (totalDownloaded === CATEGORIES.length * IMAGES_PER_CATEGORY) {
    console.log('✅ All images downloaded successfully!');
    process.exit(0);
  } else if (totalDownloaded > 0) {
    console.log('⚠️  Some images are missing, but download completed');
    process.exit(0);
  } else {
    console.log('❌ Failed to download any images');
    process.exit(1);
  }
}

main();
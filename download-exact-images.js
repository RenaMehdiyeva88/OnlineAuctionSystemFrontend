import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exact Unsplash image URLs provided by the user
const imageData = [
  {
    folder: 'airpods',
    images: [
      'https://unsplash.com/photos/white-wireless-earbuds-Ypjv4zccBKM',
      'https://unsplash.com/photos/white-wireless-earbuds-y84Zn8TEySI',
      'https://unsplash.com/photos/shallow-focus-photo-of-apple-airpods-AgLMrojqjAM',
      'https://unsplash.com/photos/apple-airpods-and-charging-case-luhAYh8JpDc',
      'https://unsplash.com/photos/apple-airpods-with-charging-case-rI2MXeP6sss'
    ]
  },
  {
    folder: 'nes-console',
    images: [
      'https://unsplash.com/photos/nes-konsole-neben-schwarzer-kamera-xRHun0HONlM',
      'https://unsplash.com/photos/jeopardy-nes-game-console-HQxDZVpcrfc',
      'https://unsplash.com/photos/classic-snes-console-ZV7lnfyQLmA',
      'https://unsplash.com/photos/a-video-game-console-KI48rcIoYy4',
      'https://unsplash.com/photos/black-and-gray-nintendo-snes-controller-DF7iYwi8Xuo'
    ]
  },
  {
    folder: 'baseball-glove',
    images: [
      'https://unsplash.com/photos/a-baseball-glove-with-a-baseball-in-it-0GBqOCztlOk',
      'https://unsplash.com/photos/a-baseball-glove-with-a-baseball-VO8k1cXmmX8',
      'https://unsplash.com/photos/an-old-baseball-glove-laying-on-the-ground-YkeNaEBMA6s',
      'https://unsplash.com/photos/a-baseball-glove-with-a-baseball-inside-of-it-4dDVbDnmzoo',
      'https://unsplash.com/photos/leather-baseball-mitt-on-ground-Ar7ENMIo3cQ'
    ]
  },
  {
    folder: 'canon-camera',
    images: [
      'https://unsplash.com/photos/black-rolleiflex-vintage-camera-swxPxjxHNkc',
      'https://unsplash.com/photos/black-and-silver-vintage-camera-FIObtEFKiOU',
      'https://unsplash.com/photos/vintage-camera-with-multiple-lenses-on-shelf-KHdGO2BeqiU',
      'https://unsplash.com/photos/vintage-camera-with-leather-case-on-wooden-surface-7-giDFDnmHc',
      'https://unsplash.com/photos/collection-of-vintage-cameras-displayed-on-shelves-y8D6XS7RWbo'
    ]
  },
  {
    folder: 'omega-watch',
    images: [
      'https://unsplash.com/photos/a-close-up-of-a-luxury-chronograph-wristwatch-3XbFQkhWKIA',
      'https://unsplash.com/photos/close-up-of-an-omega-seamaster-watch-dial-lEiOFMum37o',
      'https://unsplash.com/photos/black-and-silver-chronograph-watch-aY0UX6xzGik',
      'https://unsplash.com/photos/round-black-chronograph-watch-oWjw3XWq96M',
      'https://unsplash.com/photos/black-and-gold-chronograph-watch-huRn8ECqADI'
    ]
  },
  {
    folder: 'rayban-sunglasses',
    images: [
      'https://unsplash.com/photos/black-sunglasses-t4rurwxgXjg',
      'https://unsplash.com/photos/black-sunglasses-on-black-leather-pouch-MeJFn3rJ6Vk',
      'https://unsplash.com/photos/black-sunglasses-on-black-cap-x_BppzRCBLs',
      'https://unsplash.com/photos/black-framed-sunglasses-on-white-surface-lSl94SZHRgA',
      'https://unsplash.com/photos/black-framed-ray-ban-wayfarer-sunglasses-on-top-of-book-UoqAR2pOxMo'
    ]
  },
  {
    folder: 'nike-shoes',
    images: [
      'https://unsplash.com/photos/black-white-and-red-nike-shoes-s3BIuan-wjo',
      'https://unsplash.com/photos/blue-white-and-black-nike-running-shoes-l8p1aWZqHvE',
      'https://unsplash.com/photos/white-nike-running-shoes-YehfyFdVK0A',
      'https://unsplash.com/photos/white-and-black-nike-sneaker-zUDiXT_rCb4',
      'https://unsplash.com/photos/white-and-blue-nike-sneaker-Qj0ZyeP1cB8'
    ]
  },
  {
    folder: 'ancient-coins',
    images: [
      'https://unsplash.com/photos/a-pile-of-ancient-gold-coins-with-pottery-shards-yMzkd0ilkdM',
      'https://unsplash.com/photos/a-group-of-round-objects-GtTzt6winiQ',
      'https://unsplash.com/photos/a-wooden-table-topped-with-lots-of-different-types-of-coins-5wS5iep91tg',
      'https://unsplash.com/photos/heres-a-caption-a-pile-of-old-coins-qv2F0zuhm5o',
      'https://unsplash.com/photos/antique-pocket-watch-surrounded-by-old-coins-1V6QB6g0IZM'
    ]
  }
];

const publicDir = path.join(__dirname, 'public', 'images', 'lots');

// Convert Unsplash page URL to download URL
function getDownloadUrl(unsplashUrl) {
  // Extract the photo ID from the URL
  // URL format: https://unsplash.com/photos/PHOTO_ID or https://unsplash.com/photos/description-PHOTO_ID
  const parts = unsplashUrl.split('/photos/');
  if (parts.length < 2) {
    throw new Error(`Invalid Unsplash URL: ${unsplashUrl}`);
  }
  
  const photoId = parts[1].split('-').pop(); // Get the ID (last part after splitting by -)
  
  // Unsplash download URL format
  return `https://unsplash.com/napi/photos/${photoId}/download?force=true`;
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        return https.get(redirectUrl, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(filepath);
          });
        }).on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('🎬 Downloading Exact Unsplash Images for Auction Lots');
  console.log('==================================================\n');

  const summary = {};
  let totalDownloaded = 0;
  let totalFailed = 0;

  for (const category of imageData) {
    const categoryPath = path.join(publicDir, category.folder);
    
    // Create category folder
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    console.log(`📥 Fetching images for: ${category.folder}`);
    
    let categoryDownloaded = 0;
    const categoryFailed = [];

    for (let i = 0; i < category.images.length; i++) {
      const unsplashUrl = category.images[i];
      const filename = `${i + 1}.jpg`;
      const filepath = path.join(categoryPath, filename);
      
      try {
        const downloadUrl = getDownloadUrl(unsplashUrl);
        console.log(`  ${i + 1}/5: Downloading from ${unsplashUrl.substring(0, 50)}...`);
        
        await downloadImage(downloadUrl, filepath);
        
        categoryDownloaded++;
        totalDownloaded++;
        console.log(`    ✅ Saved as ${filename}`);
      } catch (err) {
        categoryFailed.push(`${filename}: ${err.message}`);
        totalFailed++;
        console.log(`    ❌ Failed: ${err.message}`);
      }
    }

    summary[category.folder] = {
      downloaded: categoryDownloaded,
      total: category.images.length,
      failed: categoryFailed
    };

    console.log(`  ${categoryDownloaded === 5 ? '✅' : '⚠️'} ${category.folder}: ${categoryDownloaded}/5 images\n`);
  }

  // Print summary
  console.log('==================================================');
  console.log('📊 Download Summary:');
  console.log('==================================================');
  
  for (const [folder, result] of Object.entries(summary)) {
    const status = result.downloaded === result.total ? '✅' : '⚠️';
    console.log(`${status} ${folder.padEnd(20)} ${result.downloaded}/${result.total}`);
    if (result.failed.length > 0) {
      result.failed.forEach(f => console.log(`   └─ ${f}`));
    }
  }

  console.log('==================================================');
  console.log(`📦 Total images downloaded: ${totalDownloaded}`);
  
  if (totalFailed === 0) {
    console.log('✅ All 40 images downloaded successfully!');
  } else {
    console.log(`⚠️ ${totalFailed} images failed to download.`);
  }
}

downloadAllImages().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

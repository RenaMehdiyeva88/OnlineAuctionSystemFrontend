# Image Gallery Setup for Auction Lots

## Quick Start

### Step 1: Get Unsplash API Key

1. Go to: https://unsplash.com/oauth/applications
2. Create a new application (free, choose "Demo" for development)
3. Copy your **Access Key**

### Step 2: Run the Download Script

```bash
# Set API key as environment variable
export UNSPLASH_ACCESS_KEY="your_access_key_here"

# Run the downloader
node download-images.js
```

**Windows (PowerShell):**
```powershell
$env:UNSPLASH_ACCESS_KEY="your_access_key_here"
node download-images.js
```

### Step 3: Verify Downloads

Check the `/public/images/lots/` folder. You should see:
```
/public/images/lots/
├── airpods/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── nes-console/
├── baseball-glove/
├── canon-camera/
├── omega-watch/
├── rayban-sunglasses/
├── nike-shoes/
├── ancient-coins/
└── auction-hero/
```

## What the Script Does

- Queries Unsplash API for 10 images per category
- Downloads images to local `/public/images/lots/<category>/` folders
- Logs progress and summary report
- Prints warnings if fewer than 10 images found for any category

## API Limits

- Free tier: 50 requests/hour
- This script makes 1 request per category (9 total)
- Safe for development and one-time runs

## Expected Output

```
🎬 Unsplash Image Downloader for Auction Lots
==================================================
API Key: YOUR_ACC...

📥 Fetching images for: airpods (query: "apple airpods pro")
..........
  ✅ Downloaded 10 images

📥 Fetching images for: nes-console (query: "nintendo nes console retro")
..........
  ✅ Downloaded 10 images

... (more categories)

==================================================
📊 Download Summary:
==================================================
✅ airpods                 10/10
✅ nes-console            10/10
✅ baseball-glove         10/10
✅ canon-camera           10/10
✅ omega-watch            10/10
✅ rayban-sunglasses      10/10
✅ nike-shoes             10/10
✅ ancient-coins          10/10
✅ auction-hero           10/10
==================================================
📦 Total images downloaded: 90
✅ All images downloaded successfully!
```

## Troubleshooting

### "Unauthorized: Invalid API key"
- Check your API key is correct
- Make sure environment variable is set correctly
- Verify at: https://unsplash.com/oauth/applications

### "Only X/10 images found"
- Some categories might have fewer results
- The script continues and uses what's available
- Check query term at Unsplash directly: https://unsplash.com/napi/search/photos?query=...

### Failed to download: HTTP 403
- Rate limit exceeded (50 requests/hour on free tier)
- Wait an hour and try again
- Check your API key isn't blacklisted

## Integration with Components

The `download-images.js` script automatically populates:
- `AuctionCard.tsx` - shows primary image (index 0)
- `ImageGallery.tsx` - displays all 10 images in carousel
- `getGalleryImages()` in `imageFallback.ts` - maps categories to local folders

Images are then served from `/public/images/lots/` by Vite dev server.

## Running Multiple Times

Safe to run multiple times:
- Overwrites existing images (latest version)
- Skips if no API key provided
- Logs all operations clearly

## Notes

- Images must be in `/public/images/lots/` for Vite to serve them
- Uses JPEG compression for fast loading
- Respects Unsplash API terms (attribution not required for free tier, but appreciated!)

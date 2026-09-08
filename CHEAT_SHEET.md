# 🎯 Image Gallery System - Cheat Sheet

## ⚡ Quick Commands

### Get API Key
```bash
→ Visit: https://unsplash.com/oauth/applications
→ New Application → Demo
→ Copy Access Key
```

### Download Images (PowerShell)
```powershell
cd c:\Users\Emil\source\repos\OnlineAuctionSystem.Frontend
$env:UNSPLASH_ACCESS_KEY="paste_your_key_here"
node download-images.js
```

### Verify Success
```powershell
Get-ChildItem public\images\lots -Recurse -File | Measure-Object | Select-Object Count
# Should show: Count = 90
```

### Run Dev Server
```bash
npm run dev
# Images available at: http://localhost:5173/images/lots/<category>/<1-10>.jpg
```

---

## 📦 Component Usage

### Use ImageGallery in AuctionDetails

```tsx
import ImageGallery from "@/components/auction/ImageGallery";
import { getGalleryImages } from "@/utils/imageFallback";

export default function AuctionDetails() {
  const [auction, setAuction] = useState<Auction | null>(null);

  // Preferred: Use backend images, fallback to local gallery
  const images = auction?.images?.length
    ? auction.images
    : getGalleryImages(auction?.categoryName || "vintage", 10);

  return (
    <div className="auction-details">
      <ImageGallery 
        images={images}
        title={auction?.title || ""}
        onImageChange={(index) => console.log(`Image: ${index}`)}
      />
      {/* Rest of page */}
    </div>
  );
}
```

### Display Primary Image in AuctionCard

```tsx
import { getPrimaryImage, getPlaceholderImage } from "@/utils/imageFallback";

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const imageSrc = imageError 
    ? getPlaceholderImage(auction.categoryName)
    : getPrimaryImage(auction, "card");

  return (
    <img 
      src={imageSrc}
      onError={() => setImageError(true)}
      alt={auction.title}
    />
  );
}
```

---

## 📂 File Locations

| File | Path | Purpose |
|------|------|---------|
| Component | `src/components/auction/ImageGallery.tsx` | Carousel UI |
| Styling | `src/components/auction/ImageGallery.css` | Gallery styling |
| Utilities | `src/utils/imageFallback.ts` | Image helpers |
| Downloader | `download-images.js` | Unsplash script |
| Models | `src/models/Auction.ts` | Type definitions |
| Images | `public/images/lots/<category>/<1-10>.jpg` | Downloaded images |

---

## 🖼️ Image Folder Structure

```
public/images/lots/
├── airpods/          (10 images)
├── nes-console/      (10 images)
├── baseball-glove/   (10 images)
├── canon-camera/     (10 images)
├── omega-watch/      (10 images)
├── rayban-sunglasses/(10 images)
├── nike-shoes/       (10 images)
├── ancient-coins/    (10 images)
└── auction-hero/     (10 images)
Total: 90 images
```

---

## 🔄 Image Selection Priority

```
getPrimaryImage(auction)
  1. auction.images[0]? ✅ (Best - local)
  2. auction.imageUrl? ✅ (Good - existing)
  3. getGalleryImages()[0]? ✅ (Fallback - local)
  4. getPlaceholderImage() ✅ (Last resort)
```

---

## 🎨 CSS Classes

### Main Classes
| Class | Purpose |
|-------|---------|
| `.image-gallery` | Main container |
| `.gallery-viewer` | Carousel area |
| `.gallery-main` | Large image display |
| `.gallery-nav` | Navigation buttons |
| `.gallery-thumbnails` | Thumbnail strip |
| `.gallery-counter` | Image counter (3/10) |

### Responsive Breakpoints
```css
@media (max-width: 768px) { ... }  /* Tablet */
@media (max-width: 480px) { ... }  /* Mobile */
```

---

## 🔧 Function Reference

### getGalleryImages()
```typescript
import { getGalleryImages } from "@/utils/imageFallback";

const images = getGalleryImages("Electronics", 10);
// Returns: ["/images/lots/airpods/1.jpg", ..., "/images/lots/airpods/10.jpg"]
```

### getPrimaryImage()
```typescript
import { getPrimaryImage } from "@/utils/imageFallback";

const imageSrc = getPrimaryImage(auction, "card");
// Returns: Best available image URL with fallback chain
```

### getPlaceholderImage()
```typescript
import { getPlaceholderImage } from "@/utils/imageFallback";

const placeholder = getPlaceholderImage("Electronics");
// Returns: Loremflickr placeholder URL
```

---

## 🎛️ Component Props

### ImageGallery Props

```typescript
interface ImageGalleryProps {
  images: string[];                    // Array of image URLs/paths
  title: string;                       // Auction title (for alt text)
  onImageChange?: (index: number) => void;  // Optional callback
}
```

**Example:**
```tsx
<ImageGallery
  images={["/images/lots/airpods/1.jpg", ..., "/images/lots/airpods/10.jpg"]}
  title="Apple AirPods Pro"
  onImageChange={(index) => console.log(`Now showing: ${index + 1}`)}
/>
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` (Left Arrow) | Previous image |
| `→` (Right Arrow) | Next image |
| Click thumbnail | Go to that image |
| Click prev/next button | Navigate |

---

## 🎨 Design Tokens Used

```css
--color-accent-bright: #a89968        /* Gold buttons */
--color-surface: #1a1a1a              /* Background */
--color-bg-elevated: #2a2a2a          /* Elevated BG */
--color-border: #3a3a3a               /* Borders */
--color-text: #e0e0e0                 /* Text */
--space-lg: 1.5rem                    /* Large spacing */
--space-md: 1rem                      /* Medium spacing */
--radius-lg: 12px                     /* Large radius */
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Images not showing | Run `node download-images.js` first |
| "Unauthorized" error | Check API key at unsplash.com/oauth/applications |
| Component not found | Verify import: `@/components/auction/ImageGallery` |
| Styling broken | Check CSS tokens in `styles/tokens.css` |
| Images don't load | Clear cache (Ctrl+Shift+Del) + restart dev server |
| Thumbnails not scrolling | Check CSS for `.gallery-thumbnails__scroll` |

---

## 📋 Backend Integration Checklist

For backend team:

```csharp
// 1. Update Domain Model
public class Auction {
    public List<string>? Images { get; set; } = new();
}

// 2. Update DTO
public class AuctionDto {
    public List<string>? Images { get; set; }
}

// 3. Update Mapping
.ForMember(d => d.Images, o => o.MapFrom(s => s.Images ?? new List<string>()))

// 4. Update Seeder
images = GetGalleryImages("Electronics")  // Returns ["/images/lots/...", ...]

// 5. Run Migrations
dotnet ef migrations add AddAuctionImages
dotnet ef database update
```

---

## 🚀 Deployment Steps

```
1. Get API key (https://unsplash.com/oauth/applications)
   └─ Copy Access Key

2. Download images
   └─ node download-images.js (UNSPLASH_ACCESS_KEY set)

3. Verify images
   └─ Check /public/images/lots/ has 90 images

4. Backend team updates
   └─ Populate images array in Auction model

5. Test in browser
   └─ AuctionDetails shows gallery
   └─ AuctionCard shows primary image
   └─ Navigation works (buttons, thumbnails, keyboard)

6. Deploy!
```

---

## 💾 Data Structure

### API Response Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Apple AirPods Pro",
  "imageUrl": "https://images.unsplash.com/...",
  "images": [
    "/images/lots/airpods/1.jpg",
    "/images/lots/airpods/2.jpg",
    ".../images/lots/airpods/10.jpg"
  ],
  "categoryName": "Electronics"
}
```

### Component State
```typescript
const [currentIndex, setCurrentIndex] = useState(0);
// Images shown: images[currentIndex]
// Counter shows: currentIndex + 1 / images.length
```

---

## 🎯 Testing Checklist

- [ ] Images download successfully (90 total)
- [ ] AuctionCard displays first image
- [ ] AuctionDetails shows ImageGallery
- [ ] Previous button works
- [ ] Next button works
- [ ] Thumbnails clickable
- [ ] Keyboard navigation works (← →)
- [ ] Image counter shows correct position
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Fallback works (shows placeholder if images missing)
- [ ] No console errors
- [ ] No styling issues

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| Setup Guide | QUICK_START_GUIDE.md |
| Detailed Setup | IMAGE_GALLERY_SETUP.md |
| Backend Guide | BACKEND_IMAGE_GALLERY_SETUP.md |
| Integration Example | AUCTIONDETAILS_INTEGRATION_EXAMPLE.tsx |
| Full Docs | IMAGE_GALLERY_IMPLEMENTATION_SUMMARY.md |
| Master Index | MASTER_INDEX.md |
| Component Code | src/components/auction/ImageGallery.tsx |
| Unsplash | https://unsplash.com/oauth/applications |

---

## 🆘 Emergency Commands

### Clear All Images
```powershell
Remove-Item public\images\lots -Recurse -Force
# Then run: node download-images.js again
```

### Reset API Key
```powershell
$env:UNSPLASH_ACCESS_KEY = ""
# Set new key and run download again
```

### View Logged Errors
```bash
# Check browser console (F12) for detailed errors
# Check terminal output from npm run dev
```

---

## ✨ Pro Tips

1. **Bookmark QUICK_START_GUIDE.md** for easy access
2. **Keep gallery folder names exact** (case-sensitive paths)
3. **Run download script in project root** directory
4. **Test locally first** before deploying
5. **Use Ctrl+Shift+Del** to clear browser cache if images don't update
6. **Check Unsplash rate limits** (50 requests/hour free tier)

---

## 📊 System Requirements

| Requirement | Details |
|-------------|---------|
| Node.js | Installed (for download script) |
| Internet | Required (Unsplash API) |
| Disk Space | ~20-30 MB (90 JPEG images) |
| API Key | Free from Unsplash |
| Browser | Modern (React 18+) |

---

## 🎓 Documentation Versions

- **This File (Cheat Sheet):** 1.0 | 2025
- **All Documentation:** Complete & Final ✅
- **Code:** Production Ready ✅

---

## ✅ You're Ready!

All files are in place. Next step:

1. Get Unsplash API key
2. Run `node download-images.js`
3. Check `/public/images/lots/` for 90 images
4. Share backend guide with backend team
5. Test in browser
6. 🎉 Deploy!

**Good luck!** 🚀

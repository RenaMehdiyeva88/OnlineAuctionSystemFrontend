# 🎨 Styling & Design Guide

Premium Auction House Frontend - Design System & Customization

---

## 📋 Table of Contents

1. [Icon Updates](#icon-updates)
2. [Background Images](#background-images)
3. [Color Tokens](#color-tokens)
4. [Usage Examples](#usage-examples)
5. [CSS Architecture](#css-architecture)

---

## 🔨 Icon Updates

### Gavel Icon (`/public/gavel.svg`)

**Status**: ✅ Updated with professional auction hammer design

#### Features
- **SVG Format**: Scalable vector graphics
- **Color**: Gold accent (`#a89968`) matching theme
- **Style**: Clean, modern auction gavel silhouette
- **Size**: Responsive (scales to container)

#### Usage
The gavel icon is automatically used in:
- Browser tab favicon
- UI branding elements
- Navigation iconography

#### Customization
To modify the icon color, edit `/public/gavel.svg`:
```xml
<!-- Change stroke color from #a89968 to your color -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#a89968" stroke-width="1.5">
  <!-- SVG paths here -->
</svg>
```

---

## 🌌 Background Images

### Available Premium Backgrounds

Five curated Unsplash backgrounds optimized for auction house aesthetic:

#### 1️⃣ **Dark Premium Hall with Lighting**
```css
.hero.bg-premium-hall {
  background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80');
}
```
- **Aesthetic**: Professional auction house interior with ambient lighting
- **Mood**: Prestigious, luxurious, professional
- **Best for**: Hero section, creating upscale atmosphere
- **Attribution**: Unsplash

#### 2️⃣ **Elegant Dark Wooden Interior**
```css
.hero.bg-premium-wood {
  background-image: url('https://images.unsplash.com/photo-1585399487632-d34bf8b9ab4f?w=1600&q=80');
}
```
- **Aesthetic**: Warm wooden gallery or museum interior
- **Mood**: Classic, established, trustworthy
- **Best for**: Heritage and traditional auctions
- **Attribution**: Unsplash

#### 3️⃣ **Abstract Dark with Light Lines**
```css
.hero.bg-premium-abstract {
  background-image: url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80');
}
```
- **Aesthetic**: Modern tech/contemporary art vibe
- **Mood**: Innovative, forward-thinking, dynamic
- **Best for**: Modern collectibles, sneakers, gaming
- **Attribution**: Unsplash

#### 4️⃣ **Blurred Gallery Light**
```css
.hero.bg-premium-gallery {
  background-image: url('https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1600&q=80');
}
```
- **Aesthetic**: Softly lit gallery with depth-of-field
- **Mood**: Elegant, artistic, intimate
- **Best for**: Fine art and collectibles focus
- **Attribution**: Unsplash

#### 5️⃣ **Deep Graphite Minimalist**
```css
.hero.bg-premium-graphite {
  background-image: url('https://images.unsplash.com/photo-1600011689520-96db6ac93398?w=1600&q=80');
}
```
- **Aesthetic**: Clean, minimal dark texture
- **Mood**: Sophisticated, understated, modern
- **Best for**: Universal (works with any category)
- **Attribution**: Unsplash

---

## 🎨 How Backgrounds Work

### CSS Structure

```css
/* Base hero section */
.hero {
  background: linear-gradient(to bottom, var(--color-bg), var(--color-bg-elevated));
  background-size: cover;
  background-position: center;
  background-attachment: fixed;  /* Parallax effect */
}

/* Overlay for text readability */
.hero::before {
  background: rgba(26, 26, 26, 0.65);  /* 65% dark overlay */
}

/* Add image class to hero for premium look */
.hero.bg-premium-hall {
  background-image: url('...');
}
```

### Key Properties

| Property | Value | Purpose |
|----------|-------|---------|
| `background-size` | `cover` | Fills entire container without stretching |
| `background-position` | `center` | Centers image in container |
| `background-attachment` | `fixed` | Parallax scrolling effect |
| `background-repeat` | `no-repeat` | Prevents image tiling |

### Overlay Opacity

The dark overlay (`::before`) ensures text remains readable:
- **65% opacity** = Good balance of image visibility + text readability
- **Adjust in Home.css** if you want more/less image visibility:
  ```css
  .hero::before {
    background: linear-gradient(to bottom, rgba(26, 26, 26, 0.65), rgba(26, 26, 26, 0.55));
    /* 0.65 = 65% dark, 0.55 = 55% dark at bottom */
  }
  ```

---

## 🌈 Color Tokens

### Primary Colors

**Dark Theme** (Default)
```css
--color-bg: #1a1a1a;              /* Main background */
--color-bg-elevated: #242424;     /* Elevated surfaces */
--color-surface: #2a2a2a;         /* Cards, panels */
--color-accent: #a89968;          /* Gold accent - PRIMARY */
--color-accent-bright: #c4b896;   /* Lighter gold */
```

**Light Theme** (Alternative)
```css
--color-bg: #fafaf8;              /* Main background */
--color-surface: #f5f3f0;         /* Cards, panels */
--color-accent: #8b6f47;          /* Bronze accent */
```

### Text Colors

```css
--color-text: #e8e8e8;            /* Primary text */
--color-text-secondary: #c4c4c4;  /* Secondary text */
--color-text-muted: #909090;      /* Muted text */
--color-text-faint: #696969;      /* Very faint text */
```

### Status Colors

```css
--color-success: #4c9a6b;         /* Green for success */
--color-danger: #d64545;          /* Red for errors */
--color-warning: #d99b4f;         /* Orange for warnings */
--color-info: #4a90c4;            /* Blue for info */
```

---

## 💻 Usage Examples

### Example 1: Apply Premium Background to Hero

**In `/src/pages/Home/Home.tsx`:**

```tsx
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Add premium background class to hero */}
      <section className="hero bg-premium-hall">
        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Featured Collection</span>
            <h1 className="hero__headline">Premium Auction House</h1>
            <p className="hero__lede">
              Discover rare collectibles from around the world
            </p>
          </div>
        </div>
      </section>
      {/* Rest of page content */}
    </div>
  );
}
```

### Example 2: Dynamic Background Selection

**In `/src/pages/Home/Home.tsx`:**

```tsx
import { useState } from "react";

export default function Home() {
  const [bgTheme, setBgTheme] = useState("bg-premium-graphite");

  const backgroundOptions = [
    { id: "bg-premium-hall", label: "Premium Hall" },
    { id: "bg-premium-wood", label: "Wooden Interior" },
    { id: "bg-premium-abstract", label: "Abstract Modern" },
    { id: "bg-premium-gallery", label: "Gallery Light" },
    { id: "bg-premium-graphite", label: "Graphite Minimal" },
  ];

  return (
    <div className="home-page">
      {/* Background selector (admin only) */}
      <div className="bg-selector">
        {backgroundOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setBgTheme(option.id)}
            className={bgTheme === option.id ? "active" : ""}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Hero with dynamic background */}
      <section className={`hero ${bgTheme}`}>
        {/* Hero content */}
      </section>
    </div>
  );
}
```

### Example 3: Apply Background to Other Sections

```tsx
{/* Dark section with premium background */}
<section className="auction-showcase bg-premium-abstract">
  <h2>Featured Auctions</h2>
  {/* Content */}
</section>
```

**CSS for other sections:**

```css
.auction-showcase {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.auction-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 26, 0.6);
  z-index: 1;
}

.auction-showcase > * {
  position: relative;
  z-index: 2;
}

/* Apply to different sections */
.auction-showcase.bg-premium-abstract {
  background-image: url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80');
}
```

---

## 🏗️ CSS Architecture

### File Structure

```
src/styles/
├── global.css          /* Global styles, resets, body bg */
├── tokens.css          /* CSS custom properties (colors, spacing, etc.) */

src/pages/Home/
├── Home.css            /* Hero, sections, premium backgrounds */
└── Home.tsx            /* React component */

public/
└── gavel.svg           /* Auction hammer icon */
```

### CSS Loading Order

1. **tokens.css** - Loaded first (CSS variables)
2. **global.css** - Global styles and body background
3. **Home.css** - Page-specific styles and backgrounds
4. **Component CSS** - Individual component styles

### How to Add a New Background

1. **Add Unsplash URL** to Home.css:
   ```css
   .hero.bg-custom-name {
     background-image: url('https://images.unsplash.com/YOUR_IMAGE_ID?w=1600&q=80');
   }
   ```

2. **Use in HTML**:
   ```html
   <section class="hero bg-custom-name">
     <!-- Content -->
   </section>
   ```

3. **Or in React**:
   ```tsx
   <section className="hero bg-custom-name">
     {/* Content */}
   </section>
   ```

### Performance Optimization

**Image Optimization Tips:**

1. **Use `w=1600&q=80` parameters** on Unsplash URLs:
   - `w=1600` - Width in pixels (optimize for max screen size)
   - `q=80` - Quality 0-100 (80 is sweet spot for performance/quality)

2. **Lazy Load Backgrounds** (optional):
   ```css
   .hero {
     background-image: none;
   }
   
   .hero.loaded {
     background-image: url('...');
     transition: background-image 0.5s ease-in;
   }
   ```

3. **Use WebP for Production** (future enhancement):
   ```css
   .hero {
     background-image: url('image.webp');
     background-image: url('image.jpg');  /* fallback */
   }
   ```

---

## 🎯 Design Recommendations

### For Different Auction Categories

| Category | Recommended Background | Reason |
|----------|----------------------|--------|
| **Ancient Coins** | `bg-premium-wood` | Classic, museum aesthetic |
| **Luxury Watches** | `bg-premium-hall` | Prestige and luxury |
| **Hype Sneakers** | `bg-premium-abstract` | Modern, contemporary |
| **Retro Gaming** | `bg-premium-abstract` | Tech-forward, innovative |
| **Electronics/Cameras** | `bg-premium-gallery` | Artistic, professional |
| **Homepage** | `bg-premium-graphite` | Universal, sophisticated |

### Accessibility

- ✅ All backgrounds have 65% dark overlay for WCAG AA contrast compliance
- ✅ Text remains readable on all backgrounds
- ✅ No auto-playing animations (parallax is CSS only, no JavaScript)
- ✅ Backgrounds don't interfere with interactive elements

---

## 🔧 Customization Checklist

- [ ] Test backgrounds on different screen sizes (mobile, tablet, desktop)
- [ ] Verify text contrast passes WCAG AA standards
- [ ] Check image load time (should be <2 seconds)
- [ ] Test parallax scrolling effect on different browsers
- [ ] Verify gavel icon displays correctly on all devices
- [ ] Test on both light and dark theme variants

---

**Version**: 1.0  
**Last Updated**: 2026-09-08  
**Maintenance**: Update Unsplash URLs if images become unavailable

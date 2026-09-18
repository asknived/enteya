# enteya — Premium Indian Imitation Gold Jewellery Landing Page

> **Brand Slogan**: *"Discover jewellery that belongs to every version of you."*  
> **Tagline**: *"Modern Indian Gold, Reimagined"*

`enteya` is a modern, high-conversion landing page designed for an Indian imitation gold and fashion jewellery label. Built with Next.js 14, React, TypeScript, and Tailwind CSS, it presents a category-defining luxury brand experience that balances Indian jewellery heritage with modern editorial fashion aesthetics.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.0 or later
- npm or pnpm or yarn

### 1. Install Dependencies
Run from `scratch/enteya-jewellery`:
```bash
cmd /c npm install
```

### 2. Start Local Development Server
```bash
cmd /c npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to preview the live landing page.

### 3. Build for Production
```bash
cmd /c npm run build
```

---

## 🎨 Design System & Customization

### 1. Brand Logo
The official logo features:
- **Symbol Emblem**: Warm champagne gold spoked 6-node geometric floral motif (`#C59B27` / `#D4AF37`)
- **Wordmark**: Deep berry / magenta text (`#941857`)

The logo is encapsulated in `src/components/brand/Logo.tsx` as a high-DPI SVG vector.
- **To update logo SVG or dimensions**: Modify [`src/components/brand/Logo.tsx`](file:///C:/Users/DREAMS/.gemini/antigravity-ide/scratch/enteya-jewellery/src/components/brand/Logo.tsx).
- **To replace with a raster image logo**: Replace the `<svg>` block in `Logo.tsx` with Next.js `<Image src="/images/logo.png" ... />`.

---

### 2. Fonts & Typography
The landing page uses:
- **Display Serif**: `Cormorant Garamond` (loaded via Google Fonts)
- **Body & UI Sans**: `Plus Jakarta Sans` (matching the logo wordmark geometry)

#### How to replace or change the font:
1. Open [`src/app/layout.tsx`](file:///C:/Users/DREAMS/.gemini/antigravity-ide/scratch/enteya-jewellery/src/app/layout.tsx).
2. Import your desired font from `next/font/google` (e.g. `Cinzel`, `Playfair_Display`, or `Bodoni_Moda`).
3. Update the variable names in `layout.tsx` and CSS variables `--font-cormorant` and `--font-jakarta` in [`src/app/globals.css`](file:///C:/Users/DREAMS/.gemini/antigravity-ide/scratch/enteya-jewellery/src/app/globals.css).

---

### 3. Brand Copy & Messaging
All site copy is centralized in [`src/config/brand.ts`](file:///C:/Users/DREAMS/.gemini/antigravity-ide/scratch/enteya-jewellery/src/config/brand.ts).
- Headline & Subheadline
- Announcement Bar text
- Trust strip bullet points
- Category descriptions
- Anti-tarnish craftsmanship details
- Brand story narrative

To edit any text across the site, simply update the string in `brand.ts`.

---

### 4. Replacing Product Photography & Images
All image paths and photography references are mapped inside [`src/config/brand.ts`](file:///C:/Users/DREAMS/.gemini/antigravity-ide/scratch/enteya-jewellery/src/config/brand.ts).

- **Local assets**: Place files in `public/images/` (e.g., `hero-model.jpg`, `category-bangles.jpg`).
- **CDN images**: You can use external URLs (Unsplash, Shopify CDN, Cloudinary). If using external domains, ensure they are added to `next.config.js` under `images.domains`.

---

### 5. Category Definitions & Updates
Categories displayed in **Section 5 (Shop by Category)** are defined in `BRAND_CONFIG.categories`:
```ts
{
  id: "bangles",
  name: "Bangles",
  description: "Graceful details for every gesture.",
  image: "/images/category-bangles.jpg",
  href: "/collections/bangles",
  tag: "Best for Layering"
}
```
To add a new category (e.g., *Rings* or *Bridal Sets*), append a new object to the array.

---

## 🛒 Future E-Commerce & Checkout Integration

This codebase is structured so full store features can be connected without modifying the UI components.

### Where to Connect E-Commerce APIs:
1. **Product Catalogue & Search**:
   - Update `BRAND_CONFIG.featuredProducts` to fetch from Shopify Storefront API, Medusa, or custom Node.js backend.
   - Recommended file: Create `src/lib/api/products.ts`.

2. **Cart & Wishlist State Management**:
   - `ProductCard.tsx` contains interactive wishlist toggle states.
   - Connect global state using React Context or Zustand in `src/context/CartContext.tsx`.

3. **GoKwik / 1-Click Express Checkout Integration**:
   - The primary CTA buttons in `ProductCard.tsx`, `HeroSection.tsx`, and `FeaturedCollection.tsx` accept standard `onClick` or `href` handlers.
   - Embed the GoKwik SDK script in `src/app/layout.tsx` and invoke `window.gokwikSdk.init()` inside a checkout trigger handler in `src/components/ui/Button.tsx`.

4. **VIP Interest & Newsletter Backend**:
   - The form in `src/components/sections/InterestCaptureSection.tsx` features an interactive demo state.
   - To connect Mailchimp, Klaviyo, or a WhatsApp API provider (e.g., Wati / Interakt), replace `handleSubmit` in `InterestCaptureSection.tsx` with an `async fetch('/api/subscribe', ...)` call.

---

## 📌 Known Placeholders & Structure

- **Wishlist & Cart Counters**: Currently default to `0` in `Header.tsx` until global state provider is wired up.
- **Future Routes**: `/collections/*`, `/product/*`, `/about`, `/jewellery-care`, `/privacy` are configured as clean navigation placeholders ready for page creation.

---

## 📄 License & Ownership
Created for **enteya** — All rights reserved.

# sms LOGISTICS Landing Page

Production-style logistics landing page built with Vite + React + TypeScript + Tailwind CSS.

## Current Progress (Today)

Implemented and working:

- Vite + React + TypeScript project setup
- Tailwind CSS + PostCSS configuration
- Sticky transparent header with scroll state transition
- Desktop navigation + mobile slide-over menu (Framer Motion)
- Full-screen hero section with background video
- Rotating hero headline text (Framer Motion)
- SMS Logistics logo integrated from local PNG asset
- Supply chain/logistics-focused content updates across the page
- Service Coverage section for Guntur, Andhra Pradesh using Leaflet
- Coverage markers for:
  - Guntur (highlighted)
  - Vijayawada
  - Amaravati
- Coverage highlights panel with stats + CTA
- Leaflet map sizing fix to remove bottom whitespace in the card
- Street map tile view (OpenStreetMap)

## Tech Stack

- React 18 (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- Leaflet + React Leaflet
- clsx

## Project Structure

```text
src/
  components/
    Container.tsx
    CoverageMap.tsx
    Header.tsx
    Hero.tsx
    MobileMenu.tsx
    RotatingText.tsx
  pages/
    Home.tsx
  App.tsx
  main.tsx
  index.css
public/
  images/
    sms-logistics.png
  videos/
    hero_footage.mp4
```

## Features Implemented

### Header

- Transparent overlay header at top of hero
- Becomes white with shadow after scroll (`window.scrollY > 40`)
- Desktop nav links:
  - Track Shipments
  - Freight Solutions
  - About
- CTA:
  - Request a Quote
- Mobile hamburger with animated full-screen slide menu

### Hero Section

- Full viewport hero (`min-h-screen`)
- Background video from `public/videos/hero_footage.mp4`
- Gradient overlay for readability
- Rotating text phrases:
  - real-time visibility
  - reliable carriers
  - faster delivery lanes
  - resilient supply chains
  - smarter logistics
- CTA buttons:
  - Track Shipments
  - Freight Solutions

### Service Coverage (Guntur, Andhra Pradesh)

- New section: `Our Service Coverage`
- Responsive 2-column layout (map + highlights panel)
- Leaflet map centered on Guntur:
  - `16.3067, 80.4365`
- Markers (CircleMarker) for:
  - Guntur
  - Vijayawada
  - Amaravati
- Guntur marker visually highlighted
- Popup service list:
  - Last-mile Delivery
  - Route Optimization
  - Warehouse Support
- Regional coverage highlights bullet list
- Stats cards:
  - Cities Covered: 3+
  - Avg Delivery Time: 1-2 Days
  - On-Time Rate: 98%
- CTA:
  - Request Service in Your Area

## Important Setup Notes

### Install Dependencies

```bash
npm install
```

Map dependencies used (already added to `package.json`):

- `leaflet`
- `react-leaflet@4.2.1` (React 18 compatible)
- `@types/leaflet`

### Run Development Server

```bash
npm run dev
```

## Leaflet CSS (Required)

Imported in `src/main.tsx`:

```ts
import "leaflet/dist/leaflet.css";
```

## Asset Locations

- Logo: `public/images/sms-logistics.png`
- Hero video: `public/videos/hero_footage.mp4`

## Fixes Applied Today

### Leaflet import error

Issue:
- `Failed to resolve import "leaflet/dist/leaflet.css"`

Fix:
- Installed `leaflet`, `react-leaflet@4.2.1`, and `@types/leaflet`

### Map bottom white space in card

Issue:
- Empty white gap visible below map inside rounded card

Fixes:
- Map card uses `min-h-[400px]` and `h-full`
- Removed fixed-height inner wrapper
- `MapContainer` set to `className="h-full w-full"` and inline `style={{ height: "100%", width: "100%" }}`
- Added Leaflet `invalidateSize()` after mount/animation via `useMap()` helper (`MapResizeFix`)
- Grid updated with `items-stretch` so columns align properly

## Next Improvements (Optional)

- Add map style switcher (Street / Light / Satellite)
- Add route polylines between cities
- Add real service-area polygons
- Connect CTA buttons to contact form / quote form
- Add footer and additional company sections (services, industries, testimonials)

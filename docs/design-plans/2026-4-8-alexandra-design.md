# Design System Migration — Gold-on-Dark Brand Identity

**Date:** 2026-04-08\
**Author:** Claude (Sonnet 4.6) + Eliaz Bobadilla\
**Status:** Implemented

---

## Summary

Full visual redesign of the Bobadilla Tech marketing site from a
cyan/blue-on-slate palette with Three.js WebGL shader backgrounds to a
gold-on-dark brand identity derived from the new Figma design file
(`x6uOngrO2QUPY7lYuSkpbj`, node `14:2`).

No functional changes — all features (pricing calculator, blog, contact form,
tools, services pages) preserved intact. Pure visual and component architecture
migration.

---

## Before (Old Design)

| Property       | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Background     | `bg-slate-950` + Three.js WebGL shader animation                       |
| Primary accent | Cyan/blue (`from-cyan-500 to-blue-600`)                                |
| Text           | `text-white`, `text-gray-300`, `text-gray-400`                         |
| Borders        | `border-white/10`                                                      |
| Fonts          | Geist + Geist Mono                                                     |
| Cards          | `bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm` |
| Buttons        | `bg-gradient-to-r from-cyan-500 to-blue-600`                           |
| Footer         | Inline `<footer>` in `page.tsx`                                        |
| Sections       | No dedicated StatsBar, WhyBobatech, FAQ, or CTABand                    |

---

## After (New Design)

| Property       | Value                                                           |
| -------------- | --------------------------------------------------------------- |
| Background     | `linear-gradient(180deg, #0b0505 0%, #0a0504 97%)` (global CSS) |
| Primary accent | Gold (`#e6be1a` → `text-brand-gold`, `bg-brand-gold`)           |
| Text           | `text-brand-primary` (`#dbdbd7`)                                |
| Borders        | `border-border` (`rgba(255,255,255,0.10)`)                      |
| Fonts          | Sora (headings) + Space Grotesk (body)                          |
| Cards          | `bg-surface border border-border rounded-2xl`                   |
| Buttons        | `<Button variant="gold\|outline\|ghost">` component             |
| Footer         | Standalone `<Footer />` component                               |
| Sections       | Full Figma section set (see below)                              |

---

## Design Tokens

All tokens defined in `src/app/globals.css` via Tailwind v4 `@theme` block.
Auto-generates utility classes.

```css
@theme {
  --color-brand-gold: #e6be1a;
  --color-brand-gold-light: #ffeea8;
  --color-brand-gold-dark: #c9a916;
  --color-brand-primary: #dbdbd7;
  --color-brand-bg: #0b0505;
  --color-brand-bg-alt: #0a0504;
  --color-surface: rgb(255 255 255 / 0.04);
  --color-surface-hover: rgb(255 255 255 / 0.08);
  --color-border: rgb(255 255 255 / 0.10);
  --color-border-gold: rgb(230 190 26 / 0.40);
  --font-heading: var(--font-sora);
  --font-body: var(--font-space-grotesk);
}
```

Usage examples:

- `text-brand-gold` → gold text
- `bg-surface` → card background
- `border-border-gold` → gold-tinted border
- `font-heading` → Sora font
- `font-body` → Space Grotesk font

---

## New Shared UI Components

All in `src/components/ui/`:

| Component           | Purpose                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button.tsx`        | Unified button: `variant="gold\|outline\|ghost"`, supports internal links (`to`), external links (`href`), loading state                     |
| `SectionHeader.tsx` | Reusable section header with optional overline, heading (accepts JSX for gold highlights), subtitle, built-in Framer Motion scroll animation |
| `StatCard.tsx`      | White-background stat card (inverted from page) for StatsBar                                                                                 |
| `ServiceCard.tsx`   | Dual-variant card: `variant="image"` (dark overlay on image, homepage) / `variant="icon"` (icon card, services listing)                      |
| `IndustryCard.tsx`  | Image card with white title bar + gold text overlay                                                                                          |
| `FAQItem.tsx`       | Controlled accordion with Plus/X toggle                                                                                                      |
| `Footer.tsx`        | Standalone footer: logo, nav links, social icons, contact info, copyright                                                                    |

---

## Homepage Section Order (Figma-aligned)

```text
Navbar → Hero → StatsBar → Services → WhyBobatech → Industries → FAQ → CTABand → Contact → Footer
```

| Section           | Status   | Notes                                                              |
| ----------------- | -------- | ------------------------------------------------------------------ |
| `Navbar.tsx`      | Updated  | Gold text logo, brand-gold CTA button                              |
| `Hero.tsx`        | Replaced | All-caps 3-line heading, ShieldCheck badge, single Book a Call CTA |
| `StatsBar.tsx`    | Created  | 4 StatCards in grid                                                |
| `Services.tsx`    | Updated  | ServiceCard image variant, grid-cols-2/4                           |
| `WhyBobatech.tsx` | Created  | Comparison table: Others (red X) vs Boba Tech (gold check)         |
| `Industries.tsx`  | Created  | Renamed from Projects.tsx, uses IndustryCard                       |
| `FAQ.tsx`         | Created  | Accordion with FAQItem components                                  |
| `CTABand.tsx`     | Created  | Gold outer div, white inner box                                    |
| `Contact.tsx`     | Updated  | Visual only — all Zod validation + API logic preserved             |
| `Footer.tsx`      | Created  | Extracted from inline `<footer>` in page.tsx                       |

---

## Sub-pages Updated

All sub-pages received the same visual token treatment:

- `src/app/pricing/page.tsx` — cyan→gold, Button component, Footer added
- `src/app/blog/page.tsx` — cyan→gold, Footer added
- `src/app/blog/[slug]/page.tsx` — ShaderBackground removed, cyan→gold, Footer
  added
- `src/app/services/page.tsx` — ShaderBackground removed, cyan→gold, Footer
  added
- `src/app/services/[slug]/page.tsx` — ShaderBackground removed, cyan→gold,
  Button component, Footer added
- `src/app/services/all/[industry]/page.tsx` — ShaderBackground removed,
  cyan→gold, Button component, Footer added
- `src/app/tools/page.tsx` — cyan→gold, Footer added
- `src/app/tools/reddit-post-date/page.tsx` — cyan→gold, Footer added

---

## Removed

- `src/components/shaders/ShaderBackground.tsx` — deleted
- `src/components/shaders/ShaderBackgroundLazy.tsx` — deleted
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` — removed
  from `package.json`
- Pricing section from homepage (available at `/pricing` standalone)
- Inline `<footer>` from `page.tsx`
- `Projects.tsx` section (replaced by `Industries.tsx`)

---

## Data Layer Changes

### `src/lib/constants.ts`

- Added `phone: "+51 902 482 231"` to `CONTACT`
- Added `instagram` to `SOCIAL_LINKS`
- Added `FOOTER_LINKS` array (6 navigation items)

### `src/data/services.ts`

- Added `image?: string` and `imageAlt?: string` to `Service` and
  `IndustryService` interfaces
- Added Unsplash image URLs to all 8 `allServices` entries and featured industry
  services

# CIDUS — One-Page Corporate Website

A premium, parallax, scroll-driven one-page corporate website for **CIDUS**, an
integrated solutions and professional services provider spanning technology,
infrastructure, operations, logistics, engineering, procurement, and related
support services. Built with **Next.js (App Router), React, TypeScript,
Tailwind CSS v4, and Framer Motion**.

Tagline: **"Integrated Solutions. Trusted Service. Reliable Results."**

Copy that hasn't been officially confirmed by the client (contact details,
client logo artwork, etc.) is kept as an explicit bracketed placeholder
(`[Email Address]`, `[U.S. Embassy in the Philippines Logo]`, ...) so it can be
replaced without a redesign. See `src/data/content.ts` for the full list.

## Tech stack

- **Next.js (App Router) + React + TypeScript** — the page is statically
  prerendered at build time (`next build` outputs it as static HTML/JS, no
  server-side data fetching is involved).
- **Tailwind CSS v4** — utility-first styling driven by design tokens declared
  once in `src/app/globals.css` (`@theme` block), wired in via the
  `@tailwindcss/postcss` plugin (`postcss.config.mjs`).
- **Framer Motion** — scroll-linked parallax (`useScroll`/`useTransform`) and
  reveal-on-scroll animations, all GPU-accelerated (`transform`/`opacity`
  only) and automatically disabled when the user has
  `prefers-reduced-motion` enabled.

## Project structure

```
src/
  app/
    layout.tsx            # <html>/<body> shell, metadata, globals.css import
    page.tsx               # Assembles the sections into the one-page layout
    globals.css             # Design tokens (colors, radii, shadows) + base styles
  data/content.ts          # ALL site copy lives here — edit this file first
  hooks/                    # usePrefersReducedMotion, useActiveSection, useScrolled
  components/               # Reusable UI: Button, Container, Navbar, LogoMark,
                             # SectionHeading, Reveal (scroll fade-in), ParallaxLayer,
                             # ClientLogoPlaceholder, graphics/ (Node, FlowLine, Grid, icons)
  sections/                  # One file per page section: Hero, About, Services,
                             # Clients, WhyUs, Contact, Footer
```

Only the files that actually use React hooks or Framer Motion (`ParallaxLayer`,
`Reveal`, `Navbar`, and the `Hero`/`About`/`WhyUs`/`Contact` sections) are
marked `"use client"`. Everything else (`Services`, `Clients`, `Footer`, and
the small presentational primitives) renders as a React Server Component —
Next.js still statically prerenders all of it, this only affects which
modules ship JS for hydration.

## One-page structure

Home/Hero → About Us → Our Services → Our Clients → Why CIDUS → Contact → Footer.

- **Hero** leads with the tagline, a short company introduction, and a
  4-category capability preview (Technology & Infrastructure, Operations &
  Sustainment, Supply & Logistics, Engineering & Technical Services).
- **About** covers company background, qualitative capabilities, a Mission /
  Vision panel, and an editorial (non-card) Core Values list.
- **Services** organizes CIDUS's nine official service areas into four
  connected groups (`src/data/content.ts` → `serviceGroups`), visualized as a
  vertical spine converging on "Integrated Solutions."
- **Clients** presents named organizations as clearly labeled logo
  placeholders pending approved artwork (`clientsSection.organizations`).
- **Why CIDUS** is the visual and narrative climax: four capability groups
  converge into "Integrated Solutions," chaining down to "Trusted Service"
  and "Reliable Results" — directly echoing the site tagline.

## Customizing content

Almost everything a client will want to change lives in **`src/data/content.ts`**:

- `siteMeta.companyName` — company name used in the nav, footer, and tab title.
- `hero`, `capabilityPreview`, `about`, `missionVision`, `coreValues`,
  `serviceGroups`, `servicesSection`, `clientsSection`, `whyUsItems`,
  `whyUsSection`, `contactSection`, `footer` — every heading, paragraph, and
  label shown on the page.

No component code needs to change for a copy update.

### Replacing the logo

`src/components/LogoMark.tsx` renders the `[LOGO]` + company-name lockup used
in the nav and footer. Swap the inline SVG glyph for an `<img>`/real logo
asset when it's available; the surrounding layout will keep working.

### Replacing client logos

`src/components/ClientLogoPlaceholder.tsx` renders a fixed-size tile designed
so a real, approved logo image can be dropped in without touching the layout
in `src/sections/Clients.tsx`. Organization names live in
`clientsSection.organizations` in `src/data/content.ts`.

## Design system

Brand colors, typography, radii, and shadows are defined once as CSS custom
properties in `src/app/globals.css` under `@theme`, then consumed via
Tailwind's `bg-(--color-x)` / `text-(--color-x)` arbitrary-value syntax:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-primary` | `#0C2D54` | Dominant dark background |
| `--color-accent` | `#69CDDF` | CTAs, highlights, active states |
| `--color-secondary` | `#46A0B9` | Supporting accent, connection lines |
| `--color-surface` | `#FFFFFF` | Light section backgrounds, text on dark |

## Motion & accessibility

- A shared motion system in `src/lib/motion.ts` defines stagger intervals
  (0.06 / 0.10 / 0.14s) and entry/exit durations. `Reveal` / `RevealGroup`
  play content in as it enters the viewport and reverse as it leaves.
- Framer Motion is loaded through `LazyMotion` (`domAnimation` only) plus
  GPU-friendly `transform` / `opacity` parallax.
- Below-the-fold sections are code-split with `next/dynamic` so the first
  paint stays focused on the Hero.
- Animations respect `prefers-reduced-motion` (global CSS, MotionConfig, and
  `usePrefersReducedMotion`).
- All interactive elements are keyboard accessible with visible focus states,
  the mobile menu closes on <kbd>Escape</kbd>, and a "Skip to main content"
  link is included for screen-reader/keyboard users.

## SEO

- Title, description, keywords, Open Graph, and Twitter cards live in
  `src/app/layout.tsx` / `src/lib/seo.ts`.
- Organization + ProfessionalService JSON-LD lists the nine official services.
- `src/app/robots.ts` and `src/app/sitemap.ts` are generated at build time.
- Set `NEXT_PUBLIC_SITE_URL` to the real production origin before launch.

## Development

```bash
npm install
npm run dev       # start the Next.js dev server (Turbopack)
npm run build     # type-check + static production build
npm run start      # serve the production build
npm run lint       # oxlint
npm test           # unit tests (motion intervals, content structure, SEO)
```

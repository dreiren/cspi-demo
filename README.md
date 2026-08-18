# CIDUS — One-Page Corporate Website

A premium, parallax, scroll-driven one-page corporate website for **CIDUS**, an
integrated solutions and professional services provider spanning technology,
infrastructure, operations, logistics, engineering, procurement, and related
support services. Built with **React, TypeScript, Vite, Tailwind CSS v4, and
Framer Motion**.

Tagline: **"Integrated Solutions. Trusted Service. Reliable Results."**

Copy that hasn't been officially confirmed by the client (contact details,
client logo artwork, etc.) is kept as an explicit bracketed placeholder
(`[Email Address]`, `[U.S. Embassy in the Philippines Logo]`, ...) so it can be
replaced without a redesign. See `src/data/content.ts` for the full list.

## Tech stack

- **Vite + React + TypeScript** — fast dev server, typed components.
- **Tailwind CSS v4** — utility-first styling driven by design tokens declared
  once in `src/index.css` (`@theme` block).
- **Framer Motion** — scroll-linked parallax (`useScroll`/`useTransform`) and
  reveal-on-scroll animations, all GPU-accelerated (`transform`/`opacity`
  only) and automatically disabled when the user has
  `prefers-reduced-motion` enabled.

## Project structure

```
src/
  data/content.ts        # ALL site copy lives here — edit this file first
  hooks/                  # usePrefersReducedMotion, useActiveSection, useScrolled
  components/             # Reusable UI: Button, Container, Navbar, LogoMark,
                           # SectionHeading, Reveal (scroll fade-in), ParallaxLayer,
                           # ClientLogoPlaceholder, graphics/ (Node, FlowLine, Grid, icons)
  sections/                # One file per page section: Hero, About, Services,
                           # Clients, WhyUs, Contact, Footer
  App.tsx                 # Section order / page assembly
  index.css                # Design tokens (colors, radii, shadows) + base styles
```

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
properties in `src/index.css` under `@theme`, then consumed via Tailwind's
`bg-(--color-x)` / `text-(--color-x)` arbitrary-value syntax:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-primary` | `#0C2D54` | Dominant dark background |
| `--color-accent` | `#69CDDF` | CTAs, highlights, active states |
| `--color-secondary` | `#46A0B9` | Supporting accent, connection lines |
| `--color-surface` | `#FFFFFF` | Light section backgrounds, text on dark |

## Motion & accessibility

- Parallax and reveal animations respect `prefers-reduced-motion` (see
  `usePrefersReducedMotion`) — both via a global CSS fallback and per-component
  checks that disable transforms entirely.
- All interactive elements are keyboard accessible with visible focus states,
  the mobile menu closes on <kbd>Escape</kbd>, and a "Skip to main content"
  link is included for screen-reader/keyboard users.

## Development

```bash
npm install
npm run dev       # start local dev server
npm run build     # type-check + production build
npm run lint       # oxlint
npm run preview    # preview the production build
```

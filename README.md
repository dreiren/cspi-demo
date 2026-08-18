# One-Page Technology Solutions Portfolio

A premium, parallax, scroll-driven one-page website for a technology solutions
company (IT Infrastructure · Network Solutions · Data Solutions). Built with
**React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion**.

All copy on the site is intentionally generic and placeholder-based so it can
be replaced with real company content without a redesign.

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

## Customizing content

Almost everything a client will want to change lives in **`src/data/content.ts`**:

- `siteMeta.companyName` — replaces the `[Company Name]` placeholder used in
  the nav, footer, and browser tab title.
- `hero`, `about`, `services`, `servicesSection`, `clientsSection`,
  `whyUsItems`, `whyUsSection`, `contactSection`, `footer` — every heading,
  paragraph, and label shown on the page.

No component code needs to change for a copy update. Bracketed placeholders
(`[Company Name]`, `[Client Logo]`, `[Email Address]`, etc.) are intentional
and should be swapped for real values before launch.

### Replacing the logo

`src/components/LogoMark.tsx` renders the `[LOGO]` + company-name lockup used
in the nav and footer. Swap the inline SVG glyph for an `<img>`/real logo
asset when it's available; the surrounding layout will keep working.

### Replacing client logos

`src/components/ClientLogoPlaceholder.tsx` renders a fixed-size tile
(`h-24`) designed so a real logo image can be dropped in without touching the
grid in `src/sections/Clients.tsx`.

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

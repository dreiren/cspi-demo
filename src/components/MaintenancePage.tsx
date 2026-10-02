import { footer, maintenance } from "../data/content";
import { Container } from "./Container";
import { FlowLine } from "./graphics/FlowLine";
import { GlowNode } from "./graphics/GlowNode";
import { GridOverlay } from "./graphics/GridOverlay";
import { LogoMark } from "./LogoMark";

const nodes = [
  { x: 90, y: 120, tone: "accent" as const, size: 4 },
  { x: 260, y: 60, tone: "secondary" as const, size: 3 },
  { x: 420, y: 160, tone: "accent" as const, size: 5 },
  { x: 610, y: 90, tone: "secondary" as const, size: 3.5 },
  { x: 760, y: 210, tone: "accent" as const, size: 4 },
  { x: 340, y: 280, tone: "secondary" as const, size: 3 },
  { x: 560, y: 320, tone: "accent" as const, size: 3.5 },
  { x: 150, y: 300, tone: "secondary" as const, size: 3 },
];

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [0, 7],
  [7, 5],
];

/**
 * Full-viewport replacement for the marketing site. Fixed + 100dvh so it
 * cannot be scrolled past; used only when the layout has already omitted
 * Home / nav / footer from the tree.
 */
export function MaintenancePage() {
  const year = new Date().getFullYear();

  return (
    <div
      className="fixed inset-0 z-[200] flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-(--color-primary-dark)"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(70,160,185,0.35),transparent_60%),linear-gradient(180deg,#081d38_0%,#0c2d54_55%,#0a2444_100%)]"
      />

      <GridOverlay opacity={0.24} />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 900 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {links.map(([a, b], i) => (
          <FlowLine
            key={i}
            d={`M${nodes[a].x} ${nodes[a].y} L${nodes[b].x} ${nodes[b].y}`}
            tone={i % 3 === 0 ? "accent" : "secondary"}
            opacity={0.4}
          />
        ))}
        {nodes.map((node, i) => (
          <GlowNode key={i} {...node} delay={i * 0.35} />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div className="absolute right-[8%] top-[16%] h-36 w-24 rounded-[var(--radius-md)] border border-(--color-accent)/25 bg-white/[0.02] animate-(--animate-float-slow)" />
        <div className="absolute left-[7%] bottom-[18%] h-20 w-20 rounded-full border border-(--color-secondary)/30 bg-white/[0.02] animate-(--animate-float-slower)" />
        <div className="absolute right-[20%] bottom-[12%] h-14 w-36 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02] animate-(--animate-float-slow)" />
      </div>

      <header className="relative z-10">
        <Container className="flex h-20 items-center">
          <LogoMark tone="light" href={null} showMark={false} />
        </Container>
      </header>

      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16"
      >
        <div className="flex w-full max-w-xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
            {maintenance.eyebrow}
          </span>

          <h1
            id="maintenance-heading"
            aria-label={maintenance.heading}
            className="mt-6 text-balance text-4xl text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {maintenance.headingLines.map((line, i) => (
              <span
                key={line}
                className={`block ${i === maintenance.headingLines.length - 1 ? "text-(--color-accent)" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-white/70">
            {maintenance.message}
          </p>

          <div
            aria-hidden="true"
            className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-(--color-accent)/70 to-transparent"
          />
        </div>
      </main>

      <footer className="relative z-10 pb-8">
        <p className="text-center text-xs text-white/40">{footer.copyright(year)}</p>
      </footer>
    </div>
  );
}

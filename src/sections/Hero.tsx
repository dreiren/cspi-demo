import { motion } from "framer-motion";
import { Fragment } from "react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { hero } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

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
  [1, 5],
  [3, 6],
];

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-(--color-primary-dark) pt-20"
    >
      {/* Base gradient wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(70,160,185,0.35),transparent_60%),linear-gradient(180deg,#081d38_0%,#0c2d54_55%,#0a2444_100%)]"
      />

      {/* Layer 1 — background grid, slowest */}
      <ParallaxLayer speed={12} className="absolute inset-0">
        <GridOverlay opacity={0.28} />
      </ParallaxLayer>

      {/* Layer 2 — mid-depth network constellation */}
      <ParallaxLayer speed={26} className="absolute inset-0 opacity-70">
        <svg
          className="h-full w-full"
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
              animate={!prefersReducedMotion}
              opacity={0.4}
            />
          ))}
          {nodes.map((node, i) => (
            <GlowNode key={i} {...node} delay={i * 0.35} animate={!prefersReducedMotion} />
          ))}
        </svg>
      </ParallaxLayer>

      {/* Layer 3 — foreground geometric infrastructure shapes, fastest */}
      <ParallaxLayer speed={-30} className="absolute inset-0 hidden md:block">
        <div
          aria-hidden="true"
          className="absolute right-[6%] top-[18%] h-40 w-28 rounded-[var(--radius-md)] border border-(--color-accent)/25 bg-white/[0.02] backdrop-blur-[1px] animate-(--animate-float-slow)"
        />
        <div
          aria-hidden="true"
          className="absolute left-[8%] bottom-[16%] h-24 w-24 rounded-full border border-(--color-secondary)/30 bg-white/[0.02] animate-(--animate-float-slower)"
        />
        <div
          aria-hidden="true"
          className="absolute right-[18%] bottom-[10%] h-16 w-40 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02] animate-(--animate-float-slow)"
        />
      </ParallaxLayer>

      <Container className="relative z-10 py-24">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-4xl text-white sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/70">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={hero.primaryCta.href} variant="primary" size="lg">
                {hero.primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div
              className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/45"
              aria-label="Our technology journey: Infrastructure to Connectivity to Network to Data to Operations"
            >
              {hero.journey.map((step, i) => (
                <Fragment key={step}>
                  <span
                    className={`rounded-full border px-3 py-1.5 ${
                      i === 0
                        ? "border-(--color-accent)/50 text-(--color-accent) bg-(--color-accent)/10"
                        : "border-white/15"
                    }`}
                  >
                    {step}
                  </span>
                  {i < hero.journey.length - 1 && (
                    <span aria-hidden="true" className="text-white/25">
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-9 w-5 rounded-full border border-white/25 p-1">
            <span className="block h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
          </span>
        </motion.div>
      )}
    </section>
  );
}

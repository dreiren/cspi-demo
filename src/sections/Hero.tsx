"use client";

import { m } from "framer-motion";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ServiceIcon } from "../components/graphics/ServiceIcon";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { ProcessFlow } from "../components/ProcessFlow";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { expertisePillars, hero, siteMeta } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { STAGGER, STAGGER_FAST } from "../lib/motion";

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

const chipParallax = [10, -14, 16, -10];

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <section
        id="hero"
        aria-label="Introduction"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-(--color-band-deep) pt-20"
      >
        <div aria-hidden="true" className="theme-hero-wash absolute inset-0" />

        <ParallaxLayer speed={12} className="absolute inset-0">
          <GridOverlay opacity={0.28} />
        </ParallaxLayer>

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

        <ParallaxLayer speed={-30} className="absolute inset-0 hidden md:block">
          <div
            aria-hidden="true"
            className="absolute right-[6%] top-[18%] h-40 w-28 rounded-[var(--radius-md)] border border-(--color-accent)/25 bg-(--color-float) backdrop-blur-[1px] animate-(--animate-float-slow)"
          />
          <div
            aria-hidden="true"
            className="absolute left-[8%] bottom-[16%] h-24 w-24 rounded-full border border-(--color-secondary)/30 bg-(--color-float) animate-(--animate-float-slower)"
          />
          <div
            aria-hidden="true"
            className="absolute right-[18%] bottom-[10%] h-16 w-40 rounded-[var(--radius-md)] border border-(--color-glass-border) bg-(--color-float) animate-(--animate-float-slow)"
          />
          <div
            aria-hidden="true"
            className="absolute left-[26%] top-[10%] h-20 w-20 border border-(--color-secondary)/25 bg-(--color-float) animate-(--animate-float-slower)"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          />
        </ParallaxLayer>

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <Reveal preset="fadeIn">
              <ParallaxLayer speed={8}>
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-(--color-glass-border-mid) bg-(--color-glass-mid) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
                  {hero.eyebrow}
                </span>
              </ParallaxLayer>
            </Reveal>

            <h1 className="mt-6 text-balance text-4xl text-(--color-on-band) sm:text-5xl lg:text-[3.4rem]">
              {hero.headlineParts.map((part, i) => (
                <Reveal key={part} delay={0.08 + i * STAGGER_FAST} preset={i === 2 ? "riseSoft" : "fadeUp"}>
                  <ParallaxLayer speed={12 - i * 4}>
                    <span className={`block ${i === hero.headlineParts.length - 1 ? "text-(--color-accent)" : ""}`}>
                      {part}
                    </span>
                  </ParallaxLayer>
                </Reveal>
              ))}
            </h1>

            <Reveal delay={0.28} preset="fadeUp">
              <ParallaxLayer speed={-8}>
                <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-(--color-on-band-muted)">{hero.subheadline}</p>
              </ParallaxLayer>
            </Reveal>

            <Reveal delay={0.38} preset="fadeUp">
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
          </div>

          <RevealGroup stagger={STAGGER} delay={0.2} className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {expertisePillars.map((pillar, i) => (
              <RevealItem key={pillar.id} preset="scaleIn">
                <ParallaxLayer speed={chipParallax[i] ?? 10}>
                  <a
                    href="#expertise"
                    className="group flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-(--color-glass-border) bg-(--color-glass) p-4 backdrop-blur-sm transition-colors duration-300 hover:border-(--color-accent)/40 sm:p-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/30 text-(--color-accent) transition-colors group-hover:border-(--color-accent)/70">
                      <ServiceIcon name={pillar.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-(--color-on-band)">{pillar.shortName}</span>
                    <span className="text-xs leading-relaxed text-(--color-on-band-dim)">{pillar.plain}</span>
                  </a>
                </ParallaxLayer>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>

        {!prefersReducedMotion && (
          <m.div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-(--color-on-band-faint) sm:flex"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
            <span className="h-9 w-5 rounded-full border border-(--color-glass-border-strong) p-1">
              <span className="block h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
            </span>
          </m.div>
        )}
      </section>

      <section aria-label={`${siteMeta.legalName} introduction`} className="relative overflow-hidden bg-(--color-band) py-16 sm:py-20">
        <div aria-hidden="true" className="theme-hero-intro-wash absolute inset-0" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal preset="fadeUp">
            <ParallaxLayer speed={14}>
              <p className="max-w-xl text-balance text-lg font-medium leading-relaxed text-(--color-on-band) sm:text-xl">
                {hero.intro}
              </p>
            </ParallaxLayer>
          </Reveal>
          <ProcessFlow caption={hero.journeyCaption} steps={hero.journeySteps} tone="light" />
        </Container>
      </section>
    </>
  );
}

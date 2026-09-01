"use client";

import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { ProcessFlow } from "../components/ProcessFlow";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about, missionVision, siteMeta } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { STAGGER, STAGGER_FAST } from "../lib/motion";

const structuredNodes = [
  { x: 48, y: 70, tone: "secondary" as const, size: 4 },
  { x: 48, y: 150, tone: "secondary" as const, size: 4 },
  { x: 48, y: 230, tone: "secondary" as const, size: 4 },
  { x: 48, y: 310, tone: "secondary" as const, size: 4 },
  { x: 190, y: 190, tone: "accent" as const, size: 6 },
  { x: 320, y: 190, tone: "accent" as const, size: 4.5 },
];

export function About() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" aria-label={`About ${siteMeta.legalName}`} className="relative overflow-hidden bg-(--color-surface) py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-surface-soft)_100%)]"
      />

      <Container className="relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={about.eyebrow} heading={about.heading} tone="dark" />

          <div className="mt-8 flex flex-col gap-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * STAGGER_FAST} preset="fadeUp">
                <ParallaxLayer speed={8 - i * 3}>
                  <p className="text-balance text-base leading-relaxed text-(--color-ink-soft) sm:text-lg">
                    {paragraph}
                  </p>
                </ParallaxLayer>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 grid list-none gap-3 p-0 sm:grid-cols-2" aria-label="What we commit to">
            {about.capabilities.map((capability, i) => (
              <Reveal key={capability} delay={0.12 + i * STAGGER_FAST} preset="fadeLeft" as="li">
                <div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-(--color-line) bg-(--color-surface-soft) px-3 py-2.5 text-sm text-(--color-ink-soft)">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-(--color-secondary)"
                  >
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{capability}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.12} preset="scaleIn" className="relative">
          <ParallaxLayer speed={16}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-6 shadow-[var(--shadow-soft)]">
              <svg
                viewBox="0 0 360 360"
                className="h-full w-full"
                aria-hidden="true"
                focusable="false"
              >
                {[
                  [0, 4],
                  [1, 4],
                  [2, 4],
                  [3, 4],
                  [4, 5],
                ].map(([a, b], i) => (
                  <FlowLine
                    key={i}
                    d={`M${structuredNodes[a].x} ${structuredNodes[a].y} L${structuredNodes[b].x} ${structuredNodes[b].y}`}
                    tone="secondary"
                    animate={!prefersReducedMotion}
                    opacity={0.5}
                    width={1.4}
                  />
                ))}
                {structuredNodes.slice(0, 4).map((node) => (
                  <rect
                    key={node.y}
                    x={node.x - 32}
                    y={node.y - 11}
                    width={44}
                    height={22}
                    rx={5}
                    fill="none"
                    stroke="#0c2d54"
                    strokeOpacity={0.22}
                    strokeWidth={1}
                  />
                ))}
                {structuredNodes.map((node, i) => (
                  <GlowNode key={i} {...node} delay={i * 0.3} animate={!prefersReducedMotion} />
                ))}
              </svg>
            </div>
          </ParallaxLayer>
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-(--color-ink-faint)">
            {about.diagramCaption}
          </p>
        </Reveal>
      </Container>

      <Container className="relative mt-16 sm:mt-20">
        <Reveal preset="riseSoft">
          <ParallaxLayer speed={-12}>
            <blockquote className="rounded-[var(--radius-lg)] border border-(--color-accent)/30 bg-(--color-accent)/8 px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-balance text-xl font-semibold leading-snug text-(--color-primary) sm:text-2xl">
                {about.quote}
              </p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
                {siteMeta.shortName} values, in one statement
              </footer>
            </blockquote>
          </ParallaxLayer>
        </Reveal>
      </Container>

      <Container className="relative mt-16 sm:mt-24">
        <ProcessFlow caption={about.approachCaption} steps={about.approachSteps} tone="dark" />
      </Container>

      <Container className="relative mt-20 sm:mt-28">
        <div className="grid gap-10 rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-8 sm:grid-cols-2 sm:p-12">
          {[missionVision.mission, missionVision.vision].map((block, i) => (
            <Reveal
              key={block.label}
              delay={i * STAGGER}
              preset={i === 0 ? "fadeLeft" : "fadeRight"}
              className={i === 1 ? "sm:border-l sm:border-(--color-line) sm:pl-10" : ""}
            >
              <ParallaxLayer speed={i === 0 ? 10 : -10}>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
                  {block.label}
                </span>
                <p className="mt-4 text-balance text-xl font-semibold leading-snug text-(--color-primary) sm:text-2xl">
                  {block.statement}
                </p>
              </ParallaxLayer>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

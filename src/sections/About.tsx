"use client";

import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about, coreValues, missionVision } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const structuredNodes = [
  { x: 40, y: 180, tone: "secondary" as const, size: 4 },
  { x: 40, y: 60, tone: "secondary" as const, size: 4 },
  { x: 40, y: 300, tone: "secondary" as const, size: 4 },
  { x: 180, y: 180, tone: "accent" as const, size: 6 },
  { x: 320, y: 100, tone: "accent" as const, size: 4.5 },
  { x: 320, y: 260, tone: "accent" as const, size: 4.5 },
];

export function About() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" aria-label="About us" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fb_100%)]"
      />

      <Container className="relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={about.eyebrow} heading={about.heading} tone="dark" />

          <div className="mt-8 flex flex-col gap-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-balance text-base leading-relaxed text-(--color-ink-soft) sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Experience and capabilities">
              {about.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5 text-sm text-(--color-ink-soft)">
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
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Diverse capabilities resolving into one integrated structure */}
        <Reveal delay={0.15} className="relative">
          <ParallaxLayer speed={16}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-6 shadow-[var(--shadow-soft)]">
              <svg
                viewBox="0 0 360 360"
                className="h-full w-full"
                aria-hidden="true"
                focusable="false"
              >
                {[
                  [0, 3],
                  [1, 3],
                  [2, 3],
                  [3, 4],
                  [3, 5],
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
                {/* structured "rack" outlines housing the left-hand capability nodes */}
                {[structuredNodes[1], structuredNodes[0], structuredNodes[2]].map((node) => (
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
            Diverse Capabilities → One Integrated Approach
          </p>
        </Reveal>
      </Container>

      {/* Mission & Vision */}
      <Container className="relative mt-20 sm:mt-28">
        <div className="grid gap-10 rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface-soft) p-8 sm:grid-cols-2 sm:p-12">
          {[missionVision.mission, missionVision.vision].map((block, i) => (
            <Reveal key={block.label} delay={i * 0.1} className={i === 1 ? "sm:border-l sm:border-(--color-line) sm:pl-10" : ""}>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
                {block.label}
              </span>
              <p className="mt-4 text-balance text-xl font-semibold leading-snug text-(--color-primary) sm:text-2xl">
                {block.statement}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Core values — editorial list rather than a repeated card grid */}
      <Container className="relative mt-20 sm:mt-28">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
            Core Values
          </span>
        </Reveal>
        <div className="mt-6 divide-y divide-(--color-line) border-t border-(--color-line)">
          {coreValues.map((value, i) => (
            <Reveal key={value.id} delay={i * 0.05}>
              <div className="group grid gap-2 py-5 transition-colors sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-8 sm:py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold text-(--color-ink-faint)">{`0${i + 1}`}</span>
                  <h3 className="text-lg font-bold text-(--color-primary) transition-colors group-hover:text-(--color-secondary-dark)">
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-(--color-ink-soft) sm:text-base">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

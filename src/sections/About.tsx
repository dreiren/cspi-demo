import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about } from "../data/content";
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
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div key={item.label} className="border-l-2 border-(--color-accent)/60 pl-4">
                  <dt className="text-sm font-bold text-(--color-primary)">{item.label}</dt>
                  <dd className="mt-1 text-sm text-(--color-ink-faint)">{item.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Infrastructure elements resolving into a connected structure */}
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
                {/* structured "rack" outlines housing the left-hand infrastructure nodes */}
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
            Infrastructure → Connected Structure
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

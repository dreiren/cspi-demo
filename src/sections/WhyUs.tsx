import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { whyUsItems, whyUsSection } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const TOP_Y = 20;
const CENTER_X = 200;
const CENTER_Y = 140;
const OUTCOME_Y = 190;
const topXs = [60, 200, 340];

export function WhyUs() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="why-us" aria-label="Why choose us" className="relative overflow-hidden bg-(--color-primary-dark) py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(105,205,223,0.14),transparent_65%)]"
      />
      <ParallaxLayer speed={10} className="absolute inset-0">
        <GridOverlay opacity={0.2} />
      </ParallaxLayer>

      <Container className="relative">
        <SectionHeading
          eyebrow={whyUsSection.eyebrow}
          heading={whyUsSection.heading}
          description={whyUsSection.description}
          tone="light"
          align="center"
          className="mx-auto"
        />

        {/* Convergence diagram: Infrastructure + Network + Data -> Connected IT Environment -> Better Operations */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-16 aspect-[400/230] w-full max-w-2xl">
            <svg viewBox="0 0 400 230" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
              {topXs.map((x, i) => (
                <FlowLine
                  key={i}
                  d={`M${x} ${TOP_Y} L${CENTER_X} ${CENTER_Y}`}
                  tone={i === 1 ? "accent" : "secondary"}
                  animate={!prefersReducedMotion}
                  width={1.6}
                  opacity={0.55}
                />
              ))}
              <FlowLine
                d={`M${CENTER_X} ${CENTER_Y} L${CENTER_X} ${OUTCOME_Y}`}
                tone="accent"
                animate={!prefersReducedMotion}
                width={2}
                opacity={0.75}
              />
              {topXs.map((x, i) => (
                <GlowNode key={i} x={x} y={TOP_Y} tone={i === 1 ? "accent" : "secondary"} size={4.5} delay={i * 0.3} animate={!prefersReducedMotion} />
              ))}
              <GlowNode x={CENTER_X} y={CENTER_Y} tone="accent" size={7} delay={0.4} animate={!prefersReducedMotion} />
            </svg>

            {whyUsSection.convergence.map((label, i) => (
              <span
                key={label}
                style={{ left: `${(topXs[i] / 400) * 100}%`, top: `${(TOP_Y / 230) * 100}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-(--color-primary) px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white sm:text-xs"
              >
                {label}
              </span>
            ))}

            <span
              style={{ left: `${(CENTER_X / 400) * 100}%`, top: `${(CENTER_Y / 230) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-(--color-accent)/50 bg-(--color-accent)/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-(--color-accent) shadow-[var(--shadow-glow)] sm:text-sm">
              Connected IT Environment
            </span>

            <span
              style={{ left: `${(CENTER_X / 400) * 100}%`, top: `${(OUTCOME_Y / 230) * 100 + 8}%` }}
              className="absolute -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-xs"
            >
              {whyUsSection.outcome}
            </span>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <div className="h-full rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-(--color-accent)/40">
                <span
                  aria-hidden="true"
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/40 text-xs font-bold text-(--color-accent)"
                >
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

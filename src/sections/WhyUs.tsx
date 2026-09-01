"use client";

import { Container } from "../components/Container";
import { FlowLine } from "../components/graphics/FlowLine";
import { GlowNode } from "../components/graphics/GlowNode";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { whyUsItems, whyUsSection } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { STAGGER_FAST } from "../lib/motion";

const VIEW_W = 500;
const VIEW_H = 280;
const TOP_Y = 22;
const HUB_X = 250;
const HUB_Y = 130;
const CHAIN_STEP = 45;
const topXs = [55, 185, 315, 445];

export function WhyUs() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hubLabel, ...chainLabels] = whyUsSection.outcomeChain;

  return (
    <section id="why-us" aria-label="Why choose CIDUS" className="relative overflow-hidden bg-(--color-band-deep) py-24 sm:py-32">
      <div aria-hidden="true" className="theme-whyus-wash absolute inset-0" />
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

        {/* Four IT pillars converge into Integrated Solutions, then Trusted Service and Reliable Results. */}
        <Reveal delay={0.12} preset="scaleIn">
          <ParallaxLayer speed={18}>
          <div className="relative mx-auto mt-16 aspect-[500/280] w-full max-w-3xl">
            <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
              {topXs.map((x, i) => (
                <FlowLine
                  key={i}
                  d={`M${x} ${TOP_Y} L${HUB_X} ${HUB_Y}`}
                  tone={i % 2 === 0 ? "secondary" : "accent"}
                  animate={!prefersReducedMotion}
                  width={1.6}
                  opacity={0.5}
                />
              ))}
              {chainLabels.map((_, i) => (
                <FlowLine
                  key={i}
                  d={`M${HUB_X} ${HUB_Y + i * CHAIN_STEP} L${HUB_X} ${HUB_Y + (i + 1) * CHAIN_STEP}`}
                  tone="accent"
                  animate={!prefersReducedMotion}
                  width={2}
                  opacity={0.75}
                />
              ))}
              {topXs.map((x, i) => (
                <GlowNode key={i} x={x} y={TOP_Y} tone={i % 2 === 0 ? "secondary" : "accent"} size={4} delay={i * 0.25} animate={!prefersReducedMotion} />
              ))}
              <GlowNode x={HUB_X} y={HUB_Y} tone="accent" size={7} delay={0.4} animate={!prefersReducedMotion} />
            </svg>

            {whyUsSection.convergence.map((label, i) => (
              <span
                key={label}
                style={{ left: `${(topXs[i] / VIEW_W) * 100}%`, top: `${(TOP_Y / VIEW_H) * 100}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[74px] rounded-2xl border border-(--color-glass-border-mid) bg-(--color-primary) px-1.5 py-1.5 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.02em] text-white sm:max-w-[120px] sm:px-3 sm:text-[10px]"
              >
                {label}
              </span>
            ))}

            <span
              style={{ left: `${(HUB_X / VIEW_W) * 100}%`, top: `${(HUB_Y / VIEW_H) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-(--color-accent)/50 bg-(--color-accent)/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-(--color-accent) shadow-[var(--shadow-glow)] sm:text-sm"
            >
              {hubLabel}
            </span>

            {chainLabels.map((label, i) => {
              const y = HUB_Y + (i + 1) * CHAIN_STEP;
              const isLast = i === chainLabels.length - 1;
              return (
                <span
                  key={label}
                  style={{ left: `${(HUB_X / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs ${
                    isLast
                      ? "rounded-full border border-(--color-glass-border-strong) bg-(--color-glass-strong) px-4 py-2 text-(--color-on-band)"
                      : "text-(--color-on-band-muted)"
                  }`}
                >
                  {label}
                </span>
              );
            })}
          </div>
          </ParallaxLayer>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsItems.map((item, i) => (
            <Reveal key={item.id} delay={i * STAGGER_FAST} preset="fadeUp">
              <ParallaxLayer speed={i % 2 === 0 ? 12 : -10}>
                <div className="h-full rounded-[var(--radius-lg)] border border-(--color-glass-border) bg-(--color-glass) p-6 transition-colors duration-300 hover:border-(--color-accent)/40">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-(--color-accent)/40 text-xs font-bold text-(--color-accent)"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-base font-bold text-(--color-on-band)">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-on-band-soft)">{item.description}</p>
                </div>
              </ParallaxLayer>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

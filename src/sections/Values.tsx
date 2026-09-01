"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Container } from "../components/Container";
import { GridOverlay } from "../components/graphics/GridOverlay";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { coreValues, guidingPrinciples, siteMeta, valuesSection } from "../data/content";
import { STAGGER_FAST } from "../lib/motion";

export function Values() {
  const [activeId, setActiveId] = useState(coreValues[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = coreValues.find((value) => value.id === activeId) ?? coreValues[0];

  const moveSelection = (index: number) => {
    const last = coreValues.length - 1;
    const nextIndex = index < 0 ? last : index > last ? 0 : index;
    const next = coreValues[nextIndex];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const onLetterKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveSelection(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveSelection(coreValues.length - 1);
    }
  };

  return (
    <section id="values" aria-label={`${siteMeta.shortName} values`} className="relative overflow-hidden bg-(--color-surface) py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-soft)_0%,var(--color-surface)_45%,var(--color-surface-muted)_100%)]"
      />
      <ParallaxLayer speed={10} className="absolute inset-0 opacity-40">
        <GridOverlay opacity={0.18} />
      </ParallaxLayer>

      <Container className="relative">
        <SectionHeading
          eyebrow={valuesSection.eyebrow}
          heading={valuesSection.heading}
          description={valuesSection.description}
          tone="dark"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
              {valuesSection.acronymCaption}
            </p>
            <ParallaxLayer speed={12}>
              <div
                role="tablist"
                aria-label={`${siteMeta.shortName} core values`}
                className="mt-5 flex flex-wrap items-end gap-2 sm:gap-3"
              >
                {coreValues.map((value, i) => {
                  const isActive = value.id === activeId;
                  return (
                    <button
                      key={value.id}
                      type="button"
                      role="tab"
                      id={`value-tab-${value.id}`}
                      aria-selected={isActive}
                      aria-controls="value-panel"
                      tabIndex={isActive ? 0 : -1}
                      ref={(node) => {
                        tabRefs.current[value.id] = node;
                      }}
                      onClick={() => setActiveId(value.id)}
                      onKeyDown={(event) => onLetterKeyDown(event, i)}
                      className={`flex h-20 w-16 flex-col items-center justify-center rounded-[var(--radius-md)] border transition-colors duration-300 sm:h-28 sm:w-24 ${
                        isActive
                          ? "border-(--color-accent) bg-(--color-primary) text-(--color-accent) shadow-[var(--shadow-glow)]"
                          : "border-(--color-line) bg-white text-(--color-primary) hover:border-(--color-secondary)/50"
                      }`}
                    >
                      <span className="text-4xl font-bold tracking-tight sm:text-5xl">{value.letter}</span>
                      <span className="sr-only">{value.title}</span>
                    </button>
                  );
                })}
              </div>
            </ParallaxLayer>
          </div>

          <Reveal preset="fadeRight">
            <ParallaxLayer speed={-14}>
              <div
                id="value-panel"
                role="tabpanel"
                aria-labelledby={`value-tab-${active.id}`}
                className="relative overflow-hidden rounded-[var(--radius-lg)] border border-(--color-line) bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 text-[7rem] font-bold leading-none text-(--color-accent)/15 sm:text-[9rem]"
                >
                  {active.letter}
                </span>
                <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-(--color-secondary-dark)">
                  {active.letter} — {siteMeta.shortName}
                </p>
                <h3 className="relative mt-3 text-2xl font-bold text-(--color-primary) sm:text-3xl">{active.title}</h3>
                <p className="relative mt-4 text-base leading-relaxed text-(--color-ink-soft) sm:text-lg">{active.description}</p>
              </div>
            </ParallaxLayer>
          </Reveal>
        </div>

        <div className="mt-20 sm:mt-28">
          <Reveal preset="fadeIn">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
              {valuesSection.principlesEyebrow}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-(--color-primary) sm:text-3xl">{valuesSection.principlesHeading}</h3>
          </Reveal>

          <RevealGroup stagger={STAGGER_FAST} delay={0.08} className="mt-6 divide-y divide-(--color-line) border-t border-(--color-line)">
            {guidingPrinciples.map((principle) => (
              <RevealItem key={principle.id} preset="fadeUp">
                <div className="group grid gap-2 py-5 sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-8 sm:py-6">
                  <h4 className="text-lg font-bold text-(--color-primary) transition-colors group-hover:text-(--color-secondary-dark)">
                    {principle.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-(--color-ink-soft) sm:text-base">{principle.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.12} preset="riseSoft">
          <ParallaxLayer speed={12}>
            <blockquote className="mt-16 rounded-[var(--radius-lg)] border-l-4 border-(--color-accent) bg-(--color-surface-soft) px-6 py-8 sm:px-10">
              <p className="text-balance text-xl font-semibold leading-snug text-(--color-primary) sm:text-2xl">
                {valuesSection.quote}
              </p>
            </blockquote>
          </ParallaxLayer>
        </Reveal>
      </Container>
    </section>
  );
}

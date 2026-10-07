"use client";

import { Container } from "../components/Container";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { ProcessFlow } from "../components/ProcessFlow";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about, missionVision, siteMeta } from "../data/content";
import { STAGGER, STAGGER_FAST } from "../lib/motion";

export function About() {
  return (
    <section id="about" aria-label={`About ${siteMeta.legalName}`} className="relative overflow-hidden bg-(--color-surface) py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface)_0%,var(--color-surface-soft)_100%)]"
      />

      <Container className="relative grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
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
            <div className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-(--color-line) bg-white p-3 shadow-[var(--shadow-soft)] sm:p-5">
              <img
                src="/about-request-flow.png"
                alt="Diagram of a web request travelling from a user device through a router, across the internet, to a web server, and back again as a response."
                width={1600}
                height={730}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
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

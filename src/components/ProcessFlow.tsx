"use client";

import { STAGGER_FAST } from "../lib/motion";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export type JourneyStep = {
  label: string;
  plain: string;
};

type ProcessFlowProps = {
  caption: string;
  steps: JourneyStep[];
  tone?: "dark" | "light";
};

/**
 * Explains CIDUS's connected-capability story in plain language so
 * non-technical visitors can follow the same path as the visual system:
 * many kinds of work, brought together as one partner.
 */
export function ProcessFlow({ caption, steps, tone = "dark" }: ProcessFlowProps) {
  const isLight = tone === "light";

  return (
    <div>
      <Reveal preset="fadeIn">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${
            isLight ? "text-white/45" : "text-(--color-ink-faint)"
          }`}
        >
          {caption}
        </p>
      </Reveal>

      <RevealGroup stagger={STAGGER_FAST} delay={0.08} className="mt-5 flex flex-col gap-3">
        {steps.map((step, i) => (
          <RevealItem key={step.label} preset={i === steps.length - 1 ? "scaleIn" : "fadeUp"}>
              <div
                className={`flex flex-col gap-1 rounded-[var(--radius-md)] border px-4 py-3 sm:flex-row sm:items-baseline sm:gap-6 ${
                  i === steps.length - 1
                    ? isLight
                      ? "border-(--color-accent)/50 bg-(--color-accent)/10"
                      : "border-(--color-accent)/40 bg-(--color-accent)/8"
                    : isLight
                      ? "border-white/12 bg-white/[0.03]"
                      : "border-(--color-line) bg-white"
                }`}
              >
                <span
                  className={`shrink-0 text-xs font-bold uppercase tracking-[0.1em] ${
                    i === steps.length - 1
                      ? "text-(--color-accent)"
                      : isLight
                        ? "text-white"
                        : "text-(--color-primary)"
                  }`}
                >
                  {`${String(i + 1).padStart(2, "0")}  ${step.label}`}
                </span>
                <span className={`text-sm leading-relaxed ${isLight ? "text-white/65" : "text-(--color-ink-soft)"}`}>
                  {step.plain}
                </span>
              </div>
            </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

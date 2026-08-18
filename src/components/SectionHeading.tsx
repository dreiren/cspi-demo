import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  heading: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
  tone = "dark",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClasses} ${className}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
            isLight
              ? "border-white/25 text-(--color-accent) bg-white/5"
              : "border-(--color-secondary)/30 text-(--color-secondary-dark) bg-(--color-secondary)/10"
          }`}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-(--color-accent)"
          />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`text-balance text-3xl sm:text-4xl lg:text-[2.75rem] ${
            isLight ? "text-white" : "text-(--color-primary)"
          }`}
        >
          {heading}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={`text-balance text-base sm:text-lg leading-relaxed ${
              isLight ? "text-white/70" : "text-(--color-ink-soft)"
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

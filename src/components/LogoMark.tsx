import { siteMeta } from "../data/content";

type LogoMarkProps = {
  tone?: "dark" | "light";
  className?: string;
  /** Pass `null` to render a non-link lockup (e.g. maintenance screen). */
  href?: string | null;
  /** When false, render only the company name (no [Logo] mark box). */
  showMark?: boolean;
};

/**
 * Brand lockup: optional [LOGO] mark + company name. Swap the mark
 * (currently an abstract node glyph) for the real CIDUS logo asset once
 * available; the company name itself is set via `siteMeta.companyName`
 * in `src/data/content.ts`.
 */
export function LogoMark({
  tone = "light",
  className = "",
  href = "#hero",
  showMark = true,
}: LogoMarkProps) {
  const isLight = tone === "light";

  const lockup = (
    <>
      {showMark ? (
        <span
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-(--color-accent)/40 bg-(--color-primary-dark) text-(--color-accent)"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="6" r="2.4" fill="currentColor" />
            <circle cx="18" cy="6" r="2.4" fill="currentColor" />
            <circle cx="12" cy="18" r="2.4" fill="currentColor" />
            <path
              d="M6 6L18 6M6 6L12 18M18 6L12 18"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </span>
      ) : null}
      <span className="flex flex-col leading-none">
        {showMark ? (
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
              isLight ? "text-white/45" : "text-(--color-ink-faint)"
            }`}
          >
            [Logo]
          </span>
        ) : null}
        <span
          className={`${showMark ? "mt-1" : ""} text-base font-bold tracking-tight ${
            isLight ? "text-white" : "text-(--color-primary)"
          }`}
        >
          {siteMeta.companyName}
        </span>
      </span>
    </>
  );

  const classes = `group flex items-center ${showMark ? "gap-3" : ""} ${className}`;

  if (!href) {
    return (
      <div className={classes} aria-label={siteMeta.companyName}>
        {lockup}
      </div>
    );
  }

  return (
    <a href={href} className={classes} aria-label={`${siteMeta.companyName} — home`}>
      {lockup}
    </a>
  );
}

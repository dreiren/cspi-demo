import { siteMeta } from "../data/content";

type LogoMarkProps = {
  tone?: "dark" | "light";
  className?: string;
  showLegalName?: boolean;
};

/**
 * Placeholder brand lockup: [LOGO] mark + CIDUS short name.
 * The legal name sits nearby in the footer and about copy.
 */
export function LogoMark({ tone = "light", className = "", showLegalName = false }: LogoMarkProps) {
  const isLight = tone === "light";

  return (
    <a
      href="#hero"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${siteMeta.legalName} — home`}
    >
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
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isLight ? "text-(--color-on-band-faint)" : "text-(--color-ink-faint)"
          }`}
        >
          [Logo]
        </span>
        <span
          className={`mt-1 text-base font-bold tracking-tight ${
            isLight ? "text-(--color-on-band)" : "text-(--color-primary)"
          }`}
        >
          {siteMeta.shortName}
        </span>
        {showLegalName ? (
          <span
            className={`mt-1 truncate text-[11px] font-medium ${
              isLight ? "text-(--color-on-band-muted)" : "text-(--color-ink-soft)"
            }`}
          >
            {siteMeta.legalName}
          </span>
        ) : null}
      </span>
    </a>
  );
}

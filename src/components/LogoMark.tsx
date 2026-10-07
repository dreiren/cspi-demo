import { siteMeta } from "../data/content";

type LogoMarkProps = {
  tone?: "dark" | "light";
  className?: string;
  showLegalName?: boolean;
  /** Pass `null` to render a non-link lockup (e.g. maintenance screen). */
  href?: string | null;
  /** When false, render only the company name (no mark). */
  showMark?: boolean;
};

/**
 * Brand lockup: company mark (`public/logo.png`) + CIDUS short name.
 * The legal name sits nearby in the footer and about copy.
 */
export function LogoMark({
  tone = "light",
  className = "",
  showLegalName = false,
  href = "#hero",
  showMark = true,
}: LogoMarkProps) {
  const isLight = tone === "light";

  const lockup = (
    <>
      {showMark ? (
        <img
          src="/logo.png"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 object-contain"
        />
      ) : null}
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`text-base font-bold tracking-tight ${
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
    </>
  );

  const classes = `group flex items-center ${showMark ? "gap-3" : ""} ${className}`;

  if (!href) {
    return (
      <div className={classes} aria-label={siteMeta.legalName}>
        {lockup}
      </div>
    );
  }

  return (
    <a href={href} className={classes} aria-label={`${siteMeta.legalName} — home`}>
      {lockup}
    </a>
  );
}

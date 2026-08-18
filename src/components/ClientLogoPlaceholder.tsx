type ClientLogoPlaceholderProps = {
  name: string;
};

/**
 * Fixed-ratio placeholder tile designed so a real, approved client logo
 * (SVG/PNG) can be dropped in later without adjusting the surrounding
 * layout. Displays the organization name as an explicit bracketed
 * placeholder until an approved logo asset is supplied.
 */
export function ClientLogoPlaceholder({ name }: ClientLogoPlaceholderProps) {
  return (
    <div
      className="flex h-32 flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-(--color-line) bg-white px-6 text-center transition-colors duration-300 hover:border-(--color-secondary)/50"
      role="img"
      aria-label={`${name} — logo placeholder pending approved artwork`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-(--color-ink-faint)">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 9.5H22" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 13H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="text-[11px] font-semibold uppercase leading-snug tracking-[0.04em] text-(--color-ink-faint)">
        [{name} Logo]
      </span>
    </div>
  );
}

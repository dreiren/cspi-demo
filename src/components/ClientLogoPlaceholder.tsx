type ClientLogoPlaceholderProps = {
  index: number;
};

/**
 * Fixed-ratio placeholder tile designed so a real client logo (SVG/PNG)
 * can be dropped in later without adjusting the surrounding grid layout.
 */
export function ClientLogoPlaceholder({ index }: ClientLogoPlaceholderProps) {
  return (
    <div
      className="flex h-24 items-center justify-center rounded-[var(--radius-md)] border border-(--color-line) bg-white px-6 text-center transition-colors duration-300 hover:border-(--color-secondary)/50"
      role="img"
      aria-label={`Client logo placeholder ${index}`}
    >
      <div className="flex flex-col items-center gap-1 text-(--color-ink-faint)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 9.5H22" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 13H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
          [Client Logo]
        </span>
      </div>
    </div>
  );
}

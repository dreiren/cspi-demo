"use client";

import { useTheme } from "../hooks/useTheme";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggleTheme}
      className={`group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-(--color-glass-border-strong) bg-(--color-glass) px-2.5 py-1.5 text-(--color-on-band) transition-colors duration-300 hover:border-(--color-accent)/45 hover:bg-(--color-glass-strong) ${className}`}
    >
      <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center text-(--color-accent)">
        {isLight ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M18.4 5.6L17 7M7 17L5.6 18.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15.5 4.2A8 8 0 1 0 19.8 15.4 6.4 6.4 0 0 1 15.5 4.2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {showLabel ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-on-band-muted)">
          Light
        </span>
      ) : (
        <span className="sr-only">Light</span>
      )}
      <span
        aria-hidden="true"
        className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
          isLight ? "bg-(--color-accent)" : "bg-(--color-on-band)/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            isLight ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

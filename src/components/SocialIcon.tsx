import type { SocialNetwork } from "../data/content";

type SocialIconProps = {
  network: SocialNetwork;
  className?: string;
};

/**
 * Inline social marks (LinkedIn, X, Facebook) in the same currentColor
 * stroke/fill language as the rest of the icon set — no extra dependency.
 */
export function SocialIcon({ network, className = "h-[18px] w-[18px]" }: SocialIconProps) {
  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33 0-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.28v1.56h.05c.46-.86 1.57-1.77 3.24-1.77 3.46 0 4.1 2.28 4.1 5.24v6.42zM5.34 7.43A2.06 2.06 0 1 1 5.33 3.3a2.06 2.06 0 0 1 .01 4.13zM7.12 20.45H3.55V9h3.57v11.45z" />
      </svg>
    );
  }

  if (network === "x") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
        <path d="M13.32 10.47 20.4 2.25h-1.68l-6.14 7.14L7.67 2.25H2.25l7.42 10.8-7.42 8.7h1.68l6.49-7.55 5.18 7.55h5.42L13.32 10.47Zm-2.3 2.67-.75-1.08-6-8.56h2.58l4.84 6.9.75 1.08 6.29 8.97h-2.58l-5.13-7.31Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.25h2.25V5.4c-.39-.05-1.72-.17-3.27-.17-3.24 0-5.46 1.98-5.46 5.61v3.16H5.25v3.19h2.77V22.5h3.6v-5.31h2.83l.45-3.19h-3.28v-2.75c0-.92.25-1.55 1.58-1.55Z" />
    </svg>
  );
}

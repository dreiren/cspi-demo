type ServiceIconProps = {
  name: "infrastructure" | "network" | "data";
  className?: string;
};

/**
 * Minimal line-icon set representing the three core service pillars.
 * Kept as inline SVG (no icon library dependency) for zero extra weight.
 */
export function ServiceIcon({ name, className = "h-6 w-6" }: ServiceIconProps) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (name === "infrastructure") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="4" y="3" width="16" height="6" rx="1.4" {...common} />
        <rect x="4" y="15" width="16" height="6" rx="1.4" {...common} />
        <circle cx="7.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="7.5" cy="18" r="0.8" fill="currentColor" stroke="none" />
        <path d="M12 9V15" {...common} />
      </svg>
    );
  }

  if (name === "network") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <circle cx="12" cy="5" r="2" {...common} />
        <circle cx="5" cy="19" r="2" {...common} />
        <circle cx="19" cy="19" r="2" {...common} />
        <path d="M12 7V13M12 13L6.3 17.3M12 13L17.7 17.3" {...common} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" {...common} />
      <path d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6" {...common} />
      <path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" {...common} />
    </svg>
  );
}

type ServiceIconProps = {
  name: "infrastructure" | "network" | "data" | "operations" | "supply" | "engineering";
  className?: string;
};

/**
 * Minimal line-icon set representing CIDUS's core capability groups.
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

  if (name === "data") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" {...common} />
        <path d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6" {...common} />
        <path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" {...common} />
      </svg>
    );
  }

  if (name === "operations") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" {...common} />
        <path d="M12 7.5V12L15 14" {...common} />
        <path d="M12 3.5V5.5M12 18.5V20.5M3.5 12H5.5M18.5 12H20.5" {...common} />
      </svg>
    );
  }

  if (name === "supply") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M3 8L12 3.5L21 8V16L12 20.5L3 16V8Z" {...common} />
        <path d="M3 8L12 12.5L21 8" {...common} />
        <path d="M12 12.5V20.5" {...common} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" {...common} />
      <path
        d="M12 3.5V6M12 18V20.5M20.5 12H18M6 12H3.5M17.6 6.4L15.9 8.1M8.1 15.9L6.4 17.6M17.6 17.6L15.9 15.9M8.1 8.1L6.4 6.4"
        {...common}
      />
    </svg>
  );
}

type GridOverlayProps = {
  className?: string;
  opacity?: number;
};

/**
 * Subtle full-bleed technical grid used as a base layer behind dark
 * sections to evoke infrastructure blueprints / schematics.
 */
export function GridOverlay({ className = "", opacity = 0.35 }: GridOverlayProps) {
  const patternId = "grid-overlay-pattern";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#69cddf" strokeWidth="0.6" opacity="0.5" />
        </pattern>
        <radialGradient id="grid-fade" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#grid-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} mask="url(#grid-mask)" />
    </svg>
  );
}

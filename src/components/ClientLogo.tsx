type ClientLogoProps = {
  name: string;
  src: string;
  /** Circular crop for seals (hides square canvas around a round mark). */
  shape?: "default" | "circle";
};

/**
 * Fixed-height client logo tile. Real artwork is passed in from
 * `clientsSection.organizations` so the Clients layout stays unchanged
 * when a mark is added or replaced.
 */
export function ClientLogo({ name, src, shape = "default" }: ClientLogoProps) {
  const isCircle = shape === "circle";

  return (
    <div className="flex h-36 items-center justify-center rounded-[var(--radius-md)] border border-(--color-line) bg-white px-5 py-6 transition-[border-color,box-shadow] duration-300 hover:border-(--color-secondary)/50 hover:shadow-[var(--shadow-soft)]">
      <img
        src={src}
        alt={`${name} logo`}
        width={isCircle ? 96 : 220}
        height={96}
        className={
          isCircle
            ? "h-24 w-24 rounded-full object-cover"
            : "max-h-24 w-full object-contain"
        }
      />
    </div>
  );
}

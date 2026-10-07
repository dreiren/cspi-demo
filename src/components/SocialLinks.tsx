import { contactSection } from "../data/content";
import { safeAnchorProps } from "../lib/links";
import { SocialIcon } from "./SocialIcon";

type SocialLinksProps = {
  /** `light` = icons on a dark band (footer). `dark` = icons on a light surface. */
  tone?: "dark" | "light";
  className?: string;
};

const toneClasses = {
  dark: "border-(--color-line) bg-white text-(--color-ink-soft) hover:border-(--color-accent) hover:text-(--color-secondary) hover:bg-(--color-accent)/10",
  light:
    "border-(--color-glass-border-mid) text-(--color-on-band-soft) hover:border-(--color-accent) hover:text-(--color-accent) hover:bg-(--color-accent)/10",
} as const;

/**
 * LinkedIn / X / Facebook icon row used in Contact and the footer.
 */
export function SocialLinks({ tone = "dark", className = "" }: SocialLinksProps) {
  const sizeClass = tone === "light" ? "h-9 w-9" : "h-10 w-10";

  return (
    <ul className={`flex gap-3 ${className}`.trim()}>
      {contactSection.socialLinks.map((social) => (
        <li key={social.id}>
          <a
            {...safeAnchorProps(social.href)}
            aria-label={social.label}
            className={`flex ${sizeClass} items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 ${toneClasses[tone]}`}
          >
            <SocialIcon network={social.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}

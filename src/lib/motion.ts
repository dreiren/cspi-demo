import type { Transition, Variants } from "framer-motion";

/**
 * CIDUS motion system
 *
 * The timing is tuned for a corporate one-page story: elements arrive
 * like connected capabilities coming into view, then recede as the
 * visitor scrolls on. All values are GPU-friendly (opacity + transform).
 *
 * Intervals (seconds):
 *  - STAGGER_FAST  — related inline items (values, journey chips)
 *  - STAGGER       — default sibling cards / paragraphs
 *  - STAGGER_SLOW  — large service groups
 *  - DURATION_IN   — entry
 *  - DURATION_OUT  — exit (slightly quicker so the next section can lead)
 */

export const STAGGER_FAST = 0.06;
export const STAGGER = 0.1;
export const STAGGER_SLOW = 0.14;

export const DURATION_IN = 0.7;
export const DURATION_OUT = 0.45;

/** Premium ease-out: fast start, long settle — feels considered, not bouncy. */
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const transitionIn: Transition = {
  duration: DURATION_IN,
  ease: EASE_PREMIUM,
};

export const transitionOut: Transition = {
  duration: DURATION_OUT,
  ease: EASE_PREMIUM,
};

export const viewportOnce = { once: true, amount: 0.28, margin: "0px 0px -10% 0px" } as const;
export const viewportReplay = { once: false, amount: 0.24, margin: "0px 0px -8% 0px" } as const;

export type MotionPreset = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn" | "riseSoft";

/**
 * Hidden / visible pairs used with whileInView so leaving the viewport
 * plays the reverse (exit) without AnimatePresence.
 */
export const presets: Record<MotionPreset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: transitionIn },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitionIn },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: transitionIn },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: transitionIn },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: transitionIn },
  },
  riseSoft: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: transitionIn },
  },
};

export const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.06,
    },
  },
};

export function staggerDelay(index: number, interval = STAGGER, base = 0): number {
  return base + index * interval;
}

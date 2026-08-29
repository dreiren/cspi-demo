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

/**
 * Shrink the observed viewport so enter/exit play while the element is still
 * on screen. A bottom-only inset (the previous `"0px 0px -8% 0px"`) meant
 * scrolling-down exits started after the block was already under the nav.
 */
export const VIEWPORT_MARGIN = "-12% 0px -16% 0px";

/**
 * `amount: "some"` maps to IntersectionObserver threshold 0 — fire when any
 * pixel enters or the last pixel leaves the inset root. A numeric amount
 * (e.g. 0.24) only crosses at that ratio; `isIntersecting` stays true until
 * the element is fully gone, so exit either never fires or plays off-screen.
 */
export const viewportOnce = { once: true, amount: "some" as const, margin: VIEWPORT_MARGIN };
export const viewportReplay = { once: false, amount: "some" as const, margin: VIEWPORT_MARGIN };

export type MotionPreset = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn" | "riseSoft";

/**
 * Hidden / visible pairs. Each side owns its transition so exit is a true
 * reverse (faster) rather than a snap back through the entry timing.
 */
export const presets: Record<MotionPreset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28, transition: transitionOut },
    visible: { opacity: 1, y: 0, transition: transitionIn },
  },
  fadeIn: {
    hidden: { opacity: 0, transition: transitionOut },
    visible: { opacity: 1, transition: transitionIn },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -28, transition: transitionOut },
    visible: { opacity: 1, x: 0, transition: transitionIn },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 28, transition: transitionOut },
    visible: { opacity: 1, x: 0, transition: transitionIn },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96, transition: transitionOut },
    visible: { opacity: 1, scale: 1, transition: transitionIn },
  },
  riseSoft: {
    hidden: { opacity: 0, y: 16, transition: transitionOut },
    visible: { opacity: 1, y: 0, transition: transitionIn },
  },
};

export function createGroupVariants(stagger = STAGGER, delayChildren = 0.06): Variants {
  return {
    hidden: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
        delayChildren: 0,
      },
    },
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

export const groupVariants: Variants = createGroupVariants();

/**
 * Apply enter delay on the visible variant only. Putting delay on the
 * component `transition` also delayed the exit, so blocks finished fading
 * out after they had already left the screen.
 */
export function revealVariants(preset: MotionPreset, delay = 0): Variants {
  const base = presets[preset];
  if (!delay) return base;

  const visible = base.visible;
  if (typeof visible !== "object" || visible === null || Array.isArray(visible)) {
    return base;
  }

  return {
    hidden: base.hidden,
    visible: {
      ...visible,
      transition: { ...transitionIn, delay },
    },
  };
}

export function staggerDelay(index: number, interval = STAGGER, base = 0): number {
  return base + index * interval;
}

/**
 * Pure in-view reducer used by the IntersectionObserver wrapper.
 * `once` latches to true after the first intersection so first-screen
 * replay can stay quiet without breaking exit on everything else.
 */
export function nextInViewState(isIntersecting: boolean, currentlyInView: boolean, once: boolean): boolean {
  if (isIntersecting) return true;
  if (once) return currentlyInView;
  return false;
}

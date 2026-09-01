import type { Transition, Variants } from "framer-motion";

/**
 * CIDUS motion system
 *
 * The timing is tuned for a corporate one-page story: elements arrive
 * like connected capabilities coming into view and then stay put.
 * All values are GPU-friendly (opacity + transform).
 *
 * Intervals (seconds):
 *  - STAGGER_FAST  — related inline items (values, journey chips)
 *  - STAGGER       — default sibling cards / paragraphs
 *  - STAGGER_SLOW  — large service groups
 *  - DURATION_IN   — entry
 *  - DURATION_OUT  — hidden-state timing (used only if replay is opted in)
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
 * Shrink the observed viewport so enter plays while the element is still
 * on screen rather than waiting until it is fully inside the frame.
 */
export const VIEWPORT_MARGIN = "-12% 0px -16% 0px";

/**
 * `amount: "some"` maps to IntersectionObserver threshold 0 — fire when any
 * pixel enters the inset root. Reveal defaults to `viewportOnce` so content
 * stays visible after it leaves. `viewportReplay` is the opt-in reverse path.
 */
export const viewportOnce = { once: true, amount: "some" as const, margin: VIEWPORT_MARGIN };
export const viewportReplay = { once: false, amount: "some" as const, margin: VIEWPORT_MARGIN };

export type MotionPreset = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn" | "riseSoft";

/**
 * Hidden / visible pairs. Visible owns the enter timing. Hidden keeps a
 * shorter transition so an opt-in replay (`once: false`) can still reverse
 * without using the slower entry curve.
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
 * Apply enter delay on the visible variant only so the hidden start state
 * is not postponed if a caller opts back into replay.
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
 * `once` latches visible after the first intersection so leaving the
 * viewport does not play an exit.
 */
export function nextInViewState(isIntersecting: boolean, currentlyInView: boolean, once: boolean): boolean {
  if (isIntersecting) return true;
  if (once) return currentlyInView;
  return false;
}

import { describe, expect, it } from "vitest";
import {
  DURATION_IN,
  DURATION_OUT,
  STAGGER,
  STAGGER_FAST,
  STAGGER_SLOW,
  VIEWPORT_MARGIN,
  createGroupVariants,
  nextInViewState,
  presets,
  revealVariants,
  staggerDelay,
  transitionOut,
  viewportOnce,
  viewportReplay,
} from "./motion";

describe("motion system intervals", () => {
  it("keeps stagger intervals in a premium, readable range", () => {
    expect(STAGGER_FAST).toBeGreaterThanOrEqual(0.05);
    expect(STAGGER_FAST).toBeLessThan(0.1);
    expect(STAGGER).toBeGreaterThan(STAGGER_FAST);
    expect(STAGGER_SLOW).toBeGreaterThan(STAGGER);
    expect(STAGGER_SLOW).toBeLessThanOrEqual(0.2);
  });

  it("keeps hidden-state timing shorter than entry for opt-in replay", () => {
    expect(DURATION_OUT).toBeLessThan(DURATION_IN);
    expect(DURATION_IN).toBeGreaterThanOrEqual(0.5);
    expect(DURATION_IN).toBeLessThanOrEqual(0.9);
    expect(transitionOut.duration).toBe(DURATION_OUT);
  });

  it("computes staggered delays from a shared interval", () => {
    expect(staggerDelay(0, 0.1, 0.05)).toBeCloseTo(0.05);
    expect(staggerDelay(3, 0.1, 0.05)).toBeCloseTo(0.35);
  });

  it("defines hidden/visible pairs for every preset so enter has a start state", () => {
    const names = Object.keys(presets) as Array<keyof typeof presets>;
    expect(names.length).toBeGreaterThanOrEqual(5);

    for (const name of names) {
      const hidden = presets[name].hidden as { opacity?: number; transition?: { duration?: number } };
      const visible = presets[name].visible as { opacity?: number; transition?: { duration?: number } };
      expect(hidden.opacity).toBe(0);
      expect(visible.opacity).toBe(1);
      expect(hidden.transition?.duration).toBe(DURATION_OUT);
      expect(visible.transition?.duration).toBe(DURATION_IN);
    }
  });

  it("staggers siblings forward on enter without reversing on hide", () => {
    const variants = createGroupVariants(0.08, 0.1);
    const hidden = variants.hidden as { transition?: { staggerDirection?: number; staggerChildren?: number } };
    const visible = variants.visible as { transition?: { delayChildren?: number; staggerChildren?: number } };

    expect(hidden.transition?.staggerDirection).not.toBe(-1);
    expect(hidden.transition?.staggerChildren).toBe(0.08);
    expect(visible.transition?.delayChildren).toBe(0.1);
    expect(visible.transition?.staggerChildren).toBe(0.08);
  });

  it("applies enter delay only on the visible variant", () => {
    const variants = revealVariants("fadeUp", 0.28);
    const hidden = variants.hidden as { transition?: { delay?: number; duration?: number } };
    const visible = variants.visible as { transition?: { delay?: number; duration?: number } };

    expect(hidden.transition?.delay).toBeUndefined();
    expect(hidden.transition?.duration).toBe(DURATION_OUT);
    expect(visible.transition?.delay).toBe(0.28);
    expect(visible.transition?.duration).toBe(DURATION_IN);
  });

  it("enters once by default against a symmetrically inset viewport", () => {
    expect(viewportOnce.once).toBe(true);
    expect(viewportOnce.amount).toBe("some");
    expect(viewportReplay.once).toBe(false);
    expect(VIEWPORT_MARGIN.startsWith("-")).toBe(true);
    expect(VIEWPORT_MARGIN).toMatch(/0px -?\d+%/);
  });
});

describe("nextInViewState", () => {
  it("can still hide on leave when replay is opted in", () => {
    expect(nextInViewState(true, false, false)).toBe(true);
    expect(nextInViewState(false, true, false)).toBe(false);
  });

  it("latches visible when once is set so leaving the viewport does not reverse", () => {
    expect(nextInViewState(true, false, true)).toBe(true);
    expect(nextInViewState(false, true, true)).toBe(true);
  });
});

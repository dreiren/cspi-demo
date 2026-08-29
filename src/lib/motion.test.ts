import { describe, expect, it } from "vitest";
import {
  DURATION_IN,
  DURATION_OUT,
  STAGGER,
  STAGGER_FAST,
  STAGGER_SLOW,
  presets,
  staggerDelay,
} from "./motion";

describe("motion system intervals", () => {
  it("keeps stagger intervals in a premium, readable range", () => {
    expect(STAGGER_FAST).toBeGreaterThanOrEqual(0.05);
    expect(STAGGER_FAST).toBeLessThan(0.1);
    expect(STAGGER).toBeGreaterThan(STAGGER_FAST);
    expect(STAGGER_SLOW).toBeGreaterThan(STAGGER);
    expect(STAGGER_SLOW).toBeLessThanOrEqual(0.2);
  });

  it("makes exit slightly faster than entry so the next section can lead", () => {
    expect(DURATION_OUT).toBeLessThan(DURATION_IN);
    expect(DURATION_IN).toBeGreaterThanOrEqual(0.5);
    expect(DURATION_IN).toBeLessThanOrEqual(0.9);
  });

  it("computes staggered delays from a shared interval", () => {
    expect(staggerDelay(0, 0.1, 0.05)).toBeCloseTo(0.05);
    expect(staggerDelay(3, 0.1, 0.05)).toBeCloseTo(0.35);
  });

  it("defines hidden/visible pairs for every preset so scroll can reverse on exit", () => {
    const names = Object.keys(presets) as Array<keyof typeof presets>;
    expect(names.length).toBeGreaterThanOrEqual(5);

    for (const name of names) {
      const hidden = presets[name].hidden as { opacity?: number };
      const visible = presets[name].visible as { opacity?: number };
      expect(hidden.opacity).toBe(0);
      expect(visible.opacity).toBe(1);
    }
  });
});

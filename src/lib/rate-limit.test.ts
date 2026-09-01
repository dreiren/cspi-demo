import { describe, expect, it } from "vitest";
import { createSlidingWindowLimiter } from "./rate-limit";

describe("createSlidingWindowLimiter", () => {
  it("allows traffic under the limit and then blocks", () => {
    const limiter = createSlidingWindowLimiter({ limit: 3, windowMs: 1_000 });
    const t0 = 1_000_000;

    expect(limiter.check("1.1.1.1", t0).allowed).toBe(true);
    expect(limiter.check("1.1.1.1", t0 + 10).allowed).toBe(true);
    expect(limiter.check("1.1.1.1", t0 + 20).allowed).toBe(true);

    const blocked = limiter.check("1.1.1.1", t0 + 30);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("isolates keys so one client does not starve another", () => {
    const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 5_000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 1).allowed).toBe(false);
    expect(limiter.check("b", 1).allowed).toBe(true);
  });

  it("reopens after the window elapses", () => {
    const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 100 });
    expect(limiter.check("k", 0).allowed).toBe(true);
    expect(limiter.check("k", 99).allowed).toBe(false);
    expect(limiter.check("k", 101).allowed).toBe(true);
  });
});

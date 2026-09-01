/**
 * Simple in-memory sliding-window limiter. Fine for a single-process demo.
 * Multi-instance / serverless production should use a shared store.
 */

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSec: number;
};

export type RateLimiter = {
  check: (key: string, now?: number) => RateLimitResult;
};

export function createSlidingWindowLimiter(options: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}): RateLimiter {
  const hits = new Map<string, number[]>();
  const maxKeys = options.maxKeys ?? 8_000;

  return {
    check(key: string, now = Date.now()): RateLimitResult {
      const windowStart = now - options.windowMs;
      const prior = hits.get(key) ?? [];
      const timestamps = prior.filter((stamp) => stamp > windowStart);

      if (timestamps.length >= options.limit) {
        hits.set(key, timestamps);
        const retryAfterSec = Math.max(
          1,
          Math.ceil((timestamps[0]! + options.windowMs - now) / 1000),
        );
        return { allowed: false, retryAfterSec };
      }

      timestamps.push(now);
      hits.set(key, timestamps);

      if (hits.size > maxKeys) {
        const oldestKey = hits.keys().next().value;
        if (oldestKey !== undefined && oldestKey !== key) {
          hits.delete(oldestKey);
        }
      }

      return { allowed: true, retryAfterSec: 0 };
    },
  };
}

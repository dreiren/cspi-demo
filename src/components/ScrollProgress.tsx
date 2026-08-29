"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * A thin reading-progress bar that maps scroll position to a scaleX
 * transform — GPU-only, no layout thrash. Hidden when reduced motion is on
 * so it does not become a competing animation.
 */
export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (prefersReducedMotion) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-(--color-accent)"
      style={{ scaleX }}
    />
  );
}

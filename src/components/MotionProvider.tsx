"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM, DURATION_IN } from "../lib/motion";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Loads only the DOM animation features (smaller than the full framer-motion
 * bundle) and applies the site-wide easing so every scroll transition feels
 * consistent. Reduced motion is applied after mount via
 * `usePrefersReducedMotion` (and global CSS) so SSR HTML matches hydration.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="never"
        transition={{ duration: DURATION_IN, ease: EASE_PREMIUM }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

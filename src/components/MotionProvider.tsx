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
 * consistent. `reducedMotion="user"` honors prefers-reduced-motion.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: DURATION_IN, ease: EASE_PREMIUM }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

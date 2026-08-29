"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type ParallaxLayerProps = {
  children: ReactNode;
  /**
   * Positive speed moves the layer slower than scroll (background feel),
   * negative speed moves it faster (foreground feel). Range roughly -60..60.
   */
  speed?: number;
  className?: string;
};

/**
 * Wraps content in a GPU-friendly translateY parallax effect driven by
 * scroll position of the nearest section. Disabled entirely when the user
 * prefers reduced motion.
 */
export function ParallaxLayer({ children, speed = 20, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -1, speed]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}

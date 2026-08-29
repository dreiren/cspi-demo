"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  DURATION_IN,
  DURATION_OUT,
  EASE_PREMIUM,
  STAGGER,
  presets,
  viewportReplay,
  type MotionPreset,
} from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
  preset?: MotionPreset;
};

/**
 * Fades content in when it enters the viewport and plays the reverse
 * (exit) when it leaves, so every scroll past a section feels like a
 * considered transition. Falls back to a static render under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = false,
  preset = "fadeUp",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionTag = m[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={presets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportReplay, once }}
      transition={{
        duration: DURATION_IN,
        ease: EASE_PREMIUM,
        delay,
        opacity: { duration: DURATION_OUT, ease: EASE_PREMIUM, delay },
      }}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

/**
 * Parent stagger container. Pair with RevealItem so siblings enter and
 * leave the viewport as one connected sequence.
 */
export function RevealGroup({ children, className, stagger = STAGGER, delay = 0.06, once = false }: RevealGroupProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportReplay, once }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </m.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  preset?: MotionPreset;
};

export function RevealItem({ children, className, preset = "fadeUp" }: RevealItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div className={className} variants={presets[preset]}>
      {children}
    </m.div>
  );
}

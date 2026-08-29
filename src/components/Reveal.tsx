"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useInViewState } from "../hooks/useInViewState";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { STAGGER, createGroupVariants, revealVariants, viewportReplay, type MotionPreset } from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
  preset?: MotionPreset;
};

/**
 * Fades content in when it enters the inset viewport and plays the reverse
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
  const [ref, isInView] = useInViewState({ once, margin: viewportReplay.margin });
  const MotionTag = m[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={revealVariants(preset, delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
  const [ref, isInView] = useInViewState({ once, margin: viewportReplay.margin });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={createGroupVariants(stagger, delay)}
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
    <m.div className={className} variants={revealVariants(preset)}>
      {children}
    </m.div>
  );
}

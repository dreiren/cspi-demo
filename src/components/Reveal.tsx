"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useInViewState } from "../hooks/useInViewState";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { STAGGER, createGroupVariants, revealVariants, viewportOnce, type MotionPreset } from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
  preset?: MotionPreset;
};

/**
 * Fades content in when it enters the inset viewport, then stays visible.
 * Exit is disabled by default (`once`) so scrolling away does not reverse
 * the animation. Falls back to a static render under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
  preset = "fadeUp",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isInView] = useInViewState({ once, margin: viewportOnce.margin });
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
 * Parent stagger container. Pair with RevealItem so siblings enter together
 * and remain visible after they leave the viewport.
 */
export function RevealGroup({ children, className, stagger = STAGGER, delay = 0.06, once = true }: RevealGroupProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, isInView] = useInViewState({ once, margin: viewportOnce.margin });

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

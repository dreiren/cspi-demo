"use client";

import { useCallback, useEffect, useState, type RefCallback } from "react";
import { VIEWPORT_MARGIN, nextInViewState } from "../lib/motion";

export type InViewStateOptions = {
  once?: boolean;
  /** CSS rootMargin. Negative values shrink the active viewport so exit is visible. */
  margin?: string;
};

/**
 * Viewport presence for scroll enter/exit. Uses threshold 0 against an inset
 * root so `isIntersecting` flips while the element is still on screen —
 * unlike `whileInView` + a numeric `amount`, which often never reports leave.
 */
export function useInViewState(options: InViewStateOptions = {}): [RefCallback<Element>, boolean] {
  const { once = false, margin = VIEWPORT_MARGIN } = options;
  const [node, setNode] = useState<Element | null>(null);
  const [isInView, setIsInView] = useState(false);

  const setRef = useCallback<RefCallback<Element>>((element) => {
    setNode((current) => (current === element ? current : element));
  }, []);

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsInView((currentlyInView) => nextInViewState(entry.isIntersecting, currentlyInView, once));
        if (once && entry.isIntersecting) observer.disconnect();
      },
      {
        root: null,
        rootMargin: margin,
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, margin]);

  return [setRef, isInView];
}

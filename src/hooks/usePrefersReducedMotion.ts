import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` preference so components can
 * disable or simplify decorative animation without a page reload.
 *
 * Always starts `false` (matching SSR) and updates after mount so hydration
 * does not diverge for visitors who prefer reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}

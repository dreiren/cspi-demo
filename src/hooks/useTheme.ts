"use client";

import { useCallback, useSyncExternalStore } from "react";
import { applyTheme, readDocumentTheme, subscribeTheme, type Theme } from "../lib/theme";

function getThemeSnapshot(): Theme {
  return readDocumentTheme();
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

/**
 * Reads the theme already applied by the layout bootstrap script, then
 * lets the navbar switch persist a new preference. Shared across every
 * toggle instance via an external store so desktop and mobile stay in sync.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return { theme, setTheme, toggleTheme, isLight: theme === "light" };
}

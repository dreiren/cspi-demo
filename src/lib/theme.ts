export const THEME_STORAGE_KEY = "cidus-theme";
export const THEME_ATTRIBUTE = "data-theme";

export type Theme = "dark" | "light";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/** Stored or document value → a valid theme. Unknown values fall back to dark. */
export function resolveTheme(value: string | null | undefined): Theme {
  return isTheme(value) ? value : "dark";
}

const listeners = new Set<() => void>();

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage — attribute still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

export function readStoredTheme(): Theme {
  try {
    return resolveTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "dark";
  }
}

export function readDocumentTheme(): Theme {
  return resolveTheme(document.documentElement.getAttribute(THEME_ATTRIBUTE));
}

/**
 * Runs before paint so a stored preference is applied without a flash of
 * the default dark theme. Default is the current dark design.
 */
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.setAttribute("${THEME_ATTRIBUTE}",t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.setAttribute("${THEME_ATTRIBUTE}","dark");}})();`;

import { describe, expect, it } from "vitest";
import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  isTheme,
  resolveTheme,
  themeBootstrapScript,
} from "./theme";

describe("theme resolution", () => {
  it("treats only dark and light as valid themes", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("light")).toBe(true);
    expect(isTheme("system")).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme("")).toBe(false);
  });

  it("defaults to the current dark design when nothing valid is stored", () => {
    expect(resolveTheme(null)).toBe("dark");
    expect(resolveTheme(undefined)).toBe("dark");
    expect(resolveTheme("neon")).toBe("dark");
    expect(resolveTheme("")).toBe("dark");
  });

  it("preserves an explicit stored preference", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });
});

describe("theme bootstrap script", () => {
  it("applies the stored key and falls back to dark before paint", () => {
    expect(THEME_STORAGE_KEY).toBe("cidus-theme");
    expect(THEME_ATTRIBUTE).toBe("data-theme");
    expect(themeBootstrapScript).toContain(THEME_STORAGE_KEY);
    expect(themeBootstrapScript).toContain(THEME_ATTRIBUTE);
    expect(themeBootstrapScript).toContain('"dark"');
    expect(themeBootstrapScript).toContain('"light"');
  });
});

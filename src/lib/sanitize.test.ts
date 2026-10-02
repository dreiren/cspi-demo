import { describe, expect, it } from "vitest";
import { sanitizeMultiline, sanitizeSingleLine, stripHtmlTags } from "./sanitize";

describe("stripHtmlTags", () => {
  it("removes script and html tags while keeping surrounding words", () => {
    expect(stripHtmlTags("Jane <script>alert(1)</script> Doe")).not.toMatch(/[<>]/);
    expect(stripHtmlTags("Jane <script>alert(1)</script> Doe")).toMatch(/Jane\s+Doe/);
    expect(stripHtmlTags("Hello <b>world</b>").replace(/\s+/g, " ").trim()).toBe("Hello world");
  });

  it("drops leftover angle brackets from incomplete markup", () => {
    expect(stripHtmlTags("<img src=x onerror=alert(1)")).not.toContain("<");
    expect(stripHtmlTags("<img src=x onerror=alert(1)")).not.toContain(">");
  });
});

describe("sanitizeSingleLine", () => {
  it("trims, collapses space, and strips tags and controls", () => {
    expect(sanitizeSingleLine("  Jane\u0000  <b>Doe</b>  ")).toBe("Jane Doe");
  });

  it("treats non-strings as empty", () => {
    expect(sanitizeSingleLine(["<script>alert(1)</script>"])).toBe("");
    expect(sanitizeSingleLine(12)).toBe("");
  });
});

describe("sanitizeMultiline", () => {
  it("keeps paragraph breaks after removing markup", () => {
    const value = "Please call us.\n\n<script>alert(1)</script>\nNeed cabling.";
    expect(sanitizeMultiline(value)).toBe("Please call us.\n\nNeed cabling.");
  });
});

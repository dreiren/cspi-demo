import { describe, expect, it } from "vitest";
import { isHttpUrl, safeAnchorProps } from "./links";

describe("safeAnchorProps", () => {
  it("keeps in-page and relative hrefs without a new tab", () => {
    expect(safeAnchorProps("#contact")).toEqual({ href: "#contact" });
    expect(safeAnchorProps("/about")).toEqual({ href: "/about" });
  });

  it("opens http(s) URLs in a new tab with noopener noreferrer", () => {
    expect(safeAnchorProps("https://www.linkedin.com/company/example")).toEqual({
      href: "https://www.linkedin.com/company/example",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("rejects javascript and other non-http protocols", () => {
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
    expect(safeAnchorProps("javascript:alert(1)")).toEqual({ href: "#" });
    expect(safeAnchorProps("data:text/html,hi")).toEqual({ href: "#" });
  });
});

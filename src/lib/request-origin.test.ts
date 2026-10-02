import { describe, expect, it } from "vitest";
import { collectAllowedOrigins, isSameOriginRequest } from "./request-origin";

const localUrl = "http://localhost:3000/api/contact";
const site = "https://www.cidus.example";

describe("collectAllowedOrigins", () => {
  it("uses the request URL origin plus extra http(s) origins", () => {
    const allowed = collectAllowedOrigins(localUrl, [site, "javascript:alert(1)"]);
    expect(allowed.has("http://localhost:3000")).toBe(true);
    expect(allowed.has("https://www.cidus.example")).toBe(true);
    expect(allowed.size).toBe(2);
  });
});

describe("isSameOriginRequest", () => {
  it("accepts a matching Origin", () => {
    const headers = new Headers({ origin: "http://localhost:3000" });
    expect(isSameOriginRequest(headers, localUrl, [site])).toBe(true);
  });

  it("accepts the configured site origin as well as the request origin", () => {
    const headers = new Headers({ origin: site });
    expect(isSameOriginRequest(headers, localUrl, [site])).toBe(true);
  });

  it("rejects a different Origin even when Referer looks local", () => {
    const headers = new Headers({
      origin: "https://evil.example",
      referer: "http://localhost:3000/contact",
    });
    expect(isSameOriginRequest(headers, localUrl, [site])).toBe(false);
  });

  it("rejects Origin null and prefix-lookalike hosts", () => {
    expect(isSameOriginRequest(new Headers({ origin: "null" }), localUrl, [site])).toBe(false);
    expect(
      isSameOriginRequest(new Headers({ origin: "https://www.cidus.example.evil.example" }), localUrl, [
        site,
      ]),
    ).toBe(false);
  });

  it("falls back to Referer only when Origin is omitted", () => {
    expect(
      isSameOriginRequest(new Headers({ referer: "http://localhost:3000/#contact" }), localUrl, [site]),
    ).toBe(true);
    expect(isSameOriginRequest(new Headers(), localUrl, [site])).toBe(false);
    expect(
      isSameOriginRequest(new Headers({ referer: "https://evil.example/page" }), localUrl, [site]),
    ).toBe(false);
  });
});

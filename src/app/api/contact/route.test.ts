import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_LIMITS, MAX_CONTACT_JSON_BYTES } from "../../../lib/contact";
import { GET, POST } from "./route";

const validBody = {
  name: "Jane Doe",
  company: "Acme PH",
  email: "jane.doe@example.com",
  phone: "+63 917 123 4567",
  message: "We need structured cabling for a new office floor.",
  website: "",
};

afterEach(() => {
  vi.restoreAllMocks();
});

function postRequest(options: {
  origin?: string | null;
  referer?: string;
  ip?: string;
  body?: unknown;
  raw?: string;
  contentType?: string | null;
  contentLength?: string;
  url?: string;
}): Request {
  const headers = new Headers();
  if (options.origin !== null) {
    headers.set("origin", options.origin ?? "http://localhost:3000");
  }
  if (options.referer) headers.set("referer", options.referer);
  if (options.ip) headers.set("x-forwarded-for", options.ip);
  if (options.contentType !== null) {
    headers.set("content-type", options.contentType ?? "application/json");
  }
  if (options.contentLength) headers.set("content-length", options.contentLength);

  const raw = options.raw ?? JSON.stringify(options.body ?? validBody);
  return new Request(options.url ?? "http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: raw,
  });
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  return (await response.json()) as Record<string, unknown>;
}

describe("POST /api/contact", () => {
  it("accepts a same-origin valid inquiry without echoing the payload", async () => {
    const response = await POST(postRequest({ ip: "203.0.113.10" }));
    const body = await readJson(response);
    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, accepted: true, delivered: false });
    expect(JSON.stringify(body)).not.toContain("Jane");
    expect(JSON.stringify(body)).not.toContain("jane.doe");
  });

  it("rejects a missing Origin and mismatched Origin", async () => {
    const missing = await POST(postRequest({ origin: null, ip: "203.0.113.11" }));
    expect(missing.status).toBe(403);
    expect(await readJson(missing)).toEqual({ ok: false, error: "forbidden" });

    const cross = await POST(
      postRequest({ origin: "https://evil.example", ip: "203.0.113.12" }),
    );
    expect(cross.status).toBe(403);
    expect(await readJson(cross)).toEqual({ ok: false, error: "forbidden" });
  });

  it("allows Referer when Origin is omitted and the referer is same-origin", async () => {
    const response = await POST(
      postRequest({
        origin: null,
        referer: "http://localhost:3000/#contact",
        ip: "203.0.113.13",
      }),
    );
    expect(response.status).toBe(200);
  });

  it("accepts a 127.0.0.1 Origin for a localhost request URL", async () => {
    const response = await POST(
      postRequest({
        origin: "http://127.0.0.1:3000",
        ip: "203.0.113.21",
      }),
    );
    expect(response.status).toBe(200);
  });

  it("returns field errors for invalid input and does not reflect markup", async () => {
    const response = await POST(
      postRequest({
        ip: "203.0.113.14",
        body: {
          ...validBody,
          email: "not-an-email",
          message: "<script>alert(1)</script>",
        },
      }),
    );
    const body = await readJson(response);
    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.error).toBe("invalid");
    expect(JSON.stringify(body)).not.toContain("<script");
    expect((body.fields as Record<string, string>).email).toMatch(/valid email/);
  });

  it("silently accepts a filled honeypot as success", async () => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    const response = await POST(
      postRequest({
        ip: "203.0.113.15",
        body: { ...validBody, website: "https://spam.example" },
      }),
    );
    expect(response.status).toBe(200);
    expect(await readJson(response)).toEqual({ ok: true, accepted: true, delivered: false });
  });

  it("stores sanitized text rather than raw HTML when the rest is valid", async () => {
    const response = await POST(
      postRequest({
        ip: "203.0.113.16",
        body: {
          ...validBody,
          name: "Jane <b>Doe</b>",
          message: "We need structured cabling.<script>alert(1)</script> Please advise.",
        },
      }),
    );
    const body = await readJson(response);
    expect(response.status).toBe(200);
    expect(JSON.stringify(body)).not.toContain("<script");
    expect(JSON.stringify(body)).not.toContain("<b>");
  });

  it("rejects oversized bodies", async () => {
    const raw = "x".repeat(MAX_CONTACT_JSON_BYTES + 1);
    const response = await POST(
      postRequest({
        ip: "203.0.113.17",
        raw,
        contentLength: String(raw.length),
      }),
    );
    expect(response.status).toBe(413);
    expect(await readJson(response)).toEqual({ ok: false, error: "too_large" });
  });

  it("rejects non-JSON content types", async () => {
    const response = await POST(
      postRequest({
        ip: "203.0.113.18",
        contentType: "text/plain",
        raw: "name=Jane",
      }),
    );
    expect(response.status).toBe(415);
  });

  it("rate-limits repeated posts from the same client", async () => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    const ip = "203.0.113.200";
    let last: Response | undefined;
    for (let i = 0; i < 11; i += 1) {
      last = await POST(postRequest({ ip }));
    }
    expect(last?.status).toBe(429);
    expect(last?.headers.get("Retry-After")).toBeTruthy();
    expect(await readJson(last!)).toEqual({ ok: false, error: "rate_limited" });
  });

  it("uses the configured max lengths for a too-long name", async () => {
    const response = await POST(
      postRequest({
        ip: "203.0.113.19",
        body: { ...validBody, name: "N".repeat(CONTACT_LIMITS.name.max + 1) },
      }),
    );
    expect(response.status).toBe(400);
    const body = await readJson(response);
    expect((body.fields as Record<string, string>).name).toMatch(/2–100/);
  });
});

describe("GET /api/contact", () => {
  it("rejects GET", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });
});

import {
  payloadExceedsLimit,
  readContactInput,
  validateContactPayload,
  type SanitizedContact,
} from "../../../lib/contact";
import { createSlidingWindowLimiter } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

const limiter = createSlidingWindowLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
});

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function json(status: number, body: Record<string, unknown>, extra?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...extra },
  });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);
  return "unknown";
}

function logContactEvent(event: string): void {
  // Never include name, email, phone, or message — production or otherwise.
  console.info(`[contact] ${event}`);
}

function webhookUrl(): string | null {
  const raw = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const allowHttp = process.env.NODE_ENV !== "production";
    if (url.protocol === "https:") return url.toString();
    if (allowHttp && url.protocol === "http:") return url.toString();
    return null;
  } catch {
    return null;
  }
}

async function deliver(payload: SanitizedContact): Promise<"skipped" | "delivered" | "failed"> {
  const url = webhookUrl();
  if (!url) return "skipped";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return "failed";
    return "delivered";
  } catch {
    return "failed";
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = limiter.check(ip);
  if (!limit.allowed) {
    logContactEvent("rate_limited");
    return json(
      429,
      { ok: false, error: "rate_limited" },
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json(415, { ok: false, error: "unsupported_type" });
  }

  const declared = request.headers.get("content-length");
  if (declared) {
    const size = Number.parseInt(declared, 10);
    if (Number.isFinite(size) && payloadExceedsLimit(size)) {
      return json(413, { ok: false, error: "too_large" });
    }
  }

  const raw = await request.text();
  if (payloadExceedsLimit(new TextEncoder().encode(raw).length)) {
    return json(413, { ok: false, error: "too_large" });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  const input = readContactInput(parsed);
  if (!input) {
    return json(400, { ok: false, error: "invalid" });
  }

  const result = validateContactPayload(input);
  if (result.ok && result.honeypot) {
    logContactEvent("honeypot");
    // Same-shaped success so bots cannot probe the trap field.
    return json(200, { ok: true, accepted: true, delivered: false });
  }

  if (!result.ok) {
    logContactEvent("invalid");
    return json(400, { ok: false, error: "invalid", fields: result.errors });
  }

  const delivery = await deliver(result.value);
  if (delivery === "failed") {
    logContactEvent("delivery_failed");
    return json(503, { ok: false, error: "unavailable" });
  }

  logContactEvent(delivery === "delivered" ? "delivered" : "accepted_not_configured");
  return json(200, {
    ok: true,
    accepted: true,
    delivered: delivery === "delivered",
  });
}

export async function GET() {
  return json(405, { ok: false, error: "method_not_allowed" }, { Allow: "POST" });
}

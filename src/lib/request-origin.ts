/**
 * Same-origin check for JSON POST /api/contact.
 * Browsers send Origin on cross-site POSTs; missing/mismatched Origin (or
 * Referer when Origin is absent) is rejected so other sites cannot drive the API.
 */

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function parseHttpOrigin(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "null") return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function effectivePort(url: URL): string {
  if (url.port) return url.port;
  return url.protocol === "https:" ? "443" : "80";
}

function hostnameOf(origin: string): string {
  return new URL(origin).hostname.replace(/^\[|\]$/g, "");
}

/** Loopback hosts on the same scheme+port are the same browser origin for local dev. */
export function originsEquivalent(left: string, right: string): boolean {
  if (left === right) return true;
  try {
    const a = new URL(left);
    const b = new URL(right);
    if (a.protocol !== b.protocol) return false;
    if (effectivePort(a) !== effectivePort(b)) return false;
    const hostA = hostnameOf(left);
    const hostB = hostnameOf(right);
    if (hostA === hostB) return true;
    return LOOPBACK_HOSTS.has(hostA) && LOOPBACK_HOSTS.has(hostB);
  } catch {
    return false;
  }
}

export function collectAllowedOrigins(
  requestUrl: string,
  extraOrigins: readonly string[] = [],
): Set<string> {
  const allowed = new Set<string>();
  const fromRequest = parseHttpOrigin(requestUrl);
  if (fromRequest) allowed.add(fromRequest);
  for (const extra of extraOrigins) {
    const origin = parseHttpOrigin(extra);
    if (origin) allowed.add(origin);
  }
  return allowed;
}

function originIsAllowed(candidate: string, allowed: Set<string>): boolean {
  for (const origin of allowed) {
    if (originsEquivalent(candidate, origin)) return true;
  }
  return false;
}

export function isSameOriginRequest(
  headers: Headers,
  requestUrl: string,
  extraOrigins: readonly string[] = [],
): boolean {
  const allowed = collectAllowedOrigins(requestUrl, extraOrigins);
  if (allowed.size === 0) return false;

  const originHeader = headers.get("origin");
  if (originHeader != null && originHeader !== "") {
    const origin = parseHttpOrigin(originHeader);
    return origin != null && originIsAllowed(origin, allowed);
  }

  const referer = headers.get("referer");
  if (!referer) return false;
  const refererOrigin = parseHttpOrigin(referer);
  return refererOrigin != null && originIsAllowed(refererOrigin, allowed);
}

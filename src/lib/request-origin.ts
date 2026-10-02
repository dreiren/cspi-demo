/**
 * Same-origin check for JSON POST /api/contact.
 * Browsers send Origin on cross-site POSTs; missing/mismatched Origin (or
 * Referer when Origin is absent) is rejected so other sites cannot drive the API.
 */

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
    return origin != null && allowed.has(origin);
  }

  const referer = headers.get("referer");
  if (!referer) return false;
  const refererOrigin = parseHttpOrigin(referer);
  return refererOrigin != null && allowed.has(refererOrigin);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Network boundary (Next.js 16 `proxy.ts`, formerly `middleware.ts`).
 * When maintenance is on, deep links cannot leak old section routes —
 * everything is sent back to `/`, which renders only the maintenance UI.
 */
export function proxy(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

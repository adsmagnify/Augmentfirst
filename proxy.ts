import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Paths that should render (everything else redirects home). */
const ALLOWED_EXACT = new Set([
  "/",
  "/thank-you",
  "/booking/confirm",
  "/booking/confirm-result",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/opengraph-image",
  "/favicon.ico",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // APIs, Next internals, and static files — leave alone
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") // e.g. .png, .mp4, .svg, .js, .css
  ) {
    return NextResponse.next();
  }

  if (ALLOWED_EXACT.has(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals already filtered above;
     * keep matcher broad so unknown marketing URLs redirect home.
     */
    "/((?!_next/static|_next/image).*)",
  ],
};

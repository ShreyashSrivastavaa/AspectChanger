import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  // Critical for WebAssembly FFmpeg (SharedArrayBuffer):
  // Preserve and enforce COOP, COEP, and CORP on all localized and root routes.
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return response;
}

export const config = {
  // Match all request paths except for:
  // - /api routes
  // - /_next (Next.js internals, chunks, fonts, images)
  // - /ffmpeg (static FFmpeg wasm binaries and workers)
  // - static public files (e.g. favicon.ico, logo.svg, sitemap.xml, robots.txt)
  matcher: [
    "/((?!api|_next|ffmpeg|.*\\..*).*)",
  ],
};

import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  return intlMiddleware(request);
}

export const config = {
  // Only the home page is localized; every other route is served as-is.
  matcher: ["/", "/(ar|bn|de|en|es|fr|hi|id|it|ja|ko|nl|pl|pt|ru|th|tr|ur|vi|zh)"],
};


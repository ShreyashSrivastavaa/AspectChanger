import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  return intlMiddleware(request);
}

export const config = {
  // Localized routes: the home page and the info pages in each language.
  matcher: ["/", "/(de|en|es|fr|it|ja|ko|pt)", "/(de|es|fr|it|ja|ko|pt)/(about|contact|privacy|terms)"],
};


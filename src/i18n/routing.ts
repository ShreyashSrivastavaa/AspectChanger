import { defineRouting } from "next-intl/routing";
import { ALL_LOCALES, DEFAULT_LOCALE } from "./locales";

export const routing = defineRouting({
  locales: ALL_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  // Google International SEO: Do NOT auto-redirect crawlers via Accept-Language or cookies
  localeDetection: false,
});


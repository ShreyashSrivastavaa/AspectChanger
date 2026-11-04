import { MetadataRoute } from "next";
import { ALL_LOCALES } from "@/i18n/locales";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/i18n/seo-metadata";

const INFO_PAGES = ["/about", "/contact", "/privacy", "/terms"];

// Update when page content really changes. Search engines stop trusting a date that changes on every build.
const LAST_UPDATED = new Date("2026-11-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = buildHreflangAlternates("/");

  return [
    ...ALL_LOCALES.map((locale) => ({
      url: buildLocaleUrl(locale, "/"),
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 1 : 0.9,
      alternates: { languages: homeLanguages },
    })),
    ...INFO_PAGES.flatMap((path) => {
      const languages = buildHreflangAlternates(path);
      return ALL_LOCALES.map((locale) => ({
        url: buildLocaleUrl(locale, path),
        lastModified: LAST_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.5,
        alternates: { languages },
      }));
    }),
  ];
}

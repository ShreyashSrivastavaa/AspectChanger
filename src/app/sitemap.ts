import { MetadataRoute } from "next";
import { ALL_LOCALES } from "@/i18n/locales";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/i18n/seo-metadata";

const INFO_PAGES = ["/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = buildHreflangAlternates("/");

  return [
    ...ALL_LOCALES.map((locale) => ({
      url: buildLocaleUrl(locale, "/"),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: locale === "en" ? 1 : 0.9,
      alternates: { languages },
    })),
    ...INFO_PAGES.map((path) => ({
      url: buildLocaleUrl("en", path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

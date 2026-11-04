import type { Metadata } from "next";
import { ALL_LOCALES, DEFAULT_LOCALE, getLocaleConfig, LOCALES_MAP } from "@/i18n/locales";
import { BRAND } from "@/lib/config";

const BASE_URL = BRAND.domain.replace(/\/$/, "");

/**
 * Builds the absolute URL for a given locale and path.
 * English (default) has no locale prefix (localePrefix: "as-needed").
 */
export function buildLocaleUrl(locale: string, path: string = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${cleanPath || "/"}`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

/**
 * Generates reciprocal hreflang alternates for all supported locales + x-default.
 */
export function buildHreflangAlternates(path: string = ""): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const locale of ALL_LOCALES) {
    const config = LOCALES_MAP[locale];
    // Map hreflang code (e.g. pt-BR, zh-CN, ar, en, es) to its absolute URL
    alternates[config.hreflang] = buildLocaleUrl(locale, path);
  }

  // x-default always points to the canonical English root/route
  alternates["x-default"] = buildLocaleUrl(DEFAULT_LOCALE, path);

  return alternates;
}

export interface LocaleMetadataOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
  ogImage?: string;
}

/**
 * Generates international SEO-ready Next.js Metadata with self-referencing canonicals,
 * reciprocal hreflangs across all 20 languages, localized Open Graph & Twitter cards.
 */
export function generateLocaleMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage = "/opengraph-image",
}: LocaleMetadataOptions): Metadata {
  const config = getLocaleConfig(locale);
  const canonicalUrl = buildLocaleUrl(locale, path);
  const alternates = buildHreflangAlternates(path);

  // Compute other locales for og:locale:alternate
  const otherOgLocales = ALL_LOCALES
    .filter((loc) => loc !== locale)
    .map((loc) => LOCALES_MAP[loc].ogLocale);

  const keywordsArray = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string"
    ? keywords.split(",").map((k) => k.trim())
    : [];

  return {
    title,
    description,
    keywords: keywordsArray,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: `${BRAND.name} (ZenithDistrict)`,
      locale: config.ogLocale,
      alternateLocale: otherOgLocales,
      type: "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}


import { BRAND } from "@/lib/config";
import { getLocaleConfig } from "@/i18n/locales";
import { buildLocaleUrl } from "./seo-metadata";

/** Escapes "<" so message text can never close the JSON-LD script tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export function buildLocalizedSoftwareApplicationSchema({
  locale,
  name,
  description,
  path = "",
}: {
  locale: string;
  name: string;
  description: string;
  path?: string;
}) {
  const config = getLocaleConfig(locale);
  const pageUrl = buildLocaleUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: pageUrl,
    inLanguage: config.hreflang,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Modern Web Browser with WebCodecs)",
    browserRequirements: "Requires WebCodecs support (Chrome, Safari, Firefox, Edge)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "ZenithDistrict",
      url: "https://zenithdistrict.com",
    },
  };
}

export function buildLocalizedFAQSchema(
  faqs: Array<{ q: string; a: string }>,
  locale: string,
  path = "/"
) {
  const config = getLocaleConfig(locale);
  const pageUrl = buildLocaleUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: config.hreflang,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildLocalizedBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: string
) {
  const config = getLocaleConfig(locale);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: config.hreflang,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildLocalizedArticleSchema({
  locale,
  title,
  description,
  path,
  datePublished = "2026-01-01T00:00:00Z",
  dateModified = "2026-11-04T00:00:00Z",
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const config = getLocaleConfig(locale);
  const articleUrl = buildLocaleUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: articleUrl,
    inLanguage: config.hreflang,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "ZenithDistrict",
      url: "https://zenithdistrict.com",
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.domain,
    },
  };
}


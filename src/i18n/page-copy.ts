import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import { generateLocaleMetadata } from "@/lib/i18n/seo-metadata";

const PAGE_COPY_LOADERS = {
  en: () => import("../../messages/pages/en.json"),
  es: () => import("../../messages/pages/es.json"),
  ja: () => import("../../messages/pages/ja.json"),
  fr: () => import("../../messages/pages/fr.json"),
  de: () => import("../../messages/pages/de.json"),
  pt: () => import("../../messages/pages/pt.json"),
  ko: () => import("../../messages/pages/ko.json"),
  it: () => import("../../messages/pages/it.json"),
};

/** Text for the About, Contact, Privacy and Terms pages. Server-only, so it stays out of the client bundle. */
export async function loadPageCopy(locale: string) {
  const load = PAGE_COPY_LOADERS[locale as keyof typeof PAGE_COPY_LOADERS] ?? PAGE_COPY_LOADERS.en;
  return (await load()).default;
}

export async function buildInfoPageMetadata(
  locale: string,
  page: "about" | "contact" | "privacy" | "terms"
): Promise<Metadata> {
  const copy = await loadPageCopy(locale);
  const title = `${copy[page].metaTitle} | ${BRAND.name}`;
  return {
    ...generateLocaleMetadata({
      locale,
      path: `/${page}`,
      title,
      description: copy[page].metaDescription,
    }),
    // Absolute: the layouts above /about and /es/about would otherwise treat the title differently.
    title: { absolute: title },
  };
}

/** Fills {brand}, {domain} and {email} in translated text. */
export function fillBrand(text: string) {
  return text
    .replaceAll("{brand}", BRAND.name)
    .replaceAll("{domain}", BRAND.domain)
    .replaceAll("{email}", BRAND.contactEmail);
}

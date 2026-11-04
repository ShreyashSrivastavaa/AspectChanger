import type { Metadata } from "next";
import { ALL_LOCALES, isSupportedLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BRAND } from "@/lib/config";
import { generateLocaleMetadata } from "@/lib/i18n/seo-metadata";

export function generateStaticParams() {
  return ALL_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return generateLocaleMetadata({
    locale,
    path: "/",
    title: messages.seo?.homeTitle || "AspectCut — Video Aspect Ratio Changer",
    description: messages.seo?.homeDescription || BRAND.description,
    keywords: messages.seo?.homeKeywords || "",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return children;
}

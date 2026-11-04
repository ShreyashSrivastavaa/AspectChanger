export interface LocaleConfig {
  code: string;
  name: string;          // Native name: e.g. Español, 日本語
  englishName: string;   // English name
  hreflang: string;      // e.g. es, pt-BR, zh-CN
  ogLocale: string;      // e.g. es_ES, pt_BR, zh_CN
  direction: "ltr" | "rtl";
  region: string;
}

export const LOCALES_MAP: Record<string, LocaleConfig> = {
  en: {
    code: "en",
    name: "English",
    englishName: "English",
    hreflang: "en",
    ogLocale: "en_US",
    direction: "ltr",
    region: "US",
  },
  es: {
    code: "es",
    name: "Español",
    englishName: "Spanish",
    hreflang: "es",
    ogLocale: "es_ES",
    direction: "ltr",
    region: "ES",
  },
  ja: {
    code: "ja",
    name: "日本語",
    englishName: "Japanese",
    hreflang: "ja",
    ogLocale: "ja_JP",
    direction: "ltr",
    region: "JP",
  },
  fr: {
    code: "fr",
    name: "Français",
    englishName: "French",
    hreflang: "fr",
    ogLocale: "fr_FR",
    direction: "ltr",
    region: "FR",
  },
  de: {
    code: "de",
    name: "Deutsch",
    englishName: "German",
    hreflang: "de",
    ogLocale: "de_DE",
    direction: "ltr",
    region: "DE",
  },
  pt: {
    code: "pt",
    name: "Português",
    englishName: "Portuguese",
    hreflang: "pt-BR",
    ogLocale: "pt_BR",
    direction: "ltr",
    region: "BR",
  },
  ko: {
    code: "ko",
    name: "한국어",
    englishName: "Korean",
    hreflang: "ko",
    ogLocale: "ko_KR",
    direction: "ltr",
    region: "KR",
  },
  it: {
    code: "it",
    name: "Italiano",
    englishName: "Italian",
    hreflang: "it",
    ogLocale: "it_IT",
    direction: "ltr",
    region: "IT",
  },
};

export const ALL_LOCALES = Object.keys(LOCALES_MAP) as (keyof typeof LOCALES_MAP)[];
export const DEFAULT_LOCALE = "en";

export function isSupportedLocale(locale: string): locale is keyof typeof LOCALES_MAP {
  return locale in LOCALES_MAP;
}

export function getLocaleConfig(locale: string): LocaleConfig {
  return LOCALES_MAP[locale] || LOCALES_MAP[DEFAULT_LOCALE];
}

export function isRTL(locale: string): boolean {
  return getLocaleConfig(locale).direction === "rtl";
}


export interface LocaleConfig {
  code: string;
  name: string;          // Native name: e.g. Español, हिन्दी
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
  hi: {
    code: "hi",
    name: "हिन्दी",
    englishName: "Hindi",
    hreflang: "hi",
    ogLocale: "hi_IN",
    direction: "ltr",
    region: "IN",
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
    name: "Português (Brasil)",
    englishName: "Portuguese",
    hreflang: "pt-BR",
    ogLocale: "pt_BR",
    direction: "ltr",
    region: "BR",
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
  ru: {
    code: "ru",
    name: "Русский",
    englishName: "Russian",
    hreflang: "ru",
    ogLocale: "ru_RU",
    direction: "ltr",
    region: "RU",
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
  ko: {
    code: "ko",
    name: "한국어",
    englishName: "Korean",
    hreflang: "ko",
    ogLocale: "ko_KR",
    direction: "ltr",
    region: "KR",
  },
  zh: {
    code: "zh",
    name: "简体中文",
    englishName: "Chinese (Simplified)",
    hreflang: "zh-CN",
    ogLocale: "zh_CN",
    direction: "ltr",
    region: "CN",
  },
  ar: {
    code: "ar",
    name: "العربية",
    englishName: "Arabic",
    hreflang: "ar",
    ogLocale: "ar_AR",
    direction: "rtl",
    region: "SA",
  },
  tr: {
    code: "tr",
    name: "Türkçe",
    englishName: "Turkish",
    hreflang: "tr",
    ogLocale: "tr_TR",
    direction: "ltr",
    region: "TR",
  },
  id: {
    code: "id",
    name: "Bahasa Indonesia",
    englishName: "Indonesian",
    hreflang: "id",
    ogLocale: "id_ID",
    direction: "ltr",
    region: "ID",
  },
  nl: {
    code: "nl",
    name: "Nederlands",
    englishName: "Dutch",
    hreflang: "nl",
    ogLocale: "nl_NL",
    direction: "ltr",
    region: "NL",
  },
  pl: {
    code: "pl",
    name: "Polski",
    englishName: "Polish",
    hreflang: "pl",
    ogLocale: "pl_PL",
    direction: "ltr",
    region: "PL",
  },
  vi: {
    code: "vi",
    name: "Tiếng Việt",
    englishName: "Vietnamese",
    hreflang: "vi",
    ogLocale: "vi_VN",
    direction: "ltr",
    region: "VN",
  },
  th: {
    code: "th",
    name: "ไทย",
    englishName: "Thai",
    hreflang: "th",
    ogLocale: "th_TH",
    direction: "ltr",
    region: "TH",
  },
  bn: {
    code: "bn",
    name: "বাংলা",
    englishName: "Bengali",
    hreflang: "bn",
    ogLocale: "bn_BD",
    direction: "ltr",
    region: "BD",
  },
  ur: {
    code: "ur",
    name: "اردو",
    englishName: "Urdu",
    hreflang: "ur",
    ogLocale: "ur_PK",
    direction: "rtl",
    region: "PK",
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

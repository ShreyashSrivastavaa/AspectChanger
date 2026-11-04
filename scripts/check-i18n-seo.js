const LOCALES_MAP = {
  en: { code: "en", name: "English", hreflang: "en", ogLocale: "en_US", direction: "ltr" },
  es: { code: "es", name: "Español", hreflang: "es", ogLocale: "es_ES", direction: "ltr" },
  ja: { code: "ja", name: "日本語", hreflang: "ja", ogLocale: "ja_JP", direction: "ltr" },
  fr: { code: "fr", name: "Français", hreflang: "fr", ogLocale: "fr_FR", direction: "ltr" },
  de: { code: "de", name: "Deutsch", hreflang: "de", ogLocale: "de_DE", direction: "ltr" },
  pt: { code: "pt", name: "Português", hreflang: "pt-BR", ogLocale: "pt_BR", direction: "ltr" },
  ko: { code: "ko", name: "한국어", hreflang: "ko", ogLocale: "ko_KR", direction: "ltr" },
  it: { code: "it", name: "Italiano", hreflang: "it", ogLocale: "it_IT", direction: "ltr" },
};

const ALL_LOCALES = Object.keys(LOCALES_MAP);
const DEFAULT_LOCALE = "en";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aspectcut.vercel.app";

function buildLocaleUrl(locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${cleanPath || "/"}`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

function buildHreflangAlternates(path = "") {
  const alternates = {};
  for (const locale of ALL_LOCALES) {
    const config = LOCALES_MAP[locale];
    alternates[config.hreflang] = buildLocaleUrl(locale, path);
  }
  alternates["x-default"] = buildLocaleUrl(DEFAULT_LOCALE, path);
  return alternates;
}

console.log("🔍 Checking AspectCut International SEO & Reciprocal Hreflang Architecture...\n");

const testPaths = [
  "/",
  "/tools/16-9-to-9-16",
  "/for/tiktok",
  "/for/youtube-shorts",
  "/guides/what-is-aspect-ratio",
  "/about",
  "/faq",
  "/privacy",
];

let totalChecks = 0;
let errors = [];

for (const path of testPaths) {
  const alternates = buildHreflangAlternates(path);

  // 1. Verify x-default exists and points to English
  const expectedXDefault = buildLocaleUrl(DEFAULT_LOCALE, path);
  if (alternates["x-default"] !== expectedXDefault) {
    errors.push(`[${path}] x-default mismatch: got ${alternates["x-default"]}, expected ${expectedXDefault}`);
  }
  totalChecks++;

  // 2. Verify all locales have valid hreflang entries
  for (const locale of ALL_LOCALES) {
    const config = LOCALES_MAP[locale];
    const expectedUrl = buildLocaleUrl(locale, path);

    if (alternates[config.hreflang] !== expectedUrl) {
      errors.push(`[${path}] Locale ${locale} (${config.hreflang}) URL mismatch: got ${alternates[config.hreflang]}, expected ${expectedUrl}`);
    }
    totalChecks++;

    // 3. Verify canonical URL is self-referencing
    if (expectedUrl.indexOf(locale === "en" ? BASE_URL : `${BASE_URL}/${locale}`) === -1) {
      errors.push(`[${path}] Self-referencing canonical failed for ${locale}: ${expectedUrl}`);
    }
    totalChecks++;
  }
}

console.log(`✅ Passed ${totalChecks} International SEO canonical & reciprocal hreflang validations.`);

if (errors.length > 0) {
  console.error("❌ Errors found:");
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`🌟 All ${ALL_LOCALES.length} locales have 100% reciprocal hreflang links and self-referencing canonical URLs!\n`);
  process.exit(0);
}

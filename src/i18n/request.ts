import { getRequestConfig } from "next-intl/server";
import { isSupportedLocale, DEFAULT_LOCALE } from "./locales";
import { loadHomeCopy } from "./home-copy";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isSupportedLocale(locale)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}.json`)).default,
      home: await loadHomeCopy(locale),
    },
  };
});


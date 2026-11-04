const HOME_COPY_LOADERS = {
  en: () => import("../../messages/home/en.json"),
  es: () => import("../../messages/home/es.json"),
  ja: () => import("../../messages/home/ja.json"),
  fr: () => import("../../messages/home/fr.json"),
  de: () => import("../../messages/home/de.json"),
  pt: () => import("../../messages/home/pt.json"),
  ko: () => import("../../messages/home/ko.json"),
  it: () => import("../../messages/home/it.json"),
};

export async function loadHomeCopy(locale: string) {
  const load = HOME_COPY_LOADERS[locale as keyof typeof HOME_COPY_LOADERS] ?? HOME_COPY_LOADERS.en;
  return (await load()).default;
}

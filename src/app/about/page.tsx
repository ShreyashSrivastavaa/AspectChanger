import LocalizedAboutPage, { generateMetadata as generateLocalizedMetadata } from "../[locale]/about/page";

const params = Promise.resolve({ locale: "en" });

export function generateMetadata() {
  return generateLocalizedMetadata({ params });
}

export default function AboutPage() {
  return <LocalizedAboutPage params={params} />;
}

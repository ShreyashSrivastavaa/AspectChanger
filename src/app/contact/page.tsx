import LocalizedContactPage, { generateMetadata as generateLocalizedMetadata } from "../[locale]/contact/page";

const params = Promise.resolve({ locale: "en" });

export function generateMetadata() {
  return generateLocalizedMetadata({ params });
}

export default function ContactPage() {
  return <LocalizedContactPage params={params} />;
}

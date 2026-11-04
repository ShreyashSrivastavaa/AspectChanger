import LocalizedPrivacyPage, { generateMetadata as generateLocalizedMetadata } from "../[locale]/privacy/page";

const params = Promise.resolve({ locale: "en" });

export function generateMetadata() {
  return generateLocalizedMetadata({ params });
}

export default function PrivacyPage() {
  return <LocalizedPrivacyPage params={params} />;
}

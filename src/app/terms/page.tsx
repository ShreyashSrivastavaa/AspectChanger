import LocalizedTermsPage, { generateMetadata as generateLocalizedMetadata } from "../[locale]/terms/page";

const params = Promise.resolve({ locale: "en" });

export function generateMetadata() {
  return generateLocalizedMetadata({ params });
}

export default function TermsPage() {
  return <LocalizedTermsPage params={params} />;
}

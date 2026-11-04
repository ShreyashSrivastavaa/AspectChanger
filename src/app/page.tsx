import LocalizedHomePage from "./[locale]/page";

export default function HomePage() {
  return <LocalizedHomePage params={Promise.resolve({ locale: "en" })} />;
}

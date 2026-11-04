import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import { BRAND } from "@/lib/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { getLocaleConfig, isRTL } from "@/i18n/locales";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  title: {
    default: "Resize Video Online Free, No Upload or Watermark | AspectCut",
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Resize video online for free. Change video size and aspect ratio for Instagram, TikTok, YouTube and more in your browser, with no upload and no watermark.",
  keywords: [
    "resize video",
    "video resize",
    "resize video online",
    "video resize online",
    "video resizer",
    "video aspect ratio changer",
    "resize video for instagram",
    "convert video to 9:16",
    "16:9 to 9:16 converter",
    "video resizer for youtube shorts",
    "tiktok video resizer",
    "crop video online free",
  ],
  authors: [{ name: `${BRAND.name} (ZenithDistrict)` }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRAND.domain,
    title: "Resize Video Online Free, No Upload or Watermark | AspectCut",
    description:
      "Resize video online for free. Change video size and aspect ratio for Instagram, TikTok, YouTube and more in your browser, with no upload and no watermark.",
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Video Online Free | AspectCut",
    description:
      "Resize video online for free in your browser, with no upload and no watermark.",
  },
  alternates: {
    canonical: BRAND.domain,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = isRTL(locale) ? "rtl" : "ltr";
  const config = getLocaleConfig(locale);

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.domain,
    logo: `${BRAND.domain}/logo.png`,
    email: BRAND.contactEmail,
    parentOrganization: {
      "@type": "Organization",
      name: "ZenithDistrict",
      url: "https://zenithdistrict.com",
    },
  };

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AspectCut Video Resizer",
    url: BRAND.domain,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Modern Web Browser)",
    browserRequirements: "Requires WebCodecs support (Chrome, Safari, Firefox, Edge)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to resize video in the browser. Resize landscape, square and vertical videos with cropping, a blurred background or bars, without uploading the file.",
  };

  return (
    <html lang={config.hreflang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint so dark mode doesn't flash light on load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("aspectcut-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
      </head>
      <body 
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Shell>
            {children}
          </Shell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

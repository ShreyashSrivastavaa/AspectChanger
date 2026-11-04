import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import { BRAND } from "@/lib/config";

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
    default: "AspectCut — Video Aspect Ratio Changer (Online, Free, No Upload)",
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Change video aspect ratios (16:9 to 9:16, 1:1, 4:5, 21:9) in seconds directly in your browser. 100% private, zero uploads, no watermark. Powered by client-side WebAssembly.",
  keywords: [
    "video aspect ratio changer",
    "change video aspect ratio online",
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
    title: "AspectCut — Video Aspect Ratio Changer (Online, Free, No Upload)",
    description:
      "Resize and reframe videos for TikTok, Instagram Reels, YouTube Shorts, and widescreen feeds locally in your browser with zero server uploads.",
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "AspectCut — Video Aspect Ratio Changer",
    description:
      "Change video aspect ratios locally in the browser with zero cloud uploads and no watermarks.",
  },
  alternates: {
    canonical: BRAND.domain,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    name: "AspectCut Video Aspect Ratio Changer",
    url: BRAND.domain,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Modern Web Browser)",
    browserRequirements: "Requires WebAssembly support (Chrome, Safari, Firefox, Edge)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Client-side video aspect ratio converter that reframes landscape, square, and vertical videos with focal cropping, downscaled ambient blur, or letterbox bars without cloud uploads.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}

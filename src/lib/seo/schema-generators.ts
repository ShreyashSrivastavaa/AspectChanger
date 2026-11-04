// src/lib/seo/schema-generators.ts
// Strongly-typed Schema.org JSON-LD generators for AspectCut.
// Compliant with Google Search Central guidelines and Schema.org standards.

import { BRAND } from "@/lib/config";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface HowToStepItem {
  name: string;
  text: string;
  url?: string;
}

/**
 * Generates SoftwareApplication schema for tools, calculators, and interactive widgets.
 */
export function buildSoftwareApplicationSchema({
  name,
  description,
  url,
  operatingSystem = "Web Browser (Chrome, Safari, Firefox, Edge)",
  applicationCategory = "MultimediaApplication",
  featureList = [
    "Client-side video aspect ratio reframing",
    "Zero cloud video uploads (100% private WebAssembly processing)",
    "Focal point crop framing with draggable selector",
    "Dynamic blurred background mirror extensions",
    "Pillarbox and letterbox padding with even-integer macroblock alignment",
    "Lossless AAC audio stream copying",
    "No watermarks and no file size paywalls"
  ],
}: {
  name: string;
  description: string;
  url: string;
  operatingSystem?: string;
  applicationCategory?: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    browserRequirements: "Requires WebAssembly and SharedArrayBuffer support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList,
    author: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.domain,
    },
  };
}

/**
 * Generates HowTo schema for procedural workflows and instructional conversions.
 */
export function buildHowToSchema({
  name,
  description,
  url,
  steps,
  totalTime = "PT1M",
}: {
  name: string;
  description: string;
  url: string;
  steps: (string | HowToStepItem)[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    tool: [
      {
        "@type": "HowToTool",
        name: "AspectCut WebAssembly Video Engine",
      },
    ],
    step: steps.map((s, idx) => {
      if (typeof s === "string") {
        return {
          "@type": "HowToStep",
          position: idx + 1,
          name: `Step ${idx + 1}: ${s.split(".")[0]}`,
          text: s,
          url: `${url}#step-${idx + 1}`,
        };
      }
      return {
        "@type": "HowToStep",
        position: idx + 1,
        name: s.name,
        text: s.text,
        url: s.url || `${url}#step-${idx + 1}`,
      };
    }),
  };
}

/**
 * Generates FAQPage schema for pages containing Q&A accordions.
 */
export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Generates BreadcrumbList schema for hierarchical navigation.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BRAND.domain}${item.url}`,
    })),
  };
}

/**
 * Generates Organization schema with verified facts and entity definition.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.domain,
    logo: `${BRAND.domain}/icon.png`,
    description: BRAND.canonicalEntityStatement,
    parentOrganization: {
      "@type": "Organization",
      name: "ZenithDistrict",
      url: "https://zenithdistrict.com",
    },
    knowsAbout: [
      "Video aspect ratio transformation",
      "FFmpeg WebAssembly compilation",
      "H.264, HEVC, and VP9 video codecs",
      "Social media video formats (TikTok, Reels, Shorts)",
      "Client-side media privacy",
    ],
    sameAs: BRAND.socialLinks ? Object.values(BRAND.socialLinks).filter(Boolean) : [],
  };
}

/**
 * Generates Article schema for technical documentation and pillar guides.
 */
export function buildArticleSchema({
  title,
  description,
  url,
  publishedDate,
  updatedDate,
  author,
}: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedDate,
    dateModified: updatedDate,
    author: {
      "@type": "Organization",
      name: author,
      url: BRAND.domain,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.domain,
      logo: {
        "@type": "ImageObject",
        url: `${BRAND.domain}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Generates DefinedTerm schema for technical glossary entries.
 */
export function buildDefinedTermSchema({
  term,
  definition,
  url,
  category,
}: {
  term: string;
  definition: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    termCode: term.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "AspectCut Video Engineering Glossary",
      url: `${BRAND.domain}/glossary`,
    },
    url,
  };
}

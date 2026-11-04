import { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";
import { RATIO_PAIRS_DATA } from "@/lib/seo/ratio-pairs-data";
import { VERIFIED_PLATFORM_SPECS } from "@/lib/seo/verified-specs";
import { DEVICES_DATA } from "@/lib/seo/devices-data";
import { FORMATS_DATA } from "@/lib/seo/formats-data";
import { PROBLEMS_DATA } from "@/lib/seo/problems-data";
import { COMPARISONS_DATA } from "@/lib/seo/comparisons-data";
import { RESOLUTIONS_DATA } from "@/lib/seo/resolutions-data";
import { GLOSSARY_TERMS } from "@/lib/seo/glossary-data";
import { GUIDES_DATA } from "@/lib/seo/guides-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.domain;
  const now = new Date();

  // 1. Core static and hub pages
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/for`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/from`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/convert`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/fix`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resolution`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/calculator/aspect-ratio`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/benchmarks`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/data/platform-specs`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/all-pages`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // 2. Programmatic conversion pairs (/tools/[pair])
  const ratioPairRoutes: MetadataRoute.Sitemap = RATIO_PAIRS_DATA.map((p) => ({
    url: `${baseUrl}/tools/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Platform presets (/for/[platform])
  const platformRoutes: MetadataRoute.Sitemap = Object.values(VERIFIED_PLATFORM_SPECS).map((p) => ({
    url: `${baseUrl}/for/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 4. Source devices (/from/[device])
  const deviceRoutes: MetadataRoute.Sitemap = Object.values(DEVICES_DATA).map((d) => ({
    url: `${baseUrl}/from/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 5. Container formats (/convert/[slug])
  const formatRoutes: MetadataRoute.Sitemap = Object.values(FORMATS_DATA).map((f) => ({
    url: `${baseUrl}/convert/${f.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 6. Problem solutions (/fix/[slug])
  const problemRoutes: MetadataRoute.Sitemap = Object.values(PROBLEMS_DATA).map((pr) => ({
    url: `${baseUrl}/fix/${pr.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 7. Aspect ratio comparisons (/compare/[slug])
  const comparisonRoutes: MetadataRoute.Sitemap = Object.values(COMPARISONS_DATA).map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 8. Dimension resolution specs (/resolution/[dimension])
  const resolutionRoutes: MetadataRoute.Sitemap = Object.values(RESOLUTIONS_DATA).map((r) => ({
    url: `${baseUrl}/resolution/${r.dimension}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 9. Calculator ratio resolution tables (/calculator/resolution/[ratio])
  const calculatorRatioRoutes: MetadataRoute.Sitemap = [
    "16-9",
    "9-16",
    "1-1",
    "4-5",
    "4-3",
    "21-9",
  ].map((ratio) => ({
    url: `${baseUrl}/calculator/resolution/${ratio}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 10. Glossary terms (/glossary/[term])
  const glossaryRoutes: MetadataRoute.Sitemap = Object.values(GLOSSARY_TERMS).map((g) => ({
    url: `${baseUrl}/glossary/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 11. Pillar guides (/guides/[slug])
  const guideRoutes: MetadataRoute.Sitemap = Object.values(GUIDES_DATA).map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    ...coreRoutes,
    ...ratioPairRoutes,
    ...platformRoutes,
    ...deviceRoutes,
    ...formatRoutes,
    ...problemRoutes,
    ...comparisonRoutes,
    ...resolutionRoutes,
    ...calculatorRatioRoutes,
    ...glossaryRoutes,
    ...guideRoutes,
  ];
}

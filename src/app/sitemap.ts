import { MetadataRoute } from "next";
import { ALL_LOCALES } from "@/i18n/locales";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/i18n/seo-metadata";
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
  const now = new Date();

  // Define base relative route paths with their SEO properties
  const baseEntries: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    // 1. Core static and hub pages
    { path: "/", changeFrequency: "daily", priority: 1.0 },
    { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
    { path: "/for", changeFrequency: "weekly", priority: 0.9 },
    { path: "/from", changeFrequency: "weekly", priority: 0.85 },
    { path: "/convert", changeFrequency: "weekly", priority: 0.85 },
    { path: "/fix", changeFrequency: "weekly", priority: 0.85 },
    { path: "/compare", changeFrequency: "weekly", priority: 0.8 },
    { path: "/resolution", changeFrequency: "weekly", priority: 0.8 },
    { path: "/calculator", changeFrequency: "weekly", priority: 0.85 },
    { path: "/calculator/aspect-ratio", changeFrequency: "weekly", priority: 0.85 },
    { path: "/glossary", changeFrequency: "weekly", priority: 0.8 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.85 },
    { path: "/methodology", changeFrequency: "monthly", priority: 0.7 },
    { path: "/benchmarks", changeFrequency: "monthly", priority: 0.75 },
    { path: "/data/platform-specs", changeFrequency: "weekly", priority: 0.85 },
    { path: "/press", changeFrequency: "monthly", priority: 0.6 },
    { path: "/all-pages", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "weekly", priority: 0.7 },
    { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
    { path: "/changelog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },

    // 2. Programmatic conversion pairs (/tools/[pair])
    ...RATIO_PAIRS_DATA.map((p) => ({
      path: `/tools/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),

    // 3. Platform presets (/for/[platform])
    ...Object.values(VERIFIED_PLATFORM_SPECS).map((p) => ({
      path: `/for/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),

    // 4. Source devices (/from/[device])
    ...Object.values(DEVICES_DATA).map((d) => ({
      path: `/from/${d.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),

    // 5. Container formats (/convert/[slug])
    ...Object.values(FORMATS_DATA).map((f) => ({
      path: `/convert/${f.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),

    // 6. Problem solutions (/fix/[slug])
    ...Object.values(PROBLEMS_DATA).map((pr) => ({
      path: `/fix/${pr.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),

    // 7. Aspect ratio comparisons (/compare/[slug])
    ...Object.values(COMPARISONS_DATA).map((c) => ({
      path: `/compare/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // 8. Dimension resolution specs (/resolution/[dimension])
    ...Object.values(RESOLUTIONS_DATA).map((r) => ({
      path: `/resolution/${r.dimension}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // 9. Calculator ratio resolution tables (/calculator/resolution/[ratio])
    ...RATIO_PAIRS_DATA.slice(0, 6).map((p) => ({
      path: `/calculator/resolution/${p.slug.split("-to-")[0]}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // 10. Educational guides (/guides/[slug])
    ...Object.values(GUIDES_DATA).map((g) => ({
      path: `/guides/${g.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),

    // 11. Glossary terms (/glossary/[term])
    ...Object.values(GLOSSARY_TERMS).map((gt) => ({
      path: `/glossary/${gt.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  // Generate full matrix of URLs across all 20 locales with reciprocal hreflang alternates
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const entry of baseEntries) {
    const alternatesLanguages = buildHreflangAlternates(entry.path);

    for (const locale of ALL_LOCALES) {
      sitemapEntries.push({
        url: buildLocaleUrl(locale, entry.path),
        lastModified: now,
        changeFrequency: entry.changeFrequency,
        priority: locale === "en" ? entry.priority : Math.max(0.4, entry.priority - 0.05),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  return sitemapEntries;
}

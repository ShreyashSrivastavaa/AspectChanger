import { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const allowTraining = BRAND.aiCrawlerPolicy?.allowTrainingCrawlers ?? true;

  // Search and live retrieval bots (Must ALWAYS be allowed to maximize citations and answer engine inclusion)
  const searchAndRetrievalBots = [
    "*",
    "Googlebot",
    "Bingbot",
    "Applebot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "Claude-SearchBot",
    "Claude-User",
  ];

  // Foundation model training crawlers (Configurable via BRAND.aiCrawlerPolicy)
  const trainingCrawlers = [
    "GPTBot",
    "ClaudeBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Meta-ExternalAgent",
  ];

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: searchAndRetrievalBots,
      allow: ["/", "/api/og", "/data/platform-specs", "/llms.txt", "/llms-full.txt"],
      disallow: ["/api/waitlist", "/_next/"],
    },
    {
      userAgent: trainingCrawlers,
      allow: allowTraining ? ["/"] : undefined,
      disallow: allowTraining ? ["/api/waitlist", "/_next/"] : ["/"],
    },
  ];

  return {
    rules,
    sitemap: `${BRAND.domain}/sitemap.xml`,
    host: BRAND.domain,
  };
}

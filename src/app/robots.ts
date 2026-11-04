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
      allow: "/",
      // Never block /_next/: Google needs the CSS and JS there to render and rank the page.
      disallow: "/api/waitlist",
    },
    {
      userAgent: trainingCrawlers,
      allow: allowTraining ? "/" : undefined,
      disallow: allowTraining ? "/api/waitlist" : "/",
    },
  ];

  return {
    rules,
    sitemap: `${BRAND.domain}/sitemap.xml`,
  };
}

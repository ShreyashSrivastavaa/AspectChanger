export const BRAND = {
  name: "AspectCut",
  parentCompany: "ZenithDistrict",
  parentCompanyUrl: "https://zenithdistrict.com",
  attribution: "A product of ZenithDistrict (zenithdistrict.com)",
  tagline: "Free online video resizer",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://aspectcut.vercel.app",
  canonicalEntityStatement:
    "AspectCut is a free tool to resize video online. It processes files locally in your browser with WebCodecs; videos are not uploaded to a server.",
  contactEmail: "support@aspectcut.com",
  description:
    "AspectCut is a free tool by ZenithDistrict to resize video online. It processes files locally in your browser with WebCodecs; videos are not uploaded to a server.",
  
  // Team and Organization Attribution
  team: {
    founderName: "ZenithDistrict Team",
    founderRole: "Product & Engineering",
    founderTwitter: "https://twitter.com/zenithdistrict",
    founderLinkedIn: "https://linkedin.com/company/zenithdistrict",
    organization: "ZenithDistrict",
    organizationUrl: "https://zenithdistrict.com",
    foundingYear: 2026,
    mission:
      "Empowering video creators with fast, private, client-side browser tools that eliminate slow cloud queues, privacy leaks, and subscription watermarks.",
  },

  // Official Social & Platform Links
  socialLinks: {
    twitter: "https://twitter.com/aspectcut", // TODO: Update with official account
    github: "https://github.com/aspectcut/aspectcut", // TODO: Update with official repo
    linkedin: "https://linkedin.com/company/aspectcut", // TODO: Update with official page
    producthunt: "https://www.producthunt.com/products/aspectcut", // TODO: Update with official launch link
  },

  // AI Crawler Policy Configuration
  // Search & Retrieval Bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) are always allowed for citations.
  // Set allowTrainingCrawlers to false if you wish to block model training crawlers (GPTBot, ClaudeBot, Google-Extended).
  // Note: Blocking Google-Extended controls Gemini foundational model training and does NOT affect Google Search or AI Overviews.
  aiCrawlerPolicy: {
    allowTrainingCrawlers: true,
  },

  // Supported aspect ratio standards
  aspectRatios: [
    { id: "9:16", label: "9:16", name: "Vertical / Reels / TikTok / Shorts", w: 9, h: 16, commonRes: "1080x1920" },
    { id: "16:9", label: "16:9", name: "Widescreen / YouTube / Landscape", w: 16, h: 9, commonRes: "1920x1080" },
    { id: "1:1", label: "1:1", name: "Square / Instagram Feed", w: 1, h: 1, commonRes: "1080x1080" },
    { id: "4:5", label: "4:5", name: "Portrait / Instagram Feed", w: 4, h: 5, commonRes: "1080x1350" },
    { id: "4:3", label: "4:3", name: "Standard / Vintage / iPad", w: 4, h: 3, commonRes: "1440x1080" },
    { id: "21:9", label: "21:9", name: "Ultrawide / Cinematic", w: 21, h: 9, commonRes: "2560x1080" },
  ],
};

// src/lib/seo/related-links.ts
// Semantic internal linking engine for AspectCut.
// Computes deterministic, highly relevant cross-cluster links (siblings, parent hubs, target platforms, guides).

export interface RelatedLink {
  href: string;
  label: string;
  category: "tool" | "platform" | "guide" | "problem" | "glossary" | "resolution";
  contextDescription?: string;
}

/**
 * Returns 4 to 8 highly relevant internal links for a ratio conversion pair.
 */
export function getRelatedLinksForRatioPair(slug: string): RelatedLink[] {
  const links: RelatedLink[] = [];

  if (slug === "16-9-to-9-16") {
    return [
      { href: "/for/youtube-shorts", label: "YouTube Shorts Specs & Safe Zones", category: "platform" },
      { href: "/for/tiktok", label: "TikTok 9:16 Video Format", category: "platform" },
      { href: "/for/instagram-reels", label: "Instagram Reels Dimensions", category: "platform" },
      { href: "/tools/9-16-to-16-9", label: "9:16 to 16:9 Reverse Converter", category: "tool" },
      { href: "/tools/16-9-to-1-1", label: "16:9 to 1:1 Square Reframe", category: "tool" },
      { href: "/fix/add-blurred-background", label: "Add Blurred Background Mirror", category: "problem" },
      { href: "/guides/how-to-convert-horizontal-video-to-vertical", label: "Guide: Horizontal to Vertical Conversion", category: "guide" },
      { href: "/resolution/1080x1920", label: "1080×1920 HD Resolution Spec", category: "resolution" },
    ];
  }

  if (slug === "9-16-to-16-9") {
    return [
      { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16 Vertical Converter", category: "tool" },
      { href: "/tools/9-16-to-1-1", label: "9:16 to 1:1 Square Reframe", category: "tool" },
      { href: "/fix/remove-black-bars", label: "Remove Pillarbox Black Bars", category: "problem" },
      { href: "/guides/what-is-aspect-ratio", label: "Guide: What is Video Aspect Ratio", category: "guide" },
      { href: "/for/facebook-video", label: "Facebook Widescreen Specs", category: "platform" },
      { href: "/resolution/1920x1080", label: "1920×1080 Full HD Dimensions", category: "resolution" },
    ];
  }

  if (slug === "16-9-to-1-1") {
    return [
      { href: "/for/linkedin-video", label: "LinkedIn 1:1 Video Specifications", category: "platform" },
      { href: "/for/instagram-feed", label: "Instagram Feed 1:1 Square Posts", category: "platform" },
      { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16 Vertical Converter", category: "tool" },
      { href: "/tools/1-1-to-16-9", label: "1:1 to 16:9 Widescreen Reframe", category: "tool" },
      { href: "/resolution/1080x1080", label: "1080×1080 Square Resolution", category: "resolution" },
      { href: "/guides/aspect-ratio-cheat-sheet", label: "Social Aspect Ratio Cheat Sheet", category: "guide" },
    ];
  }

  // General fallback for other ratio pairs
  return [
    { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16 Converter", category: "tool" },
    { href: "/tools/9-16-to-16-9", label: "9:16 to 16:9 Converter", category: "tool" },
    { href: "/guides/crop-vs-letterbox-vs-blur-background", label: "Crop vs Letterbox vs Blur Background", category: "guide" },
    { href: "/guides/aspect-ratio-cheat-sheet", label: "All Platform Aspect Ratios", category: "guide" },
    { href: "/calculator/aspect-ratio", label: "Aspect Ratio Calculator", category: "tool" },
    { href: "/fix/remove-black-bars", label: "Fix Letterbox Black Bars", category: "problem" },
  ];
}

/**
 * Returns 4 to 8 relevant internal links for a platform preset.
 */
export function getRelatedLinksForPlatform(slug: string): RelatedLink[] {
  if (slug === "tiktok" || slug === "youtube-shorts" || slug === "instagram-reels") {
    return [
      { href: "/tools/16-9-to-9-16", label: "Convert 16:9 Landscape to 9:16", category: "tool" },
      { href: "/tools/1-1-to-9-16", label: "Convert 1:1 Square to 9:16", category: "tool" },
      { href: "/fix/add-blurred-background", label: "Add Ambient Background Blur", category: "problem" },
      { href: "/guides/best-video-aspect-ratio-for-" + (slug === "tiktok" ? "tiktok" : slug === "youtube-shorts" ? "youtube-shorts" : "instagram-reels"), label: `Official Guide: Best Ratio for ${slug}`, category: "guide" },
      { href: "/resolution/1080x1920", label: "1080×1920 Dimension Standards", category: "resolution" },
      { href: "/data/platform-specs", label: "Open Specifications Dataset (CSV/JSON)", category: "guide" },
    ];
  }

  return [
    { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16 Converter", category: "tool" },
    { href: "/tools/16-9-to-1-1", label: "16:9 to 1:1 Square Tool", category: "tool" },
    { href: "/guides/aspect-ratio-cheat-sheet", label: "Platform Aspect Ratio Cheat Sheet", category: "guide" },
    { href: "/data/platform-specs", label: "Download Full Specs Dataset", category: "guide" },
    { href: "/calculator/aspect-ratio", label: "Aspect Ratio Calculator", category: "tool" },
  ];
}


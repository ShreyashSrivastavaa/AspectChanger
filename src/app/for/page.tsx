import type { Metadata } from "next";
import Link from "next/link";
import { VERIFIED_PLATFORM_SPECS } from "@/lib/seo/verified-specs";
import { BRAND } from "@/lib/config";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `Verified Social Platform Video Specifications | ${BRAND.name}`,
  description:
    "Official 2026 video aspect ratios, resolutions, duration limits, and safe zones for TikTok, YouTube Shorts, Instagram Reels, LinkedIn, Facebook, and X.",
  alternates: {
    canonical: `${BRAND.domain}/for`,
  },
};

export default function PlatformsIndexPage() {
  const platforms = Object.values(VERIFIED_PLATFORM_SPECS);

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BRAND.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Platforms",
        item: `${BRAND.domain}/for`,
      },
    ],
  };

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-8" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Platforms</span>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Verified Platform Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Social Platform Video Resizers
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Pre-calibrated aspect ratio presets, safe zone dimensions, and file limits verified against official developer documentation.
        </p>
      </div>

      {/* Grid of frosted glass cards */}
      <div className="grid grid-cols-1 gap-3">
        {platforms.map((plat) => (
          <Link
            key={plat.slug}
            href={`/for/${plat.slug}`}
            className="group p-5 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 pr-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#c89c6e] px-2.5 py-0.5 rounded-full bg-[#c89c6e]/10">
                  {plat.primaryRatio}
                </span>
                <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                  {plat.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/30">
                  <ShieldCheck className="w-2.5 h-2.5" /> {plat.verifiedMonthYear}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Max duration: {plat.maxDuration} &bull; Max file: {plat.maxFileSize} &bull; Resolution: {plat.recommendedResolution}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[#c89c6e] shrink-0 flex items-center gap-1.5 font-medium">
              Resize Video <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

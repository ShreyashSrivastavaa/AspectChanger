import type { Metadata } from "next";
import Link from "next/link";
import { RATIO_PAIRS_DATA } from "@/lib/seo/ratio-pairs-data";
import { BRAND } from "@/lib/config";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Video Aspect Ratio Converters Directory | ${BRAND.name}`,
  description:
    "Complete directory of client-side video aspect ratio converters. Reframe 16:9, 9:16, 1:1, 4:5, 4:3, 21:9, and anamorphic scope with zero uploads.",
  alternates: {
    canonical: `${BRAND.domain}/tools`,
  },
};

export default function ToolsIndexPage() {
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
        name: "Tools",
        item: `${BRAND.domain}/tools`,
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
        <span className="text-[var(--text-main)] font-medium">Tools</span>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Conversion Instruments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Video Aspect Ratio Converters
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Fast, client-side reformatting between horizontal, vertical, square, and cinema aspect ratios without cloud compression or watermarks.
        </p>
      </div>

      {/* Grid of frosted glass cards */}
      <div className="grid grid-cols-1 gap-3">
        {RATIO_PAIRS_DATA.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group p-5 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 pr-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#c89c6e] px-2.5 py-0.5 rounded-full bg-[#c89c6e]/10">
                  {tool.sourceRatio} &rarr; {tool.targetRatio}
                </span>
                <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                  {tool.h1}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {tool.summary}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[#c89c6e] shrink-0 flex items-center gap-1.5 font-medium">
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

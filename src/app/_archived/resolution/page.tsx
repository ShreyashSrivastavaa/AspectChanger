import type { Metadata } from "next";
import Link from "next/link";
import { RESOLUTIONS_DATA } from "@/lib/seo/resolutions-data";
import { BRAND } from "@/lib/config";
import { ArrowRight, Monitor, Video } from "lucide-react";

export const metadata: Metadata = {
  title: `Standard Video Resolutions & Aspect Ratio Guide | ${BRAND.name}`,
  description:
    "Complete reference for standard video resolutions: 1080x1920 (9:16), 1920x1080 (16:9), 1080x1080 (1:1), 1080x1350 (4:5), and 3840x2160 (4K).",
  alternates: {
    canonical: `${BRAND.domain}/resolution`,
  },
};

export default function ResolutionIndexPage() {
  const resolutions = Object.values(RESOLUTIONS_DATA);

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
        name: "Resolutions",
        item: `${BRAND.domain}/resolution`,
      },
    ],
  };

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-8" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Resolutions</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Spatial Pixel Geometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Standard Video Resolutions & Dimensions
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Technical specifications, pixel counts, platform destinations, and aspect ratio mappings for all standard video resolutions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {resolutions.map((res) => (
          <Link
            key={res.dimension}
            href={`/resolution/${res.dimension}`}
            className="group p-5 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 pr-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#c89c6e] px-2.5 py-0.5 rounded-full bg-[#c89c6e]/10">
                  {res.dimension} ({res.aspectRatioLabel})
                </span>
                <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                  {res.standardName}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {res.summary}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[#c89c6e] shrink-0 flex items-center gap-1.5 font-medium">
              View Specs <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES_DATA } from "@/lib/seo/guides-data";
import { BRAND } from "@/lib/config";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: `Aspect Ratio Guides & Technical Documentation | ${BRAND.name}`,
  description:
    "Authoritative guides, calculations, safe zone recommendations, and visual comparisons for video aspect ratios across short-form, mobile feeds, and widescreen.",
  alternates: {
    canonical: `${BRAND.domain}/guides`,
  },
};

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDES_DATA);

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
        name: "Guides",
        item: `${BRAND.domain}/guides`,
      },
    ],
  };

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-12 space-y-10" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Guides</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Documentation & In-Depth Pillar Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Video Aspect Ratio Guides
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Comprehensive, verified engineering masterclasses on reframing, losslessness, safe margins, and platform video optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group p-6 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 block space-y-2"
          >
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
              <span className="text-[#c89c6e] font-semibold">{guide.author}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {guide.readingTimeMinutes} min read
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
              {guide.h1}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
              {guide.introduction}
            </p>
            <div className="pt-2 flex items-center gap-1.5 font-mono text-xs text-[#c89c6e] font-medium">
              Read Pillar Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

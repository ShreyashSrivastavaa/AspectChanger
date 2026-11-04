import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISONS_DATA } from "@/lib/seo/comparisons-data";
import { BRAND } from "@/lib/config";
import { ArrowRight, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `Free Video Resizer Comparisons & Alternatives | ${BRAND.name}`,
  description:
    "Honest technical comparisons of AspectCut vs Kapwing, Clideo, VEED, and other cloud resizers. Why client-side WebAssembly beats cloud uploads.",
  alternates: {
    canonical: `${BRAND.domain}/compare`,
  },
};

export default function CompareIndexPage() {
  const comparisons = Object.values(COMPARISONS_DATA);

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
        name: "Compare",
        item: `${BRAND.domain}/compare`,
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
        <span className="text-[var(--text-main)] font-medium">Compare</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Objective Architectural Comparisons</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Compare Video Resizers & Alternatives
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Detailed technical comparisons analyzing watermarks, privacy models, upload requirements, and rendering performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group p-5 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 pr-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#c89c6e] px-2.5 py-0.5 rounded-full bg-[#c89c6e]/10">
                  {comp.competitorName}
                </span>
                <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                  {comp.h1}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {comp.summary}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[#c89c6e] shrink-0 flex items-center gap-1.5 font-medium">
              Read Comparison <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY_TERMS, GlossaryTermDetail } from "@/lib/seo/glossary-data";
import { BRAND } from "@/lib/config";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: `Video Engineering & Aspect Ratio Glossary | ${BRAND.name}`,
  description:
    "Definitive technical glossary for video geometry, aspect ratios, encoding codecs (H.264, VP9), containers, CRF quality, and WebCodecs architecture.",
  alternates: {
    canonical: `${BRAND.domain}/glossary`,
  },
};

export default function GlossaryIndexPage() {
  const terms = Object.values(GLOSSARY_TERMS);

  // Group terms by category
  const categories = Array.from(new Set(terms.map((t) => t.category)));

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
        name: "Glossary",
        item: `${BRAND.domain}/glossary`,
      },
    ],
  };

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-10" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Glossary</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Technical Dictionary & Definitions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Video Engineering & Aspect Ratio Glossary
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Authoritative technical definitions and practical examples for video geometry, codecs, display standards, and WebCodecs architectures.
        </p>
      </div>

      {categories.map((category) => {
        const categoryTerms = terms.filter((t) => t.category === category);
        return (
          <div key={category} className="space-y-4">
            <h2 className="text-base font-semibold text-[var(--text-main)] border-b border-[var(--color-hairline)] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c89c6e]" />
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryTerms.map((item) => (
                <Link
                  key={item.slug}
                  href={`/glossary/${item.slug}`}
                  className="p-5 rounded-2xl glass-panel hover:border-[#c89c6e] hover:shadow-xl transition-all duration-200 block space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                      {item.term}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#c89c6e] transition-colors" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                    {item.shortDefinition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}


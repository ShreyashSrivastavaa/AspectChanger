import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GLOSSARY_TERMS, GlossaryTermDetail } from "@/lib/seo/glossary-data";
import { BRAND } from "@/lib/config";
import { buildDefinedTermSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-generators";
import { ArrowRight, BookOpen, Code, Layers } from "lucide-react";

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return Object.keys(GLOSSARY_TERMS).map((term) => ({
    term,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const data = GLOSSARY_TERMS[term];
  if (!data) return {};

  const title = `What is ${data.term}? Definition & Video Engineering Guide`;
  const description = `${data.shortDefinition} Comprehensive definition, real-world examples, and video aspect ratio implications.`;

  return {
    title: `${title} | ${BRAND.name}`,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `${BRAND.domain}/glossary/${data.slug}`,
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const data = GLOSSARY_TERMS[term];

  if (!data) {
    notFound();
  }

  const jsonLdDefinedTerm = buildDefinedTermSchema({
    term: data.term,
    definition: data.shortDefinition,
    url: `${BRAND.domain}/glossary/${data.slug}`,
    category: data.category,
  });

  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
    { name: data.term, url: `/glossary/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDefinedTerm) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 space-y-8" suppressHydrationWarning>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[#c89c6e] transition-colors">
            Home
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <Link href="/glossary" className="hover:text-[#c89c6e] transition-colors">
            Glossary
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold truncate">
            {data.term}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Glossary Entry &bull; {data.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-main)]">
            {data.term}
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
            {data.shortDefinition}
          </p>
        </div>

        {/* In-Depth Technical Explanation */}
        <div className="rounded-2xl glass-panel p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c89c6e]" />
            <span>Technical Deep-Dive & Engineering Context</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] font-sans">
            {data.fullExplanation}
          </p>

          {data.technicalExample && (
            <div className="pt-2 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <Code className="w-3 h-3 text-[#c89c6e]" /> Technical Command / Formula Example
              </span>
              <pre className="p-3.5 rounded-xl bg-black/40 font-mono text-xs overflow-x-auto border border-white/5 text-[var(--text-main)]">
                <code>{data.technicalExample}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Related Terms */}
        {data.relatedTerms.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Related Glossary Terms
            </div>
            <div className="flex flex-wrap gap-2">
              {data.relatedTerms.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/glossary/${rt.slug}`}
                  className="px-3.5 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {rt.term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-6 rounded-2xl glass-panel text-center space-y-3 border border-[#c89c6e]/30">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            Convert Video Aspect Ratios Online
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
            AspectCut applies these exact video engineering principles to convert your video locally with zero quality loss.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#c89c6e] text-black font-semibold text-xs hover:bg-[#d8ac7e] transition-colors"
            >
              Open Free Tool <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


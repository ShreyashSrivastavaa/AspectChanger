import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES_DATA, GuideDetail } from "@/lib/seo/guides-data";
import { BRAND } from "@/lib/config";
import { buildArticleSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-generators";
import { BookOpen, Clock, ArrowRight, CheckCircle2, ChevronRight, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(GUIDES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];
  if (!guide) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(guide.h1)}&ratio=${encodeURIComponent("Pillar Guide")}`;

  return {
    title: `${guide.title} | ${BRAND.name}`,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
      images: [ogUrl],
    },
    alternates: {
      canonical: `${BRAND.domain}/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
    notFound();
  }

  const jsonLdArticle = buildArticleSchema({
    title: guide.h1,
    description: guide.metaDescription,
    url: `${BRAND.domain}/guides/${guide.slug}`,
    publishedDate: guide.publishedDate,
    updatedDate: guide.updatedDate,
    author: guide.author,
  });

  const jsonLdFaq = buildFAQSchema(guide.faqs);

  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ]);

  const allGuides = Object.values(GUIDES_DATA);
  const currentIndex = allGuides.findIndex((g) => g.slug === guide.slug);
  const otherGuides = [1, 2, 3, 4].map(
    (offset) => allGuides[(currentIndex + offset) % allGuides.length]
  );

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 space-y-10" suppressHydrationWarning>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[#c89c6e] transition-colors">
            Home
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <Link href="/guides" className="hover:text-[#c89c6e] transition-colors">
            Guides
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold truncate max-w-[200px] sm:max-w-none">
            {guide.title}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="px-2.5 py-1 rounded-full bg-[#c89c6e]/10 text-[#c89c6e] font-semibold border border-[#c89c6e]/20">
              Pillar Guide
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c89c6e]" />
              {guide.readingTimeMinutes} min read
            </span>
            <span>&bull;</span>
            <span>Published: {guide.publishedDate}</span>
            <span>&bull;</span>
            <span>Updated: {guide.updatedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-main)] leading-tight">
            {guide.h1}
          </h1>

          <div className="text-xs font-mono text-[var(--text-muted)]">
            By <span className="text-[var(--text-main)] font-medium">{guide.author}</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="rounded-2xl glass-panel p-6 space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c89c6e]" />
            <span>Table of Contents</span>
          </div>
          <ul className="space-y-1.5 text-xs font-mono">
            {guide.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#c89c6e]" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Introduction */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-[#c89c6e] text-sm text-[var(--text-main)] leading-relaxed font-sans">
          {guide.introduction}
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-10">
          {guide.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="space-y-3 scroll-mt-20">
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                {sec.title}
              </h2>
              <div className="text-sm leading-relaxed text-[var(--text-muted)] space-y-3 prose-invert max-w-none">
                {sec.content.split("\n\n").map((para, pIdx) => {
                  if (para.startsWith("|")) {
                    return (
                      <div key={pIdx} className="overflow-x-auto my-4 rounded-xl glass-panel p-3">
                        <table className="w-full text-xs text-left">
                          <tbody className="divide-y divide-white/5 font-mono">
                            {para.split("\n").map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx === 0 ? "font-bold text-[#c89c6e]" : ""}>
                                {row.split("|").filter(Boolean).map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 border border-white/5">{cell.trim()}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  if (para.startsWith("```")) {
                    const code = para.replace(/```[a-z]*\n?/g, "");
                    return (
                      <pre key={pIdx} className="p-4 rounded-xl bg-black/40 font-mono text-xs overflow-x-auto border border-white/5 text-[var(--text-main)]">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Interactive CTA to Tool */}
        <div className="rounded-3xl glass-panel p-8 text-center space-y-4 border border-[#c89c6e]/30">
          <h3 className="text-lg font-semibold text-[var(--text-main)]">
            Ready to change aspect ratios in your browser?
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
            Try AspectCut right now. Free, private, client-side WebCodecs rendering with zero watermarks.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#c89c6e] text-black font-semibold text-xs hover:bg-[#d8ac7e] transition-colors shadow-lg shadow-[#c89c6e]/20"
            >
              Open Free Aspect Ratio Tool <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-8 border-t border-[var(--color-hairline)] space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-main)]">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-panel space-y-1.5">
                <h4 className="text-sm font-semibold text-[var(--text-main)]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Guides */}
        <div className="pt-8 border-t border-[var(--color-hairline)] space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            More Technical Guides
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherGuides.slice(0, 4).map((og) => (
              <Link
                key={og.slug}
                href={`/guides/${og.slug}`}
                className="p-4 rounded-2xl glass-panel hover:border-[#c89c6e] transition-colors space-y-1 group"
              >
                <div className="font-mono text-[10px] text-[#c89c6e]">
                  {og.readingTimeMinutes} min read
                </div>
                <h4 className="text-xs font-semibold text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                  {og.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

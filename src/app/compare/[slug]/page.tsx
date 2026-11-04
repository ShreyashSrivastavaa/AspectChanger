import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { COMPARISONS_DATA } from "@/lib/seo/comparisons-data";
import { BRAND } from "@/lib/config";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-generators";
import { ArrowRight, CheckCircle2, XCircle, ShieldCheck, Zap, Scale } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPARISONS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = (COMPARISONS_DATA as any)[slug];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=Comparison`;

  return {
    title: `${data.title} | ${BRAND.name}`,
    description: data.metaDescription,
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
      images: [ogUrl],
    },
    alternates: {
      canonical: `${BRAND.domain}/compare/${data.slug}`,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const data = (COMPARISONS_DATA as any)[slug];

  if (!data) {
    notFound();
  }

  const otherComparisons = Object.values(COMPARISONS_DATA).filter((c: any) => c.slug !== data.slug);

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: data.competitorName, url: `/compare/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-10" suppressHydrationWarning>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[#c89c6e] transition-colors">
            Home
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <Link href="/compare" className="hover:text-[#c89c6e] transition-colors">
            Compare
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold truncate">
            {data.competitorName}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Architecture & Feature Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-main)]">
            {data.h1}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Live Interactive Tool FIRST */}
        <div>
          <VideoProcessor
            initialRatio={{ w: 9, h: 16 }}
          />
        </div>

        {/* Comparison Table */}
        <div className="max-w-[760px] space-y-6 pt-2">
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#c89c6e]" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                Feature Comparison: AspectCut vs. {data.competitorName}
              </h2>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[var(--color-hairline)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
                    <th className="py-2.5 pr-4">Dimension</th>
                    <th className="py-2.5 pr-4 text-[#c89c6e]">AspectCut (Wasm)</th>
                    <th className="py-2.5">{data.competitorName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-hairline)] text-[var(--text-main)]">
                  {data.comparisonTable.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 font-semibold text-[var(--text-main)] text-xs">
                        {row.feature}
                        <span className="block text-[10px] font-normal text-[var(--text-muted)]">
                          {row.notes}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono font-bold text-emerald-400">
                        {row.aspectCut}
                      </td>
                      <td className="py-3 font-mono text-[var(--text-muted)]">
                        {row.competitor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Switch Card */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Why Creators Choose AspectCut
            </h2>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.whySwitch}
            </p>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.competitorName} vs. AspectCut
            </h3>
            <div className="space-y-2.5">
              {data.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl glass-panel space-y-1">
                  <h4 className="text-xs font-semibold text-[var(--text-main)]">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Comparisons Navigation */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Video Resizer Comparisons
            </div>
            <div className="flex flex-wrap gap-2">
              {otherComparisons.map((c: any) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {c.competitorName}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


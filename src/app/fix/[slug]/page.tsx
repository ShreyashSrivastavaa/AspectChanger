import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { PROBLEMS_DATA, ProblemDetail } from "@/lib/seo/problems-data";
import { BRAND } from "@/lib/config";
import {
  buildHowToSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { ArrowRight, AlertTriangle, CheckCircle2, Wrench, ShieldAlert, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROBLEMS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = PROBLEMS_DATA[slug];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=Solution`;

  return {
    title: `${data.problemTitle} | ${BRAND.name}`,
    description: data.metaDescription,
    openGraph: {
      title: data.problemTitle,
      description: data.metaDescription,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.problemTitle,
      description: data.metaDescription,
      images: [ogUrl],
    },
    alternates: {
      canonical: `${BRAND.domain}/fix/${data.slug}`,
    },
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const data = PROBLEMS_DATA[slug];

  if (!data) {
    notFound();
  }

  const otherProblems = Object.values(PROBLEMS_DATA).filter((p) => p.slug !== data.slug);

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdHowTo = buildHowToSchema({
    name: data.h1,
    description: data.metaDescription,
    url: `${BRAND.domain}/fix/${data.slug}`,
    steps: data.recommendedWorkflow,
  });
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Fix", url: "/fix" },
    { name: data.problemTitle, url: `/fix/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
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
          <Link href="/fix" className="hover:text-[#c89c6e] transition-colors">
            Fix
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold truncate">
            {data.h1}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Diagnostic & Repair Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-main)]">
            {data.h1}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {data.metaDescription}
          </p>
        </div>

        {/* Live Interactive Tool FIRST */}
        <div>
          <VideoProcessor
            initialRatio={{ w: 9, h: 16 }}
          />
        </div>

        {/* Diagnostic Breakdown */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Root Cause Card */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                Why This Happens: The Root Cause
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.rootCause}
            </p>
          </div>

          {/* Detailed Solution */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c89c6e]" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                How AspectCut Resolves This Problem
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.detailedFix}
            </p>
          </div>

          {/* Recommended Step-by-Step Workflow */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Recommended Fix Workflow
            </h3>
            <ol className="space-y-2 text-xs text-[var(--text-muted)] list-decimal list-inside font-sans">
              {data.recommendedWorkflow.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-[var(--text-main)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Preventative Tips */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Preventative Best Practices
            </h3>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              {data.preventativeTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2.5">
              {data.faqs.map((faq, idx) => (
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

          {/* Other Fix Guides */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Video Troubleshooting Guides
            </div>
            <div className="flex flex-wrap gap-2">
              {otherProblems.map((p) => (
                <Link
                  key={p.slug}
                  href={`/fix/${p.slug}`}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {p.problemTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


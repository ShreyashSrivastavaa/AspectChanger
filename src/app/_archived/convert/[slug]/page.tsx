import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { FORMATS_DATA, FormatConverterDetail } from "@/lib/seo/formats-data";
import { BRAND } from "@/lib/config";
import {
  buildHowToSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Music, FileCode } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FORMATS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = FORMATS_DATA[slug];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=${encodeURIComponent(data.targetRatio)}`;

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
      canonical: `${BRAND.domain}/convert/${data.slug}`,
    },
  };
}

export default async function FormatPage({ params }: Props) {
  const { slug } = await params;
  const data = FORMATS_DATA[slug];

  if (!data) {
    notFound();
  }

  const otherFormats = Object.values(FORMATS_DATA).filter((f) => f.slug !== data.slug);
  const isVertical = data.targetRatio.includes("9:16");

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdHowTo = buildHowToSchema({
    name: data.h1,
    description: data.summary,
    url: `${BRAND.domain}/convert/${data.slug}`,
    steps: data.workflowSteps,
  });
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Convert", url: "/convert" },
    { name: `${data.sourceFormat.split(" ")[0]} to ${data.targetRatio}`, url: `/convert/${data.slug}` },
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
          <Link href="/convert" className="hover:text-[#c89c6e] transition-colors">
            Convert
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {data.sourceFormat.split(" ")[0]} → {data.targetRatio}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Format Transcoding Pipeline</span>
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
            initialRatio={isVertical ? { w: 9, h: 16 } : { w: 16, h: 9 }}
          />
        </div>

        {/* Technical Architecture Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[760px]">
          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Input Wrapper
            </div>
            <div className="text-sm font-mono font-semibold text-[#c89c6e]">
              {data.sourceFormat}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Container demuxed in RAM
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Output Container
            </div>
            <div className="text-sm font-mono font-semibold text-[var(--text-main)]">
              {data.targetFormat}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Universal web compatibility
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Target Orientation
            </div>
            <div className="text-sm font-mono font-semibold text-[#c89c6e]">
              {data.targetRatio}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Social video ready
            </div>
          </div>
        </div>

        {/* Editorial Guide Column */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Codec Handling */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#c89c6e]" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                Video Codec Transcoding & Color Matrix Integrity
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.codecHandlingDetails}
            </p>
          </div>

          {/* Audio Handling */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#c89c6e]" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                Audio Stream Preservation & Remuxing
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.audioHandlingDetails}
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Step-by-Step {data.sourceFormat.split(" ")[0]} Conversion
            </h3>
            <ol className="space-y-2 text-xs text-[var(--text-muted)] list-decimal list-inside font-sans">
              {data.workflowSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-[var(--text-main)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.h1}
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

          {/* Other Formats Navigation */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Video Format Transcoders
            </div>
            <div className="flex flex-wrap gap-2">
              {otherFormats.map((f) => (
                <Link
                  key={f.slug}
                  href={`/convert/${f.slug}`}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {f.sourceFormat.split(" ")[0]} → {f.targetRatio}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


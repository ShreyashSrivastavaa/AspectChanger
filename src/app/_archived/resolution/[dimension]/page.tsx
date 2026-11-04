import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { RESOLUTIONS_DATA, ResolutionDetail } from "@/lib/seo/resolutions-data";
import { BRAND } from "@/lib/config";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-generators";
import { ArrowRight, Monitor, Video, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

interface Props {
  params: Promise<{ dimension: string }>;
}

export async function generateStaticParams() {
  return Object.keys(RESOLUTIONS_DATA).map((dimension) => ({
    dimension,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dimension } = await params;
  const data = RESOLUTIONS_DATA[dimension];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=${encodeURIComponent(data.aspectRatioLabel)}`;

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
      canonical: `${BRAND.domain}/resolution/${data.dimension}`,
    },
  };
}

export default async function ResolutionDetailPage({ params }: Props) {
  const { dimension } = await params;
  const data = RESOLUTIONS_DATA[dimension];

  if (!data) {
    notFound();
  }

  const otherResolutions = Object.values(RESOLUTIONS_DATA).filter((r) => r.dimension !== data.dimension);
  const [w, h] = data.aspectRatioLabel.split(":").map(Number);

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Resolutions", url: "/resolution" },
    { name: data.dimension, url: `/resolution/${data.dimension}` },
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
          <Link href="/resolution" className="hover:text-[#c89c6e] transition-colors">
            Resolutions
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {data.dimension}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Resolution Specification &bull; {data.category}</span>
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
            initialRatio={{ w: w || 9, h: h || 16 }}
          />
        </div>

        {/* Resolution Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[760px]">
          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Aspect Ratio
            </div>
            <div className="text-lg font-mono font-semibold text-[#c89c6e]">
              {data.aspectRatioLabel}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Proportional DAR
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Total Pixels
            </div>
            <div className="text-lg font-mono font-semibold text-[var(--text-main)]">
              {(data.totalPixels / 1000000).toFixed(2)} MP
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {data.totalPixels.toLocaleString()} px
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Dimensions
            </div>
            <div className="text-lg font-mono font-semibold text-[var(--text-main)]">
              {data.width}×{data.height}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Macroblock aligned
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Category
            </div>
            <div className="text-lg font-mono font-semibold text-[#c89c6e]">
              {data.category}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Display layout
            </div>
          </div>
        </div>

        {/* Editorial Guide Column */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Target Platforms */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Primary Platform Uses for {data.dimension}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
              {data.platformUses.map((use, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e] shrink-0" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compatible Displays */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Common Display Devices
            </h2>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
              {data.displayDevices.map((dev, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#c89c6e] font-bold">&bull;</span>
                  <span>{dev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bitrate & Encoding Recommendations */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Optimal Bitrate & Encoding Recommendations
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {data.bitrateRecommendations}
            </p>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.dimension}
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

          {/* Other Resolutions Navigation */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Standard Resolutions
            </div>
            <div className="flex flex-wrap gap-2">
              {otherResolutions.map((r) => (
                <Link
                  key={r.dimension}
                  href={`/resolution/${r.dimension}`}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {r.dimension} ({r.aspectRatioLabel})
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


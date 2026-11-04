import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import VisualRatioDiagram from "@/components/VisualRatioDiagram";
import { RATIO_PAIRS_DATA } from "@/lib/seo/ratio-pairs-data";
import { calculateGeometry } from "@/lib/seo/geometry-engine";
import { BRAND } from "@/lib/config";
import {
  buildSoftwareApplicationSchema,
  buildHowToSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { ArrowRight, CheckCircle2, AlertTriangle, Calculator, Cpu, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ pair: string }>;
}

export async function generateStaticParams() {
  return RATIO_PAIRS_DATA.map((page) => ({
    pair: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const data = RATIO_PAIRS_DATA.find((p) => p.slug === pair);
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=${encodeURIComponent(`${data.sourceRatio} → ${data.targetRatio}`)}`;

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
      canonical: `${BRAND.domain}/tools/${data.slug}`,
    },
  };
}

export default async function ToolPairPage({ params }: Props) {
  const { pair } = await params;
  const data = RATIO_PAIRS_DATA.find((p) => p.slug === pair);

  if (!data) {
    notFound();
  }

  const geometry = calculateGeometry(data.sourceRatio, data.targetRatio);
  const currentIndex = RATIO_PAIRS_DATA.findIndex((p) => p.slug === data.slug);
  const relatedConversions = [1, 2, 3, 4].map(
    (offset) => RATIO_PAIRS_DATA[(currentIndex + offset) % RATIO_PAIRS_DATA.length]
  );

  // Parse numerical ratios for components
  const [sw, sh] = data.sourceRatio.split(":").map(Number);
  const [tw, th] = data.targetRatio.split(":").map(Number);

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdApp = buildSoftwareApplicationSchema({
    name: `${data.sourceRatio} to ${data.targetRatio} Video Aspect Ratio Converter`,
    description: data.metaDescription,
    url: `${BRAND.domain}/tools/${data.slug}`,
  });
  const jsonLdHowTo = buildHowToSchema({
    name: data.h1,
    description: data.summary,
    url: `${BRAND.domain}/tools/${data.slug}`,
    steps: data.workflowSteps,
  });
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: `${data.sourceRatio} to ${data.targetRatio}`, url: `/tools/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
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
          <Link href="/tools" className="hover:text-[#c89c6e] transition-colors">
            Tools
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {data.sourceRatio} → {data.targetRatio}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Ratio Conversion Instrument</span>
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
            initialRatio={{ w: tw || 9, h: th || 16 }}
          />
        </div>

        {/* Geometry Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[760px]">
          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Crop Loss
            </div>
            <div className="text-lg font-mono font-semibold text-[#c89c6e]">
              {geometry.cropLossPercent.toFixed(1)}%
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {geometry.visibleAreaPercent.toFixed(1)}% retained in crop
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Padding Bars
            </div>
            <div className="text-lg font-mono font-semibold text-[var(--text-main)]">
              {geometry.letterboxPadding.barCoveragePercent.toFixed(1)}%
            </div>
            <div className="text-[11px] text-[var(--text-muted)] capitalize">
              {geometry.letterboxPadding.barOrientation} orientation
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Recommended Mode
            </div>
            <div className="text-lg font-mono font-semibold text-[#c89c6e] capitalize">
              {data.bestFitMode}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Preset default
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Standard Target
            </div>
            <div className="text-lg font-mono font-semibold text-[var(--text-main)]">
              {geometry.standardResolutions[1]?.name || "1080p"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {geometry.standardResolutions[1]?.width}×{geometry.standardResolutions[1]?.height} px
            </div>
          </div>
        </div>

        {/* Editorial Reading Column (max-w-[760px]) */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Technical Schematic */}
          <div className="rounded-2xl glass-panel p-5 space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Geometry Mapping & Canvas Alignment
            </div>
            <VisualRatioDiagram
              fromW={sw || 16}
              fromH={sh || 9}
              toW={tw || 9}
              toH={th || 16}
              fromLabel={data.sourceRatio}
              toLabel={data.targetRatio}
            />
          </div>

          {/* Mathematical Worked Example */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#c89c6e]" />
              <h2 className="text-sm font-semibold text-[var(--text-main)]">
                Transformation Geometry & Worked Example
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {geometry.workedExample.calculationText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  Crop Mode Dimensions
                </span>
                <p className="font-mono text-[var(--text-main)]">
                  {geometry.workedExample.cropDimensions}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  Fit Padding Dimensions
                </span>
                <p className="font-mono text-[var(--text-main)]">
                  {geometry.workedExample.padDimensions}
                </p>
              </div>
            </div>
          </div>

          {/* Use Case & Framing Advice */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              When to Use {data.sourceRatio} to {data.targetRatio}
            </h2>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.useCaseDescription}
            </p>
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-[var(--text-main)] mb-1">
                Composition & Framing Strategy
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                {data.compositionAdvice}
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="rounded-2xl glass-panel p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#c89c6e]" />
              <h3 className="text-sm font-semibold text-[var(--text-main)]">
                Common Mistakes to Avoid
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              {data.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#c89c6e] font-bold">&bull;</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Standard Resolution Table */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Macroblock-Aligned Standard Resolutions for {data.targetRatio}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[var(--color-hairline)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
                    <th className="py-2 pr-4">Quality Standard</th>
                    <th className="py-2 pr-4">Dimensions</th>
                    <th className="py-2 pr-4">Total Pixels</th>
                    <th className="py-2">Macroblock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-hairline)] text-[var(--text-main)] font-mono">
                  {geometry.standardResolutions.map((res) => (
                    <tr key={res.name}>
                      <td className="py-2.5 pr-4 text-[#c89c6e] font-bold">{res.name}</td>
                      <td className="py-2.5 pr-4">{res.width} × {res.height} px</td>
                      <td className="py-2.5 pr-4">{(res.width * res.height / 1000000).toFixed(2)} MP</td>
                      <td className="py-2.5 text-[var(--text-muted)] text-[11px] font-sans">
                        {res.width % 2 === 0 && res.height % 2 === 0 ? "Even Integers (Safe)" : "Non-aligned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.sourceRatio} to {data.targetRatio}
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

          {/* Related Conversions */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Related Ratio Conversions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {relatedConversions.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/tools/${rel.slug}`}
                  className="p-3.5 rounded-2xl glass-panel hover:border-[#c89c6e] transition-colors flex items-center justify-between text-xs group"
                >
                  <span className="font-mono text-[var(--text-main)] group-hover:text-[#c89c6e] transition-colors">
                    {rel.sourceRatio} → {rel.targetRatio}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c89c6e]" />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

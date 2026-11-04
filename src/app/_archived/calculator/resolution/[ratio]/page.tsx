import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { parseRatio, getStandardResolutions } from "@/lib/seo/geometry-engine";
import { BRAND } from "@/lib/config";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import {
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
  buildFAQSchema,
} from "@/lib/seo/schema-generators";

interface Props {
  params: Promise<{ ratio: string }>;
}

const SUPPORTED_RATIOS: Record<string, { label: string; name: string; description: string }> = {
  "16-9": {
    label: "16:9",
    name: "16:9 Widescreen",
    description: "The universal high-definition standard for desktop monitors, televisions, YouTube, and Vimeo.",
  },
  "9-16": {
    label: "9:16",
    name: "9:16 Vertical",
    description: "The mobile video standard for TikTok, YouTube Shorts, Instagram Reels, and Snapchat.",
  },
  "1-1": {
    label: "1:1",
    name: "1:1 Square",
    description: "The universal square format for Instagram feed carousels, profile grids, and LinkedIn video.",
  },
  "4-5": {
    label: "4:5",
    name: "4:5 Portrait",
    description: "The optimal portrait format for Instagram feed posts, maximizing vertical mobile screen real estate.",
  },
  "4-3": {
    label: "4:3",
    name: "4:3 Classic Standard",
    description: "The classic television and iPad screen aspect ratio.",
  },
  "21-9": {
    label: "21:9",
    name: "21:9 Ultrawide Cinema",
    description: "The ultrawide theatrical aspect ratio used in cinematic films and gaming monitors.",
  },
};

export async function generateStaticParams() {
  return Object.keys(SUPPORTED_RATIOS).map((ratio) => ({
    ratio,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ratio } = await params;
  const config = SUPPORTED_RATIOS[ratio];
  if (!config) return {};

  const title = `${config.label} Resolution Calculator & Standard Dimension List`;
  const description = `Complete list of ${config.label} (${config.name}) resolutions from 360p to 4K UHD. Macroblock-aligned pixel dimensions and total pixel counts.`;

  return {
    title: `${title} | ${BRAND.name}`,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `${BRAND.domain}/calculator/resolution/${ratio}`,
    },
  };
}

export default async function ResolutionByRatioPage({ params }: Props) {
  const { ratio } = await params;
  const config = SUPPORTED_RATIOS[ratio];

  if (!config) {
    notFound();
  }

  const parsed = parseRatio(config.label);
  const resolutions = getStandardResolutions(parsed);

  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Calculator", url: "/calculator" },
    { name: `${config.label} Resolutions`, url: `/calculator/resolution/${ratio}` },
  ]);

  const jsonLdApp = buildSoftwareApplicationSchema({
    name: `${config.label} Resolution Calculator & Standard Dimension Table`,
    description: `Complete list of ${config.label} (${config.name}) resolutions with macroblock calculations and pixel dimensions.`,
    url: `${BRAND.domain}/calculator/resolution/${ratio}`,
  });

  const jsonLdFaq = buildFAQSchema([
    {
      q: `What is the standard resolution for ${config.label}?`,
      a: `For ${config.label}, the standard high-definition resolution is ${resolutions[resolutions.length - 1]?.width || 1920}x${resolutions[resolutions.length - 1]?.height || 1080} pixels.`,
    },
    {
      q: `Why do ${config.label} dimensions require even numbers?`,
      a: "H.264 and modern codecs use YUV 4:2:0 subsampling, requiring both width and height to be divisible by 2 to prevent color bleeding and playback failure.",
    },
  ]);

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-10" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <Link href="/calculator" className="hover:text-[var(--text-main)]">Calculator</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">{config.label}</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Macroblock Dimension Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          {config.label} Resolution Dimensions & Scale Chart
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          {config.description} All dimensions are calculated as strict even integers for seamless H.264, HEVC, and VP9 video encoding.
        </p>
      </div>

      {/* Resolution Chart Table */}
      <div className="rounded-2xl glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-hairline)] pb-3">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            Standard {config.label} Video Resolutions
          </h2>
          <span className="font-mono text-xs text-[#c89c6e]">
            Decimal: {parsed.decimal.toFixed(4)}:1
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[var(--color-hairline)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
                <th className="py-2.5 pr-4">Quality Standard</th>
                <th className="py-2.5 pr-4">Width</th>
                <th className="py-2.5 pr-4">Height</th>
                <th className="py-2.5 pr-4">Megapixels</th>
                <th className="py-2.5">Encoding Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-hairline)] text-[var(--text-main)] font-mono">
              {resolutions.map((res) => {
                const totalPx = res.width * res.height;
                const isEven = res.width % 2 === 0 && res.height % 2 === 0;
                return (
                  <tr key={res.name} className="hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 text-[#c89c6e] font-bold">{res.name}</td>
                    <td className="py-3 pr-4">{res.width} px</td>
                    <td className="py-3 pr-4">{res.height} px</td>
                    <td className="py-3 pr-4">{(totalPx / 1000000).toFixed(2)} MP</td>
                    <td className="py-3 text-emerald-400 font-sans text-[11px]">
                      {isEven ? "✓ Macroblock-Safe (Even)" : "Odd Integer Warning"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other Ratios */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold text-[var(--text-main)]">
          Other Aspect Ratio Resolution Calculators
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SUPPORTED_RATIOS)
            .filter(([key]) => key !== ratio)
            .map(([key, item]) => (
              <Link
                key={key}
                href={`/calculator/resolution/${key}`}
                className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              >
                {item.label} ({item.name})
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}


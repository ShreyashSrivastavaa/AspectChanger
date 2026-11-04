import type { Metadata } from "next";
import Link from "next/link";
import AspectRatioCalculatorWidget from "@/components/AspectRatioCalculatorWidget";
import { BRAND } from "@/lib/config";
import { ArrowRight, Calculator } from "lucide-react";
import {
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
  buildFAQSchema,
} from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `Free Video Aspect Ratio & Resolution Calculator | ${BRAND.name}`,
  description:
    "Interactive aspect ratio calculator: compute aspect ratios from pixel dimensions, calculate proportional widths and heights, and verify even-integer macroblock constraints.",
  alternates: {
    canonical: `${BRAND.domain}/calculator`,
  },
};

export default function CalculatorHubPage() {
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Calculator", url: "/calculator" },
  ]);

  const jsonLdApp = buildSoftwareApplicationSchema({
    name: "AspectCut Video Aspect Ratio & Resolution Calculator",
    description:
      "Interactive aspect ratio calculator: compute aspect ratios from pixel dimensions, calculate proportional widths and heights, and verify even-integer macroblock constraints.",
    url: `${BRAND.domain}/calculator`,
  });

  const jsonLdFaq = buildFAQSchema([
    {
      q: "How do I calculate an aspect ratio from width and height?",
      a: "Divide both width and height by their greatest common divisor (GCD). For example, 1920 and 1080 have a GCD of 120, yielding 16:9.",
    },
    {
      q: "Why must video resolutions be even numbers?",
      a: "Video codecs like H.264 and HEVC utilize YUV 4:2:0 subsampling, which groups color data in 2x2 blocks. Odd pixel dimensions cause decoding glitches and hardware encoding failures.",
    },
    {
      q: "Can I scale dimensions without changing the aspect ratio?",
      a: "Yes. To scale while maintaining aspect ratio, multiply both width and height by the same scaling factor, rounding to the nearest even integer.",
    },
  ]);

  const ratioPages = [
    { label: "16:9 Widescreen", slug: "16-9", desc: "YouTube, desktop monitors, HDTV standard" },
    { label: "9:16 Vertical", slug: "9-16", desc: "TikTok, Reels, Shorts mobile screen standard" },
    { label: "1:1 Square", slug: "1-1", desc: "Instagram carousels, LinkedIn feed posts" },
    { label: "4:5 Portrait", slug: "4-5", desc: "Instagram feed vertical maximum" },
    { label: "21:9 Ultrawide", slug: "21-9", desc: "Cinematic anamorphic monitor format" },
  ];

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
        <span className="text-[var(--text-main)] font-medium">Calculator</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Interactive Mathematical Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Video Aspect Ratio & Resolution Calculator
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Instantly calculate proportional dimensions, simplify fractional aspect ratios, and generate even-integer resolutions for video encoding.
        </p>
      </div>

      {/* Interactive Calculator Widget */}
      <AspectRatioCalculatorWidget />

      {/* Ratio Specific Resolution Calculators */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-semibold text-[var(--text-main)]">
          Standard Resolution Calculators by Ratio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ratioPages.map((rp) => (
            <Link
              key={rp.slug}
              href={`/calculator/resolution/${rp.slug}`}
              className="p-4 rounded-2xl glass-panel hover:border-[#c89c6e] transition-colors flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#c89c6e]">
                  {rp.label}
                </span>
                <p className="text-xs text-[var(--text-muted)]">
                  {rp.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#c89c6e] transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


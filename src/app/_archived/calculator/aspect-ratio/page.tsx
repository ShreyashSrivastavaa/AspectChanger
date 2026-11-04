import type { Metadata } from "next";
import Link from "next/link";
import AspectRatioCalculatorWidget from "@/components/AspectRatioCalculatorWidget";
import { BRAND } from "@/lib/config";
import {
  buildSoftwareApplicationSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { Calculator, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Aspect Ratio Calculator - Calculate Video & Image Dimensions | ${BRAND.name}`,
  description:
    "Calculate aspect ratios from width and height dimensions. Find proportional scales, decimal ratios, and ensure even-integer macroblock compatibility for video encoding.",
  alternates: {
    canonical: `${BRAND.domain}/calculator/aspect-ratio`,
  },
};

export default function AspectRatioCalculatorPage() {
  const jsonLdFaq = buildFAQSchema([
    {
      q: "How is aspect ratio calculated from width and height?",
      a: "Aspect ratio is calculated by dividing both the width and height by their greatest common divisor (GCD). For example, with 1920×1080, the GCD is 120; 1920÷120 = 16 and 1080÷120 = 9, yielding 16:9.",
    },
    {
      q: "Why do video dimensions need to be even numbers?",
      a: "Modern video codecs (H.264, HEVC, VP9) use YUV 4:2:0 chroma subsampling, which groups color pixels into 2×2 blocks. Odd pixel dimensions cause chroma subsampling phase errors or green decoding artifacts.",
    },
    {
      q: "What is the decimal equivalent of 16:9?",
      a: "16:9 equals approximately 1.7778:1 (or 1.78:1). 9:16 equals 0.5625:1.",
    },
  ]);

  const jsonLdApp = buildSoftwareApplicationSchema({
    name: "AspectCut Aspect Ratio Calculator",
    description: "Online calculator to compute aspect ratios, proportional dimensions, and even-integer scaling.",
    url: `${BRAND.domain}/calculator/aspect-ratio`,
  });

  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Calculator", url: "/calculator" },
    { name: "Aspect Ratio Calculator", url: "/calculator/aspect-ratio" },
  ]);

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10 space-y-10" suppressHydrationWarning>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <Link href="/calculator" className="hover:text-[var(--text-main)]">Calculator</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Aspect Ratio</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Dimension & Ratio Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Online Aspect Ratio Calculator
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
          Enter any video or image pixel dimensions to compute its simplified aspect ratio, decimal proportions, and proportional scaling dimensions.
        </p>
      </div>

      <AspectRatioCalculatorWidget />

      {/* Explanatory Guide */}
      <div className="space-y-6 pt-4 text-xs text-[var(--text-muted)] leading-relaxed">
        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            How the Mathematical Aspect Ratio Formula Works
          </h2>
          <p>
            An aspect ratio represents the proportional relationship between an image or video canvas width and height. To calculate it mathematically:
          </p>
          <div className="p-3 rounded-xl bg-white/5 font-mono text-[var(--text-main)] space-y-1">
            <div>GCD = GreatestCommonDivisor(Width, Height)</div>
            <div>Aspect Ratio = (Width / GCD) : (Height / GCD)</div>
            <div>Decimal Ratio = Width / Height</div>
          </div>
          <p>
            For instance, an HD video frame of 1920 pixels wide by 1080 pixels high has a Greatest Common Divisor of 120. Dividing both 1920 and 1080 by 120 yields 16 and 9, giving the canonical 16:9 ratio.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            The Even-Integer Rule in Video Transcoding
          </h3>
          <p>
            When scaling video dimensions, modern codecs (H.264, H.265/HEVC, VP9) require width and height to be divisible by 2. If a scaling operation produces an odd dimension (such as 1081×1921), hardware decoders on mobile smartphones will fail to render the video or introduce a bright green error bar along the edge. AspectCut automatically rounds all scaled calculations to the nearest even integer.
          </p>
        </div>

        {/* Embed Widget Section */}
        <div className="p-6 rounded-2xl glass-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Embed This Calculator on Your Website
            </h3>
            <span className="text-[11px] font-mono text-[#c89c6e]">Free Attribution Embed</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Include this interactive calculator directly on your blog, video production guide, or creator resource site:
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-[var(--border-subtle)] font-mono text-[11px] text-[#e8c89b] select-all overflow-x-auto">
            {`<iframe src="${BRAND.domain}/calculator/aspect-ratio" width="100%" height="540" style="border:1px solid rgba(200,156,110,0.3); border-radius:16px; max-width:720px;" loading="lazy"></iframe>\n<p style="font-size:12px; color:#888;">Powered by <a href="${BRAND.domain}" target="_blank" rel="noopener">AspectCut Video Aspect Ratio Changer</a></p>`}
          </div>
        </div>
      </div>
    </div>
  );
}


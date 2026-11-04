import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, GitCommit, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `Changelog & Release Notes | ${BRAND.name}`,
  description:
    "Track all feature updates, performance benchmarks, and engine improvements to AspectCut client-side video processor.",
  alternates: {
    canonical: `${BRAND.domain}/changelog`,
  },
};

interface Release {
  version: string;
  date: string;
  title: string;
  badge?: string;
  highlights: string[];
}

const RELEASES: Release[] = [
  {
    version: "v0.5.0",
    date: "November 2026",
    title: "New WebCodecs Engine",
    badge: "Current",
    highlights: [
      "Replaced FFmpeg WebAssembly with the browser's built-in WebCodecs engine for hardware-accelerated exports and no large engine download.",
      "Audio that isn't already AAC (MP4) or Opus (WebM) is now re-encoded so exports play everywhere.",
      "Added on-demand support for AC-3, E-AC-3, DTS, and TrueHD audio and Apple ProRes video.",
      "Removed AVI input, which WebCodecs does not support. Please convert AVI files to MP4 first.",
    ],
  },
  {
    version: "v0.4.2",
    date: "April 2026",
    title: "Programmatic SEO Architecture & Strict Anti-Cannibalization",
    highlights: [
      "Engineered 77 strictly mapped programmatic ratio, platform, device, and format conversion routes.",
      "Implemented pure geometry calculation engine for pixel-accurate crop and letterbox metrics.",
      "Added quality gate validation script to enforce content density, unique FAQs, and shingle similarity thresholds.",
      "Standardized canonical entity descriptions and verified platform specifications across all pages.",
    ],
  },
  {
    version: "v0.4.0",
    date: "March 2026",
    title: "Minimalist Floating Glass Interface & Streamlined Workflow",
    highlights: [
      "Redesigned the primary interface into a focused, single-screen workspace.",
      "Introduced translucent frosted glass styling with warm studio lighting and organic rounded cards.",
      "Added real-time focal point draggable preview with visual aspect ratio framing bounds.",
      "Optimized collapsible engine log viewer for developer debugging.",
    ],
  },
  {
    version: "v0.3.0",
    date: "February 2026",
    title: "Audio Copy Passthrough & Multi-Format Remuxing",
    highlights: [
      "Implemented intelligent audio stream decision tree: stream-copies compatible AAC audio without re-encoding.",
      "Added automatic AAC transcoding fallback for incompatible source formats (PCM, Vorbis, AC3).",
      "Resolved multi-threading synchronization edge cases in Firefox and Chromium browsers.",
      "Reduced CPU overhead by 35% on video transcode operations with pass-through audio.",
    ],
  },
  {
    version: "v0.2.0",
    date: "January 2026",
    title: "Multi-Threaded WebAssembly & COOP/COEP Isolation",
    highlights: [
      "Compiled FFmpeg core 0.12 with pthreads and Emscripten multi-threading support.",
      "Configured Cross-Origin-Opener-Policy (COOP) and Cross-Origin-Embedder-Policy (COEP) headers to unlock SharedArrayBuffer.",
      "Achieved up to 4x faster export rendering speeds on multi-core desktop processors.",
      "Added robust single-thread fallback detection for environments lacking SharedArrayBuffer support.",
    ],
  },
  {
    version: "v0.1.0",
    date: "December 2025",
    title: "Initial Launch of In-Browser Video Aspect Changer",
    highlights: [
      "Released core client-side video reframing engine with 16:9, 9:16, 1:1, 4:5, 4:3, and 21:9 support.",
      "Built interactive Crop, Fit (Letterbox/Pillarbox), and Blurred Background canvas preview modes.",
      "100% private architecture with zero file uploads and zero cloud queues.",
    ],
  },
];

export default function ChangelogPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
      { "@type": "ListItem", position: 2, name: "Changelog", item: `${BRAND.domain}/changelog` },
    ],
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 space-y-8 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tool
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <Sparkles className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Release Notes & Milestones</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">
          Changelog
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement}
        </p>
      </div>

      <div className="space-y-8">
        {RELEASES.map((rel) => (
          <div
            key={rel.version}
            className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-[var(--text-main)]">
                  {rel.version}
                </span>
                {rel.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#c89c6e]/15 text-[#c89c6e] border border-[#c89c6e]/30">
                    {rel.badge}
                  </span>
                )}
                <span className="text-xs text-[var(--text-muted)] font-mono">{rel.date}</span>
              </div>
            </div>

            <h2 className="text-base font-semibold text-[var(--text-main)]">{rel.title}</h2>

            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
              {rel.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <GitCommit className="w-3.5 h-3.5 text-[#c89c6e] mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


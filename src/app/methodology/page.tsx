import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, Cpu, Binary, CheckCircle2, FlaskConical, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: `Engineering Methodology & Testing Standards | ${BRAND.name}`,
  description:
    "Discover the engineering methodology behind AspectCut: geometry calculation mathematics, client-side WebAssembly benchmarking, audio stream preservation, and platform spec verification.",
  alternates: {
    canonical: `${BRAND.domain}/methodology`,
  },
};

export default function MethodologyPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
      { "@type": "ListItem", position: 2, name: "Methodology", item: `${BRAND.domain}/methodology` },
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
          <FlaskConical className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Research & Standards</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">
          Methodology & Technical Standards
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement}
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        {/* Section 1: Geometry Computation */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-main)]">
            <Binary className="w-4 h-4 text-[#c89c6e]" />
            <h2>1. Geometry & Spatial Resolution Mathematics</h2>
          </div>
          <p>
            When converting video between disparate aspect ratios (for example, standard 16:9 widescreen to 9:16 vertical), video geometry dictates that either image area must be discarded (cropping) or canvas area must be padded (letterboxing / pillarboxing).
          </p>
          <div className="p-4 rounded-xl glass-panel font-mono text-xs text-[var(--text-main)] space-y-2">
            <div><strong>Aspect Ratio (AR):</strong> AR = Width / Height</div>
            <div><strong>Crop Loss Calculation:</strong></div>
            <div className="pl-4 text-[var(--text-muted)]">
              When target AR &lt; source AR: Visible Area = Target AR / Source AR<br />
              Crop Loss % = (1 - (Target AR / Source AR)) &times; 100%<br />
              Example: 16:9 (1.777) &rarr; 9:16 (0.5625) results in a 68.36% horizontal canvas crop.
            </div>
            <div><strong>Letterbox / Pillarbox Calculation:</strong></div>
            <div className="pl-4 text-[var(--text-muted)]">
              When scaling to fit canvas, the scaled dimension is determined by min(W_target / W_source, H_target / H_source).<br />
              Padding pixels = (Target_dimension - Scaled_dimension) / 2.
            </div>
          </div>
          <p>
            AspectCut computes all filter dimensions to strict even-integer pixel boundaries (`trunc(w/2)*2`), satisfying H.264 / HEVC macroblock alignment requirements and eliminating chroma subsampling alignment errors.
          </p>
        </section>

        {/* Section 2: Platform Spec Verification */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-main)]">
            <CheckCircle2 className="w-4 h-4 text-[#c89c6e]" />
            <h2>2. Platform Specification Verification Protocol</h2>
          </div>
          <p>
            Social media platforms frequently update their maximum upload durations, allowable file sizes, and safe zone overlays (such as YouTube Shorts extending maximum duration from 60 seconds to 3 minutes on October 15, 2024).
          </p>
          <p>
            AspectCut maintains a strict verification protocol:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Every platform preset is cited against official creator and developer documentation (Google Help, TikTok Business Help, Meta Business Help, etc.).</li>
            <li>No specifications are inferred or extrapolated from third-party blogs.</li>
            <li>Each specification maintains an audit record with source URL and verification month.</li>
          </ul>
        </section>

        {/* Section 3: Client-Side WebAssembly Execution */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-main)]">
            <Cpu className="w-4 h-4 text-[#c89c6e]" />
            <h2>3. Client-Side WebAssembly Performance Benchmarking</h2>
          </div>
          <p>
            Traditional video editors transcode on remote cloud clusters, adding latency, network transfer time, and cloud server costs. AspectCut executes an Emscripten-compiled build of FFmpeg inside the client&rsquo;s browser sandbox.
          </p>
          <p>
            Our benchmark methodology tests export throughput across three tiers of consumer client hardware:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl glass-panel text-xs space-y-1">
              <div className="font-semibold text-[var(--text-main)]">Tier 1: High-End Desktop</div>
              <div className="text-[11px] text-[var(--text-muted)]">Apple M2/M3 or Intel i7/i9 8+ cores</div>
              <div className="font-mono text-[#c89c6e] text-xs mt-1">~0.7x – 1.2x realtime</div>
            </div>
            <div className="p-3 rounded-xl glass-panel text-xs space-y-1">
              <div className="font-semibold text-[var(--text-main)]">Tier 2: Mid-Range Laptop</div>
              <div className="text-[11px] text-[var(--text-muted)]">Intel Core i5 / Ryzen 5 4-6 cores</div>
              <div className="font-mono text-[#c89c6e] text-xs mt-1">~1.5x – 2.8x realtime</div>
            </div>
            <div className="p-3 rounded-xl glass-panel text-xs space-y-1">
              <div className="font-semibold text-[var(--text-main)]">Tier 3: Mobile Device</div>
              <div className="text-[11px] text-[var(--text-muted)]">Modern iOS / Android Chrome</div>
              <div className="font-mono text-[#c89c6e] text-xs mt-1">~2.5x – 4.5x realtime</div>
            </div>
          </div>
          <p className="text-xs">
            Because processing occurs directly in RAM, zero network egress bandwidth is consumed.
          </p>
        </section>

        {/* Section 4: Audio Stream Copy Engine */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-main)]">
            <Layers className="w-4 h-4 text-[#c89c6e]" />
            <h2>4. Audio Preservation & Remuxing Architecture</h2>
          </div>
          <p>
            Unnecessary audio re-encoding causes generational loss and wastes CPU cycles. AspectCut inspects the input container format and audio stream before initiating processing.
          </p>
          <p>
            If the audio stream is already encoded in standard stereo AAC format (which is the universal distribution format for MP4 containers across YouTube, Instagram, and TikTok), the engine utilizes `-c:a copy` passthrough mode. Only non-AAC audio codecs (such as PCM in QuickTime MOVs, Vorbis in MKV, or Opus in WebM) undergo single-generation AAC transcoding.
          </p>
        </section>

        <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-mono">
          Document version: 2026.1 &bull; Engineering inquiries: {BRAND.contactEmail}
        </div>
      </div>
    </div>
  );
}


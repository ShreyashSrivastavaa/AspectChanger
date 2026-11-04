import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { Code, ArrowLeft, Cpu, ShieldCheck, Heart, User } from "lucide-react";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `About & Technical Architecture | ${BRAND.name}`,
  description:
    "Learn how AspectCut processes videos client-side using FFmpeg WebAssembly, cross-origin isolation (COOP/COEP), and local hardware memory.",
  alternates: {
    canonical: `${BRAND.domain}/about`,
  },
};

export default function AboutPage() {
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  const jsonLdOrg = buildOrganizationSchema();

  return (
    <div className="max-w-[780px] mx-auto px-4 sm:px-6 py-10 space-y-10 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />

      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tool
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <Code className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Mission &amp; Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          About AspectCut
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement}
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        {/* Origin & Philosophy */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">
            Why We Engineered AspectCut
          </h2>
          <p>
            Traditional online video converters rely on a legacy cloud-server architecture. Users are forced to upload massive video files across slow broadband uplinks, wait in multi-minute server queues, and suffer intrusive watermark badges unless they purchase costly recurring subscriptions.
          </p>
          <p>
            Modern desktop and mobile hardware possesses powerful multi-core processors and hardware-accelerated media decoders that sit idle during browsing. AspectCut inverts the conversion paradigm: we compiled the industry-standard FFmpeg multimedia engine into WebAssembly (WASM). Your browser decodes, reframes, crops, filters, and encodes your MP4 video entirely within local memory.
          </p>
        </section>

        {/* Technical Architecture */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">
            Core Technical Architecture
          </h2>
          <div className="p-5 rounded-2xl glass-panel text-xs space-y-2.5 font-mono text-[var(--text-main)]">
            <div>&bull; <strong className="text-[#e8c89b]">Processing Engine:</strong> FFmpeg.wasm (v0.12) compiled with Emscripten.</div>
            <div>&bull; <strong className="text-[#e8c89b]">Multi-Threading:</strong> POSIX pthreads via SharedArrayBuffer under COOP / COEP cross-origin isolation.</div>
            <div>&bull; <strong className="text-[#e8c89b]">Spatial Geometry:</strong> Even-integer macroblock truncation (Mod2) compliant with YUV 4:2:0 subsampling.</div>
            <div>&bull; <strong className="text-[#e8c89b]">Audio Passthrough:</strong> Automated <code>-c:a copy</code> decision engine preventing generational audio compression loss.</div>
            <div>&bull; <strong className="text-[#e8c89b]">Zero Network Transmit:</strong> 0 bytes of video or audio data sent over the internet.</div>
          </div>
        </section>

        {/* Team & Attribution */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">
            Team &amp; Attribution
          </h2>
          <div className="p-5 rounded-2xl glass-card space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(200,156,110,0.15)] border border-[rgba(200,156,110,0.3)] flex items-center justify-center text-[#e8c89b]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-[var(--text-main)]">{BRAND.team.organization}</div>
                <div className="text-xs text-[#c89c6e] font-mono">{BRAND.team.founderRole}</div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {BRAND.team.mission}
            </p>
          </div>
        </section>

        {/* Open Science & Standards */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">
            Open Standards &amp; Research Datasets
          </h2>
          <p>
            In addition to our free video tools, we maintain open resources for the web community, including our <Link href="/data/platform-specs" className="text-[#c89c6e] hover:underline">Social Video Specifications Dataset</Link> published under CC BY 4.0, our <Link href="/benchmarks" className="text-[#c89c6e] hover:underline">Empirical WebAssembly Benchmarks</Link>, and our comprehensive <Link href="/glossary" className="text-[#c89c6e] hover:underline">Video Engineering Glossary</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

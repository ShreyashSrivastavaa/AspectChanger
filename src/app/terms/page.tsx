import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: `Terms of Service & Usage Policy | ${BRAND.name}`,
  description:
    "Review the terms of service, acceptable use, and client-side processing policies for AspectCut.",
  alternates: {
    canonical: `${BRAND.domain}/terms`,
  },
};

export default function TermsPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${BRAND.domain}/terms` },
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
          <Scale className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Legal & Terms</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement}
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
            <ShieldCheck className="w-4 h-4 text-[#c89c6e]" />
            <span>Core Principle: Zero-Upload Local Processing</span>
          </div>
          <p className="text-xs">
            Because AspectCut runs entirely inside your browser via WebAssembly (Wasm), your video data never travels across our network or touches our servers. You retain 100% ownership, copyright, and control over all media processed through the application.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {BRAND.name} at {BRAND.domain}, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the service.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">2. Client-Side Execution & Privacy</h2>
          <p>
            All video transformations (re-encoding, cropping, aspect-ratio scaling, blurring, letterboxing, and audio remuxing) are executed directly on your client hardware via WebAssembly. AspectCut does not store, index, view, or retain copies of your video or audio files.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">3. Permitted & Acceptable Use</h2>
          <p>
            You agree to use {BRAND.name} only for lawful purposes. You must have all necessary rights, licenses, and permissions for any content you process through the tool. You may not use the application to process illicit, non-consensual, infringing, or harmful media.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">4. Disclaimers & Limitation of Liability</h2>
          <p>
            {BRAND.name} is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. Conversion speeds and memory thresholds depend on your device&rsquo;s browser capabilities, CPU core count, and available RAM. In no event shall AspectCut or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this software.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">5. Open Source Attributions</h2>
          <p>
            AspectCut utilizes the open-source FFmpeg multimedia framework compiled to WebAssembly via Emscripten. FFmpeg is licensed under the LGPL v2.1+ or GPL v2+ depending on build configuration.
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-mono">
          Last revised: April 2026 &bull; Inquiries: {BRAND.contactEmail}
        </div>
      </div>
    </div>
  );
}


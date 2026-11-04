import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { ArrowLeft, Newspaper, Download, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `Press Kit & Brand Media Assets | ${BRAND.name}`,
  description:
    "Official press and media kit for AspectCut. Download brand assets, logos, and discover our client-side WebAssembly video transformation architecture.",
  alternates: {
    canonical: `${BRAND.domain}/press`,
  },
};

export default function PressKitPage() {
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Press Kit", url: "/press" },
  ]);

  const jsonLdOrg = buildOrganizationSchema();

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 space-y-10 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />

      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tool
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <Newspaper className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Press &amp; Media Kit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          AspectCut Brand Kit &amp; Media Resources
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Official resources, canonical entity statements, and technical background for journalists, editors, and creators covering AspectCut.
        </p>
      </div>

      {/* Canonical Description Card */}
      <div className="p-6 rounded-2xl glass-card border border-[rgba(200,156,110,0.3)] space-y-3">
        <div className="text-xs font-mono text-[#c89c6e] uppercase tracking-wider">Canonical Boilerplate Description</div>
        <blockquote className="text-base text-[var(--text-main)] font-serif italic leading-relaxed">
          &ldquo;{BRAND.canonicalEntityStatement}&rdquo;
        </blockquote>
        <div className="text-xs text-[var(--text-muted)]">
          Please use this exact description when summarizing AspectCut in media articles, directories, or research papers.
        </div>
      </div>

      {/* Fast Facts Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Company &amp; Product Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Product Name</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">AspectCut</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Primary Domain</div>
            <div className="text-sm font-semibold text-[#e8c89b]">{BRAND.domain}</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Core Engine</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">Client-Side WebAssembly (FFmpeg Core 0.12)</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Pricing &amp; Watermarks</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">100% Free · No Watermarks · No Sign-Up</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Data Privacy Policy</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">Zero Video Uploads (Processed 100% in local memory)</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <div className="font-mono text-[var(--text-muted)]">Founder / Organization</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">{BRAND.team.organization}</div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Visual Identity &amp; Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl glass-panel space-y-2">
            <div className="w-full h-10 rounded-lg bg-[#0d0c0a] border border-[#333]" />
            <div className="font-mono text-xs font-semibold text-[var(--text-main)]">Deep Obsidian</div>
            <div className="font-mono text-[11px] text-[var(--text-muted)]">#0d0c0a · Dark Canvas</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-2">
            <div className="w-full h-10 rounded-lg bg-[#c89c6e]" />
            <div className="font-mono text-xs font-semibold text-[var(--text-main)]">Warm Bronze Accent</div>
            <div className="font-mono text-[11px] text-[var(--text-muted)]">#c89c6e · Interactive Rim</div>
          </div>
          <div className="p-4 rounded-xl glass-panel space-y-2">
            <div className="w-full h-10 rounded-lg bg-[#f5f3ef]" />
            <div className="font-mono text-xs font-semibold text-[#0d0c0a]">Pure Cream Text</div>
            <div className="font-mono text-[11px] text-[var(--text-muted)]">#f5f3ef · Contrast Headings</div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="p-6 rounded-2xl glass-card space-y-3">
        <h2 className="text-base font-semibold text-[var(--text-main)]">Media Inquiries</h2>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          For interview requests, technical commentary on browser-based WebAssembly video architecture, or dataset questions:
        </p>
        <div className="flex items-center gap-2 font-mono text-xs text-[#e8c89b]">
          <Mail className="w-4 h-4 text-[#c89c6e]" />
          <a href={`mailto:${BRAND.contactEmail}`} className="hover:underline">
            {BRAND.contactEmail}
          </a>
        </div>
      </section>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { VERIFIED_PLATFORM_SPECS } from "@/lib/seo/verified-specs";
import { BRAND } from "@/lib/config";
import { ArrowLeft, Download, Database, ShieldCheck, ExternalLink, Copy, Check } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `Verified Social Media Video Specifications Dataset (2026) | ${BRAND.name}`,
  description:
    "Open, verified dataset of video aspect ratios, resolutions, duration limits, and codecs for YouTube Shorts, TikTok, Instagram Reels, LinkedIn, and X. Available under CC BY 4.0 as CSV and JSON.",
  alternates: {
    canonical: `${BRAND.domain}/data/platform-specs`,
  },
};

export default function PlatformSpecsDatasetPage() {
  const specs = Object.values(VERIFIED_PLATFORM_SPECS);

  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Open Data", url: "/data/platform-specs" },
  ]);

  const jsonLdDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Social Media Platform Video Specifications Dataset (2026)",
    description:
      "Comprehensive, verified technical specifications for social media video formats including aspect ratios, resolutions, frame rates, maximum file sizes, and safe margins.",
    url: `${BRAND.domain}/data/platform-specs`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.domain,
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${BRAND.domain}/api/data/platform-specs?format=csv`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${BRAND.domain}/api/data/platform-specs`,
      },
    ],
    temporalCoverage: "2026-01-01/2026-12-31",
  };

  return (
    <div className="max-w-[940px] mx-auto px-4 sm:px-6 py-10 space-y-10 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDataset) }}
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
          <Database className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Open Research Dataset · CC BY 4.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Social Video Specifications Dataset
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement} This dataset compiles primary-sourced technical video specifications across 11 major publishing networks. All figures are verified quarterly against official engineering documentation.
        </p>
      </div>

      {/* Download Action Bar */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[var(--text-main)]">Download Dataset</div>
          <div className="text-xs text-[var(--text-muted)]">Free for academic, journalistic, and commercial reuse with attribution.</div>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="/api/data/platform-specs?format=csv"
            download="aspectcut-platform-specs-2026.csv"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border border-[rgba(200,156,110,0.3)] bg-[rgba(200,156,110,0.08)] hover:bg-[rgba(200,156,110,0.16)] text-[#e8c89b] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV (.csv)</span>
          </a>
          <a
            href="/api/data/platform-specs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-[var(--text-main)] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON (.json)</span>
          </a>
        </div>
      </div>

      {/* Dataset Table */}
      <section className="space-y-4">
        <div className="overflow-x-auto rounded-xl glass-panel p-2">
          <table className="w-full text-left text-xs">
            <caption className="sr-only">Social media platform video technical specifications dataset</caption>
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                <th scope="col" className="p-3">Platform</th>
                <th scope="col" className="p-3">Primary Ratio</th>
                <th scope="col" className="p-3">Resolution</th>
                <th scope="col" className="p-3">Max File Size</th>
                <th scope="col" className="p-3">Max Duration</th>
                <th scope="col" className="p-3">Codecs</th>
                <th scope="col" className="p-3">Source &amp; Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {specs.map((spec) => (
                <tr key={spec.slug} className="hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="p-3">
                    <Link href={`/for/${spec.slug}`} className="font-semibold text-[var(--text-main)] hover:text-[#c89c6e] transition-colors">
                      {spec.name}
                    </Link>
                  </td>
                  <td className="p-3 font-mono font-medium text-[#e8c89b]">
                    {spec.primaryRatio}
                  </td>
                  <td className="p-3 font-mono text-[var(--text-muted)]">
                    {spec.recommendedResolution}
                  </td>
                  <td className="p-3 text-[var(--text-muted)]">
                    {spec.maxFileSize}
                  </td>
                  <td className="p-3 text-[var(--text-muted)]">
                    {spec.maxDuration}
                  </td>
                  <td className="p-3 text-[11px] text-[var(--text-muted)]">
                    <div>{spec.supportedCodecs.join(", ")}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{spec.supportedContainers.join(", ")}</div>
                  </td>
                  <td className="p-3">
                    <a
                      href={spec.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#c89c6e] hover:underline"
                    >
                      Official Docs <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">Verified: {spec.verifiedMonthYear}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Citation Block */}
      <section className="p-5 rounded-2xl glass-panel space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-main)]">
          Citation &amp; Attribution Format
        </h2>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          If you cite, reproduce, or ingest this dataset into research publications, automated tools, or documentation, please use the following citation:
        </p>
        <div className="p-3 rounded-lg bg-[rgba(0,0,0,0.3)] font-mono text-xs text-[#e8c89b] border border-[var(--border-subtle)] select-all">
          AspectCut. (2026). Social Media Platform Video Specifications Dataset (Version 2026.4). Retrieved from {BRAND.domain}/data/platform-specs
        </div>
        <p className="text-[11px] text-[var(--text-muted)]">
          Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). You are free to share and adapt the material for any purpose, provided appropriate credit is given.
        </p>
      </section>
    </div>
  );
}

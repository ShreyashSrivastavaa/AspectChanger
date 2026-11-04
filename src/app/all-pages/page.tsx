import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { RATIO_PAIRS_DATA } from "@/lib/seo/ratio-pairs-data";
import { VERIFIED_PLATFORM_SPECS } from "@/lib/seo/verified-specs";
import { DEVICES_DATA } from "@/lib/seo/devices-data";
import { FORMATS_DATA } from "@/lib/seo/formats-data";
import { PROBLEMS_DATA } from "@/lib/seo/problems-data";
import { COMPARISONS_DATA } from "@/lib/seo/comparisons-data";
import { RESOLUTIONS_DATA } from "@/lib/seo/resolutions-data";
import { GLOSSARY_TERMS } from "@/lib/seo/glossary-data";
import { GUIDES_DATA } from "@/lib/seo/guides-data";
import { ArrowLeft, Compass, ExternalLink } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `HTML Sitemap & Complete Directory of Pages | ${BRAND.name}`,
  description:
    "Complete directory of all AspectCut pages: conversion tools, verified platform specifications, calculators, problem guides, and technical glossary definitions.",
  alternates: {
    canonical: `${BRAND.domain}/all-pages`,
  },
};

export default function AllPagesDirectoryPage() {
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "All Pages", url: "/all-pages" },
  ]);

  const ratioPairs = RATIO_PAIRS_DATA;
  const platforms = Object.values(VERIFIED_PLATFORM_SPECS);
  const devices = Object.values(DEVICES_DATA);
  const formats = Object.values(FORMATS_DATA);
  const problems = Object.values(PROBLEMS_DATA);
  const comparisons = Object.values(COMPARISONS_DATA);
  const resolutions = Object.values(RESOLUTIONS_DATA);
  const glossary = Object.values(GLOSSARY_TERMS);
  const guides = Object.values(GUIDES_DATA);

  const calcRatios = [
    { label: "16:9 Standard HD Resolutions", href: "/calculator/resolution/16-9" },
    { label: "9:16 Vertical Video Resolutions", href: "/calculator/resolution/9-16" },
    { label: "1:1 Square Feed Resolutions", href: "/calculator/resolution/1-1" },
    { label: "4:5 Portrait Video Resolutions", href: "/calculator/resolution/4-5" },
    { label: "4:3 Classic Standard Resolutions", href: "/calculator/resolution/4-3" },
    { label: "21:9 Ultrawide Cinema Resolutions", href: "/calculator/resolution/21-9" },
  ];

  const corePages = [
    { label: "Video Aspect Ratio Changer (Homepage)", href: "/" },
    { label: "Conversion Tools Directory", href: "/tools" },
    { label: "Platform Specifications Hub", href: "/for" },
    { label: "Source Device Converters", href: "/from" },
    { label: "Video Format Transcoders", href: "/convert" },
    { label: "Video Problem Solutions", href: "/fix" },
    { label: "Tool Comparisons & Benchmarks", href: "/compare" },
    { label: "Resolution & Macroblock Hub", href: "/resolution" },
    { label: "Aspect Ratio Calculator Hub", href: "/calculator" },
    { label: "Online Aspect Ratio Calculator", href: "/calculator/aspect-ratio" },
    { label: "Pillar Guides & Tutorials", href: "/guides" },
    { label: "Video Engineering Glossary", href: "/glossary" },
    { label: "Open Specifications Dataset (CSV/JSON)", href: "/data/platform-specs" },
    { label: "WebAssembly Processing Benchmarks", href: "/benchmarks" },
    { label: "Methodology & Testing Standards", href: "/methodology" },
    { label: "Brand Kit & Press Resources", href: "/press" },
    { label: "Frequently Asked Questions", href: "/faq" },
    { label: "Release Changelog", href: "/changelog" },
    { label: "About AspectCut", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact & Support", href: "/contact" },
  ];

  return (
    <div className="max-w-[940px] mx-auto px-4 sm:px-6 py-10 space-y-12 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
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
          <Compass className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>HTML Sitemap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Complete Directory of Pages
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
          {BRAND.canonicalEntityStatement} Browse the comprehensive index of 112+ video aspect ratio calculators, platform presets, format transcoders, and technical guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
        {/* Cluster 1: Core Pages */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Core Pages &amp; Architecture ({corePages.length})
          </h2>
          <ul className="space-y-2">
            {corePages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 2: Ratio Pairs */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Aspect Ratio Converters ({ratioPairs.length})
          </h2>
          <ul className="space-y-2">
            {ratioPairs.map((p) => (
              <li key={p.slug}>
                <Link href={`/tools/${p.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 3: Platforms */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Verified Platform Specifications ({platforms.length})
          </h2>
          <ul className="space-y-2">
            {platforms.map((pl) => (
              <li key={pl.slug}>
                <Link href={`/for/${pl.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {pl.name} Video Specifications &amp; Safe Zones
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 4: Source Devices */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Source Device Converters ({devices.length})
          </h2>
          <ul className="space-y-2">
            {devices.map((d) => (
              <li key={d.slug}>
                <Link href={`/from/${d.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 5: Containers & Formats */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Format Transcoders ({formats.length})
          </h2>
          <ul className="space-y-2">
            {formats.map((f) => (
              <li key={f.slug}>
                <Link href={`/convert/${f.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {f.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 6: Problem Fixes */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Video Framing Problem Solutions ({problems.length})
          </h2>
          <ul className="space-y-2">
            {problems.map((pr) => (
              <li key={pr.slug}>
                <Link href={`/fix/${pr.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {pr.problemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 7: Competitor Comparisons */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Tool Comparisons &amp; Alternatives ({comparisons.length})
          </h2>
          <ul className="space-y-2">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 8: Standard Dimensions & Calculators */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Resolutions &amp; Calculator Tables ({resolutions.length + calcRatios.length})
          </h2>
          <ul className="space-y-2">
            {resolutions.map((r) => (
              <li key={r.dimension}>
                <Link href={`/resolution/${r.dimension}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {r.dimension} ({r.standardName}) Dimension Specification
                </Link>
              </li>
            ))}
            {calcRatios.map((cr) => (
              <li key={cr.href}>
                <Link href={cr.href} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {cr.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 9: Pillar Guides */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            In-Depth Engineering Guides ({guides.length})
          </h2>
          <ul className="space-y-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cluster 10: Technical Glossary */}
        <section className="space-y-3 p-6 rounded-2xl glass-card">
          <h2 className="text-sm font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2">
            Video Glossary Definitions ({glossary.length})
          </h2>
          <ul className="grid grid-cols-2 gap-1.5">
            {glossary.map((term) => (
              <li key={term.slug}>
                <Link href={`/glossary/${term.slug}`} className="hover:text-[#c89c6e] text-[var(--text-muted)] transition-colors">
                  {term.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

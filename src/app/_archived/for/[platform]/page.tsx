import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { VERIFIED_PLATFORM_SPECS, PlatformSpec } from "@/lib/seo/verified-specs";
import { BRAND } from "@/lib/config";
import {
  buildSoftwareApplicationSchema,
  buildHowToSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { ShieldCheck, ExternalLink, Clock, HardDrive, Video, ShieldAlert } from "lucide-react";

interface Props {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  return Object.keys(VERIFIED_PLATFORM_SPECS).map((slug) => ({
    platform: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const data = VERIFIED_PLATFORM_SPECS[platform];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(`AspectCut for ${data.name}`)}&ratio=${encodeURIComponent(data.primaryRatio)}`;
  const title = `Resize Video for ${data.name} (${data.primaryRatio})`;
  const description = `Resize and convert videos for ${data.name} (${data.primaryRatio}, ${data.recommendedResolution}). Verified ${data.verifiedMonthYear} specs, safe zones, and local WebCodecs conversion.`;

  return {
    title: `${title} | ${BRAND.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
    alternates: {
      canonical: `${BRAND.domain}/for/${data.slug}`,
    },
  };
}

export default async function PlatformPresetPage({ params }: Props) {
  const { platform } = await params;
  const data = VERIFIED_PLATFORM_SPECS[platform];

  if (!data) {
    notFound();
  }

  // Parse ratio for processor
  const [w, h] = data.primaryRatio.split(":").map(Number);

  const jsonLdFaq = buildFAQSchema(data.faq);
  const jsonLdApp = buildSoftwareApplicationSchema({
    name: `AspectCut for ${data.name} Video Resizer`,
    description: `Resize and convert videos for ${data.name} (${data.primaryRatio}, ${data.recommendedResolution}). Verified specifications and client-side processing.`,
    url: `${BRAND.domain}/for/${data.slug}`,
  });
  const jsonLdHowTo = buildHowToSchema({
    name: `How to Resize Video for ${data.name}`,
    description: `Step-by-step guide to resizing videos for ${data.name} with optimal ${data.primaryRatio} aspect ratio and safe zone margins.`,
    url: `${BRAND.domain}/for/${data.slug}`,
    steps: [
      `Select or drop your video into AspectCut directly in your browser.`,
      `The preset automatically selects ${data.primaryRatio} (${data.recommendedResolution}) for ${data.name}.`,
      `Adjust framing with crop or blurred background mode to respect platform safe zones.`,
      `Click Convert Video to render locally via WebCodecs with zero quality loss.`
    ],
  });
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Platforms", url: "/for" },
    { name: data.name, url: `/for/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-10" suppressHydrationWarning>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[#c89c6e] transition-colors">
            Home
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <Link href="/for" className="hover:text-[#c89c6e] transition-colors">
            Platforms
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {data.name}
          </span>
        </div>

        {/* Header Block with Verification Badge */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
              <span>Platform Preset &bull; {data.platform}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[11px] font-mono text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified: {data.verifiedMonthYear}</span>
            </div>
            <a
              href={data.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors"
            >
              <span>Source Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-main)]">
            Resize Video for {data.name} ({data.primaryRatio})
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Convert, reframe, and optimize video files specifically for {data.name}. Processed locally in your browser with zero server uploads, preserving 100% data privacy.
          </p>
        </div>

        {/* Live Interactive Tool FIRST */}
        <div>
          <VideoProcessor
            initialRatio={{ w: w || 9, h: h || 16 }}
          />
        </div>

        {/* Verified Technical Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[760px]">
          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider">
              <Video className="w-3 h-3 text-[#c89c6e]" />
              <span>Primary Ratio</span>
            </div>
            <div className="text-lg font-mono font-semibold text-[#c89c6e]">
              {data.primaryRatio}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {data.recommendedResolution}
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3 text-[#c89c6e]" />
              <span>Max Duration</span>
            </div>
            <div className="text-sm font-semibold text-[var(--text-main)] truncate">
              {data.maxDuration.split("(")[0]}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] truncate">
              {data.maxDuration}
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider">
              <HardDrive className="w-3 h-3 text-[#c89c6e]" />
              <span>File Limit</span>
            </div>
            <div className="text-sm font-semibold text-[var(--text-main)] truncate">
              {data.maxFileSize.split("(")[0]}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] truncate">
              {data.maxFileSize}
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider">
              <ShieldAlert className="w-3 h-3 text-[#c89c6e]" />
              <span>Safe Buffer</span>
            </div>
            <div className="text-sm font-semibold text-[#c89c6e]">
              Top {data.safeZones.topPercent}% &bull; Bot {data.safeZones.bottomPercent}%
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              UI Clearance
            </div>
          </div>
        </div>

        {/* Editorial Guide Column (max-w-[760px]) */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Key Platform Requirements */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Official Requirements & Guidelines for {data.name}
            </h2>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              {data.keyRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#c89c6e] font-bold">&bull;</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safe Zones Breakdown */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Safe Zone Specifications & Overlay Obstructions
            </h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {data.safeZones.notes}
            </p>
            <div className="grid grid-cols-3 gap-2.5 pt-2 text-center font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">Top Margin</span>
                <div className="font-semibold text-[var(--text-main)]">{data.safeZones.topPercent}%</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">Bottom Margin</span>
                <div className="font-semibold text-[var(--text-main)]">{data.safeZones.bottomPercent}%</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-0.5">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">Right Margin</span>
                <div className="font-semibold text-[var(--text-main)]">{data.safeZones.rightPercent}%</div>
              </div>
            </div>
          </div>

          {/* Supported Formats & Codecs */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Supported Codecs & Containers
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="text-[var(--text-muted)] text-xs font-sans mr-2">Containers:</span>
              {data.supportedContainers.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-lg bg-white/5 text-[var(--text-main)] border border-white/5">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
              <span className="text-[var(--text-muted)] text-xs font-sans mr-2">Video Codecs:</span>
              {data.supportedCodecs.map((codec) => (
                <span key={codec} className="px-2.5 py-1 rounded-lg bg-[#c89c6e]/10 text-[#c89c6e] border border-[#c89c6e]/20">
                  {codec}
                </span>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.name}
            </h3>
            <div className="space-y-2.5">
              {data.faq.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl glass-panel space-y-1">
                  <h4 className="text-xs font-semibold text-[var(--text-main)]">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Platforms Navigation */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Platform Video Presets
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(VERIFIED_PLATFORM_SPECS)
                .filter((p) => p.slug !== data.slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/for/${p.slug}`}
                    className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                  >
                    {p.name} ({p.primaryRatio})
                  </Link>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

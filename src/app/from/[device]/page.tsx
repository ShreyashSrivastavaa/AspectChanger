import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { DEVICES_DATA, DeviceDetail } from "@/lib/seo/devices-data";
import { BRAND } from "@/lib/config";
import {
  buildHowToSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema-generators";
import { ArrowRight, CheckCircle2, ShieldCheck, Laptop, Video, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ device: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DEVICES_DATA).map((slug) => ({
    device: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { device } = await params;
  const data = DEVICES_DATA[device];
  if (!data) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(data.h1)}&ratio=${encodeURIComponent(data.name)}`;

  return {
    title: `${data.title} | ${BRAND.name}`,
    description: data.metaDescription,
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
      images: [ogUrl],
    },
    alternates: {
      canonical: `${BRAND.domain}/from/${data.slug}`,
    },
  };
}

export default async function DevicePage({ params }: Props) {
  const { device } = await params;
  const data = DEVICES_DATA[device];

  if (!data) {
    notFound();
  }

  const otherDevices = Object.values(DEVICES_DATA).filter((d) => d.slug !== data.slug);

  const jsonLdFaq = buildFAQSchema(data.faqs);
  const jsonLdHowTo = buildHowToSchema({
    name: data.h1,
    description: data.summary,
    url: `${BRAND.domain}/from/${data.slug}`,
    steps: data.workflowSteps,
  });
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Devices", url: "/from" },
    { name: data.name, url: `/from/${data.slug}` },
  ]);

  return (
    <div className="w-full text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
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
          <Link href="/from" className="hover:text-[#c89c6e] transition-colors">
            Devices
          </Link>
          <span className="text-[var(--color-hairline-strong)]">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {data.name}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Hardware Capture Optimization &bull; {data.deviceType}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-main)]">
            {data.h1}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Live Interactive Tool FIRST */}
        <div>
          <VideoProcessor
            initialRatio={{ w: 9, h: 16 }}
          />
        </div>

        {/* Device Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[760px]">
          <div className="p-4 rounded-2xl glass-panel space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Native Capture Aspect
            </div>
            <div className="text-sm font-mono font-semibold text-[#c89c6e]">
              {data.nativeRatio}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Hardware sensor configuration
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel space-y-1 sm:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Supported Native Resolutions
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {data.nativeResolutions.map((res) => (
                <span key={res} className="px-2 py-0.5 rounded-md bg-white/5 font-mono text-[11px] text-[var(--text-main)] border border-white/5">
                  {res}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Guide Column */}
        <div className="max-w-[760px] space-y-6 pt-2">
          {/* Reframing Strategy */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Reframing & Composition Strategy for {data.name}
            </h2>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {data.reframeAdvice}
            </p>
          </div>

          {/* Hardware & Encoding Considerations */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              Hardware Architecture & Encoding Integrity
            </h2>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              {data.hardwareConsiderations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Steps */}
          <div className="rounded-2xl glass-panel p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Step-by-Step {data.name} Conversion Workflow
            </h3>
            <ol className="space-y-2 text-xs text-[var(--text-muted)] list-decimal list-inside font-sans">
              {data.workflowSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-[var(--text-main)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Mini FAQ */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-main)]">
              Frequently Asked Questions: {data.name}
            </h3>
            <div className="space-y-2.5">
              {data.faqs.map((faq, idx) => (
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

          {/* Other Devices Navigation */}
          <div className="pt-4 border-t border-[var(--color-hairline)] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Other Source Device Converters
            </div>
            <div className="flex flex-wrap gap-2">
              {otherDevices.map((d) => (
                <Link
                  key={d.slug}
                  href={`/from/${d.slug}`}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:border-[#c89c6e] text-xs font-mono text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


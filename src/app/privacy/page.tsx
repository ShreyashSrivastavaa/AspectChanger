import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { ShieldCheck, Cpu, Database, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Architecture & Policy | ${BRAND.name}`,
  description:
    "How AspectCut executes 100% in-browser video processing using WebAssembly. Your videos are never uploaded to any remote server.",
  alternates: {
    canonical: `${BRAND.domain}/privacy`,
  },
};

export default function PrivacyPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${BRAND.domain}/privacy` },
    ],
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 space-y-8 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Instrument
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Data Guarantee</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">
          Your Video Never Leaves Your Device
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          AspectCut was built with a fundamental architectural constraint: zero server-side file transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl glass-panel">
          <Cpu className="w-5 h-5 text-[#c89c6e] mb-2" />
          <h3 className="font-semibold text-xs text-[var(--text-main)] mb-1">
            Local WebAssembly Execution
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            All video matrix operations and audio demuxing run entirely inside your browser’s virtual machine sandbox.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel">
          <Database className="w-5 h-5 text-[#c89c6e] mb-2" />
          <h3 className="font-semibold text-xs text-[var(--text-main)] mb-1">
            Zero Cloud Storage
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            We operate zero video databases, zero object stores (S3/GCS), and zero remote rendering clusters.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            1. Verification via Browser Developer Tools
          </h2>
          <p>
            You do not need to take our word for it. Open your browser&apos;s Network Inspector (<code className="glass-pill px-2 py-0.5 rounded-md font-mono text-xs text-[var(--text-main)]">F12 &rarr; Network</code>), select a video, and press Convert. You will observe that zero bytes of video payload are transferred over HTTP POST/PUT. The only external assets requested are the static WebAssembly binary assets cached on your first visit.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            2. Analytics & Cookies
          </h2>
          <p>
            We employ privacy-first, cookieless analytics strictly to monitor page visit volumes and error rates. We do not set tracking cookies, build behavioral ad profiles, or sell any user data.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            3. Contact Information
          </h2>
          <p>
            If you have questions regarding our browser sandbox boundaries or enterprise deployments, reach out directly to <a href={`mailto:${BRAND.contactEmail}`} className="text-[#c89c6e] underline">{BRAND.contactEmail}</a>.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--color-hairline)]">
        <Link
          href="/"
          className="font-mono text-xs font-semibold text-[#c89c6e] hover:underline"
        >
          Open Video Aspect Ratio Changer &rarr;
        </Link>
      </div>
    </div>
  );
}

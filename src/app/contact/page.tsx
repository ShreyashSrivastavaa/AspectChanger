import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact & Support | ${BRAND.name}`,
  description: "Get in touch with the AspectCut engineering team for support, feature inquiries, or bug reports.",
  alternates: {
    canonical: `${BRAND.domain}/contact`,
  },
};

export default function ContactPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.domain },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${BRAND.domain}/contact` },
    ],
  };

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 sm:px-6 py-10 space-y-8" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-main)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">Contact</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>Engineering Support</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">
          Contact AspectCut
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          AspectCut is maintained by independent software engineers dedicated to high-performance client-side WebAssembly video tools.
        </p>
      </div>

      <div className="p-6 rounded-3xl glass-panel space-y-5 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl glass-pill text-[#c89c6e]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Direct Support Email
            </span>
            <a href={`mailto:${BRAND.contactEmail}`} className="font-semibold text-[#c89c6e] text-sm hover:underline">
              {BRAND.contactEmail}
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-hairline)] space-y-2 text-[var(--text-muted)] leading-relaxed">
          <span className="font-semibold text-[var(--text-main)] block">Troubleshooting Checklist:</span>
          <div className="space-y-1.5 pl-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e]" />
              <span>Ensure hardware acceleration is enabled in browser settings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e]" />
              <span>Verify your browser supports SharedArrayBuffer (Chrome, Safari 15.2+, Firefox, Edge)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c89c6e]" />
              <span>For files over 200MB, ensure at least 4GB of available RAM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

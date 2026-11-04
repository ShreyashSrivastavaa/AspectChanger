import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ShieldCheck, Scale } from "lucide-react";
import { buildInfoPageMetadata, fillBrand, loadPageCopy } from "@/i18n/page-copy";
import { buildLocalePath, buildLocaleUrl } from "@/lib/i18n/seo-metadata";
import { buildLocalizedBreadcrumbSchema, serializeJsonLd } from "@/lib/i18n/localized-schemas";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildInfoPageMetadata(locale, "terms");
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { common, terms: t } = await loadPageCopy(locale);

  const jsonLdBreadcrumb = buildLocalizedBreadcrumbSchema(
    [
      { name: common.home, url: buildLocaleUrl(locale, "/") },
      { name: t.crumb, url: buildLocaleUrl(locale, "/terms") },
    ],
    locale
  );

  const sections = [
    { title: t.s1Title, text: t.s1Text },
    { title: t.s2Title, text: t.s2Text },
    { title: t.s3Title, text: t.s3Text },
    { title: t.s4Title, text: t.s4Text },
    { title: t.s5Title, text: t.s5Text },
  ];

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 space-y-8 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }}
      />
      <div className="space-y-2">
        <Link
          href={buildLocalePath(locale)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {common.backToTool}
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <Scale className="w-3.5 h-3.5 text-[var(--accent-text)]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">{t.h1}</h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{common.intro}</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-text)]" />
            <span>{t.principleTitle}</span>
          </div>
          <p className="text-xs">{t.principleText}</p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-sm font-semibold text-[var(--text-main)]">{section.title}</h2>
            <p>{fillBrand(section.text)}</p>
          </div>
        ))}

        <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-mono">
          {t.revised} &bull; {fillBrand(t.inquiries)}
        </div>
      </div>
    </div>
  );
}

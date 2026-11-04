import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Cpu, Database, ArrowLeft } from "lucide-react";
import { BRAND } from "@/lib/config";
import { buildInfoPageMetadata, loadPageCopy } from "@/i18n/page-copy";
import { buildLocalePath, buildLocaleUrl } from "@/lib/i18n/seo-metadata";
import { buildLocalizedBreadcrumbSchema, serializeJsonLd } from "@/lib/i18n/localized-schemas";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildInfoPageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { common, privacy: t } = await loadPageCopy(locale);
  const homeHref = buildLocalePath(locale);

  const jsonLdBreadcrumb = buildLocalizedBreadcrumbSchema(
    [
      { name: common.home, url: buildLocaleUrl(locale, "/") },
      { name: t.crumb, url: buildLocaleUrl(locale, "/privacy") },
    ],
    locale
  );

  const [verifyBefore, verifyAfter] = t.verifyText.split("{code}");
  const [contactBefore, contactAfter] = t.contactText.split("{email}");

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 space-y-8 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }}
      />
      <div className="space-y-2">
        <Link href={homeHref} className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> {t.back}
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">{t.h1}</h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.intro}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl glass-panel">
          <Cpu className="w-5 h-5 text-[var(--accent-text)] mb-2" />
          <h2 className="font-semibold text-xs text-[var(--text-main)] mb-1">{t.localTitle}</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{t.localText}</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel">
          <Database className="w-5 h-5 text-[var(--accent-text)] mb-2" />
          <h2 className="font-semibold text-xs text-[var(--text-main)] mb-1">{t.cloudTitle}</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{t.cloudText}</p>
        </div>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">{t.verifyTitle}</h2>
          <p>
            {verifyBefore}
            <code className="glass-pill px-2 py-0.5 rounded-md font-mono text-xs text-[var(--text-main)]">F12 &rarr; Network</code>
            {verifyAfter}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">{t.analyticsTitle}</h2>
          <p>{t.analyticsText}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-main)]">{t.contactTitle}</h2>
          <p>
            {contactBefore}
            <a href={`mailto:${BRAND.contactEmail}`} className="text-[var(--accent-text)] underline">{BRAND.contactEmail}</a>
            {contactAfter}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--color-hairline)]">
        <Link href={homeHref} className="font-mono text-xs font-semibold text-[var(--accent-text)] hover:underline">
          {t.cta} &rarr;
        </Link>
      </div>
    </div>
  );
}

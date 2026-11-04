import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Mail, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/config";
import { buildInfoPageMetadata, loadPageCopy } from "@/i18n/page-copy";
import { buildLocalePath, buildLocaleUrl } from "@/lib/i18n/seo-metadata";
import { buildLocalizedBreadcrumbSchema, serializeJsonLd } from "@/lib/i18n/localized-schemas";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildInfoPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { common, contact: t } = await loadPageCopy(locale);

  const jsonLdBreadcrumb = buildLocalizedBreadcrumbSchema(
    [
      { name: common.home, url: buildLocaleUrl(locale, "/") },
      { name: t.crumb, url: buildLocaleUrl(locale, "/contact") },
    ],
    locale
  );

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 sm:px-6 py-10 space-y-8" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }}
      />
      <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <Link href={buildLocalePath(locale)} className="hover:text-[var(--text-main)]">{common.home}</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-medium">{t.crumb}</span>
      </nav>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)]">{t.h1}</h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.intro}</p>
      </div>

      <div className="p-6 rounded-3xl glass-panel space-y-5 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl glass-pill text-[var(--accent-text)]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              {t.emailLabel}
            </span>
            <a href={`mailto:${BRAND.contactEmail}`} className="font-semibold text-[var(--accent-text)] text-sm hover:underline">
              {BRAND.contactEmail}
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-hairline)] space-y-2 text-[var(--text-muted)] leading-relaxed">
          <span className="font-semibold text-[var(--text-main)] block">{t.checklistTitle}</span>
          <div className="space-y-1.5 pl-1">
            {t.checklist.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[var(--accent-text)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

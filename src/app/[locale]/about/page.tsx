import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Code, ArrowLeft, User } from "lucide-react";
import { BRAND } from "@/lib/config";
import { buildInfoPageMetadata, loadPageCopy } from "@/i18n/page-copy";
import { buildLocalePath, buildLocaleUrl } from "@/lib/i18n/seo-metadata";
import { buildLocalizedBreadcrumbSchema, serializeJsonLd } from "@/lib/i18n/localized-schemas";
import { buildOrganizationSchema } from "@/lib/seo/schema-generators";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildInfoPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { common, about: t } = await loadPageCopy(locale);

  const jsonLdBreadcrumb = buildLocalizedBreadcrumbSchema(
    [
      { name: common.home, url: buildLocaleUrl(locale, "/") },
      { name: t.crumb, url: buildLocaleUrl(locale, "/about") },
    ],
    locale
  );
  const jsonLdOrg = buildOrganizationSchema();

  return (
    <div className="max-w-[780px] mx-auto px-4 sm:px-6 py-10 space-y-10 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdOrg) }}
      />

      <div className="space-y-3">
        <Link href={buildLocalePath(locale)} className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> {common.backToTool}
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <Code className="w-3.5 h-3.5 text-[var(--accent-text)]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">{t.h1}</h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{common.intro}</p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">{t.whyTitle}</h2>
          <p>{t.whyP1}</p>
          <p>{t.whyP2}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">{t.archTitle}</h2>
          <div className="p-5 rounded-2xl glass-panel text-xs space-y-2.5 font-mono text-[var(--text-main)]">
            {t.arch.map((item) => (
              <div key={item.k}>
                &bull; <strong className="text-[var(--accent-text)]">{item.k}</strong> {item.v}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-main)]">{t.teamTitle}</h2>
          <div className="p-5 rounded-2xl glass-card space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(200,156,110,0.15)] border border-[rgba(200,156,110,0.3)] flex items-center justify-center text-[var(--accent-text)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-[var(--text-main)]">{BRAND.team.organization}</div>
                <div className="text-xs text-[var(--accent-text)] font-mono">{t.teamRole}</div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{t.teamMission}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

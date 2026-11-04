import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import AspectRatioCalculatorWidget from "@/components/AspectRatioCalculatorWidget";
import { PRESET_GROUPS } from "@/lib/video-presets";
import {
  buildLocalizedSoftwareApplicationSchema,
  buildLocalizedFAQSchema,
  serializeJsonLd,
} from "@/lib/i18n/localized-schemas";
import { buildOrganizationSchema } from "@/lib/seo/schema-generators";
import { BRAND } from "@/lib/config";
import { isSupportedLocale, DEFAULT_LOCALE } from "@/i18n/locales";
import { loadHomeCopy } from "@/i18n/home-copy";
import { buildLocalePath } from "@/lib/i18n/seo-metadata";


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const tFaq = messages.faq || {};
  const tHero = messages.hero || {};
  const tBrand = messages.brand || {};
  const tFooter = messages.footer || {};
  const home = await loadHomeCopy(locale);
  const presetNames: Record<string, string> = home.presets;

  const homeFaqs = [
    { q: tFaq.q1, a: tFaq.a1 },
    { q: tFaq.q2, a: tFaq.a2 },
    { q: tFaq.q3, a: tFaq.a3 },
    { q: tFaq.q4, a: tFaq.a4 },
    { q: tFaq.q5, a: tFaq.a5 },
    { q: tFaq.q6, a: tFaq.a6 },
    { q: tFaq.q7, a: tFaq.a7 },
    { q: tFaq.q8, a: tFaq.a8 },
  ].filter((f) => f.q && f.a);

  const jsonLdFaq = buildLocalizedFAQSchema(homeFaqs, locale);
  const jsonLdApp = buildLocalizedSoftwareApplicationSchema({
    locale,
    name: `${BRAND.name} — ${tBrand.tagline || BRAND.canonicalEntityStatement}`,
    description: messages.seo?.homeDescription || BRAND.description,
    path: "/",
  });
  const jsonLdOrg = buildOrganizationSchema();

  const sectionTitle = "text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-main)]";
  const proseSection = "max-w-3xl mx-auto space-y-3 text-sm leading-relaxed text-[var(--text-muted)]";

  return (
    <div className="w-full text-[var(--text-main)] relative overflow-hidden" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdOrg) }}
      />

      {/* SPATIAL ARCHITECTURAL STUDIO BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft Claymorphism Sphere 1 (Top Left) */}
        <div 
          className="hidden md:block absolute -top-8 left-[6%] xl:left-[11%] w-20 h-20 xl:w-26 xl:h-26 clay-sphere opacity-90 blur-[0.5px]"
          style={{ transform: "translateZ(0)" }}
        />

        {/* Floating 3D Plate 1: Top Left */}
        <div 
          className="hidden lg:block absolute top-10 left-[-3%] xl:left-[1%] w-52 xl:w-64 h-36 xl:h-44 rounded-3xl border hero-plate opacity-70 -rotate-12 transition-transform duration-500 hover:rotate-[-8deg]"
        >
          <svg className="w-full h-full" viewBox="0 0 240 160" fill="none">
            <path 
              d="M 12 125 Q 95 20, 228 55" 
              stroke="url(#progriaGold1)" 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
            <path 
              d="M 12 125 Q 95 20, 228 55" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              strokeDasharray="2 12" 
              strokeLinecap="round" 
              opacity="0.8"
            />
            <circle cx="228" cy="55" r="4.5" fill="#fdfcf8" stroke="#c89c6e" strokeWidth="2" />
            <defs>
              <linearGradient id="progriaGold1" x1="12" y1="125" x2="228" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f7ddbc" />
                <stop offset="0.5" stopColor="#c89c6e" />
                <stop offset="1" stopColor="#8d643d" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating 3D Plate 2: Top Right */}
        <div 
          className="hidden lg:block absolute top-12 right-[-2%] xl:right-[2%] w-56 xl:w-72 h-40 xl:h-48 rounded-3xl border hero-plate opacity-70 rotate-6 transition-transform duration-500 hover:rotate-3"
        >
          <svg className="w-full h-full" viewBox="0 0 260 180" fill="none">
            <circle cx="210" cy="50" r="100" stroke="#c89c6e" strokeWidth="1" opacity="0.4" strokeDasharray="3 7" />
            <path 
              d="M 25 155 Q 140 25, 235 90" 
              stroke="url(#progriaGold2)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="progriaGold2" x1="25" y1="155" x2="235" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9e734c" />
                <stop offset="0.5" stopColor="#dfb78e" />
                <stop offset="1" stopColor="#ebd1b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Clay Sphere 2 (Bottom Right) */}
        <div 
          className="hidden md:block absolute top-[520px] right-[8%] xl:right-[14%] w-24 h-24 xl:w-32 xl:h-32 clay-sphere opacity-90 blur-[0.5px]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div className="max-w-[1020px] mx-auto px-4 sm:px-6 pb-12 relative z-10" suppressHydrationWarning>

        {/* First screen: heading, upload box and facts fit without scrolling */}
        <div className="min-h-[calc(100svh-88px)] flex flex-col justify-center gap-5 py-4">

        {/* Spatial Central Title Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-main)]">
            {home.h1Main} <span className="font-serif italic font-normal text-[var(--accent-text)]">{home.h1Accent}</span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            {tHero.dropSubtitle || "Free video resize tool for Instagram, TikTok, YouTube and more. Your file stays in your browser."}
          </p>
        </div>

        {/* Central Frosted Tool */}
        <section id="tool" aria-label={home.toolAria} className="relative scroll-mt-4" suppressHydrationWarning>
          <VideoProcessor initialRatio={{ w: 9, h: 16 }} />
        </section>

          {/* Short facts (Frosted Glass Pill Capsule) */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill text-xs font-mono text-[var(--text-muted)] text-center shadow-sm">
              <span className="text-[var(--text-main)] font-medium">{tHero.noUpload || "No upload"}</span>
              <span className="text-[var(--accent-text)]">·</span>
              <span className="text-[var(--text-main)] font-medium">{tHero.noWatermark || "No watermark"}</span>
            </div>
          </div>
        </div>

        {/* Below the first screen: sizes, features, FAQ */}
        <div className="space-y-4">

          {/* Intro */}
          <section id="about-resize" className={`pt-4 ${proseSection}`}>
            <h2 className={`${sectionTitle} text-center`}>{home.introTitle}</h2>
            <p>{home.introP1}</p>
            <p>{home.introP2}</p>
          </section>

          {/* All sizes */}
          <section id="sizes" className="pt-8 space-y-4 scroll-mt-4">
            <div className="text-center space-y-1">
              <h2 className={sectionTitle}>{home.sizesTitle}</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">{home.sizesSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESET_GROUPS.map((group) => (
                <div key={group.id} className="glass-panel rounded-2xl p-4">
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mb-2">{presetNames[group.name] ?? group.name}</h3>
                  <ul className="text-xs">
                    {group.presets.map((preset) => (
                      <li key={preset.id}>
                        <a
                          href={`#size=${preset.id}`}
                          className="flex items-center justify-between gap-3 py-1.5 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
                        >
                          <span>{presetNames[preset.label] ?? preset.label}</span>
                          <span className="font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                            {preset.ratio} · {preset.width}×{preset.height}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section id="features" className="pt-8 space-y-4 scroll-mt-4">
            <h2 className={`${sectionTitle} text-center`}>{home.featuresTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {home.features.map((feature) => (
                <div key={feature.title} className="glass-panel rounded-2xl p-4">
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mb-1">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section id="how-it-works" className="pt-8 space-y-4 scroll-mt-4">
            <h2 className={`${sectionTitle} text-center`}>{home.howTitle}</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {home.steps.map((step, index) => (
                <li key={step.title} className="glass-panel rounded-2xl p-4">
                  <span className="font-mono text-xs text-[var(--accent-text)]">0{index + 1}</span>
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mt-1 mb-1">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Why resize */}
          <section id="why-resize" className={`pt-8 scroll-mt-4 ${proseSection}`}>
            <h2 className={`${sectionTitle} text-center`}>{home.whyTitle}</h2>
            <p>{home.whyP1}</p>
            <p>{home.whyLead}</p>
            <ul className="list-disc ps-5 space-y-1">
              {home.whyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Tips */}
          <section id="resize-tips" className={`pt-8 scroll-mt-4 ${proseSection}`}>
            <h2 className={`${sectionTitle} text-center`}>{home.tipsTitle}</h2>
            <ul className="list-disc ps-5 space-y-2">
              {home.tips.map((tip) => (
                <li key={tip.lead}>
                  <strong className="text-[var(--text-main)]">{tip.lead}</strong> {tip.text}
                </li>
              ))}
            </ul>
            <p className="text-center">
              <a href="#tool" className="font-semibold text-[var(--accent-text)] hover:underline">
                {home.tipsCta}
              </a>
            </p>
          </section>

          {/* Calculator */}
          <section id="calculator" className="pt-8 scroll-mt-4">
            <AspectRatioCalculatorWidget />
          </section>

          {/* FAQ */}
          <section id="faq" className="pt-8 space-y-4 scroll-mt-4">
            <div className="text-center space-y-1">
              <h2 className={sectionTitle}>{tFaq.sectionTitle}</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">{tFaq.sectionSubtitle}</p>
            </div>
            <div className="space-y-2">
              {homeFaqs.map((faq) => (
                <details key={faq.q} className="group glass-panel rounded-2xl p-4 text-xs">
                  <summary className="cursor-pointer font-semibold text-[var(--text-main)] select-none flex items-center justify-between gap-3">
                    <h3>{faq.q}</h3>
                    <span className="group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="pt-2 leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Frosted Glass Footer */}
          <footer className="pt-3 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} {BRAND.name}. {tFooter?.tagline || "Free online video resizer."}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={buildLocalePath(locale, "/about")} className="hover:text-[var(--accent-text)] transition-colors">{home.footer.about}</Link>
              <Link href={buildLocalePath(locale, "/privacy")} className="hover:text-[var(--accent-text)] transition-colors">{home.footer.privacy}</Link>
              <Link href={buildLocalePath(locale, "/terms")} className="hover:text-[var(--accent-text)] transition-colors">{home.footer.terms}</Link>
              <Link href={buildLocalePath(locale, "/contact")} className="hover:text-[var(--accent-text)] transition-colors">{home.footer.contact}</Link>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

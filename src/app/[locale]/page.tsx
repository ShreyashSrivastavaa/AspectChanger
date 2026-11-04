import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import VideoProcessor from "@/components/VideoProcessor";
import {
  buildLocalizedSoftwareApplicationSchema,
  buildLocalizedFAQSchema,
} from "@/lib/i18n/localized-schemas";
import { buildOrganizationSchema } from "@/lib/seo/schema-generators";
import { BRAND } from "@/lib/config";
import { isSupportedLocale, DEFAULT_LOCALE } from "@/i18n/locales";

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
  const tNav = messages.nav || {};
  const tFooter = messages.footer || {};

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

  const popularConversions = [
    { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16" },
    { href: "/tools/9-16-to-16-9", label: "9:16 to 16:9" },
    { href: "/tools/16-9-to-1-1", label: "16:9 to 1:1" },
    { href: "/tools/16-9-to-4-5", label: "16:9 to 4:5" },
    { href: "/tools/1-1-to-9-16", label: "1:1 to 9:16" },
    { href: "/tools/4-3-to-16-9", label: "4:3 to 16:9" },
  ];

  return (
    <div className="w-full text-[var(--text-main)] relative overflow-hidden" suppressHydrationWarning>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
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
          className="hidden lg:block absolute top-10 left-[-3%] xl:left-[1%] w-52 xl:w-64 h-36 xl:h-44 rounded-3xl border border-white/80 opacity-70 -rotate-12 transition-transform duration-500 hover:rotate-[-8deg]"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 238, 230, 0.25) 100%)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 30px 65px -10px rgba(130, 105, 80, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)",
          }}
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
          className="hidden lg:block absolute top-12 right-[-2%] xl:right-[2%] w-56 xl:w-72 h-40 xl:h-48 rounded-3xl border border-white/80 opacity-70 rotate-6 transition-transform duration-500 hover:rotate-3"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 238, 230, 0.25) 100%)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 30px 65px -10px rgba(130, 105, 80, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)",
          }}
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

      <div className="max-w-[1020px] mx-auto px-4 sm:px-6 pt-5 pb-12 space-y-6 relative z-10" suppressHydrationWarning>
        
        {/* Spatial Central Title Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>{tBrand.clientEngine || "Client-Side WebAssembly Studio"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-main)]">
            Video Aspect Ratio <span className="font-serif italic font-normal text-[#c89c6e]">Changer</span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            {tHero.dropSubtitle || "Reframe for Shorts, Reels, and TikTok in seconds. 100% private in browser memory."}
          </p>
        </div>

        {/* Central Frosted Tool */}
        <section aria-label="Aspect Ratio Tool" className="relative" suppressHydrationWarning>
          <VideoProcessor initialRatio={{ w: 9, h: 16 }} />
        </section>

        {/* Strip Below Tool: Facts, Links, SEO */}
        <div className="space-y-4 pt-2">
          
          {/* Row 1: 3 Short Facts (Frosted Glass Pill Capsule) */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill text-xs font-mono text-[var(--text-muted)] text-center shadow-sm">
              <span className="text-[var(--text-main)] font-medium">{tHero.noUpload || "No upload"}</span>
              <span className="text-[#c89c6e]">·</span>
              <span className="text-[var(--text-main)] font-medium">{tHero.noWatermark || "No watermark"}</span>
              <span className="text-[#c89c6e]">·</span>
              <span className="text-[var(--text-main)] font-medium">{tHero.upTo500mb || "Up to 500 MB"}</span>
            </div>
          </div>

          {/* Row 2: Popular Conversions (Frosted Pill Chips) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px] mr-1">
              {tHero.popularConversions || "Conversions:"}
            </span>
            {popularConversions.map((conv) => (
              <Link
                key={conv.href}
                href={conv.href as any}
                className="px-3 py-1 rounded-full glass-pill text-[var(--text-main)] hover:border-[#c89c6e] hover:text-[#c89c6e] transition-colors"
              >
                {conv.label}
              </Link>
            ))}
          </div>

          {/* Row 3: Collapsible Answer-First Crawlable SEO Block */}
          <div className="pt-2">
            <details className="group text-left glass-panel rounded-2xl p-4 text-xs transition-colors">
              <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[#c89c6e] transition-colors select-none flex items-center justify-between">
                <span>{tHero.aboutArchitecture || "About In-Browser Aspect Ratio Reframing & Architecture"}</span>
                <span className="text-xs group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="pt-3 text-[var(--text-muted)] leading-relaxed space-y-2.5">
                {homeFaqs.slice(0, 3).map((faq, idx) => (
                  <div key={idx} className="space-y-1">
                    <h2 className="font-semibold text-[var(--text-main)] text-xs">{faq.q}</h2>
                    <p>{faq.a}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-[var(--color-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="font-semibold text-[var(--text-main)]">Supported Inputs:</span> MP4, MOV, WebM, MKV, AVI
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--text-main)]">Privacy Architecture:</span> 100% In-Browser Memory (COOP/COEP Sandbox)
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Frosted Glass Footer */}
          <footer className="pt-3 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} {BRAND.name}. {tFooter?.tagline || "Spatial Client-Side Processing."}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tools" className="hover:text-[#c89c6e] transition-colors">
                {tNav.tools || "All Tools"}
              </Link>
              <Link href="/for" className="hover:text-[#c89c6e] transition-colors">
                {tNav.platforms || "Platforms"}
              </Link>
              <Link href="/guides" className="hover:text-[#c89c6e] transition-colors">
                {tNav.guides || "Guides"}
              </Link>
              <Link href="/privacy" className="hover:text-[#c89c6e] transition-colors">
                {tNav.privacy || "Privacy"}
              </Link>
              <Link href="/contact" className="hover:text-[#c89c6e] transition-colors">
                {tNav.contact || "Contact"}
              </Link>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

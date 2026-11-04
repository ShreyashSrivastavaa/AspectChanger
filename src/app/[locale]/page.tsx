import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import AspectRatioCalculatorWidget from "@/components/AspectRatioCalculatorWidget";
import { PRESET_GROUPS } from "@/lib/video-presets";
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

  const features = [
    { title: "Every platform size", text: "Instagram, TikTok, YouTube, Facebook, X, LinkedIn, Snapchat, Pinterest, WhatsApp and common screens, exported at exact pixels." },
    { title: "Blur, crop or bars", text: "Fill the frame with a blurred background, crop to fit, or add bars in any color." },
    { title: "Zoom and reframe", text: "Drag the crosshair and zoom up to 300% to keep your subject in the shot." },
    { title: "Custom ratios", text: "Enter any ratio up to 4:1, including decimals such as 2.35:1." },
    { title: "Private by design", text: "Your video is processed inside your browser and is never uploaded to a server." },
    { title: "Free, no watermark", text: "No account and no watermark on your exported video." },
    { title: "MP4 and WebM export", text: "Open MP4, MOV, WebM or MKV up to 500 MB, then export H.264 MP4 or VP9 WebM." },
    { title: "Sound stays in", text: "Your audio track is carried into the exported file automatically." },
  ];

  const steps = [
    { title: "Add your video", text: "Choose or drop a clip. It stays on your device." },
    { title: "Pick a size", text: "Choose a platform, a screen size, or a custom ratio, then frame it." },
    { title: "Convert and download", text: "Your browser does the encoding, then the file is ready to save." },
  ];

  const sectionTitle = "text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-main)]";

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

      <div className="max-w-[1020px] mx-auto px-4 sm:px-6 pt-2 pb-12 space-y-4 relative z-10" suppressHydrationWarning>
        
        {/* Spatial Central Title Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>{tBrand.clientEngine || "Client-Side WebCodecs Studio"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-main)]">
            Video Aspect Ratio <span className="font-serif italic font-normal text-[var(--accent-text)]">Changer</span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            {tHero.dropSubtitle || "Reframe for Shorts, Reels, and TikTok in seconds. 100% private in browser memory."}
          </p>
        </div>

        {/* Central Frosted Tool */}
        <section id="tool" aria-label="Aspect Ratio Tool" className="relative scroll-mt-4" suppressHydrationWarning>
          <VideoProcessor initialRatio={{ w: 9, h: 16 }} />
        </section>

        {/* Strip Below Tool: Facts, Links, SEO */}
        <div className="space-y-4 pt-2">
          
          {/* Row 1: 3 Short Facts (Frosted Glass Pill Capsule) */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill text-xs font-mono text-[var(--text-muted)] text-center shadow-sm">
              <span className="text-[var(--text-main)] font-medium">{tHero.noUpload || "No upload"}</span>
              <span className="text-[var(--accent-text)]">·</span>
              <span className="text-[var(--text-main)] font-medium">{tHero.noWatermark || "No watermark"}</span>
              <span className="text-[var(--accent-text)]">·</span>
              <span className="text-[var(--text-main)] font-medium">{tHero.upTo500mb || "Up to 500 MB"}</span>
            </div>
          </div>

          {/* All sizes */}
          <section id="sizes" className="pt-8 space-y-4 scroll-mt-4">
            <div className="text-center space-y-1">
              <h2 className={sectionTitle}>Every platform and screen size</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">Select a size to load it into the tool.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESET_GROUPS.map((group) => (
                <div key={group.id} className="glass-panel rounded-2xl p-4">
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mb-2">{group.name}</h3>
                  <ul className="text-xs">
                    {group.presets.map((preset) => (
                      <li key={preset.id}>
                        <a
                          href={`#size=${preset.id}`}
                          className="flex items-center justify-between gap-3 py-1.5 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
                        >
                          <span>{preset.label}</span>
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
            <h2 className={`${sectionTitle} text-center`}>Everything you need to reframe a video</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {features.map((feature) => (
                <div key={feature.title} className="glass-panel rounded-2xl p-4">
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mb-1">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section id="how-it-works" className="pt-8 space-y-4 scroll-mt-4">
            <h2 className={`${sectionTitle} text-center`}>How it works</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {steps.map((step, index) => (
                <li key={step.title} className="glass-panel rounded-2xl p-4">
                  <span className="font-mono text-xs text-[var(--accent-text)]">0{index + 1}</span>
                  <h3 className="font-semibold text-sm text-[var(--text-main)] mt-1 mb-1">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Calculator */}
          <section id="calculator" className="pt-8 scroll-mt-4">
            <AspectRatioCalculatorWidget />
          </section>

          {/* FAQ */}
          <section id="faq" className="pt-8 space-y-4 scroll-mt-4">
            <h2 className={`${sectionTitle} text-center`}>Frequently asked questions</h2>
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
              <span>© {new Date().getFullYear()} {BRAND.name}. {tFooter?.tagline || "Spatial Client-Side Processing."}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/about" className="hover:text-[var(--accent-text)] transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-[var(--accent-text)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--accent-text)] transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-[var(--accent-text)] transition-colors">Contact</Link>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

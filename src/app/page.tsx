import Link from "next/link";
import VideoProcessor from "@/components/VideoProcessor";
import { buildSoftwareApplicationSchema, buildOrganizationSchema, buildFAQSchema } from "@/lib/seo/schema-generators";
import { BRAND } from "@/lib/config";

export default function HomePage() {
  const homeFaqs = [
    {
      q: "How do I change a video from landscape to portrait without cropping out important parts?",
      a: "Select the 9:16 vertical preset and choose 'Blur'. This scales your original horizontal video to fit cleanly within the vertical canvas while automatically filling the top and bottom with a soft, blurred duplicate of the video."
    },
    {
      q: "What aspect ratio is best for YouTube Shorts, TikTok, and Instagram Reels?",
      a: "All three vertical short-form platforms require a 9:16 aspect ratio (recommended resolution: 1080 x 1920 pixels). Ensuring key titles are kept inside the central safe zone avoids overlap with UI buttons."
    },
    {
      q: "Does changing aspect ratio reduce video quality?",
      a: "Not with AspectCut. Video frames are re-encoded directly on your device CPU using FFmpeg WebAssembly. When audio codecs match the container (such as AAC in MP4), the audio stream is copied bit-for-bit without generational loss."
    },
    {
      q: "Are my private videos uploaded to your servers?",
      a: "Never. Your video file is read into your browser's local sandbox memory and transformed using client-side WebAssembly. No bytes are sent across the network, ensuring complete privacy."
    },
    {
      q: "What video formats and maximum file sizes are supported?",
      a: "AspectCut accepts MP4, MOV, WebM, MKV, and AVI containers up to 500 MB in size."
    },
    {
      q: "Why do exported videos need even-numbered pixel dimensions?",
      a: "Modern video codecs like H.264 and HEVC utilize YUV 4:2:0 chroma subsampling, requiring pixel widths and heights to be divisible by 2. Odd pixel dimensions cause hardware decoding crashes or green line artifacts."
    },
    {
      q: "How does the ambient blurred background extension work?",
      a: "AspectCut places your original footage centered at full resolution in the middle, while generating an enlarged, heavily blurred duplicate layer behind it to elegantly fill empty letterbox bars."
    },
    {
      q: "Can I convert video aspect ratios on mobile devices like iPhone or Android?",
      a: "Yes. AspectCut executes directly in modern mobile browsers (iOS Safari 16+ and Android Chrome) with WebAssembly support, letting you export directly to your device camera roll without installing native apps."
    }
  ];

  const jsonLdFaq = buildFAQSchema(homeFaqs);
  const jsonLdApp = buildSoftwareApplicationSchema({
    name: "AspectCut Video Aspect Ratio Changer",
    description: BRAND.canonicalEntityStatement,
    url: BRAND.domain,
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

      {/* SPATIAL ARCHITECTURAL BACKGROUND (Recreating the reference image atmosphere) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft floating claymorphism sphere 1 (Top Left) */}
        <div 
          className="absolute -top-10 left-[10%] w-24 h-24 rounded-full opacity-70 blur-[1px]"
          style={{
            background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #edd4c0 40%, #c9a78d 100%)",
            boxShadow: "0 25px 40px -10px rgba(160, 125, 95, 0.35)",
          }}
        />

        {/* Soft floating sphere 2 (Bottom Right) */}
        <div 
          className="absolute top-[48%] -right-8 w-36 h-36 rounded-full opacity-65 blur-[1px]"
          style={{
            background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #ebd3bf 45%, #c29e84 100%)",
            boxShadow: "0 35px 50px -15px rgba(160, 125, 95, 0.4)",
          }}
        />

        {/* Floating 3D Frosted Glass Plate: Top Left (16:9) */}
        <div 
          className="hidden xl:block absolute top-12 left-[-2%] w-56 h-36 rounded-2xl border border-white/80 opacity-55 rotate-[-12deg]"
          style={{
            background: "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 30px 60px rgba(120, 100, 80, 0.15)",
          }}
        >
          {/* Metallic curved gold wave */}
          <svg className="w-full h-full" viewBox="0 0 220 140" fill="none">
            <path 
              d="M 10 110 Q 90 20, 210 50" 
              stroke="url(#goldGradient1)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="goldGradient1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f7e1cb" />
                <stop offset="50%" stopColor="#c89c6e" />
                <stop offset="100%" stopColor="#966d48" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating 3D Frosted Glass Plate: Top Right (9:16) */}
        <div 
          className="hidden xl:block absolute top-16 right-[-2%] w-48 h-64 rounded-2xl border border-white/80 opacity-55 rotate-[14deg]"
          style={{
            background: "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 30px 60px rgba(120, 100, 80, 0.15)",
          }}
        >
          {/* Metallic curved gold wave */}
          <svg className="w-full h-full" viewBox="0 0 190 250" fill="none">
            <path 
              d="M 20 50 Q 150 120, 40 220" 
              stroke="url(#goldGradient2)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="goldGradient2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f7e1cb" />
                <stop offset="50%" stopColor="#c89c6e" />
                <stop offset="100%" stopColor="#966d48" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Terrazzo Mineral Plate: Bottom Left */}
        <div 
          className="hidden xl:block absolute bottom-8 left-[2%] w-52 h-36 rounded-2xl border border-white/70 opacity-50 rotate-[-8deg]"
          style={{
            background: "radial-gradient(#ab9b8a 1px, transparent 1px) 0 0 / 12px 12px, rgba(235, 225, 215, 0.6)",
            boxShadow: "0 25px 50px rgba(120, 100, 80, 0.12)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
            <path 
              d="M 10 70 Q 110 30, 190 90" 
              stroke="url(#goldGradient1)" 
              strokeWidth="3.5" 
            />
          </svg>
        </div>
      </div>

      {/* Main Single-Viewport Stage */}
      <div className="max-w-[1020px] mx-auto px-4 sm:px-6 pt-5 pb-12 space-y-6 relative z-10" suppressHydrationWarning>
        
        {/* Spatial Central Title Header (Matching "Progria Nova" centering & typography) */}
        <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
            <span>Client-Side WebAssembly Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-main)]">
            Video Aspect Ratio <span className="font-serif italic font-normal text-[#c89c6e]">Changer</span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            Reframe for Shorts, Reels, and TikTok in seconds. 100% private in browser memory.
          </p>
        </div>

        {/* Central Frosted Tool */}
        <section aria-label="Aspect Ratio Tool" className="relative">
          <VideoProcessor initialRatio={{ w: 9, h: 16 }} />
        </section>

        {/* Strip Below Tool: Facts, Links, SEO */}
        <div className="space-y-4 pt-2">
          
          {/* Row 1: 3 Short Facts (Frosted Glass Pill Capsule) */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill text-xs font-mono text-[var(--text-muted)] text-center shadow-sm">
              <span className="text-[var(--text-main)] font-medium">No upload</span>
              <span className="text-[#c89c6e]">·</span>
              <span className="text-[var(--text-main)] font-medium">No watermark</span>
              <span className="text-[#c89c6e]">·</span>
              <span className="text-[var(--text-main)] font-medium">Up to 500 MB</span>
            </div>
          </div>

          {/* Row 2: Popular Conversions (Frosted Pill Chips) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px] mr-1">
              Conversions:
            </span>
            {popularConversions.map((conv) => (
              <Link
                key={conv.href}
                href={conv.href}
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
                <span>About In-Browser Aspect Ratio Reframing & Architecture</span>
                <span className="text-xs group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="pt-3 text-[var(--text-muted)] leading-relaxed space-y-2.5">
                <p>
                  AspectCut is a client-side video aspect ratio changer designed to convert horizontal 16:9 footage into vertical 9:16, square 1:1, or portrait 4:5 formats without compromising visual quality. By running WebAssembly FFmpeg locally inside your browser, video frames are decoded, cropped or padded, and re-encoded entirely on your device's CPU. No video files or frames are ever uploaded to cloud servers, eliminating privacy concerns, bandwidth limits, and long queue times.
                </p>
                <p>
                  Whether reframing widescreen YouTube videos for TikTok, Instagram Reels, and Shorts, or adapting mobile recordings for widescreen displays, AspectCut offers three framing modes: intelligent downscaled ambient blur to softly fill letterbox margins, precision focal crop with interactive framing, and clean architectural pillarbox bars. Standard audio streams such as AAC in MP4 containers are copied without generational loss, delivering full-fidelity output in seconds.
                </p>
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
              <span>© 2026 AspectCut. Spatial Client-Side Processing.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tools" className="hover:text-[#c89c6e] transition-colors">
                All Tools
              </Link>
              <Link href="/for" className="hover:text-[#c89c6e] transition-colors">
                Platforms
              </Link>
              <Link href="/guides" className="hover:text-[#c89c6e] transition-colors">
                Guides
              </Link>
              <Link href="/privacy" className="hover:text-[#c89c6e] transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-[#c89c6e] transition-colors">
                Contact
              </Link>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

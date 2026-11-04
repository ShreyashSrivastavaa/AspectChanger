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

      {/* SPATIAL ARCHITECTURAL STUDIO BACKGROUND (Faithfully reproducing the reference image) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        
        {/* Soft Claymorphism Sphere 1 (Top Left) */}
        <div 
          className="hidden md:block absolute -top-8 left-[6%] xl:left-[11%] w-20 h-20 xl:w-26 xl:h-26 clay-sphere opacity-90 blur-[0.5px]"
          style={{ transform: "translateZ(0)" }}
        />

        {/* Floating 3D Plate 1: Top Left (Frosted Glass with Liquid Gold Wave) */}
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
              stroke="rgba(255, 255, 255, 0.6)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="progriaGold1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fceddf" />
                <stop offset="35%" stopColor="#d8ab7d" />
                <stop offset="70%" stopColor="#c89c6e" />
                <stop offset="100%" stopColor="#8d623e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating 3D Plate 2: Top Right (Frosted Glass with Champagne Stipples & Gold Wave) */}
        <div 
          className="hidden lg:block absolute top-12 right-[-3%] xl:right-[1%] w-48 xl:w-56 h-60 xl:h-72 rounded-3xl border border-white/80 opacity-70 rotate-[14deg] transition-transform duration-500 hover:rotate-[10deg] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(245, 235, 225, 0.25) 100%)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 30px 65px -10px rgba(130, 105, 80, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)",
          }}
        >
          {/* Top Champagne Stippled Texture */}
          <div className="absolute inset-0 stipple-surface opacity-35" />
          <svg className="w-full h-full relative z-10" viewBox="0 0 200 260" fill="none">
            <path 
              d="M 20 60 Q 165 130, 35 235" 
              stroke="url(#progriaGold2)" 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
            <path 
              d="M 20 60 Q 165 130, 35 235" 
              stroke="rgba(255, 255, 255, 0.6)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="progriaGold2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#faebd7" />
                <stop offset="40%" stopColor="#d4a373" />
                <stop offset="80%" stopColor="#b08156" />
                <stop offset="100%" stopColor="#754f30" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating 3D Plate 3: Bottom Left (Speckled Mineral Terrazzo with Gold Wave) */}
        <div 
          className="hidden lg:block absolute bottom-12 left-[-2%] xl:left-[2%] w-48 xl:w-60 h-36 xl:h-44 rounded-3xl border border-white/75 opacity-75 -rotate-8 transition-transform duration-500 hover:rotate-[-4deg] terrazzo-surface overflow-hidden"
          style={{
            boxShadow: "0 28px 60px -10px rgba(120, 95, 75, 0.2), inset 0 1.5px 2px rgba(255, 255, 255, 0.9)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 220 150" fill="none">
            <path 
              d="M 10 75 Q 115 35, 205 105" 
              stroke="url(#progriaGold1)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M 10 75 Q 115 35, 205 105" 
              stroke="rgba(255, 255, 255, 0.55)" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        {/* Floating 3D Plate 4: Bottom Right (Fine Diagonal Pinstripes with Gold Wave) */}
        <div 
          className="hidden lg:block absolute bottom-8 right-[4%] xl:right-[7%] w-48 xl:w-56 h-64 xl:h-76 rounded-3xl border border-white/80 opacity-75 rotate-[12deg] transition-transform duration-500 hover:rotate-[8deg] pinstripe-surface overflow-hidden"
          style={{
            backdropFilter: "blur(16px)",
            boxShadow: "0 30px 65px -10px rgba(130, 105, 80, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 270" fill="none">
            <path 
              d="M 15 80 Q 155 150, 40 245" 
              stroke="url(#progriaGold2)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M 15 80 Q 155 150, 40 245" 
              stroke="rgba(255, 255, 255, 0.6)" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        {/* Terrazzo Curved Arch (Bottom Right Background) */}
        <div 
          className="hidden xl:block absolute bottom-0 right-[2%] w-44 h-44 rounded-t-full terrazzo-surface opacity-75 border-t border-l border-r border-white/60"
          style={{
            boxShadow: "0 25px 50px -10px rgba(120, 95, 75, 0.25)",
            transform: "translateY(25%)",
          }}
        />

        {/* Resting Clay Sphere 2 (Bottom Right near arch) */}
        <div 
          className="hidden md:block absolute bottom-6 right-[14%] xl:right-[15%] w-24 h-24 xl:w-32 xl:h-32 clay-sphere opacity-95"
          style={{
            boxShadow: "0 35px 60px -15px rgba(150, 115, 85, 0.45), 0 15px 25px -5px rgba(150, 115, 85, 0.3)",
          }}
        />

        {/* Soft Organic Clay Pebble (Bottom Left) */}
        <div 
          className="hidden xl:block absolute -bottom-10 left-[8%] w-36 h-28 rounded-[50%] clay-sphere opacity-60 blur-[1px]"
        />

        {/* Subtle Botanical Leaf Silhouette (Far Right Edge) */}
        <div 
          className="hidden xl:block absolute top-[28%] right-[-10px] w-28 h-56 opacity-25 blur-[2.5px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 50%, #4a5c43 0%, #687e60 40%, transparent 75%)",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          }}
        />

        {/* Studio Floor Reflection & Diffuse Ambient Glow */}
        <div 
          className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(240, 232, 222, 0.75) 0%, rgba(245, 239, 232, 0.3) 50%, transparent 100%)",
          }}
        />
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
        <section aria-label="Aspect Ratio Tool" className="relative" suppressHydrationWarning>
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

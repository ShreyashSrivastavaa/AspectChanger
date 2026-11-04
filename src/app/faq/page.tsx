import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo/schema-generators";

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | ${BRAND.name}`,
  description:
    "20+ comprehensive answers about video aspect ratio conversions, WebAssembly processing, safe zones, macroblocks, audio stream copying, and platform specifications.",
  alternates: {
    canonical: `${BRAND.domain}/faq`,
  },
};

const FAQS = [
  // Category 1: Aspect Ratio Fundamentals
  {
    category: "Aspect Ratio Fundamentals",
    q: "What is a video aspect ratio?",
    a: "An aspect ratio is the proportional relationship between a video canvas's width and its height, expressed as two numbers separated by a colon (such as 16:9 or 9:16). It dictates whether a video is widescreen, square, or vertical."
  },
  {
    category: "Aspect Ratio Fundamentals",
    q: "What is the difference between 16:9 and 9:16?",
    a: "16:9 is a horizontal widescreen orientation (1.78:1 ratio) standard on desktop monitors, TVs, and YouTube videos. 9:16 is a vertical portrait orientation (0.56:1 ratio) standard on mobile smartphones, TikTok, Reels, and Shorts."
  },
  {
    category: "Aspect Ratio Fundamentals",
    q: "How is aspect ratio calculated from pixel resolution?",
    a: "Aspect ratio is calculated by dividing width and height by their greatest common divisor (GCD). For example, with 1920×1080 pixels, the GCD is 120. 1920÷120 = 16 and 1080÷120 = 9, yielding 16:9."
  },
  {
    category: "Aspect Ratio Fundamentals",
    q: "What is the decimal equivalent of 16:9 and 9:16?",
    a: "16:9 equals 1.7778:1 (or approximately 1.78:1). 9:16 equals 0.5625:1. Square 1:1 equals 1.0:1, and portrait 4:5 equals 0.8:1."
  },

  // Category 2: Platform Rules & Safe Zones
  {
    category: "Platform Formats & Safe Zones",
    q: "What aspect ratio is required for TikTok, YouTube Shorts, and Instagram Reels?",
    a: "All three short-form platforms require a 9:16 vertical aspect ratio with a recommended pixel resolution of 1080×1920."
  },
  {
    category: "Platform Formats & Safe Zones",
    q: "What is the best aspect ratio for Instagram Feed in 2026?",
    a: "4:5 portrait (1080×1350 pixels) is the optimal format for the main Instagram feed. It occupies 25% more screen height on mobile devices than 1:1 square, maximizing user attention and engagement."
  },
  {
    category: "Platform Formats & Safe Zones",
    q: "What are safe zones in vertical video?",
    a: "Safe zones are the central screen areas free from platform interface overlays. On TikTok and Reels, like buttons, comment icons, usernames, and audio pills cover the edges. Keeping text in the central safe area prevents vital information from being obstructed."
  },
  {
    category: "Platform Formats & Safe Zones",
    q: "Why does my 16:9 video look zoomed in when uploaded to TikTok?",
    a: "TikTok automatically center-crops horizontal 16:9 footage to fill the 9:16 display, discarding 68.36% of the horizontal canvas. Using AspectCut with 'Blur' mode prevents cropping by adding ambient background margins."
  },
  {
    category: "Platform Formats & Safe Zones",
    q: "What aspect ratio does LinkedIn video support?",
    a: "LinkedIn supports 1:1 (square), 16:9 (widescreen), 4:5 (portrait), and 9:16 (vertical). 1:1 square (1080×1080) yields the most consistent rendering across both mobile and desktop feeds."
  },
  {
    category: "Platform Formats & Safe Zones",
    q: "What is the maximum duration for YouTube Shorts in 2026?",
    a: "As of official platform policy updates, YouTube Shorts supports videos up to 3 minutes (180 seconds) in duration for vertical 9:16 or square 1:1 uploads."
  },

  // Category 3: Quality, Codecs & Compression
  {
    category: "Quality & Video Engineering",
    q: "Does changing video aspect ratio reduce picture quality?",
    a: "Not when using appropriate encoding parameters. AspectCut allows you to configure CRF (Constant Rate Factor) between 18 (visually lossless) and 28. Setting CRF 18–20 produces high-fidelity output matching professional master files."
  },
  {
    category: "Quality & Video Engineering",
    q: "Why do video dimensions need to be even numbers?",
    a: "Modern video codecs (H.264, HEVC, VP9) use YUV 4:2:0 chroma subsampling, which groups color pixels into 2×2 blocks. Odd pixel dimensions break decoder alignment, causing green edge lines or playback crashes on smartphones."
  },
  {
    category: "Quality & Video Engineering",
    q: "What is the difference between Crop, Blur Ambient, and Letterbox modes?",
    a: "Crop zooms in and slices off the edges to fill the target aspect ratio. Blur Ambient centers the original video and mirrors an enlarged, blurred duplicate in the bars. Letterbox applies clean solid black margins."
  },
  {
    category: "Quality & Video Engineering",
    q: "What is audio stream copying (-c:a copy)?",
    a: "When the input audio format matches the target container (such as AAC in MP4), AspectCut copies the compressed audio stream directly without decompressing or re-encoding it. This eliminates generational audio degradation and speeds up export by 20%."
  },
  {
    category: "Quality & Video Engineering",
    q: "What is the difference between DAR, SAR, and PAR?",
    a: "DAR is Display Aspect Ratio (the overall frame shape, like 16:9). SAR is Storage Aspect Ratio (width:height pixel count). PAR is Pixel Aspect Ratio (the shape of individual pixels, 1:1 for square pixels). Formula: DAR = SAR × PAR."
  },

  // Category 4: Privacy & WebAssembly Architecture
  {
    category: "Privacy & Technology Architecture",
    q: "How does AspectCut resize videos without uploading them?",
    a: "AspectCut compiles the open-source FFmpeg core into WebAssembly (WASM). Your browser decodes video frames, runs the spatial filter graph, and encodes the MP4 file directly on your local CPU. Zero bytes are uploaded to remote servers."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "Are my confidential company or personal family videos private?",
    a: "Yes, 100% private. Because there are no backend processing servers, your video data never traverses the network. Even if your internet connection disconnects mid-render, processing continues uninterrupted."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "What video formats and maximum file sizes are supported?",
    a: "AspectCut accepts MP4, MOV, WebM, MKV, and AVI containers up to 500 MB in size. Modern desktop systems with 8 GB+ RAM comfortably transcode multi-minute high-definition footage."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "Are there any watermarks or hidden subscription paywalls?",
    a: "None. AspectCut is completely free, does not add any watermarks to your video, and requires no registration or credit card."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "Why is client-side WebAssembly faster than cloud video converters?",
    a: "Cloud editors require you to upload your multi-hundred-megabyte video file over your internet uplink, wait in a server queue, and download the finished file. AspectCut starts transcoding immediately in local memory with zero upload latency."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "Can I convert video aspect ratios on mobile devices like iPhone or Android?",
    a: "Yes. AspectCut runs directly in mobile browsers that support WebAssembly and SharedArrayBuffer (iOS Safari 16+ and Android Chrome), allowing export directly back to your camera roll."
  },
  {
    category: "Privacy & Technology Architecture",
    q: "What is Cross-Origin Isolation (COOP and COEP)?",
    a: "Cross-Origin Opener Policy (COOP) and Cross-Origin Embedder Policy (COEP) are security headers that allow web browsers to unlock SharedArrayBuffer. This enables multi-threaded POSIX pthreads inside WebAssembly for up to 3.3× faster export speeds."
  }
];

export default function FAQPage() {
  const jsonLdBreadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  const jsonLdFaq = buildFAQSchema(FAQS.map(f => ({ q: f.q, a: f.a })));

  const categories = Array.from(new Set(FAQS.map(f => f.category)));

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 space-y-10 text-[var(--text-main)]" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[#c89c6e] transition-colors mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tool
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-[var(--text-muted)]">
          <HelpCircle className="w-3.5 h-3.5 text-[#c89c6e]" />
          <span>Knowledge Base · 22 Verified Answers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-main)]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {BRAND.canonicalEntityStatement} Detailed technical answers to the most common video aspect ratio, platform specification, and encoding questions.
        </p>
      </div>

      {/* Categorized FAQs */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat} className="space-y-4">
            <h2 className="text-base font-semibold text-[#e8c89b] border-b border-[var(--border-subtle)] pb-2 font-mono uppercase tracking-wider text-xs">
              {cat}
            </h2>
            <div className="space-y-3">
              {FAQS.filter(f => f.category === cat).map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-card space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--text-main)] leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

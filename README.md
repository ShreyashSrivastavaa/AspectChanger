# AspectCut — Precision Client-Side Video Aspect Ratio Changer

> **Primary Keyword:** "video aspect ratio changer"  
> **Secondary Keywords:** "change video aspect ratio online", "resize video for instagram", "convert video to 9:16", "16:9 to 9:16 converter", "video resizer for youtube shorts / tiktok / reels", "crop video online free"

AspectCut is a production-ready, client-side micro-SaaS engineered to reframe and change the aspect ratio of videos (16:9, 9:16, 1:1, 4:5, 4:3, 21:9, and custom) directly in the browser with **zero file uploads**, **no watermarks**, and **no registration required**.

---

## 1. Product Capabilities & Specifications

- **Above-The-Fold Live Workspace:** Drag-and-drop or click-to-upload tool sits immediately above the fold on the homepage and every programmatic converter page.
- **Accepted Formats & Limits:** Accepts MP4, MOV, WebM, MKV, and AVI containers up to 500 MB.
- **Aspect Ratio Presets:**
  - `16:9` (Landscape widescreen for YouTube, desktop, TV)
  - `9:16` (Vertical for Shorts, Reels, TikTok)
  - `1:1` (Square for Instagram & LinkedIn feeds)
  - `4:5` (Vertical portrait for Instagram feed posts)
  - `4:3` (Classic broadcast and archival)
  - `3:4` (Portrait photo / tablet display)
  - `21:9` (Cinematic ultrawide)
  - **Custom W:H** freeform numeric inputs
- **Platform Shortcuts:** YouTube, YouTube Shorts, TikTok, Instagram Reels, Instagram Feed, Instagram Story, LinkedIn, X (Twitter), WhatsApp Status.
- **3 Real-Time Fitting Modes:**
  1. **Blur Ambient:** Keeps 100% of the original video uncropped while filling empty margins with a soft, blurred duplicate of the video stream.
  2. **Focal Center Crop:** Crops into the footage to completely fill the target aspect ratio, featuring an interactive draggable crosshair focal point.
  3. **Solid Color / Letterbox:** Adds clean matte bars with an integrated color picker and quick monochrome presets.
- **Quality & Format Controls:** Output resolution (`1080p`, `720p`, `Original`), container (`MP4 H.264` default, `WebM VP9`), CRF compression quality slider (`18` archival down to `28` compressed). Keeps source audio stream untouched (`-c:a copy`) to eliminate generational distortion.
- **Client-Side WASM Core:** Powered by `@ffmpeg/ffmpeg` compiled to WebAssembly. Multi-threaded execution enabled via `SharedArrayBuffer` when COOP/COEP headers are present; automatically falls back to single-threaded WebAssembly in constrained environments.
- **Pro Tier Monetization Hook:** Unobtrusive "AspectCut Pro" waitlist modal for batch processing and 4K exports.

---

## 2. Design System & Craft Philosophy

AspectCut deliberately avoids typical "AI-generated SaaS" patterns (no purple-to-pink gradient cards, no floating blur blobs, no emoji icons, no generic stock cards). Instead, it embraces an **editorial, darkroom/film-editing instrument aesthetic**:

- **Palette:** High-contrast warm off-white (`#fbfbfa`) / obsidian dark (`#0d0e11`), signal orange accent (`#ff4400`), neutral grays, 1px hairline borders.
- **Typography:** Geist Sans with Geist Mono for technical labels, ratio indicators, and tabular numerals.
- **Workspace Framing:** Crosshair lines, coordinate labels (`0,0`), technical metadata readouts, and hand-built SVG/CSS ratio schematics (`VisualRatioDiagram`).

---

## 3. Programmatic SEO & Technical SEO Architecture

- **Single Typed Data Source:** `src/lib/aspect-data.ts` powers all ratio pairs, social platforms, and editorial guides with unique, hand-crafted copy (no keyword spamming).
- **Static Site Generation (SSG):** All 29+ routes are fully pre-rendered to pure crawlable HTML:
  - `/` (Homepage tool)
  - `/tools/16-9-to-9-16`, `/tools/9-16-to-16-9`, `/tools/16-9-to-1-1`, `/tools/16-9-to-4-5`, `/tools/1-1-to-9-16`, `/tools/4-3-to-16-9`, `/tools/21-9-to-16-9`
  - `/for/youtube-shorts`, `/for/tiktok`, `/for/instagram-reels`, `/for/instagram-story`, `/for/instagram-post`, `/for/linkedin-video`, `/for/facebook`, `/for/x-twitter`, `/for/whatsapp-status`
  - `/guides/what-is-aspect-ratio`
  - `/guides/crop-vs-letterbox-vs-blur-background`
  - `/guides/how-to-change-video-aspect-ratio-without-losing-quality`
  - `/guides/aspect-ratio-cheat-sheet`
  - `/privacy`, `/about`, `/faq`
- **Answer-First Copy & `llms.txt`:** Direct answer paragraphs within the first 40–60 words for AI Overviews and Google featured snippets, plus a dedicated `/llms.txt`.
- **JSON-LD Structured Data:** Validated schemas for `WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`, and `HowTo`.
- **Dynamic OG Images:** `src/app/api/og/route.tsx` using `@vercel/og` to render custom branded previews with ratio geometry.
- **Core Web Vitals:** Static HTML delivery, zero external ad trackers, lightweight SVGs, lazy-loaded WASM binary only on user interaction.

---

## 4. Deploying to Vercel or Cloudflare Pages

### Crucial: COOP/COEP Headers for Multi-Threaded WASM
To enable `SharedArrayBuffer` for multi-threaded FFmpeg, the server must supply cross-origin isolation headers.

In `next.config.ts`:
\`\`\`typescript
const nextConfig: NextConfig = {
  serverExternalPackages: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};
\`\`\`

If deploying on **Cloudflare Pages**, add a `_headers` file in your `public/` directory:
\`\`\`text
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
\`\`\`

---

## 5. Local Development

\`\`\`bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run static production build
npm run build

# Start production server
npm run start
\`\`\`

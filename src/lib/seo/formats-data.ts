// src/lib/seo/formats-data.ts
export interface FormatConverterDetail {
  slug: string;
  sourceFormat: string;
  targetFormat: string;
  targetRatio: string;
  title: string;
  h1: string;
  metaDescription: string;
  summary: string;
  codecHandlingDetails: string;
  audioHandlingDetails: string;
  workflowSteps: string[];
  faqs: { q: string; a: string }[];
}

export const FORMATS_DATA: Record<string, FormatConverterDetail> = {
  "mov-to-9-16": {
    slug: "mov-to-9-16",
    sourceFormat: "Apple QuickTime (.MOV)",
    targetFormat: "MPEG-4 (.MP4)",
    targetRatio: "9:16 Vertical",
    title: "Convert MOV to 9:16 Vertical Video Online - No Upload Free",
    h1: "Convert QuickTime MOV to 9:16 Vertical Video",
    metaDescription: "Convert Apple QuickTime MOV files to 9:16 vertical MP4 video online without uploading. Reframe iPhone and Final Cut Pro footage for Reels and TikTok.",
    summary: "Apple QuickTime (.MOV) is the default recording container for iPhones, iPads, and professional video editing suites like Final Cut Pro and DaVinci Resolve. While MOV files offer high fidelity and rich color metadata, social media platforms like TikTok, Instagram Reels, and YouTube Shorts perform best with universally compliant MP4 containers. Uploading raw MOV files directly to social networks often results in unexpected color shifts, washed-out gamma levels, or silent playback on non-Apple devices. AspectCut converts MOV files into vertical 9:16 MP4s entirely inside your web browser, reframing widescreen camera shots with focal cropping or blurred backgrounds while preserving audio clarity.",
    codecHandlingDetails: "AspectCut decodes H.264, HEVC (H.265), and Apple ProRes video streams housed within QuickTime MOV containers. It re-encodes the visual data into standard H.264 (High Profile, Level 4.2) using the yuv420p pixel format with BT.709 color matrices, ensuring that colors and skin tones render identically across Android phones, Windows PCs, and iPhones.",
    audioHandlingDetails: "If the source MOV file contains standard stereo AAC audio, AspectCut passes the audio stream through without re-encoding (-c:a copy), saving processing time and avoiding generational loss. If the MOV file uses uncompressed Linear PCM audio (standard in professional camera recordings and ProRes masters), AspectCut transparently transcodes it to high-bitrate 192 kbps stereo AAC.",
    workflowSteps: [
      "Select your Apple QuickTime (.MOV) video file directly from your local drive or photo library.",
      "The tool auto-selects 9:16 vertical target ratio (1080×1920 pixels).",
      "Choose 'Crop' to reframe the center subject or 'Blur' to keep the full landscape width with ambient borders.",
      "Check the real-time preview on the canvas player.",
      "Click Convert Video to execute local WebCodecs encoding and download your optimized MP4."
    ],
    faqs: [
      {
        q: "How do I convert an iPhone MOV video to vertical MP4 for TikTok?",
        a: "Drop your MOV video into AspectCut, choose 9:16 Vertical, select crop or blur, and click Convert. The tool exports an optimized 1080×1920 MP4 directly to your device."
      },
      {
        q: "Why should I convert MOV to MP4 before posting to social media?",
        a: "While some platforms accept MOV, MP4 is the universal standard. Uploading MP4 avoids unexpected color shifts or audio playback failures on Android and desktop devices."
      },
      {
        q: "Does converting MOV to 9:16 degrade image quality?",
        a: "No. AspectCut uses standard CRF encoding (default CRF 20) with H.264 high profile, maintaining crisp visual sharpness."
      },
      {
        q: "Is there a file size limit for MOV conversions?",
        a: "Because processing happens locally in your browser memory, there are no arbitrary cloud file caps."
      }
    ]
  },

  "mkv-to-16-9": {
    slug: "mkv-to-16-9",
    sourceFormat: "Matroska Video (.MKV)",
    targetFormat: "MPEG-4 (.MP4)",
    targetRatio: "16:9 Widescreen",
    title: "Convert MKV to 16:9 Widescreen Video Online - Remux to MP4",
    h1: "Convert MKV Video to 16:9 Widescreen MP4",
    metaDescription: "Convert MKV videos to 16:9 widescreen MP4 online without uploading. Reframe OBS recordings, remove black bars, and remux for YouTube and TV.",
    summary: "Matroska (.MKV) is a powerful, open-standard container format widely favored by OBS Studio streamers, screen recorders, and movie archivists because it prevents file corruption if a recording is abruptly interrupted. However, consumer web browsers, Apple editing tools (Final Cut Pro, iMovie), and popular video platforms often fail to import or play MKV files natively. AspectCut converts MKV files into standard 16:9 MP4s, adjusting aspect ratios, removing letterbox bars, and ensuring seamless compatibility across all media players and video platforms without requiring external software installations.",
    codecHandlingDetails: "AspectCut demuxes the MKV container and transcodes or scales the video stream to standard 16:9 dimensions (1920×1080 or 3840×2160) using WebCodecs. Even-integer pixel boundaries are enforced to guarantee smooth hardware acceleration during playback.",
    audioHandlingDetails: "MKV files frequently house specialized multi-channel audio tracks such as AC3, E-AC3, DTS, Vorbis, or lossless FLAC. Because consumer web players cannot decode surround sound AC3 or FLAC streams natively, AspectCut automatically mixes and converts these tracks into universally compatible 48kHz stereo AAC audio.",
    workflowSteps: [
      "Import your MKV video file into AspectCut directly from your disk.",
      "Choose 16:9 Widescreen as target ratio.",
      "Select 'Crop' to remove bars or 'Fit' to preserve existing framing.",
      "Adjust quality parameters if desired (default CRF 20).",
      "Click Convert Video to run client-side remuxing and transcoding, saving your universal 1080p MP4 file."
    ],
    faqs: [
      {
        q: "Why won't my MKV video play on YouTube or QuickTime?",
        a: "Many players and platforms lack built-in MKV demuxers. Converting MKV to MP4 with AspectCut ensures universal playback."
      },
      {
        q: "How do I fix the aspect ratio of an MKV video?",
        a: "Select your MKV file in AspectCut, pick 16:9 Widescreen, and export. AspectCut corrects pixel aspect ratios and applies proper display flags."
      },
      {
        q: "Can I convert OBS Studio MKV recordings with this tool?",
        a: "Yes. AspectCut is ideal for converting OBS Studio MKV streams into 16:9 MP4 files for editing or uploading."
      },
      {
        q: "Is my MKV video uploaded to a cloud server?",
        a: "No. AspectCut runs 100% locally on your computer using WebCodecs."
      }
    ]
  },

  "webm-to-9-16": {
    slug: "webm-to-9-16",
    sourceFormat: "WebM Video (.WEBM)",
    targetFormat: "MPEG-4 (.MP4)",
    targetRatio: "9:16 Vertical",
    title: "Convert WebM to 9:16 Vertical Video Online - Free In-Browser",
    h1: "Convert WebM to 9:16 Vertical Video MP4",
    metaDescription: "Convert WebM videos to 9:16 vertical MP4 format online without uploading. Reframe browser screen captures for TikTok, Reels, and Shorts.",
    summary: "WebM is Google's open-source video container format specifically designed for HTML5 web streaming and browser-based screen recorders (such as Loom, OBS browser sources, Chrome extensions, and MediaRecorder APIs). While WebM is efficient for web playback, mobile social media applications like TikTok, Instagram Reels, and Snapchat do not support direct WebM uploads. Creators who record tutorials or reaction videos in WebM format need a fast way to convert these files into vertical 9:16 MP4s. AspectCut converts horizontal WebM recordings into vertical 9:16 MP4s directly in your browser, adding blurred backgrounds or focal crops with zero quality degradation.",
    codecHandlingDetails: "WebM files encode video using VP8, VP9, or AV1 codecs. AspectCut's WebCodecs engine decodes these open codecs and transcodes them into standard H.264 (AVC) MP4 video with strict yuv420p color subsampling, ensuring universal compatibility across iOS and Android devices.",
    audioHandlingDetails: "WebM files almost universally pair video with Opus or Vorbis audio codecs. Because standard MP4 containers require AAC audio for guaranteed mobile playback, AspectCut decodes the Opus stream and encodes it into crystal-clear 192 kbps stereo AAC audio at 48kHz.",
    workflowSteps: [
      "Select your WebM video file directly from your device.",
      "Select 9:16 Vertical target ratio.",
      "Choose 'Blur' to show the complete horizontal screen or 'Crop' to zoom in on code or UI controls.",
      "Preview the result in the interactive canvas player.",
      "Render locally via WebCodecs and download your 1080×1920 MP4 video."
    ],
    faqs: [
      {
        q: "Can I upload WebM files directly to Instagram Reels or TikTok?",
        a: "No. Instagram Reels and TikTok require MP4 or MOV video. Converting WebM to 9:16 MP4 with AspectCut solves this compatibility barrier."
      },
      {
        q: "How do I convert a Loom WebM recording to a vertical Short?",
        a: "Load your Loom WebM video into AspectCut, choose 9:16 Vertical, select 'Blurred Background' mode, and download your ready-to-post MP4."
      },
      {
        q: "Does converting WebM to MP4 reduce video quality?",
        a: "No. AspectCut uses high-bitrate H.264 encoding with CRF 20, keeping software demonstrations and recorded text crisp."
      },
      {
        q: "Is there any software to install?",
        a: "None. AspectCut operates entirely in your web browser."
      }
    ]
  },


};

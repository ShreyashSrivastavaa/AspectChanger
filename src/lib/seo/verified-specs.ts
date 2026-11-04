// src/lib/seo/verified-specs.ts
// Verified platform specifications from official developer and creator documentation.
// Every specification includes the exact source URL and the verification date.

export interface PlatformSpec {
  slug: string;
  name: string;
  platform: string;
  primaryRatio: string;
  supportedRatios: string[];
  recommendedResolution: string;
  maxDuration: string;
  maxFileSize: string;
  supportedCodecs: string[];
  supportedContainers: string[];
  safeZones: {
    topPercent: number;
    bottomPercent: number;
    rightPercent: number;
    notes: string;
  };
  documentationUrl: string;
  verifiedMonthYear: string;
  keyRequirements: string[];
  faq: {
    q: string;
    a: string;
  }[];
}

export const VERIFIED_PLATFORM_SPECS: Record<string, PlatformSpec> = {
  "youtube-shorts": {
    slug: "youtube-shorts",
    name: "YouTube Shorts",
    platform: "YouTube",
    primaryRatio: "9:16",
    supportedRatios: ["9:16", "1:1"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "3 minutes (180 seconds, officially expanded Oct 15, 2024)",
    maxFileSize: "256 GB (web direct upload)",
    supportedCodecs: ["H.264", "HEVC (H.265)", "VP9"],
    supportedContainers: [".mp4", ".mov", ".webm"],
    safeZones: {
      topPercent: 15,
      bottomPercent: 20,
      rightPercent: 18,
      notes: "Keep titles and text away from bottom 20% (channel name, caption, audio title) and right 18% (like, comment, remix icons).",
    },
    documentationUrl: "https://support.google.com/youtube/answer/10059070",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Must be strictly vertical (9:16) or square (1:1) to qualify as a Short.",
      "Durations up to 3 minutes are indexed as Shorts if uploaded after October 15, 2024.",
      "Framerate recommended between 24 and 60 fps.",
      "Audio tracks from YouTube library do not incur copyright penalties on Shorts.",
    ],
    faq: [
      {
        q: "What is the official aspect ratio for YouTube Shorts?",
        a: "The official aspect ratio for YouTube Shorts is 9:16 (1080×1920 pixels). Square (1:1) videos are also accepted as Shorts, but 9:16 delivers the best full-screen mobile experience.",
      },
      {
        q: "What is the maximum duration for a YouTube Short?",
        a: "As of October 15, 2024, YouTube expanded the maximum duration for Shorts from 60 seconds to 3 minutes (180 seconds).",
      },
      {
        q: "What happens if I upload a 16:9 video as a YouTube Short?",
        a: "A 16:9 horizontal video will not be categorized as a Short; YouTube will upload it as a standard horizontal video unless you convert it to 9:16 or 1:1 first.",
      },
      {
        q: "What is the safe zone for YouTube Shorts text overlays?",
        a: "Maintain a margin of at least 15% from the top, 20% from the bottom, and 18% from the right edge to avoid obstruction by the UI buttons and metadata.",
      },
    ],
  },

  tiktok: {
    slug: "tiktok",
    name: "TikTok",
    platform: "TikTok",
    primaryRatio: "9:16",
    supportedRatios: ["9:16", "1:1", "16:9"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "60 minutes (web upload) / 10 minutes (in-app recording)",
    maxFileSize: "500 MB (ad campaign) / 4 GB (web desktop upload)",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov", ".webm"],
    safeZones: {
      topPercent: 12,
      bottomPercent: 22,
      rightPercent: 16,
      notes: "Keep titles away from the bottom 22% (captions, hashtags, sound title) and right 16% (profile avatar, like, comment, share icons).",
    },
    documentationUrl: "https://ads.tiktok.com/help/article/video-specifications",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "9:16 vertical orientation is required for native immersion.",
      "Audio must be present (silent videos may trigger algorithmic demotion).",
      "Bitrate: higher than 516 kbps recommended (10–14 Mbps target for HD).",
      "Upload via desktop browser creator center to unlock 60-minute duration and 4 GB file sizes.",
    ],
    faq: [
      {
        q: "What is the best aspect ratio for TikTok?",
        a: "The recommended aspect ratio for TikTok is 9:16 with a resolution of 1080×1920 pixels. While horizontal videos can be uploaded, vertical 9:16 generates significantly higher view completion rates.",
      },
      {
        q: "What is the maximum file size for TikTok video uploads?",
        a: "TikTok supports files up to 500 MB for in-feed ad uploads and up to 4 GB for direct desktop browser uploads.",
      },
      {
        q: "How can I avoid TikTok cropping my subtitles or text?",
        a: "Leave at least 22% padding at the bottom for captions and audio tags, and 16% on the right margin for interface icons.",
      },
      {
        q: "Can I convert landscape 16:9 footage for TikTok without black bars?",
        a: "Yes. In AspectCut, you can choose 'Blurred Background' to fill the 9:16 frame with stylized ambient motion or 'Crop' to reframe the center subject.",
      },
    ],
  },

  "instagram-reels": {
    slug: "instagram-reels",
    name: "Instagram Reels",
    platform: "Instagram",
    primaryRatio: "9:16",
    supportedRatios: ["9:16"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "15 minutes (uploaded via web) / 90 seconds (in-app recording)",
    maxFileSize: "4 GB",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 14,
      bottomPercent: 20,
      rightPercent: 15,
      notes: "Ensure all essential action, titles, captions, and face framing stay strictly within the central 1:1 square for profile grid previews, while leaving a 14% top header margin and 20% bottom margin to avoid occlusion by the creator handle, caption, and audio tags.",
    },
    documentationUrl: "https://facebook.com/business/help/1514379865487737",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Strictly 9:16 vertical aspect ratio with exact 1080×1920 progressive pixel dimensions.",
      "Frame rate: 30 fps minimum up to 60 fps maximum progressive scan.",
      "Profile grid crops automatically to a 1:1 square or 4:5 portrait center thumbnail in feed previews.",
      "Enable 'Upload at highest quality' in account data settings to prevent mobile cellular network downsampling.",
      "Audio bitrate recommended at 128 kbps to 192 kbps AAC stereo for clean sound without distortion.",
      "Pre-processing horizontal videos using blurred background fill prevents ugly black letterbox margins.",
    ],
    faq: [
      {
        q: "What is the exact resolution and ratio for Instagram Reels?",
        a: "Instagram Reels require a vertical 9:16 aspect ratio with a recommended resolution of 1080×1920 pixels at 30 or 60 frames per second for smooth full-screen playback.",
      },
      {
        q: "How does Instagram crop Reels on profile grids and feeds?",
        a: "On your main profile grid, Reels are displayed cropped to a 1:1 square thumbnail. In the home feed stream, they are displayed in a 4:5 vertical window cropped from the center.",
      },
      {
        q: "What is the maximum file size for Instagram Reels?",
        a: "Instagram accepts video files up to 4 GB in MP4 or MOV container format with H.264 or HEVC encoding.",
      },
      {
        q: "Why does Instagram compress my uploaded video?",
        a: "Instagram compresses videos exceeding standard bitrates. Uploading crisp 1080×1920 MP4 files at CRF 20 ensures optimal sharpness without triggering harsh server-side recompression.",
      },
    ],
  },

  "instagram-story": {
    slug: "instagram-story",
    name: "Instagram Story",
    platform: "Instagram",
    primaryRatio: "9:16",
    supportedRatios: ["9:16"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "60 seconds per single story card",
    maxFileSize: "4 GB",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 14,
      bottomPercent: 14,
      rightPercent: 5,
      notes: "Leave roughly 250 pixels (14% vertical buffer) at the top and bottom clear of text, links, or stickers to avoid overlap with profile avatars, story progress bars, and bottom reply trays.",
    },
    documentationUrl: "https://facebook.com/business/help/1514379865487737",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "9:16 vertical full-screen experience with native 1080×1920 dimensions.",
      "Continuous playback up to 60 seconds per clip without auto-splitting into legacy 15-second segments.",
      "Keep text within safe margins to prevent obstruction by top story indicators and bottom message reply bars.",
      "Use progressive scan H.264 encoding with faststart moov atom placed at file header for instant mobile playback.",
      "Horizontal 16:9 videos look miniature when uploaded raw; converting to 9:16 with blurred backgrounds maximizes visual impact.",
    ],
    faq: [
      {
        q: "What aspect ratio should I use for Instagram Stories?",
        a: "Instagram Stories require a 9:16 aspect ratio (1080×1920 pixels) to occupy the entire smartphone display without letterbox bars.",
      },
      {
        q: "What are the safe margins for Instagram Stories?",
        a: "Maintain roughly 14% (approximately 250 pixels on a 1080×1920 video) padding from both top and bottom edges.",
      },
      {
        q: "What is the maximum length of an Instagram Story video?",
        a: "Instagram supports up to 60 seconds per individual story slide without splitting.",
      },
      {
        q: "How can I convert horizontal clips for Instagram Stories?",
        a: "Use AspectCut's 'Blurred Background' mode to turn widescreen clips into vertical story formats while keeping the complete video visible in the center.",
      },
    ],
  },

  "instagram-feed": {
    slug: "instagram-feed",
    name: "Instagram Feed",
    platform: "Instagram",
    primaryRatio: "4:5",
    supportedRatios: ["4:5", "1:1", "16:9"],
    recommendedResolution: "1080×1350 px (4:5 Portrait) or 1080×1080 px (1:1 Square)",
    maxDuration: "60 minutes",
    maxFileSize: "4 GB",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 5,
      bottomPercent: 5,
      rightPercent: 5,
      notes: "4:5 portrait occupies the maximum vertical screen real estate in the feed stream without being cropped, leaving ample room for captions below.",
    },
    documentationUrl: "https://facebook.com/business/help/1514379865487737",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "4:5 (1080×1350) is the optimal engagement format for in-feed mobile scrolling, capturing 25% more screen height than square 1:1.",
      "1:1 (1080×1080) is universal across feed carousels and multi-asset albums.",
      "16:9 is supported but occupies smaller screen real estate in vertical user timelines.",
      "Pre-converting to 4:5 prevents Instagram from automatically cropping vertical footage unpredictably.",
      "Bitrate recommendation: 3.5 to 5 Mbps for crisp 1080p playback without excessive bandwidth consumption.",
    ],
    faq: [
      {
        q: "What is the best aspect ratio for Instagram feed video posts?",
        a: "The most engaging aspect ratio for Instagram feed video is 4:5 (1080×1350 pixels). It occupies 25% more screen area than square 1:1, maximizing viewer attention.",
      },
      {
        q: "Will Instagram crop a 9:16 video posted directly to the feed?",
        a: "Yes. In the classic feed grid, vertical videos exceeding 4:5 are cropped to fit within the 4:5 vertical maximum.",
      },
      {
        q: "What resolution is required for 4:5 video?",
        a: "1080×1350 pixels is the official standard resolution for 4:5 portrait video on Instagram.",
      },
      {
        q: "Can I convert 16:9 video into 4:5 with AspectCut?",
        a: "Yes. You can reframe using focal point crop, add blurred sidebars, or pillarbox with neutral backgrounds.",
      },
    ],
  },

  "linkedin-video": {
    slug: "linkedin-video",
    name: "LinkedIn Video",
    platform: "LinkedIn",
    primaryRatio: "1:1",
    supportedRatios: ["1:1", "16:9", "4:5", "9:16"],
    recommendedResolution: "1080×1080 px (Square) or 1920×1080 px (Landscape)",
    maxDuration: "3 seconds to 30 minutes (organic feed) / 10 minutes (sponsored ads)",
    maxFileSize: "500 MB (sponsored video) / 5 GB (organic upload)",
    supportedCodecs: ["H.264"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 10,
      bottomPercent: 15,
      rightPercent: 10,
      notes: "LinkedIn mobile app adds overlay controls at the bottom; center titles and lower thirds in the safe middle band.",
    },
    documentationUrl: "https://linkedin.com/help/linkedin/answer/a547432",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Square 1:1 and landscape 16:9 perform best on desktop and mobile combined feeds.",
      "Over 80% of LinkedIn video is watched on mute; ensure burned-in or SRT captions.",
      "Organic videos support durations up to 30 minutes and file sizes up to 5 GB.",
      "Dedicated mobile vertical feed supports 9:16 format.",
    ],
    faq: [
      {
        q: "What aspect ratio works best for LinkedIn video?",
        a: "Square 1:1 (1080×1080) and landscape 16:9 (1920×1080) are the best performing formats across desktop and mobile LinkedIn feeds.",
      },
      {
        q: "What is the file size limit for LinkedIn video?",
        a: "Organic video posts can be up to 5 GB, while sponsored video ads have a maximum file size limit of 500 MB.",
      },
      {
        q: "Does LinkedIn support vertical 9:16 video?",
        a: "Yes, LinkedIn introduced a dedicated vertical video feed in mobile apps that supports 9:16 (1080×1920).",
      },
      {
        q: "What is the maximum video length on LinkedIn?",
        a: "Organic video can be up to 30 minutes long. However, LinkedIn recommends 30 to 90 seconds for peak professional engagement.",
      },
    ],
  },

  "facebook-video": {
    slug: "facebook-video",
    name: "Facebook Video",
    platform: "Facebook",
    primaryRatio: "16:9",
    supportedRatios: ["16:9", "1:1", "4:5", "9:16"],
    recommendedResolution: "1080×1920 (Reels) / 1920×1080 (Feed)",
    maxDuration: "240 minutes (feed) / 90 seconds (Reels)",
    maxFileSize: "10 GB",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 10,
      bottomPercent: 18,
      rightPercent: 12,
      notes: "Keep titles, callouts, and logos away from bottom playback controls and top header banners to ensure clear legibility across mobile iOS and Android app streams.",
    },
    documentationUrl: "https://facebook.com/business/help/1514379865487737",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Reels require 9:16 vertical full-screen video with progressive scanning.",
      "Feed video supports up to 4K resolutions and 240 minutes duration for long-form content.",
      "Square 1:1 and 4:5 portrait deliver the highest click-through rates on mobile news feeds.",
      "File size limits reach up to 10 GB for long-form desktop creator studio uploads.",
      "Audio stereo compression with 128 kbps AAC ensures smooth playback across diverse consumer hardware.",
      "Videos with burnt-in captions achieve significantly higher retention as most mobile users browse muted.",
    ],
    faq: [
      {
        q: "What aspect ratios are supported on Facebook?",
        a: "Facebook supports 16:9 (horizontal), 1:1 (square), 4:5 (portrait), and 9:16 (vertical for Reels and Stories). Each format serves a specific placement in the Meta feed ecosystem.",
      },
      {
        q: "What is the maximum file size for Facebook video?",
        a: "Facebook accepts video files up to 10 GB with durations up to 240 minutes for standard desktop feed uploads.",
      },
      {
        q: "What is the recommended resolution for Facebook Reels?",
        a: "Facebook Reels use 1080×1920 pixels (9:16 vertical aspect ratio) with high-definition progressive encoding.",
      },
      {
        q: "Can I resize 16:9 video for Facebook Reels?",
        a: "Yes. Use AspectCut to reframe 16:9 widescreen footage into 9:16 with blur backgrounds or crop framing directly in your browser without uploading to external cloud servers.",
      },
    ],
  },

  "x-twitter-video": {
    slug: "x-twitter-video",
    name: "X (Twitter) Video",
    platform: "X / Twitter",
    primaryRatio: "16:9",
    supportedRatios: ["16:9", "1:1", "9:16"],
    recommendedResolution: "1920×1080 px (Landscape) or 1080×1080 px (Square)",
    maxDuration: "140 seconds (standard free accounts) / up to 3 hours (X Premium)",
    maxFileSize: "512 MB (organic standard) / 1 GB (ads)",
    supportedCodecs: ["H.264", "HEVC"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 5,
      bottomPercent: 10,
      rightPercent: 5,
      notes: "The main timeline displays video in its native aspect ratio with minimal chrome interference, but keeping a 10% bottom margin ensures scrubbing controls don't overlap lower third text.",
    },
    documentationUrl: "https://business.x.com/en/help/campaign-setup/creative-specifications",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Framerate: up to 60 fps progressive scan for smooth motion and action rendering.",
      "Square 1:1 and landscape 16:9 render cleanly across web desktop and mobile timelines.",
      "Verified X Premium subscribers can upload 1080p and 1440p video up to 3 hours in duration.",
      "Audio format: AAC stereo at 128 kbps or higher with 44.1 kHz or 48 kHz sample rates.",
      "Video bitrate of 5,000 to 8,000 kbps provides optimal fidelity without exceeding file transfer ceilings.",
    ],
    faq: [
      {
        q: "What is the video aspect ratio for X (Twitter)?",
        a: "X supports 16:9 landscape (1920×1080), 1:1 square (1080×1080), and 9:16 vertical (1080×1920). 16:9 is the standard recommendation for desktop and feed timelines.",
      },
      {
        q: "What is the video length limit on X?",
        a: "Standard accounts have a limit of 140 seconds (2 minutes and 20 seconds). Verified X Premium subscribers can upload videos up to 3 hours in duration.",
      },
      {
        q: "What is the file size limit for X videos?",
        a: "Standard uploads support files up to 512 MB, while commercial advertising campaigns can upload assets up to 1 GB.",
      },
      {
        q: "Can I post vertical video on X?",
        a: "Yes. Vertical 9:16 videos are supported and expand to an immersive full-screen vertical viewer on mobile applications.",
      },
    ],
  },

  "pinterest-video": {
    slug: "pinterest-video",
    name: "Pinterest Video Pins",
    platform: "Pinterest",
    primaryRatio: "9:16",
    supportedRatios: ["9:16", "2:3", "1:1"],
    recommendedResolution: "1080×1920 px (Vertical) or 1000×1500 px (2:3 Standard)",
    maxDuration: "4 seconds to 15 minutes",
    maxFileSize: "2 GB",
    supportedCodecs: ["H.264", "H.265"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 5,
      bottomPercent: 12,
      rightPercent: 5,
      notes: "The bottom 12% area often contains the pin title card, author avatar, and red save button; keep primary action and explanatory typography centered vertically.",
    },
    documentationUrl: "https://help.pinterest.com/en/business/article/video-specs-and-guidelines",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Vertical formats (9:16 and 2:3) stand out prominently in the Pinterest dual-column masonry grid.",
      "Files must be under 2 GB in size with progressive H.264 or H.265 encoding.",
      "Autoplay in feed functions silently without audio; bold graphic hooks and text overlays within the first 3 seconds are essential.",
      "Standard duration spans from 4 seconds to 15 minutes, with 6 to 15 seconds yielding peak engagement.",
      "Square 1:1 is allowed, but vertical pins capture over 40% more display surface area on mobile screens.",
    ],
    faq: [
      {
        q: "What is the best aspect ratio for Pinterest video pins?",
        a: "9:16 (1080×1920) and 2:3 (1000×1500) are the best performing aspect ratios on Pinterest, dominating vertical search grids and discovery feeds.",
      },
      {
        q: "What is the maximum video duration for Pinterest?",
        a: "Pinterest video pins can be anywhere from 4 seconds to 15 minutes in duration across both organic pins and promoted video ads.",
      },
      {
        q: "What is the maximum file size for a Pinterest video pin?",
        a: "Pinterest allows video files up to 2 GB with MP4 and MOV container formats.",
      },
      {
        q: "Does Pinterest accept square 1:1 video?",
        a: "Yes, 1:1 square video is supported, though 9:16 vertical pins occupy significantly more visible feed space.",
      },
    ],
  },

  "snapchat-video": {
    slug: "snapchat-video",
    name: "Snapchat Video",
    platform: "Snapchat",
    primaryRatio: "9:16",
    supportedRatios: ["9:16"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "3 seconds to 180 seconds",
    maxFileSize: "1 GB",
    supportedCodecs: ["H.264"],
    supportedContainers: [".mp4", ".mov"],
    safeZones: {
      topPercent: 10,
      bottomPercent: 15,
      rightPercent: 8,
      notes: "Snapchat requires leaving at least 150px at the top and bottom free from critical text, brand logos, or interactive calls-to-action to prevent UI overlap.",
    },
    documentationUrl: "https://businesshelp.snapchat.com/s/article/video-specs",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "Strictly 9:16 vertical full-screen format with 1080×1920 resolution.",
      "Audio is required and should be mixed at standard commercial broadcast levels (-14 LUFS).",
      "Leave 150 pixels buffer at top and bottom to avoid native Snapchat UI chrome obstruction.",
      "Maximum file size is 1 GB with baseline or high profile H.264 encoding.",
      "Framerate recommended at 30 fps or 60 fps progressive scan.",
      "Horizontal clips should be converted to 9:16 using AspectCut's blurred background mode for native mobile playback.",
    ],
    faq: [
      {
        q: "What is the Snapchat video aspect ratio?",
        a: "Snapchat requires a vertical 9:16 aspect ratio with a resolution of 1080×1920 pixels for both Spotlight and commercial ads.",
      },
      {
        q: "What are the safe zone dimensions for Snapchat videos?",
        a: "Leave at least 150 pixels (top and bottom) free of key elements to ensure text and buttons are not covered by Snapchat UI.",
      },
      {
        q: "What is the maximum file size for Snapchat video ads?",
        a: "Snapchat video ads must be under 1 GB in size, formatted as MP4 or MOV.",
      },
      {
        q: "Can I convert landscape videos to Snapchat with AspectCut?",
        a: "Yes. AspectCut lets you convert 16:9 video to 9:16 using blurred ambient borders or centered focal crop directly in your browser.",
      },
    ],
  },

  "whatsapp-status": {
    slug: "whatsapp-status",
    name: "WhatsApp Status",
    platform: "WhatsApp",
    primaryRatio: "9:16",
    supportedRatios: ["9:16"],
    recommendedResolution: "1080×1920 px",
    maxDuration: "60 seconds (extended from 30s in recent updates)",
    maxFileSize: "16 MB (direct in-app) to 64 MB (web/document attachment)",
    supportedCodecs: ["H.264"],
    supportedContainers: [".mp4"],
    safeZones: {
      topPercent: 10,
      bottomPercent: 15,
      rightPercent: 5,
      notes: "Keep titles and captions away from the top progress segment bars and bottom text input tray to avoid UI clipping.",
    },
    documentationUrl: "https://faq.whatsapp.com/1529126444196148",
    verifiedMonthYear: "April 2026",
    keyRequirements: [
      "9:16 full-screen mobile orientation for status updates and story broadcasts.",
      "Keep bitrate optimized under 16 MB for fast sending over cellular mobile networks.",
      "Maximum duration is 60 seconds per single status update after WhatsApp's recent platform extension.",
      "Encode with standard H.264 baseline or high profile to ensure smooth playback on all Android and iOS hardware.",
      "Audio stereo AAC at 128 kbps provides transparent speech clarity.",
      "Pre-processing clips into 1080×1920 prevents WhatsApp from applying blurry recompression.",
    ],
    faq: [
      {
        q: "What is the aspect ratio for WhatsApp Status video?",
        a: "The aspect ratio for WhatsApp Status is 9:16 (1080×1920 pixels) matching native modern smartphone displays.",
      },
      {
        q: "What is the maximum duration for a WhatsApp Status video?",
        a: "WhatsApp supports up to 60 seconds per single status update without manual clipping.",
      },
      {
        q: "Why does WhatsApp compress my status videos heavily?",
        a: "WhatsApp applies aggressive mobile data compression. Resizing your video to exact 1080×1920 with high H.264 efficiency before upload preserves maximum clarity.",
      },
      {
        q: "How can I convert horizontal clips for WhatsApp Status without cropping?",
        a: "AspectCut's 'Blur' mode adds blurred background extensions to 16:9 clips, ensuring the entire frame is shown in vertical WhatsApp format without black bars.",
      },
    ],
  },
};

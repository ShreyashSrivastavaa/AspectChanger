// Platform-specific guide definition for "best-video-aspect-ratio-for-[platform]"
export interface PlatformGuide {
  slug: string;
  platformSlug: string;
  platformName: string;
  title: string;
  h1: string;
  description: string;
  answerFirst: string;
  recommendedRatio: string;
  recommendedResolution: string;
  maxDuration: string;
  bestFitMode: string;
  safeZoneNotes: string;
  commonMistakes: string[];
  specsTable: { parameter: string; value: string }[];
  faqs: { q: string; a: string }[];
}

export const PLATFORM_GUIDES: PlatformGuide[] = [
  {
    slug: "best-video-aspect-ratio-for-youtube",
    platformSlug: "youtube",
    platformName: "YouTube",
    title: "Best Video Aspect Ratio for YouTube (2026 Recommended Dimensions)",
    h1: "Best Video Aspect Ratio for YouTube: 16:9 HD & 4K Guidelines",
    description: "The official recommended aspect ratio for YouTube is 16:9 widescreen (1920x1080 or 3840x2160). Learn safe framing, bitrate targets, and player behavior.",
    answerFirst: "The best aspect ratio for standard YouTube videos is 16:9 (1920x1080 pixels for full HD or 3840x2160 pixels for 4K). YouTube's desktop and television players are designed natively around 16:9 widescreen, preventing black letterbox bars and ensuring maximum viewer engagement.",
    recommendedRatio: "16:9 Widescreen",
    recommendedResolution: "1920 x 1080 px (1080p) or 3840 x 2160 px (4K)",
    maxDuration: "12 hours",
    bestFitMode: "Solid Color Letterbox (if non-16:9 source)",
    safeZoneNotes: "Standard desktop player matches 16:9 natively. Keep bottom 10% clear of critical subtitles to avoid overlap with video scrubber and player controls.",
    commonMistakes: [
      "Uploading vertical 9:16 video to the standard long-form player, resulting in severe black pillarbox borders on desktop monitors.",
      "Exporting with non-standard aspect ratios like 16:10 that trigger automatic letterbox padding.",
      "Over-compressing audio below 128 kbps, causing audible metallic degradation on TV soundbars."
    ],
    specsTable: [
      { parameter: "Recommended Ratio", value: "16:9 (1.78:1)" },
      { parameter: "Target Resolution", value: "1920x1080 (1080p) / 3840x2160 (4K)" },
      { parameter: "Container & Codec", value: "MP4 (H.264 / AVC or VP9)" },
      { parameter: "Audio Codec", value: "AAC-LC at 192 kbps or 384 kbps (5.1 surround)" },
      { parameter: "Max File Size", value: "256 GB (or 12 hours)" }
    ],
    faqs: [
      {
        q: "What happens if I upload a non-16:9 video to YouTube?",
        a: "The YouTube player automatically adds black bars (pillarboxing or letterboxing) to fill the empty space without stretching your video."
      },
      {
        q: "Can I convert vertical phone videos to 16:9 for YouTube?",
        a: "Yes. Use AspectCut's 'Blur Ambient' mode to center your phone clip while generating dynamic matching blurred sidebars."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-youtube-shorts",
    platformSlug: "youtube-shorts",
    platformName: "YouTube Shorts",
    title: "Best Video Aspect Ratio for YouTube Shorts (1080x1920 Specs)",
    h1: "Best Video Aspect Ratio for YouTube Shorts: 9:16 Guide",
    description: "YouTube Shorts strictly requires a 9:16 vertical aspect ratio at 1080x1920 pixels. Discover safe zones, channel overlays, and framing best practices.",
    answerFirst: "The best aspect ratio for YouTube Shorts is strictly 9:16 vertical with dimensions of 1080 x 1920 pixels. Videos under 60 seconds formatted in 9:16 occupy 100% of mobile screens and enter the dedicated YouTube Shorts algorithmic feed.",
    recommendedRatio: "9:16 Vertical",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "60 seconds",
    bestFitMode: "Blur Ambient Padding (for horizontal clips)",
    safeZoneNotes: "Avoid placing essential text or graphics in the bottom 20% (channel name, subscribe button, audio title) or top 10% (search & camera icons).",
    commonMistakes: [
      "Centering horizontal clips with harsh black letterbox bars that mobile viewers immediately swipe away from.",
      "Placing text overlays behind the right-hand interaction strip (like, comment, share icons).",
      "Uploading videos longer than 60 seconds, which disqualifies them from the Shorts feed."
    ],
    specsTable: [
      { parameter: "Recommended Ratio", value: "9:16 (0.56:1)" },
      { parameter: "Target Resolution", value: "1080x1920 px" },
      { parameter: "Container & Codec", value: "MP4 (H.264)" },
      { parameter: "Audio Bitrate", value: "192 kbps AAC" },
      { parameter: "Max Duration", value: "60 seconds" }
    ],
    faqs: [
      {
        q: "Can YouTube Shorts be square (1:1)?",
        a: "While YouTube allows 1:1 square videos as Shorts, they perform poorly compared to 9:16 because they leave empty space above and below the video."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-tiktok",
    platformSlug: "tiktok",
    platformName: "TikTok",
    title: "Best Video Aspect Ratio for TikTok (2026 Dimensions & Safe Zones)",
    h1: "Best Video Aspect Ratio for TikTok: 9:16 Optimization Guide",
    description: "TikTok requires a 9:16 vertical aspect ratio (1080x1920 pixels). Learn the exact safe zones to prevent UI buttons from covering your text.",
    answerFirst: "The best aspect ratio for TikTok is 9:16 with a resolution of 1080 x 1920 pixels. TikTok’s full-screen vertical player delivers maximum viewer immersion and higher completion rates when framed at 9:16 with key action kept within the central safe area.",
    recommendedRatio: "9:16 Vertical",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "10 minutes",
    bestFitMode: "Focal Center Crop (for action/talking heads) or Blur Ambient",
    safeZoneNotes: "Keep captions and calls-to-action 120px away from the right edge (like, comment, bookmark buttons) and 240px away from the bottom (caption and music sound track).",
    commonMistakes: [
      "Placing lower-third titles directly under TikTok's caption text.",
      "Using horizontal clips with static bars that trigger low completion scores from TikTok's algorithm."
    ],
    specsTable: [
      { parameter: "Recommended Ratio", value: "9:16" },
      { parameter: "Recommended Resolution", value: "1080x1920 px" },
      { parameter: "Max File Size", value: "287.6 MB (iOS) / 72 MB (Android)" },
      { parameter: "Container", value: "MP4 or MOV" }
    ],
    faqs: [
      {
        q: "Does TikTok allow horizontal video?",
        a: "Yes, but landscape videos appear small and isolated in the feed. Using 9:16 vertical re-framing increases view duration significantly."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-instagram-reels",
    platformSlug: "instagram-reels",
    platformName: "Instagram Reels",
    title: "Best Video Aspect Ratio for Instagram Reels (9:16 & 4:5 Safe Zones)",
    h1: "Best Video Aspect Ratio for Instagram Reels: 9:16 Specifications",
    description: "Instagram Reels requires 9:16 (1080x1920 px) with a critical 4:5 central safe zone for the standard feed preview. Complete 2026 guide.",
    answerFirst: "The best aspect ratio for Instagram Reels is 9:16 (1080 x 1920 pixels). When shared to the main profile grid and explore feed, Reels are displayed in a 4:5 or 1:1 crop; therefore, all essential subjects and titles must be centered within the 4:5 (1080 x 1350) safe zone.",
    recommendedRatio: "9:16 Vertical (with 4:5 safe zone)",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "90 seconds",
    bestFitMode: "Blur Ambient Padding or Draggable Focal Crop",
    safeZoneNotes: "The outer top 250px and bottom 300px are covered by Reels UI icons and profile captions. The central 1080x1350 box represents the guaranteed safe window.",
    commonMistakes: [
      "Ignoring the 4:5 feed preview, causing text to be chopped in half on the main Instagram timeline.",
      "Uploading 4K files that Instagram's upload engine heavily downsamples and desaturates."
    ],
    specsTable: [
      { parameter: "Reels Ratio", value: "9:16 (1080x1920)" },
      { parameter: "Feed Safe Zone", value: "4:5 (1080x1350)" },
      { parameter: "Profile Grid Safe Zone", value: "1:1 (1080x1080)" },
      { parameter: "Frame Rate", value: "30 or 60 FPS" }
    ],
    faqs: [
      {
        q: "Why is my Instagram Reel blurry after upload?",
        a: "Instagram re-encodes high-bitrate files aggressively. Exporting at 1080x1920 with balanced CRF (22-24) produces cleaner results than uploading raw 4K."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-instagram-feed",
    platformSlug: "instagram-post",
    platformName: "Instagram Feed",
    title: "Best Video Aspect Ratio for Instagram Feed Posts (4:5 vs 1:1)",
    h1: "Best Video Aspect Ratio for Instagram Feed Posts: 4:5 Portrait",
    description: "4:5 portrait (1080x1350 px) is the optimal aspect ratio for Instagram feed video posts, taking 25% more screen height than square 1:1.",
    answerFirst: "The best aspect ratio for standard Instagram feed posts is 4:5 portrait (1080 x 1350 pixels). While square 1:1 is supported, 4:5 captures the maximum vertical screen space allowed in the mobile feed, pushing competitors off screen and increasing dwell time.",
    recommendedRatio: "4:5 Portrait",
    recommendedResolution: "1080 x 1350 px",
    maxDuration: "60 minutes",
    bestFitMode: "Focal Crop or Solid Color Letterbox",
    safeZoneNotes: "No app overlays cover feed video posts. 100% of the 1080x1350 frame is visible while scrolling.",
    commonMistakes: [
      "Using 16:9 widescreen, which leaves huge empty gaps on mobile and shrinks your footage.",
      "Posting 9:16 directly as a feed post, which causes Instagram to clip the video into 4:5."
    ],
    specsTable: [
      { parameter: "Optimal Ratio", value: "4:5 Portrait" },
      { parameter: "Dimensions", value: "1080 x 1350 px" },
      { parameter: "Alternative Ratio", value: "1:1 Square (1080x1080 px)" },
      { parameter: "Max Video File Size", value: "4 GB" }
    ],
    faqs: [
      {
        q: "Is 4:5 or 1:1 better for Instagram feed?",
        a: "4:5 is significantly better because it occupies 25% more vertical screen real estate on mobile devices than a 1:1 square."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-instagram-story",
    platformSlug: "instagram-story",
    platformName: "Instagram Story",
    title: "Best Video Aspect Ratio for Instagram Stories (9:16 Dimensions)",
    h1: "Best Video Aspect Ratio for Instagram Stories: 9:16 Full Screen",
    description: "Instagram Stories requires a 9:16 vertical aspect ratio (1080x1920 pixels). Read safe margin guidelines for user handles and reply bars.",
    answerFirst: "The best aspect ratio for Instagram Stories is 9:16 with a resolution of 1080 x 1920 pixels. Stories are designed for edge-to-edge mobile viewing, creating immediate visual intimacy for announcements and time-sensitive updates.",
    recommendedRatio: "9:16 Vertical",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "60 seconds per story card",
    bestFitMode: "Blur Ambient Padding",
    safeZoneNotes: "Leave 250px clear at the top (profile avatar and close icon) and 250px clear at the bottom (reply field and share icon).",
    commonMistakes: [
      "Positioning clickable sticker links or text tags in the top header area where they cannot be tapped."
    ],
    specsTable: [
      { parameter: "Aspect Ratio", value: "9:16" },
      { parameter: "Resolution", value: "1080 x 1920 px" },
      { parameter: "Max Segment Duration", value: "60 seconds" }
    ],
    faqs: [
      {
        q: "How to fit a horizontal video into an Instagram Story?",
        a: "Use AspectCut's 'Blur Ambient' mode to keep the full 16:9 clip visible with an ambient motion blur background filling the 9:16 frame."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-linkedin",
    platformSlug: "linkedin-video",
    platformName: "LinkedIn",
    title: "Best Video Aspect Ratio for LinkedIn (1:1 & 4:5 Feed Specs)",
    h1: "Best Video Aspect Ratio for LinkedIn Video: 1:1 and 4:5",
    description: "1:1 square (1080x1080 px) and 4:5 vertical are the best aspect ratios for LinkedIn feed engagement across desktop and mobile professionals.",
    answerFirst: "The best aspect ratio for LinkedIn video posts is 1:1 (square, 1080 x 1080 pixels) or 4:5 (vertical, 1080 x 1350 pixels). Square 1:1 performs best across LinkedIn’s split audience, looking balanced and executive on desktop web browsers and mobile apps alike.",
    recommendedRatio: "1:1 Square (or 4:5 for mobile-heavy campaigns)",
    recommendedResolution: "1080 x 1080 px (1:1) or 1080 x 1350 px (4:5)",
    maxDuration: "10 minutes",
    bestFitMode: "Solid Color Letterbox (Clean Charcoal/White) or Blur Ambient",
    safeZoneNotes: "No floating UI buttons cover LinkedIn feed videos. Captions are recommended as 80%+ of LinkedIn users browse with sound muted.",
    commonMistakes: [
      "Posting horizontal 16:9 video that appears tiny and overlooked in the LinkedIn mobile app feed.",
      "Failing to embed hardcoded subtitles or clean captions for office viewers."
    ],
    specsTable: [
      { parameter: "Recommended Ratio", value: "1:1 (Desktop & Mobile) / 4:5 (Mobile Focus)" },
      { parameter: "Target Resolution", value: "1080x1080 px / 1080x1350 px" },
      { parameter: "Max File Size", value: "5 GB" },
      { parameter: "Audio Compatibility", value: "AAC audio at 192 kbps" }
    ],
    faqs: [
      {
        q: "Why do square videos perform better on LinkedIn?",
        a: "Square 1:1 videos occupy 78% more screen area on mobile than horizontal 16:9 videos without looking oversized on desktop computers."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-facebook",
    platformSlug: "facebook",
    platformName: "Facebook",
    title: "Best Video Aspect Ratio for Facebook (Feed, Reels & In-Stream)",
    h1: "Best Video Aspect Ratio for Facebook Video: 1:1 and 9:16",
    description: "Facebook recommends 1:1 square (1080x1080) for feed posts and 9:16 for Facebook Reels and Stories. Complete placement guide.",
    answerFirst: "The best aspect ratio for Facebook feed videos is 1:1 (1080 x 1080 pixels) or 4:5 (1080 x 1350 pixels). For Facebook Reels and Stories, 9:16 (1080 x 1920 pixels) is required for full-screen immersive delivery across Meta apps.",
    recommendedRatio: "1:1 (Feed) / 9:16 (Reels)",
    recommendedResolution: "1080 x 1080 px (Feed) / 1080 x 1920 px (Reels)",
    maxDuration: "240 minutes",
    bestFitMode: "Blur Ambient Padding",
    safeZoneNotes: "On Facebook Reels, avoid placing text in the right 100px or bottom 20% where user comments and profile handles overlay the video.",
    commonMistakes: [
      "Using non-standard custom ratios that Facebook letterboxes unpredictably."
    ],
    specsTable: [
      { parameter: "Feed Ratio", value: "1:1 or 4:5" },
      { parameter: "Reels Ratio", value: "9:16" },
      { parameter: "Max Video File Size", value: "10 GB" }
    ],
    faqs: [
      {
        q: "What aspect ratio gets the highest engagement on Facebook ads?",
        a: "1:1 square and 4:5 vertical consistently deliver lower cost-per-click (CPC) and higher view-through rates on Facebook mobile placements."
      }
    ]
  },
  {
    slug: "best-video-aspect-ratio-for-x-twitter",
    platformSlug: "x-twitter",
    platformName: "X (Twitter)",
    title: "Best Video Aspect Ratio for X (Twitter) (16:9 vs 1:1 Specs)",
    h1: "Best Video Aspect Ratio for X (Twitter): 16:9 and 1:1",
    description: "The optimal aspect ratios for X (Twitter) are 16:9 widescreen (1920x1080) for landscape clips and 1:1 square (1080x1080) for mobile timeline feeds.",
    answerFirst: "The best aspect ratio for X (formerly Twitter) is 16:9 (1920 x 1080 pixels) for landscape news, screencasts, and landscape media, or 1:1 (1080 x 1080 pixels) for maximum mobile feed presence. X’s desktop timeline is optimized for 16:9 while mobile users engage heavily with 1:1 square.",
    recommendedRatio: "16:9 Widescreen or 1:1 Square",
    recommendedResolution: "1920 x 1080 px (16:9) / 1080 x 1080 px (1:1)",
    maxDuration: "140 seconds (up to 3 hours for Premium subscribers)",
    bestFitMode: "Focal Crop or Solid Color Letterbox",
    safeZoneNotes: "X auto-plays with audio muted; ensure high-contrast visuals in the first 3 seconds.",
    commonMistakes: [
      "Using obscure non-standard ratios that get cropped unexpectedly by X's dynamic timeline card container."
    ],
    specsTable: [
      { parameter: "Recommended Ratios", value: "16:9 (1920x1080) or 1:1 (1080x1080)" },
      { parameter: "Max File Size", value: "512 MB (standard) / 16 GB (Premium)" },
      { parameter: "Recommended Codecs", value: "H.264 video with AAC audio" }
    ],
    faqs: [
      {
        q: "Does X support vertical 9:16 video?",
        a: "Yes, X supports vertical 9:16 videos, which open in full-screen media viewers when tapped by mobile users."
      }
    ]
  }
];


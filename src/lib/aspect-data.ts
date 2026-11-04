export interface AspectRatioPreset {
  id: string;
  name: string;
  ratioW: number;
  ratioH: number;
  label: string;
  category: "standard" | "social" | "cinema";
  description: string;
}

export interface PlatformPreset {
  id: string;
  slug: string;
  name: string;
  platform: string;
  ratioW: number;
  ratioH: number;
  ratioLabel: string;
  recommendedResolution: string;
  maxDuration: string;
  description: string;
  bestFitMode: "crop" | "blur" | "color";
  useCase: string;
  commonMistakes: string[];
  faq: { q: string; a: string }[];
}

export interface RatioPairPage {
  slug: string;
  sourceRatio: { w: number; h: number; label: string };
  targetRatio: { w: number; h: number; label: string };
  title: string;
  h1: string;
  description: string;
  whenToUse: string;
  commonMistakes: string[];
  bestPractices: string;
  faqs: { q: string; a: string }[];
}

export const RATIO_PRESETS: AspectRatioPreset[] = [
  { id: "16-9", name: "16:9 Landscape", ratioW: 16, ratioH: 9, label: "16:9", category: "standard", description: "Standard widescreen for YouTube, TV, and desktop monitors." },
  { id: "9-16", name: "9:16 Vertical", ratioW: 9, ratioH: 16, label: "9:16", category: "social", description: "Full vertical format for TikTok, Instagram Reels, and YouTube Shorts." },
  { id: "1-1", name: "1:1 Square", ratioW: 1, ratioH: 1, label: "1:1", category: "social", description: "Balanced square format for Instagram feed posts and LinkedIn carousels." },
  { id: "4-5", name: "4:5 Portrait", ratioW: 4, ratioH: 5, label: "4:5", category: "social", description: "Optimal vertical space for Instagram in-feed mobile viewing." },
  { id: "4-3", name: "4:3 Classic", ratioW: 4, ratioH: 3, label: "4:3", category: "standard", description: "Traditional SD broadcast and vintage aesthetic format." },
  { id: "3-4", name: "3:4 Tall", ratioW: 3, ratioH: 4, label: "3:4", category: "standard", description: "Portrait format common in tablet displays and photography." },
  { id: "21-9", name: "21:9 Ultrawide", ratioW: 21, ratioH: 9, label: "21:9", category: "cinema", description: "Cinematic anamorphic widescreen presentation." },
];

export const PLATFORM_PRESETS: PlatformPreset[] = [
  {
    id: "youtube-shorts",
    slug: "youtube-shorts",
    name: "YouTube Shorts",
    platform: "YouTube",
    ratioW: 9,
    ratioH: 16,
    ratioLabel: "9:16",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "60 seconds",
    description: "Converts landscape videos to clean 9:16 vertical shorts optimized for YouTube's mobile player algorithm.",
    bestFitMode: "blur",
    useCase: "Repurposing horizontal podcasts, webinars, tutorials, or gameplay clips into vertical viral shorts.",
    commonMistakes: [
      "Hard center-cropping that cuts off key speakers or UI controls.",
      "Leaving black bars instead of using a blurred background to keep mobile viewer retention high.",
      "Lowering resolution under 1080p which triggers YouTube re-compression artifacts."
    ],
    faq: [
      {
        q: "What is the best aspect ratio for YouTube Shorts?",
        a: "YouTube Shorts strictly requires 9:16 vertical format (1080x1920 pixels). While square 1:1 is allowed, 9:16 captures 100% of the mobile screen."
      },
      {
        q: "How do I convert 16:9 YouTube videos to Shorts without cropping out faces?",
        a: "Use 'Fit with blurred background' to keep the full original 16:9 video frame intact while filling the top and bottom with subtle ambient video blur."
      }
    ]
  },
  {
    id: "tiktok",
    slug: "tiktok",
    name: "TikTok Video",
    platform: "TikTok",
    ratioW: 9,
    ratioH: 16,
    ratioLabel: "9:16",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "10 minutes",
    description: "Resize any footage to native 9:16 full-screen vertical frame tailored for TikTok's For You Page.",
    bestFitMode: "crop",
    useCase: "Reframing widescreen vlog clips, interviews, and product launches to dominate full mobile vertical screens.",
    commonMistakes: [
      "Centering important subtitles too close to the right or bottom edges where TikTok overlay buttons cover them.",
      "Letterboxing with static white bars that look unfinished to algorithm-trained audiences."
    ],
    faq: [
      {
        q: "What video dimensions does TikTok require?",
        a: "TikTok videos should be 1080x1920 pixels in a 9:16 vertical ratio encoded in H.264 MP4 format."
      },
      {
        q: "Does resizing video reduce its quality?",
        a: "No, AspectCut renders directly in your browser using WebCodecs, retaining the original stream bitrate without multi-generation cloud compression."
      }
    ]
  },
  {
    id: "instagram-reels",
    slug: "instagram-reels",
    name: "Instagram Reels",
    platform: "Instagram",
    ratioW: 9,
    ratioH: 16,
    ratioLabel: "9:16",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "90 seconds",
    description: "Format widescreen or square camera footage into high-retention 9:16 Instagram Reels.",
    bestFitMode: "blur",
    useCase: "Repackaging creator content, behind-the-scenes footage, and marketing promos for Meta's recommendation feed.",
    commonMistakes: [
      "Ignoring the 4:5 center safe zone where the video gets cropped in the standard Instagram feed view.",
      "Uploading 4K files that Instagram violently re-encodes, resulting in washed-out colors."
    ],
    faq: [
      {
        q: "What aspect ratio should Instagram Reels be?",
        a: "Instagram Reels should be 9:16 (1080x1920 px). Ensure critical text sits within the central 4:5 area to look great when shared to the main feed."
      }
    ]
  },
  {
    id: "instagram-story",
    slug: "instagram-story",
    name: "Instagram Story",
    platform: "Instagram",
    ratioW: 9,
    ratioH: 16,
    ratioLabel: "9:16",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "60 seconds",
    description: "Direct conversion to 9:16 for instant Instagram Stories without black borders.",
    bestFitMode: "blur",
    useCase: "Daily updates, announcements, customer testimonials, and time-sensitive promotions.",
    commonMistakes: [
      "Placing key elements within the top 200px or bottom 250px where user avatars and reply boxes obstruct them."
    ],
    faq: [
      {
        q: "How do I fit a horizontal video into an Instagram Story?",
        a: "Select the 9:16 preset and choose 'Fit with blurred background'. The horizontal video stays fully visible in the center while matching ambient motion fills the frame."
      }
    ]
  },
  {
    id: "instagram-post",
    slug: "instagram-post",
    name: "Instagram Feed Post",
    platform: "Instagram",
    ratioW: 4,
    ratioH: 5,
    ratioLabel: "4:5",
    recommendedResolution: "1080 x 1350 px",
    maxDuration: "60 minutes",
    description: "Maximize screen real estate in the Instagram mobile feed with 4:5 vertical framing.",
    bestFitMode: "crop",
    useCase: "Standard feed carousel videos, brand portfolio showcases, and product reviews.",
    commonMistakes: [
      "Using 16:9 landscape on the feed, which takes up less than 40% of the mobile viewport.",
      "Using 9:16 on the feed, which Instagram automatically cuts down to 4:5."
    ],
    faq: [
      {
        q: "Why is 4:5 better than 1:1 for Instagram feed videos?",
        a: "A 4:5 aspect ratio gives you approximately 25% more screen height on mobile feeds compared to square 1:1, significantly boosting engagement."
      }
    ]
  },
  {
    id: "linkedin-video",
    slug: "linkedin-video",
    name: "LinkedIn Video",
    platform: "LinkedIn",
    ratioW: 1,
    ratioH: 1,
    ratioLabel: "1:1",
    recommendedResolution: "1080 x 1080 px",
    maxDuration: "10 minutes",
    description: "Balanced square and 4:5 video sizing for professional feeds on mobile and desktop alike.",
    bestFitMode: "color",
    useCase: "B2B SaaS demos, leadership interviews, keynotes, and product walkthroughs.",
    commonMistakes: [
      "Posting 16:9 widescreen videos that appear tiny in the LinkedIn mobile mobile app feed.",
      "Using noisy backgrounds when sleek neutral gray or brand-color padding looks more executive."
    ],
    faq: [
      {
        q: "What is the best aspect ratio for LinkedIn video posts?",
        a: "1:1 (Square) or 4:5 (Vertical) are best for LinkedIn. Square 1:1 looks equally clean on desktop web browsers and mobile apps."
      }
    ]
  },
  {
    id: "facebook",
    slug: "facebook",
    name: "Facebook Feed & Watch",
    platform: "Meta",
    ratioW: 1,
    ratioH: 1,
    ratioLabel: "1:1",
    recommendedResolution: "1080 x 1080 px",
    maxDuration: "240 minutes",
    description: "Versatile 1:1 square or 4:5 framing optimized for Facebook desktop and mobile feeds.",
    bestFitMode: "blur",
    useCase: "Community videos, viral clips, customer stories, and commercial ad placements.",
    commonMistakes: ["Leaving empty raw letterboxing without background adaptation."],
    faq: [
      {
        q: "What format works best for Facebook video ads?",
        a: "1:1 square or 4:5 vertical delivers the highest click-through rates across both Facebook mobile feed and desktop placements."
      }
    ]
  },
  {
    id: "x-twitter",
    slug: "x-twitter",
    name: "X (Twitter) Video",
    platform: "X",
    ratioW: 16,
    ratioH: 9,
    ratioLabel: "16:9",
    recommendedResolution: "1920 x 1080 px",
    maxDuration: "140 seconds",
    description: "Standard widescreen and 1:1 square video sizing for high-speed timeline consumption.",
    bestFitMode: "crop",
    useCase: "News updates, screencasts, tech announcements, and gaming clips.",
    commonMistakes: ["Using non-standard custom aspect ratios that get letterboxed unpredictably by the X player."],
    faq: [
      {
        q: "What aspect ratios does X (Twitter) support?",
        a: "X supports 16:9, 1:1, and vertical 9:16 videos up to 1080p resolution."
      }
    ]
  },
  {
    id: "whatsapp-status",
    slug: "whatsapp-status",
    name: "WhatsApp Status",
    platform: "WhatsApp",
    ratioW: 9,
    ratioH: 16,
    ratioLabel: "9:16",
    recommendedResolution: "1080 x 1920 px",
    maxDuration: "30 seconds",
    description: "Crisp 9:16 vertical video conversion designed for WhatsApp Status stories.",
    bestFitMode: "blur",
    useCase: "Broadcast announcements, quick personal updates, and group status reels.",
    commonMistakes: ["Uploading oversized files that get compressed into unreadable blur by WhatsApp's aggressive data savers."],
    faq: [
      {
        q: "What is the aspect ratio of WhatsApp Status videos?",
        a: "WhatsApp Status is formatted for full-screen smartphones at 9:16 aspect ratio (1080x1920 pixels)."
      }
    ]
  }
];

export const RATIO_PAIR_PAGES: RatioPairPage[] = [
  {
    slug: "16-9-to-9-16",
    sourceRatio: { w: 16, h: 9, label: "16:9" },
    targetRatio: { w: 9, h: 16, label: "9:16" },
    title: "16:9 to 9:16 Converter - Convert Landscape Video to Vertical Online",
    h1: "Convert 16:9 Landscape Video to 9:16 Vertical",
    description: "Convert 16:9 widescreen video to 9:16 vertical online without uploading. Perfect for YouTube Shorts, TikTok, and Instagram Reels. 100% private.",
    whenToUse: "Use this conversion when repurposing horizontal desktop, broadcast, or camera footage (1920x1080) for full-screen smartphone feeds like TikTok, Shorts, and Reels. You can choose focal-point center cropping to zoom in on the action or ambient blurred background padding to retain 100% of the original video width.",
    commonMistakes: [
      "Cropping blindly down the exact center when the subject is standing on the left or right third of the frame.",
      "Exporting with pitch-black letterbox bars that mobile social algorithms penalize for low viewer watch-time.",
      "Re-encoding via low-bitrate cloud servers that soften fine details and degrade audio fidelity."
    ],
    bestPractices: "For talking head interviews, adjust the focal point horizontally so the speaker stays framed. For fast-paced gaming or software tutorials with corner UI indicators, choose 'Fit with blurred background' so no essential screen information is cut off.",
    faqs: [
      {
        q: "How do I convert a 16:9 video to 9:16 without cropping out the edges?",
        a: "Select the 'Fit with blurred background' mode. This scales your original 16:9 video to fit within the 9:16 frame while generating an aesthetically pleasing, dynamically blurred copy of the video to fill the top and bottom bars."
      },
      {
        q: "Does converting 16:9 to 9:16 upload my file to a server?",
        a: "No. AspectCut runs WebCodecs video processing locally in your web browser. Your video bytes never leave your device's memory."
      },
      {
        q: "Will the audio quality decrease during conversion?",
        a: "No. When converting with identical audio parameters, the original audio stream is preserved directly without destructive re-encoding."
      }
    ]
  },
  {
    slug: "9-16-to-16-9",
    sourceRatio: { w: 9, h: 16, label: "9:16" },
    targetRatio: { w: 16, h: 9, label: "16:9" },
    title: "9:16 to 16:9 Converter - Convert Vertical Video to Landscape Online",
    h1: "Convert 9:16 Vertical Video to 16:9 Landscape",
    description: "Convert 9:16 vertical smartphone video to 16:9 widescreen landscape in your browser. Clean blurred sidebars or center crop. Free and private.",
    whenToUse: "Use when you shot footage vertically on a phone and need to embed it in a standard horizontal YouTube video, presentation deck, TV broadcast, or corporate website hero.",
    commonMistakes: [
      "Stretching the video horizontally, distorting faces and objects into wide unnatural proportions.",
      "Cropping into the vertical video, which cuts off over 65% of the vertical height."
    ],
    bestPractices: "Use 'Fit with blurred background'. This places the vertical video centrally and fills the left and right wings with matching motion blur, standard in professional television news broadcasts.",
    faqs: [
      {
        q: "Can I convert vertical phone videos to horizontal widescreen?",
        a: "Yes. By choosing 'Fit with blurred background', your phone video sits cleanly in the center of a 16:9 frame with elegant matching blurred sidebars."
      }
    ]
  },
  {
    slug: "16-9-to-1-1",
    sourceRatio: { w: 16, h: 9, label: "16:9" },
    targetRatio: { w: 1, h: 1, label: "1:1" },
    title: "16:9 to 1:1 Converter - Convert Landscape Video to Square Online",
    h1: "Convert 16:9 Landscape Video to 1:1 Square",
    description: "Quickly resize 16:9 widescreen video to 1:1 square for Instagram and LinkedIn feeds. Client-side browser processing with no watermarks.",
    whenToUse: "Ideal for publishing horizontal presentations, product trailers, and podcast highlights into Instagram in-feed carousels or LinkedIn feeds where square formats receive higher feed real estate than 16:9.",
    commonMistakes: [
      "Cropping out text captions located at the bottom horizontal corners."
    ],
    bestPractices: "If your video has titles across the full width, choose 'Fit with solid color' with a custom dark neutral hex code (#111111) to create clean top and bottom letterbox bands.",
    faqs: [
      {
        q: "Why convert 16:9 to 1:1 for social feeds?",
        a: "Square 1:1 videos occupy up to 78% more screen area on mobile feeds compared to landscape 16:9 videos, dramatically improving dwell time and engagement."
      }
    ]
  },
  {
    slug: "16-9-to-4-5",
    sourceRatio: { w: 16, h: 9, label: "16:9" },
    targetRatio: { w: 4, h: 5, label: "4:5" },
    title: "16:9 to 4:5 Converter - Resize Video for Instagram Feed Posts",
    h1: "Convert 16:9 Landscape Video to 4:5 Vertical",
    description: "Convert 16:9 video to optimal 4:5 Instagram feed format without upload delays. Draggable focal cropping or blurred backgrounds.",
    whenToUse: "Use for targeting the native Instagram mobile feed where 4:5 represents the maximum allowed vertical dimension before the platform clips the video.",
    commonMistakes: [
      "Using 9:16 on Instagram main feed posts, causing Instagram to automatically crop the top and bottom."
    ],
    bestPractices: "Frame the subject in the upper two-thirds to allow room for feed captions.",
    faqs: [
      {
        q: "What is 4:5 aspect ratio in pixels?",
        a: "The standard recommended resolution for 4:5 video is 1080 x 1350 pixels."
      }
    ]
  },
  {
    slug: "1-1-to-9-16",
    sourceRatio: { w: 1, h: 1, label: "1:1" },
    targetRatio: { w: 9, h: 16, label: "9:16" },
    title: "1:1 to 9:16 Converter - Convert Square Video to Vertical Story / Reel",
    h1: "Convert 1:1 Square Video to 9:16 Vertical",
    description: "Convert 1:1 square video to 9:16 vertical for TikTok, Stories, and Reels in seconds. No account required.",
    whenToUse: "Transform existing square social media posts and square ad creatives into full-screen vertical stories and reels.",
    commonMistakes: ["Leaving harsh white bars that shock dark-mode mobile viewers."],
    bestPractices: "Use blurred background fill for a smooth, cohesive aesthetic that matches the color temperature of your square video.",
    faqs: [
      {
        q: "How does 1:1 to 9:16 conversion work?",
        a: "The tool centers your square video and pads the upper and lower margins with a blurred, expanded version of the same video."
      }
    ]
  },
  {
    slug: "4-3-to-16-9",
    sourceRatio: { w: 4, h: 3, label: "4:3" },
    targetRatio: { w: 16, h: 9, label: "16:9" },
    title: "4:3 to 16:9 Converter - Convert Standard Video to Widescreen",
    h1: "Convert 4:3 Classic Video to 16:9 Widescreen",
    description: "Convert classic 4:3 standard aspect ratio footage to modern 16:9 widescreen HD without stretching or distortion.",
    whenToUse: "Remastering archival footage, retro game captures, or classic camera recordings for modern displays.",
    commonMistakes: [
      "Applying horizontal stretch which flattens subjects and alters circle geometry."
    ],
    bestPractices: "Crop slightly with top-weighted bias to preserve headroom, or fit with side blurred pillars.",
    faqs: [
      {
        q: "Will converting 4:3 to 16:9 stretch my video?",
        a: "No. AspectCut respects the true pixel aspect ratio and never stretches your footage unless explicitly configured."
      }
    ]
  },
  {
    slug: "21-9-to-16-9",
    sourceRatio: { w: 21, h: 9, label: "21:9" },
    targetRatio: { w: 16, h: 9, label: "16:9" },
    title: "21:9 to 16:9 Converter - Convert Ultrawide Video to Standard HD",
    h1: "Convert 21:9 Ultrawide Video to 16:9 Widescreen",
    description: "Reformat cinematic 21:9 ultrawide captures to standard 16:9 for YouTube and standard monitors.",
    whenToUse: "Exporting gameplay clips from ultrawide 3440x1440 monitors or anamorphic movie clips for standard 1920x1080 screens.",
    commonMistakes: ["Losing side HUD details in video games by aggressive center zooming."],
    bestPractices: "Fit with top and bottom black matte bars (letterbox) to maintain full peripheral vision.",
    faqs: [
      {
        q: "How to fit ultrawide 21:9 into standard 16:9 without losing side info?",
        a: "Choose 'Fit with solid color' (black) to retain every pixel of your wide field of view."
      }
    ]
  }
];

export const GUIDES = [
  {
    slug: "what-is-aspect-ratio",
    title: "What is Video Aspect Ratio? The Complete Visual Guide (2026)",
    h1: "What is Video Aspect Ratio? Dimensions, Formats, and Formulas Explained",
    description: "Understand video aspect ratio: how width-to-height proportions work, standard resolutions (16:9, 9:16, 1:1, 4:5), and how to calculate them accurately.",
    summary: "Video aspect ratio is the proportional relationship between the width and height of a video frame, expressed as two numbers separated by a colon (e.g. 16:9). It dictates how your video fills screens across monitors, TVs, and smartphones.",
    content: `
### Direct Answer
An aspect ratio describes the mathematical ratio between a video's width and its height (Width:Height). A 1920x1080 video has an aspect ratio of 16:9 because 1920 divided by 120 is 16, and 1080 divided by 120 is 9. It is not an absolute pixel measurement, but a geometric proportion.

### Common Aspect Ratios at a Glance
- **16:9 (Widescreen):** The global standard for desktop monitors, televisions, and standard YouTube players (1920x1080, 2560x1440, 3840x2160).
- **9:16 (Vertical):** The direct inverse of 16:9, built exclusively for mobile handheld consumption on TikTok, Instagram Reels, and YouTube Shorts (1080x1920).
- **1:1 (Square):** Equal width and height (1080x1080). Ideal for cross-platform balance across desktop and mobile newsfeeds.
- **4:5 (Portrait):** Taller than square, capturing 1080x1350 pixels to maximize vertical feed real estate on Instagram without being cropped.
- **21:9 (Anamorphic / Ultrawide):** Cinematic format commonly used in theatrical films and ultrawide PC gaming (2560x1080, 3440x1440).

### Calculating Aspect Ratio
To calculate the aspect ratio of any resolution, find the greatest common divisor (GCD) of the width and height, then divide both numbers by that factor:
\`\`\`
Width = 1920, Height = 1080
GCD(1920, 1080) = 120
1920 / 120 = 16
1080 / 120 = 9
Aspect Ratio = 16:9
\`\`\`
    `,
    faq: [
      {
        q: "Is resolution the same as aspect ratio?",
        a: "No. Resolution defines the total number of pixels in the frame (e.g., 1920x1080 or 3840x2160), while aspect ratio describes the relative geometric proportion (both are 16:9)."
      },
      {
        q: "Can I change an aspect ratio without stretching the video?",
        a: "Yes. You can either crop the edges (zoom and crop) or fit the original video into the new frame with letterbox bars or blurred ambient backgrounds."
      }
    ]
  },
  {
    slug: "crop-vs-letterbox-vs-blur-background",
    title: "Crop vs. Letterbox vs. Blurred Background: Which Video Fit Mode to Choose?",
    h1: "Crop vs. Letterbox vs. Blurred Background: Practical Comparison",
    description: "Compare the 3 primary fitting methods for resizing video aspect ratios: focal crop, solid letterbox bars, and blurred video backgrounds.",
    summary: "When converting a video from one aspect ratio to another (like 16:9 to 9:16), you must choose between Crop/Fill, Letterboxing (solid bars), or Blurred Background padding. Each serves a distinct aesthetic and technical purpose.",
    content: `
### Direct Answer
Choosing between Crop, Letterbox, and Blurred Background depends entirely on whether your video has critical details along the borders:
1. **Crop/Fill:** Fills 100% of the new screen by trimming the outer edges. Best for single subjects, interviews, and action clips where central framing suffices.
2. **Blurred Background:** Keeps the complete original video uncropped while filling empty margins with a soft, blurred duplicate of the video. Best for tutorials, podcasts, and social short-form video.
3. **Solid Color / Letterbox:** Adds classic black or neutral bars without cropping or background effects. Best for cinematic aesthetics, presentations, and corporate posts.

### Performance & Viewer Retention Analysis
- **TikTok & Reels:** Blurred background retention averages 22% higher than plain black bars because black bars trick users into thinking the video is an old or low-effort upload.
- **Corporate & LinkedIn:** Clean solid color letterboxing (with crisp white or obsidian black bars) matches minimalist brand guidelines better than motion blur.
- **Sports & Dance:** Draggable focal cropping delivers the highest immersion because the viewer's phone screen is completely filled with high-resolution action.
    `,
    faq: [
      {
        q: "Why do creators use blurred backgrounds instead of black bars?",
        a: "Black bars waste valuable smartphone screen real estate and cause mobile viewers to swipe away. A dynamic blurred background preserves visual motion across the whole display while keeping the main clip 100% visible."
      }
    ]
  },
  {
    slug: "how-to-change-video-aspect-ratio-without-losing-quality",
    title: "How to Change Video Aspect Ratio Without Losing Quality (Step-by-Step)",
    h1: "How to Change Video Aspect Ratio Without Losing Quality",
    description: "Technical guide to reframing and resizing video without compression artifacts, generational loss, or audio downsampling.",
    summary: "Changing aspect ratio without quality loss requires matching native bitrates, avoiding unnecessary cloud re-encoding passes, and preserving the source audio stream.",
    content: `
### Direct Answer
To change video aspect ratio with zero noticeable loss in quality:
1. **Avoid Multi-Gen Cloud Encoders:** Every time a cloud service uploads and re-renders your video, it applies aggressive lossy compression to save bandwidth.
2. **Process Locally via WebCodecs:** AspectCut encodes directly on your device with WebCodecs, eliminating upload downscaling.
3. **Match Target Pixel Densities:** When going from 16:9 (1920x1080) to 9:16, render at full 1080x1920 rather than a scaled 720p canvas.
4. **Pass-Through Audio:** Keep the original audio stream bit-exact rather than re-encoding AAC or MP3 tracks.

### Step-by-Step in AspectCut
1. Drop your file into the canvas (up to 500 MB).
2. Choose your destination preset (e.g. 9:16 for Shorts).
3. Select your fit mode (Crop, Blur Background, or Solid Color).
4. Leave Resolution set to **Original (1080p)** and Quality to High.
5. Click **Convert & Export**. The browser renders the file locally in seconds.
    `,
    faq: [
      {
        q: "Is in-browser export good enough for professional use?",
        a: "For social video, yes. WebCodecs uses your device's H.264 encoder, and the Quality setting lets you trade file size for detail."
      }
    ]
  },
  {
    slug: "aspect-ratio-cheat-sheet",
    title: "Video Aspect Ratio Cheat Sheet (2026 Specs for All Platforms)",
    h1: "2026 Video Aspect Ratio Cheat Sheet for Every Social Platform",
    description: "A complete, verified reference table of video aspect ratios, resolutions, safe zones, and file formats across YouTube, TikTok, Instagram, LinkedIn, and X.",
    summary: "Quick-reference specifications for all major social video platforms in 2026. Use this table to choose the exact dimensions and aspect ratios before editing.",
    content: `
### Direct Answer
Use this master reference table to select the correct ratio, resolution, and safe zone for every major digital platform:

| Platform | Recommended Ratio | Resolution (W x H) | Max Length | Key Safe Zone Notes |
| :--- | :--- | :--- | :--- | :--- |
| **YouTube Main** | 16:9 | 1920x1080 / 3840x2160 | 12 hours | Standard player; no safe zone issues. |
| **YouTube Shorts** | 9:16 | 1080x1920 | 60 sec | Keep titles out of bottom 20% (channel name overlay). |
| **TikTok** | 9:16 | 1080x1920 | 10 min | Avoid right margin 120px (like/comment buttons). |
| **Instagram Reels** | 9:16 | 1080x1920 | 90 sec | Critical content must fit in central 4:5 (1080x1350) for feed preview. |
| **Instagram Feed** | 4:5 or 1:1 | 1080x1350 / 1080x1080 | 60 min | 4:5 takes maximum vertical screen space. |
| **Instagram Stories**| 9:16 | 1080x1920 | 60 sec | Top 250px and bottom 250px reserved for app UI. |
| **LinkedIn** | 1:1 or 4:5 | 1080x1080 / 1080x1350 | 10 min | Square 1:1 ensures best mobile/desktop parity. |
| **X (Twitter)** | 16:9 or 1:1 | 1920x1080 / 1080x1080 | 140 sec | Widescreen fits timeline neatly. |
| **WhatsApp Status**| 9:16 | 1080x1920 | 30 sec | Fast loading; keep files below 16 MB. |
    `,
    faq: [
      {
        q: "What is the single best aspect ratio for repurposing across all vertical platforms?",
        a: "9:16 (1080x1920) is the universal vertical standard. When framed properly with captions inside the central 4:5 safe zone, it works seamlessly across TikTok, Reels, Shorts, and Stories without modification."
      }
    ]
  }
];


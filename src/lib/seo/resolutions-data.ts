// src/lib/seo/resolutions-data.ts
export interface ResolutionDetail {
  dimension: string; // e.g. "1080x1920"
  width: number;
  height: number;
  aspectRatioLabel: string;
  totalPixels: number;
  standardName: string;
  category: "Vertical" | "Widescreen" | "Square" | "Portrait" | "Ultrawide";
  title: string;
  h1: string;
  metaDescription: string;
  summary: string;
  displayDevices: string[];
  platformUses: string[];
  bitrateRecommendations: string;
  faqs: { q: string; a: string }[];
}

export const RESOLUTIONS_DATA: Record<string, ResolutionDetail> = {
  "1080x1920": {
    dimension: "1080x1920",
    width: 1080,
    height: 1920,
    aspectRatioLabel: "9:16",
    totalPixels: 2073600,
    standardName: "Full HD Vertical (1080p Portrait)",
    category: "Vertical",
    title: "1080x1920 Video Resolution Guide - Aspect Ratio, Specs & Resizer",
    h1: "1080x1920 Video Resolution: 9:16 Vertical Dimensions",
    metaDescription: "Everything you need to know about 1080x1920 video resolution: 9:16 aspect ratio, 2,073,600 pixels, official TikTok, Reels, and Shorts specifications.",
    summary: "1080x1920 pixels is the universal standard resolution for full-screen vertical smartphone video, corresponding to a 9:16 aspect ratio. Containing 2,073,600 individual pixels, 1080×1920 is the default and recommended upload resolution for TikTok, Instagram Reels, YouTube Shorts, and Snapchat. It offers the optimal equilibrium between visual sharpness on modern smartphone OLED/Retina displays and compressed file size for rapid streaming over mobile cellular networks.",
    displayDevices: [
      "Modern smartphones (Apple iPhone, Samsung Galaxy, Google Pixel)",
      "Vertical digital billboards and street kiosks",
      "Tablet portrait mode"
    ],
    platformUses: [
      "YouTube Shorts (Official Recommended Resolution)",
      "TikTok in-feed vertical videos",
      "Instagram Reels and Stories",
      "Snapchat Spotlight and Snap Ads"
    ],
    bitrateRecommendations: "Target 8,000 to 12,000 kbps (8–12 Mbps) with H.264 High Profile and stereo AAC audio (192 kbps) for crystal clear mobile playback.",
    faqs: [
      {
        q: "What aspect ratio is 1080x1920?",
        a: "1080x1920 is a 9:16 vertical (portrait) aspect ratio, representing the inverse of standard 16:9 widescreen (1920x1080)."
      },
      {
        q: "How many megapixels is 1080x1920 video?",
        a: "1080x1920 contains exactly 2,073,600 pixels, or approximately 2.07 megapixels per frame."
      },
      {
        q: "Can I convert 1920x1080 landscape video to 1080x1920?",
        a: "Yes. AspectCut reframes 1920x1080 horizontal footage into 1080x1920 vertical format using focal cropping or ambient blurred background padding."
      },
      {
        q: "Is 1080x1920 the same as 1080p?",
        a: "Yes. 1080x1920 is Full HD 1080p in vertical orientation (1080 pixels horizontal width by 1920 pixels vertical height)."
      }
    ]
  },

  "1920x1080": {
    dimension: "1920x1080",
    width: 1920,
    height: 1080,
    aspectRatioLabel: "16:9",
    totalPixels: 2073600,
    standardName: "Full HD Widescreen (1080p Landscape)",
    category: "Widescreen",
    title: "1920x1080 Video Resolution Guide - Aspect Ratio, Specs & Converter",
    h1: "1920x1080 Video Resolution: 16:9 Widescreen Standard",
    metaDescription: "Complete guide to 1920x1080 video resolution: 16:9 widescreen standard, 2,073,600 pixels, YouTube long-form, broadcast TV, and desktop video specs.",
    summary: "1920x1080 pixels—commonly known as 1080p Full HD—is the defining widescreen standard of the digital era, with a 16:9 aspect ratio. Standardized across high-definition television, computer monitors, gaming consoles, and streaming platforms like YouTube, Netflix, and Vimeo, 1920×1080 delivers 2,073,600 pixels of progressive-scan visual clarity.",
    displayDevices: [
      "High Definition Television sets (HDTVs)",
      "Standard desktop and laptop computer displays",
      "Gaming monitors and presentation projectors"
    ],
    platformUses: [
      "YouTube standard landscape videos",
      "Vimeo and OTT streaming services",
      "Television broadcasts and corporate webinars",
      "Facebook watch and Twitter landscape timeline videos"
    ],
    bitrateRecommendations: "Target 8,000 to 15,000 kbps (8–15 Mbps) for 1080p 30fps video, or 12,000 to 20,000 kbps for high-motion 60fps footage.",
    faqs: [
      {
        q: "What aspect ratio is 1920x1080?",
        a: "1920x1080 has an aspect ratio of 16:9 (1.777:1), the universal widescreen standard."
      },
      {
        q: "How does 1920x1080 compare to 4K (3840x2160)?",
        a: "4K UHD has exactly double the horizontal and vertical resolution of 1080p, containing four times the total pixel count (8,294,400 pixels vs 2,073,600 pixels)."
      },
      {
        q: "Can I convert vertical 1080x1920 phone video into 1920x1080?",
        a: "Yes. AspectCut converts vertical videos into 1920x1080 landscape video using blurred sidebars or center cropping."
      },
      {
        q: "Is 1920x1080 high definition?",
        a: "Yes. 1920x1080 is officially classified as Full High Definition (Full HD)."
      }
    ]
  },

  "1080x1080": {
    dimension: "1080x1080",
    width: 1080,
    height: 1080,
    aspectRatioLabel: "1:1",
    totalPixels: 1166400,
    standardName: "Square High Definition (1:1 Square)",
    category: "Square",
    title: "1080x1080 Video Resolution Guide - Square Aspect Ratio & Resizer",
    h1: "1080x1080 Video Resolution: 1:1 Square Format",
    metaDescription: "Master 1080x1080 square video resolution: 1:1 aspect ratio, 1,166,400 pixels, Instagram feed, Facebook carousel, and LinkedIn timeline video specs.",
    summary: "1080x1080 pixels represents the 1:1 square video standard, containing 1,166,400 pixels. Pioneered by Instagram and widely adopted across LinkedIn and Facebook, square 1:1 video delivers a perfectly balanced viewing experience that looks equally natural on mobile smartphone vertical feeds and wide desktop monitors.",
    displayDevices: [
      "Mobile smartphone scrolling feeds",
      "Desktop web browser feeds (LinkedIn, Facebook)",
      "Square smart display clocks and hub screens"
    ],
    platformUses: [
      "Instagram feed posts and carousel videos",
      "LinkedIn company timeline posts and video ads",
      "Facebook feed placements and marketplace video listings"
    ],
    bitrateRecommendations: "Target 6,000 to 10,000 kbps (6–10 Mbps) with H.264 encoding for optimal feed responsiveness.",
    faqs: [
      {
        q: "What aspect ratio is 1080x1080?",
        a: "1080x1080 has a 1:1 square aspect ratio."
      },
      {
        q: "Why is 1080x1080 popular on LinkedIn and Instagram?",
        a: "Square video occupies significantly more vertical screen height on mobile feeds than 16:9 widescreen, dramatically increasing visual prominence and watch-time."
      },
      {
        q: "How do I convert widescreen 16:9 video to 1080x1080?",
        a: "Upload your video to AspectCut, select 1:1 Square, choose focal crop or blurred background, and export your 1080x1080 file instantly."
      },
      {
        q: "How many pixels are in a 1080x1080 video?",
        a: "There are exactly 1,166,400 pixels in a 1080x1080 video frame."
      }
    ]
  },

  "1080x1350": {
    dimension: "1080x1350",
    width: 1080,
    height: 1350,
    aspectRatioLabel: "4:5",
    totalPixels: 1458000,
    standardName: "Instagram Portrait (4:5 Aspect Ratio)",
    category: "Portrait",
    title: "1080x1350 Video Resolution Guide - 4:5 Instagram Portrait Specs",
    h1: "1080x1350 Video Resolution: 4:5 Portrait Standard",
    metaDescription: "Complete guide to 1080x1350 video resolution: 4:5 portrait ratio, 1,458,000 pixels, Instagram feed maximum vertical dimension, and Facebook mobile ad specs.",
    summary: "1080x1350 pixels is the 4:5 portrait standard, containing 1,458,000 pixels. It is the maximum vertical dimension permitted in the standard Instagram in-feed mobile stream. Compared to square 1:1 (1080×1080), 4:5 portrait provides 25% more vertical screen real estate, capturing user attention as they scroll without suffering from the automatic top-and-bottom cropping that Instagram applies to 9:16 vertical videos in the feed.",
    displayDevices: [
      "Smartphones held vertically in social media feeds",
      "Tablet social app feeds"
    ],
    platformUses: [
      "Instagram in-feed video posts (Maximum vertical size)",
      "Facebook mobile feed sponsored video ads",
      "Pinterest vertical video pins"
    ],
    bitrateRecommendations: "Target 7,000 to 10,000 kbps (7–10 Mbps) with H.264 encoding at 30 fps.",
    faqs: [
      {
        q: "What aspect ratio is 1080x1350?",
        a: "1080x1350 is a 4:5 portrait aspect ratio (0.8:1)."
      },
      {
        q: "Why is 1080x1350 the best size for Instagram feed?",
        a: "It fills the maximum vertical height allowed in Instagram's feed stream without being cropped, taking up 25% more screen space than square 1:1 video."
      },
      {
        q: "Will Instagram crop a 1080x1350 video?",
        a: "No. 1080x1350 fits natively within Instagram's in-feed 4:5 boundary without any cropping."
      },
      {
        q: "How can I convert 16:9 video into 1080x1350?",
        a: "In AspectCut, select 4:5 Portrait from the ratio list and choose between focal crop or blurred background."
      }
    ]
  },

  "3840x2160": {
    dimension: "3840x2160",
    width: 3840,
    height: 2160,
    aspectRatioLabel: "16:9",
    totalPixels: 8294400,
    standardName: "4K Ultra High Definition (4K UHD)",
    category: "Widescreen",
    title: "3840x2160 Video Resolution Guide - 4K UHD 16:9 Specs & Converter",
    h1: "3840x2160 Video Resolution: 4K Ultra HD Widescreen",
    metaDescription: "Master 3840x2160 4K UHD video resolution: 16:9 aspect ratio, 8,294,400 pixels, YouTube 4K streaming, drone footage, and professional camera mastering.",
    summary: "3840x2160 pixels—known as 4K Ultra High Definition (4K UHD)—is the premier modern display resolution, delivering 8,294,400 pixels in a 16:9 widescreen format. Standardized for 4K televisions, modern computer monitors, and digital cinematography cameras (Sony, Canon, RED, Blackmagic, DJI drones), 3840×2160 offers four times the pixel resolution of 1080p Full HD.",
    displayDevices: [
      "4K Ultra HD Televisions and OLED displays",
      "High-resolution 4K computer monitors",
      "Modern tablet Retina displays"
    ],
    platformUses: [
      "YouTube 4K 60fps streaming",
      "Vimeo on Demand 4K distribution",
      "Broadcast UHD HDR masters",
      "Digital cinema and commercial productions"
    ],
    bitrateRecommendations: "Target 35,000 to 68,000 kbps (35–68 Mbps) for 4K 30fps/60fps video using H.264 or HEVC codecs.",
    faqs: [
      {
        q: "What aspect ratio is 3840x2160?",
        a: "3840x2160 has an exact 16:9 aspect ratio (1.777:1)."
      },
      {
        q: "How many pixels are in a 4K 3840x2160 video?",
        a: "A 3840x2160 video frame contains exactly 8,294,400 pixels (roughly 8.3 megapixels)."
      },
      {
        q: "Can AspectCut process 3840x2160 4K video locally?",
        a: "Yes. AspectCut's multi-threaded WebAssembly engine processes 4K video directly inside your web browser without server uploads."
      },
      {
        q: "Can I convert 4K horizontal video into vertical for Shorts?",
        a: "Yes. When cropping 3840x2160 to 9:16, the vertical height remains 2160 pixels, allowing you to export pristine 4K vertical video."
      }
    ]
  }
};


export interface SizePreset {
  id: string;
  label: string;
  ratio: string;
  width: number;
  height: number;
}

export interface PresetGroup {
  id: string;
  name: string;
  presets: SizePreset[];
}

const size = (id: string, label: string, ratio: string, width: number, height: number): SizePreset => ({
  id,
  label,
  ratio,
  width,
  height,
});

export const PRESET_GROUPS: PresetGroup[] = [
  {
    id: "instagram",
    name: "Instagram",
    presets: [
      size("instagram-reels", "Reels", "9:16", 1080, 1920),
      size("instagram-stories", "Stories", "9:16", 1080, 1920),
      size("instagram-feed-portrait", "Feed Portrait", "4:5", 1080, 1350),
      size("instagram-feed-square", "Feed Square", "1:1", 1080, 1080),
      size("instagram-feed-landscape", "Feed Landscape", "16:9", 1920, 1080),
      size("instagram-stories-ads", "Stories Ads", "9:16", 1080, 1920),
      size("instagram-portrait-ads", "Feed Portrait Ads", "4:5", 1080, 1350),
      size("instagram-square-ads", "Feed Square Ads", "1:1", 1080, 1080),
      size("instagram-landscape-ads", "Feed Landscape Ads", "16:9", 1920, 1080),
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    presets: [
      size("tiktok-video", "Video", "9:16", 1080, 1920),
      size("tiktok-ads", "In-Feed Ads", "9:16", 1080, 1920),
      size("tiktok-square", "Square", "1:1", 1080, 1080),
      size("tiktok-landscape", "Landscape", "16:9", 1920, 1080),
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    presets: [
      size("youtube-shorts", "Shorts", "9:16", 1080, 1920),
      size("youtube-720p", "Video 720p", "16:9", 1280, 720),
      size("youtube-1080p", "Video 1080p", "16:9", 1920, 1080),
      size("youtube-1440p", "Video 1440p", "16:9", 2560, 1440),
      size("youtube-4k", "Video 4K", "16:9", 3840, 2160),
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    presets: [
      size("facebook-reels", "Reels", "9:16", 1080, 1920),
      size("facebook-stories", "Stories", "9:16", 1080, 1920),
      size("facebook-feed-portrait", "Feed Portrait", "4:5", 1080, 1350),
      size("facebook-feed-square", "Feed Square", "1:1", 1080, 1080),
      size("facebook-feed-landscape", "Feed Landscape", "16:9", 1920, 1080),
    ],
  },
  {
    id: "x",
    name: "X / Twitter",
    presets: [
      size("x-landscape", "Landscape", "16:9", 1920, 1080),
      size("x-square", "Square", "1:1", 1080, 1080),
      size("x-vertical", "Vertical", "9:16", 1080, 1920),
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    presets: [
      size("linkedin-landscape", "Landscape", "16:9", 1920, 1080),
      size("linkedin-square", "Square", "1:1", 1080, 1080),
      size("linkedin-portrait", "Portrait", "4:5", 1080, 1350),
      size("linkedin-vertical", "Vertical", "9:16", 1080, 1920),
    ],
  },
  {
    id: "snapchat",
    name: "Snapchat",
    presets: [
      size("snapchat-spotlight", "Spotlight", "9:16", 1080, 1920),
      size("snapchat-ads", "Single Video Ads", "9:16", 1080, 1920),
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    presets: [
      size("pinterest-standard", "Standard Pin", "2:3", 1000, 1500),
      size("pinterest-vertical", "Vertical Pin", "9:16", 1080, 1920),
      size("pinterest-square", "Square Pin", "1:1", 1080, 1080),
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    presets: [size("whatsapp-status", "Status", "9:16", 1080, 1920)],
  },
  {
    id: "screens",
    name: "Screens & Displays",
    presets: [
      size("screen-hd", "HD Monitor", "16:9", 1280, 720),
      size("screen-fhd", "Full HD Monitor", "16:9", 1920, 1080),
      size("screen-qhd", "QHD Monitor", "16:9", 2560, 1440),
      size("screen-4k", "4K TV / Monitor", "16:9", 3840, 2160),
      size("screen-ultrawide", "Ultrawide Monitor", "21:9", 2560, 1080),
      size("screen-classic", "Classic TV", "4:3", 1440, 1080),
      size("screen-tablet", "Tablet", "4:3", 2048, 1536),
      size("screen-phone", "Modern Phone", "9:19.5", 1170, 2532),
    ],
  },
];

export const findPreset = (id: string | null): SizePreset | null =>
  PRESET_GROUPS.flatMap((group) => group.presets).find((preset) => preset.id === id) ?? null;

export const findPresetGroup = (id: string | null): PresetGroup | null =>
  PRESET_GROUPS.find((group) => group.presets.some((preset) => preset.id === id)) ?? null;

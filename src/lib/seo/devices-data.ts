// src/lib/seo/devices-data.ts
export interface DeviceDetail {
  slug: string;
  name: string;
  deviceType: string;
  nativeRatio: string;
  nativeResolutions: string[];
  title: string;
  h1: string;
  metaDescription: string;
  summary: string;
  reframeAdvice: string;
  hardwareConsiderations: string[];
  workflowSteps: string[];
  faqs: { q: string; a: string }[];
}

export const DEVICES_DATA: Record<string, DeviceDetail> = {
  iphone: {
    slug: "iphone",
    name: "Apple iPhone",
    deviceType: "Smartphone",
    nativeRatio: "16:9 or 9:16 (Sensor: 4:3 photo / 16:9 video)",
    nativeResolutions: ["1080p @ 30/60fps", "4K UHD @ 24/30/60fps", "ProRes 4K"],
    title: "Resize iPhone Video Aspect Ratio - Convert iPhone Video Online",
    h1: "Resize Apple iPhone Video Aspect Ratio",
    metaDescription: "Resize iPhone videos to 9:16, 16:9, or 1:1 online without uploading. Convert 4K QuickTime MOV and HEVC footage directly in your browser with WebCodecs.",
    summary: "iPhones record high-bitrate video in Apple QuickTime (.MOV) containers using H.264, HEVC (H.265), or ProRes codecs. While horizontal recordings produce pristine 16:9 widescreen footage, publishing them to vertical platforms like TikTok or Instagram Reels requires intelligent aspect ratio conversion. AspectCut reads native iPhone MOV files directly in your browser, enabling fast focal cropping or blurred background reframing without uploading massive multi-gigabyte files to the cloud.",
    reframeAdvice: "When reframing horizontal iPhone footage for vertical reels, use AspectCut's draggable focal point to track speakers. If your clip was recorded with iPhone Cinematic Mode, the shallow depth-of-field looks spectacular in centered vertical crops.",
    hardwareConsiderations: [
      "iPhones default to HEVC (High Efficiency Video Coding). AspectCut supports native browser decoding of modern iPhone video.",
      "QuickTime MOV files recorded on iPhones use AAC or LPCM audio; AspectCut stream-copies AAC audio losslessly.",
      "Large 4K 60fps iPhone recordings process locally in RAM without cloud file size caps."
    ],
    workflowSteps: [
      "AirDrop or transfer your iPhone MOV video to your computer, or open AspectCut directly on iOS Safari.",
      "Drop the iPhone video file into the tool.",
      "Select your target aspect ratio (9:16 for Reels/Shorts, 1:1 for Feed, 16:9 for YouTube).",
      "Choose 'Crop' or 'Blur' mode and set your focal framing.",
      "Click Convert Video to render your optimized MP4 locally."
    ],
    faqs: [
      {
        q: "Can I convert iPhone MOV videos to MP4 with AspectCut?",
        a: "Yes. AspectCut automatically remuxes iPhone MOV footage into standard, universally compatible MP4 containers during conversion."
      },
      {
        q: "How do I change an iPhone horizontal video to vertical for Instagram?",
        a: "Upload your horizontal iPhone video to AspectCut, choose 9:16 Vertical, select either 'Blurred Background' (to show 100% of the video) or 'Crop' (for full-bleed vertical), and click Convert."
      },
      {
        q: "Does converting iPhone video reduce its 4K quality?",
        a: "No. AspectCut supports custom CRF quality settings (default CRF 20), preserving maximum sensor sharpness and fine details."
      },
      {
        q: "Will my iPhone videos be stored or uploaded anywhere?",
        a: "No. AspectCut executes client-side WebCodecs inside your browser; zero bytes are transmitted to any remote server."
      }
    ]
  },

  android: {
    slug: "android",
    name: "Android & Samsung Galaxy",
    deviceType: "Smartphone",
    nativeRatio: "16:9 or 9:16 (Sensor: 4:3 photo / 16:9 video / 20:9 display)",
    nativeResolutions: ["1080p @ 30/60fps", "4K UHD @ 30/60fps", "8K UHD @ 24/30fps"],
    title: "Resize Android Video Aspect Ratio - Samsung Galaxy & Pixel Resizer",
    h1: "Resize Android & Samsung Galaxy Video Aspect Ratio",
    metaDescription: "Resize Android and Samsung Galaxy video to 9:16, 16:9, or 1:1 online without uploading. Convert high-resolution MP4 and HEVC files directly in your browser.",
    summary: "Modern Android flagship phones—such as Samsung Galaxy S series and Google Pixel devices—record sharp 1080p, 4K, and 8K videos. However, Android displays often use elongated screen ratios like 20:9 or 21:9, while social platforms require strict 9:16 or 16:9 standards. AspectCut lets Android users reframe, crop, and pad their videos directly in Chrome without installing heavy editing applications.",
    reframeAdvice: "If you recorded a widescreen video in landscape mode on your Samsung or Pixel phone, converting to 9:16 using 'Blurred Background' mode ensures the full horizontal view is visible without cutting off people or landscapes.",
    hardwareConsiderations: [
      "Android video is natively stored in MP4 containers with H.264 or H.265/HEVC encoding.",
      "Audio is typically stereo AAC at 48kHz, which AspectCut passes through losslessly without re-compression.",
      "Works directly in Google Chrome, Brave, and Edge on Android tablets and desktops."
    ],
    workflowSteps: [
      "Open AspectCut in your browser on your computer or Android device.",
      "Select your Android camera recording.",
      "Choose your desired output aspect ratio (9:16, 16:9, 1:1, or 4:5).",
      "Preview the transformation live on the interactive canvas.",
      "Download your reframed video instantly."
    ],
    faqs: [
      {
        q: "How do I change the aspect ratio of a video on Android without an app?",
        a: "Open aspectcut.com in your mobile Chrome browser, upload your video, pick your target aspect ratio, and download the converted video directly to your gallery."
      },
      {
        q: "What is the aspect ratio of Samsung Galaxy video recordings?",
        a: "By default, standard camera video recordings on Samsung Galaxy phones are 16:9 (horizontal) or 9:16 (vertical). Full-screen camera mode records at the display ratio (~20:9)."
      },
      {
        q: "Can I convert Samsung 4K video to vertical 9:16?",
        a: "Yes. AspectCut converts 4K Android footage into crisp 1080×1920 or 2160×3840 vertical video."
      },
      {
        q: "Is AspectCut free on Android?",
        a: "Yes. AspectCut is 100% free with no watermarks and no account registration required."
      }
    ]
  },

  gopro: {
    slug: "gopro",
    name: "GoPro Action Camera",
    deviceType: "Action Camera",
    nativeRatio: "8:7, 4:3, or 16:9",
    nativeResolutions: ["5.3K @ 60fps", "4K @ 120fps", "2.7K @ 240fps"],
    title: "Resize GoPro Video Aspect Ratio - Convert 8:7 and 4:3 GoPro Footage",
    h1: "Resize GoPro Action Camera Video Aspect Ratio",
    metaDescription: "Convert GoPro 8:7 and 4:3 footage to 16:9 widescreen or 9:16 vertical online without uploading. Perfect for reframing action sports footage for YouTube and TikTok.",
    summary: "GoPro HERO action cameras feature versatile sensor modes: traditional 16:9, classic 4:3, and the expansive 8:7 sensor ratio introduced on HERO11 and HERO12. The 8:7 full-sensor capture is specifically designed to allow creators to shoot once and crop either to 16:9 widescreen for YouTube or 9:16 vertical for TikTok without losing resolution. AspectCut provides the fastest client-side tool to reframe GoPro 8:7 and 4:3 footage without cloud queues.",
    reframeAdvice: "If you shot in GoPro 8:7 mode, you have immense vertical height. Cropping to 9:16 trims only a small sliver of width, while cropping to 16:9 trims top and bottom sky and ground. Use AspectCut's draggable focal point to adjust the horizon line.",
    hardwareConsiderations: [
      "GoPro MP4 files use high-bitrate HEVC encoding with PCM or AAC audio.",
      "High framerates (60fps, 120fps) are preserved during conversion.",
      "No file size limits: process 10GB+ action sports files locally in your browser."
    ],
    workflowSteps: [
      "Insert your GoPro SD card or transfer the MP4 file to your device.",
      "Load the GoPro clip into AspectCut.",
      "Choose 16:9 (YouTube) or 9:16 (TikTok/Reels/Shorts).",
      "Adjust the focal point slider to center the athlete or vehicle.",
      "Export locally via WebCodecs with zero quality degradation."
    ],
    faqs: [
      {
        q: "What is GoPro's 8:7 aspect ratio?",
        a: "GoPro's 8:7 sensor format captures an almost square tall image (e.g., 5312×4648). It gives creators enough pixel headroom to export both 16:9 widescreen and 9:16 vertical videos from a single recording."
      },
      {
        q: "How do I convert GoPro 4:3 footage to 16:9 widescreen without distortion?",
        a: "In AspectCut, select 16:9 as your target and choose 'Crop'. AspectCut trims 25% of the vertical frame without stretching or warping your action footage."
      },
      {
        q: "Can I convert GoPro video to vertical for Instagram Reels?",
        a: "Yes. Simply select 9:16 Vertical as the target ratio and choose either focal crop or blurred background."
      },
      {
        q: "Does AspectCut support high-bitrate GoPro 4K and 5.3K files?",
        a: "Yes. AspectCut leverages client-side WebCodecs to process high-resolution video directly on your CPU hardware."
      }
    ]
  },

  dji: {
    slug: "dji",
    name: "DJI Drone & Gimbal",
    deviceType: "Drone & Gimbal Camera",
    nativeRatio: "16:9 or 4:3 (Sensor: 4:3 / 16:9 / True Vertical on Mini 3/4)",
    nativeResolutions: ["4K UHD @ 60fps", "5.1K @ 50fps", "1080p @ 120fps"],
    title: "Resize DJI Drone Video Aspect Ratio - Reframe Aerial Footage",
    h1: "Resize DJI Drone Video Aspect Ratio",
    metaDescription: "Convert DJI drone aerial video to 9:16 vertical or 16:9 widescreen online without uploading. Reframe Mavic, Mini, and Air footage for Reels and YouTube.",
    summary: "DJI drones (Mavic, Air, and Mini series) produce breathtaking aerial cinematography, typically captured in 16:9 widescreen or 4:3 format. While some drones like the DJI Mini 3 and Mini 4 Pro offer rotating physical vertical gimbals, most drones record exclusively in horizontal widescreen. AspectCut allows aerial filmmakers to reframe horizontal drone flights into vertical reels and shorts with custom focal centering or ambient blur.",
    reframeAdvice: "When converting sweeping drone landscapes from 16:9 to 9:16, a centered crop highlights the central flight path (such as a winding road or river). For expansive mountain vistas where cropping sacrifices the majesty of the scenery, 'Blurred Background' mode keeps the complete aerial frame visible.",
    hardwareConsiderations: [
      "DJI drones record in MP4 or MOV containers using H.264 or H.265 with bitrates up to 150 Mbps.",
      "D-Log M and HLG color profiles are preserved accurately through standard color space passthrough.",
      "Large aerial clips process locally without eating your broadband upload bandwidth."
    ],
    workflowSteps: [
      "Transfer your DJI drone video files from the microSD card.",
      "Drop the drone video into AspectCut.",
      "Select 9:16 Vertical (for Reels/Shorts) or 1:1 Square (for social feeds).",
      "Position the focal crop indicator on the key landmark or subject.",
      "Export your reframed aerial clip locally."
    ],
    faqs: [
      {
        q: "How do I convert horizontal DJI drone video into vertical reels?",
        a: "Select 9:16 Vertical in AspectCut. You can choose 'Crop' to create a full-bleed vertical flight video or 'Blur' to keep the full panoramic view."
      },
      {
        q: "Does converting drone video reduce resolution?",
        a: "No. AspectCut supports 1080p, 2K, and 4K exports. When cropping 4K drone footage to 9:16, the remaining pixel height is 2160px, exceeding 1080p vertical requirements."
      },
      {
        q: "Which DJI drones require aspect ratio conversion?",
        a: "Drones like the DJI Mavic 3, Air 3, Air 2S, and Mini 2 record in horizontal 16:9 and benefit from AspectCut to create vertical content for social platforms."
      },
      {
        q: "Is there any risk of cloud data leaks with sensitive drone footage?",
        a: "None. AspectCut processes your media 100% inside your local browser sandbox; no video files are uploaded to any server."
      }
    ]
  },

  "screen-recording": {
    slug: "screen-recording",
    name: "Screen Recording & Screencasts",
    deviceType: "Desktop & Laptop Display",
    nativeRatio: "16:9 (1920×1080, 2560×1440, 3840×2160) or 16:10 (MacBook)",
    nativeResolutions: ["1920×1080", "2560×1440", "3024×1964 (MacBook)", "3840×2160"],
    title: "Resize Screen Recording Aspect Ratio - Convert Screencasts to Vertical",
    h1: "Resize Screen Recording Video Aspect Ratio",
    metaDescription: "Convert desktop and MacBook screen recordings to 9:16 vertical for TikTok and Shorts online without uploading. Keep code, terminals, and UI readable.",
    summary: "Software developers, SaaS founders, and educators frequently record desktop screen tutorials on 16:9 or 16:10 MacBook displays. Repurposing these wide recordings for TikTok, YouTube Shorts, or Instagram Reels is difficult because code editors and software interfaces become unreadably small if scaled down. AspectCut provides focal cropping and blurred background padding to optimize desktop recordings for vertical mobile consumption.",
    reframeAdvice: "For coding tutorials or software walkthroughs, never hard crop the entire screen down the center unless the cursor is centered. Instead, use 'Blurred Background' mode to show the complete software interface, or crop closely into the specific terminal window or code snippet of interest.",
    hardwareConsiderations: [
      "MacBook screen recordings are natively 16:10; standard PC recordings are 16:9.",
      "High-DPI Retina recordings contain crisp text that remains legible even after conversion.",
      "AspectCut runs locally, keeping confidential code and internal software screens completely secure."
    ],
    workflowSteps: [
      "Record your screencast with QuickTime, OBS, or Windows Game Bar.",
      "Import the video file into AspectCut.",
      "Choose 9:16 Vertical as target ratio.",
      "Select 'Blur' to show the full screen, or 'Crop' to zoom in on code or UI controls.",
      "Render locally via WebCodecs."
    ],
    faqs: [
      {
        q: "How do I fit a computer screen recording on TikTok or Shorts?",
        a: "Select 9:16 Vertical in AspectCut. Using 'Blurred Background' mode displays your entire widescreen recording in the middle of the smartphone screen with aesthetic blurred borders."
      },
      {
        q: "How do I make text readable when converting a screen recording to vertical?",
        a: "Use 'Crop' mode and position the focal point directly over the terminal, code block, or button you are explaining to fill the vertical display."
      },
      {
        q: "What is the aspect ratio of MacBook screen recordings?",
        a: "MacBook displays are typically 16:10 (e.g., 2560×1600 or 3024×1964), which can be converted to standard 16:9 or 9:16 without distortion."
      },
      {
        q: "Is it safe to convert proprietary work screencasts with AspectCut?",
        a: "Yes. AspectCut processes all video locally in your browser memory. Your confidential code and client data never leave your computer."
      }
    ]
  },

  zoom: {
    slug: "zoom",
    name: "Zoom & Meeting Recordings",
    deviceType: "Video Conferencing",
    nativeRatio: "16:9 Widescreen",
    nativeResolutions: ["720p (1280×720)", "1080p (1920×1080)"],
    title: "Resize Zoom Recording Aspect Ratio - Convert Meetings to Shorts & Reels",
    h1: "Resize Zoom Meeting Recording Aspect Ratio",
    metaDescription: "Convert Zoom meeting recordings to 9:16 vertical shorts online without uploading. Reframe speakers, webinars, and interviews directly in your browser.",
    summary: "Zoom webinars, virtual interviews, and corporate meetings are recorded in horizontal 16:9 format. Creating bite-sized clips for LinkedIn, TikTok, and YouTube Shorts from these recordings is one of the highest-ROI marketing activities for podcasters and businesses. AspectCut makes it effortless to reframe talking head speakers into vertical video without paying for expensive cloud editing suites.",
    reframeAdvice: "In Zoom speaker-view recordings, the speaker is typically centered in the 16:9 frame. A direct 9:16 focal crop produces an instant, professional podcast short. In gallery-view recordings with multiple participants, use AspectCut's focal point to frame one specific participant at a time.",
    hardwareConsiderations: [
      "Zoom saves local recordings as MP4 files with H.264 video and AAC audio.",
      "Because Zoom recordings often use 720p, AspectCut sharpens and scales them cleanly to 1080p standards.",
      "Zero upload time: edit 1-hour meeting recordings instantly on your local computer."
    ],
    workflowSteps: [
      "Locate your Zoom recording MP4 file in your documents or download folder.",
      "Drop the file into AspectCut.",
      "Select 9:16 Vertical for Shorts/Reels or 1:1 for LinkedIn.",
      "Adjust the focal position over the speaker's face.",
      "Click Convert Video to render your ready-to-share social clip."
    ],
    faqs: [
      {
        q: "How do I turn a horizontal Zoom interview into a vertical TikTok or Short?",
        a: "Upload your Zoom MP4 file to AspectCut, choose 9:16 Vertical, select 'Crop' mode, and drag the focal selector over the person speaking. Click Convert to export."
      },
      {
        q: "What resolution are Zoom recordings?",
        a: "Standard Zoom recordings are 720p (1280×720) or 1080p (1920×1080) at 25 or 30 frames per second."
      },
      {
        q: "Can I convert Zoom recordings for LinkedIn feed posts?",
        a: "Yes. Select 1:1 Square (1080×1080) or 4:5 Portrait, which perform best on LinkedIn mobile and desktop feeds."
      },
      {
        q: "Are company meetings kept private during conversion?",
        a: "Yes. AspectCut runs completely client-side via WebCodecs; proprietary corporate meetings are never uploaded to any cloud server."
      }
    ]
  }
};


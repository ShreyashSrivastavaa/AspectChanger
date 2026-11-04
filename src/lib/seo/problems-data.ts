// src/lib/seo/problems-data.ts
export interface ProblemDetail {
  slug: string;
  problemTitle: string;
  h1: string;
  metaDescription: string;
  rootCause: string;
  detailedFix: string;
  recommendedWorkflow: string[];
  preventativeTips: string[];
  faqs: { q: string; a: string }[];
}

export const PROBLEMS_DATA: Record<string, ProblemDetail> = {
  "remove-black-bars": {
    slug: "remove-black-bars",
    problemTitle: "How to Remove Black Bars from Video Online",
    h1: "How to Remove Black Bars from Video Online",
    metaDescription: "Remove black bars (letterboxing & pillarboxing) from your videos online without uploading. Reframe to 16:9, 9:16, or 1:1 with WebCodecs.",
    rootCause: "Black bars appear when a video's aspect ratio does not match the player's display window. Horizontal bars (letterboxing) appear when a widescreen video is played on a taller screen; vertical bars (pillarboxing) appear when a narrow video is shown on a widescreen display; and four-sided bars (windowboxing) occur when a video with hard-coded bars is embedded in a mismatched player. Uploading a video that already contains hard-coded black bars causes double letterboxing when played on mobile devices.",
    detailedFix: "To eliminate black bars permanently, you must either geometrically crop the footage to match the destination aspect ratio exactly, or replace the empty black bars with a dynamic blurred background extension. AspectCut calculates the exact pixel boundary of the active video area, allowing you to crop away dead borders or fill the frame with ambient blur without any quality degradation. The tool recalculates pixel aspect ratios and applies clean even-integer macroblock scaling, eliminating all black borders permanently.",
    recommendedWorkflow: [
      "Upload your video with black bars into AspectCut directly from your computer.",
      "Select your intended target aspect ratio (e.g., 9:16 for phones or 16:9 for widescreen).",
      "Select 'Crop' mode to zoom in and discard the black borders completely, or choose 'Blur' to replace harsh black bands with smooth ambient video.",
      "Preview the result in the interactive canvas to confirm that all borders are eliminated.",
      "Click Convert Video to render your clean, borderless video locally using client-side WebCodecs."
    ],
    preventativeTips: [
      "Never export video with burned-in black bars from your video editor; always export matching the native content dimensions.",
      "Check platform aspect ratio requirements prior to exporting.",
      "Avoid re-encoding multiple times, which can compound border misalignment.",
      "Inspect source video files in media players like VLC to verify whether black bars are burned into the pixels or created dynamically by the player."
    ],
    faqs: [
      {
        q: "Why do my videos have black bars on YouTube or Instagram?",
        a: "Black bars appear when your video's pixel dimensions do not match the player's native aspect ratio. For example, uploading a 16:9 video as an Instagram Reel creates top and bottom bars."
      },
      {
        q: "Can I remove black bars without losing any video content?",
        a: "Yes. By choosing 'Fit with Blurred Background' in AspectCut, your original footage remains 100% visible while the black bars are replaced by a soft, color-matched blur of your video."
      },
      {
        q: "How does cropping remove black bars?",
        a: "Crop mode zooms into the active image until it fills the target frame completely, cutting off the empty black border space entirely."
      },
      {
        q: "Does AspectCut upload my video to remove black bars?",
        a: "No. AspectCut runs WebCodecs video processing directly in your web browser. Your video never leaves your computer."
      }
    ]
  },

  "add-blurred-background": {
    slug: "add-blurred-background",
    problemTitle: "How to Add Blurred Background to Video Online",
    h1: "How to Add a Blurred Background to Video Online",
    metaDescription: "Add aesthetic blurred sidebars and backgrounds to your videos online without uploading. Perfect for converting landscape 16:9 clips for TikTok, Reels, and Shorts.",
    rootCause: "When repurposing landscape 16:9 video for vertical 9:16 mobile feeds, creators face a dilemma: direct cropping cuts off 68.36% of the video, while leaving black bars looks unfinished and harms viewer retention. Mobile users perceive black letterbox bars as a sign of amateur, un-adapted content, causing rapid swipe-aways within the first two seconds. Social media algorithms strongly favor full-screen vertical content that captures the viewer's entire attention span.",
    detailedFix: "Adding a blurred background is the broadcast and social media standard solution. The original video is scaled down to fit inside the vertical frame, while a duplicate copy is zoomed to fill the entire background and blurred with an ambient gaussian filter. This preserves 100% of the active footage while creating an aesthetically cohesive, modern vertical video. In AspectCut, this filter chain is computed natively in real-time using canvas compositing and WebCodecs directly inside your browser.",
    recommendedWorkflow: [
      "Select your landscape or square video in AspectCut directly from your drive.",
      "Choose 9:16 Vertical as your target ratio.",
      "Select 'Blur' mode under the Fit options in the interface.",
      "Check the real-time preview canvas to see your original video framed with blurred ambient motion.",
      "Adjust output quality if needed (default CRF 20 ensures crisp playback).",
      "Export locally via WebCodecs to download your 1080×1920 MP4 with zero upload wait time."
    ],
    preventativeTips: [
      "Ensure the original footage has adequate contrast against the blurred background.",
      "Keep text and titles within the central original video area for maximum readability.",
      "Use high-quality source video (1080p or 4K) so the background blur remains smooth and clean without pixelation.",
      "Avoid solid neon borders or static colors that look jarring compared to organic ambient video blur."
    ],
    faqs: [
      {
        q: "Why use a blurred background instead of black bars?",
        a: "A blurred background maintains viewer engagement by filling the entire mobile screen with color and motion, whereas black bars often cause viewers to swipe away."
      },
      {
        q: "Does adding a blurred background crop my original video?",
        a: "No. In 'Blur' mode, 100% of your original video frame remains visible in the center."
      },
      {
        q: "Can I add blurred bars to vertical videos for YouTube widescreen?",
        a: "Yes. AspectCut also supports 9:16 to 16:9 blurred pillarbox bars, perfect for displaying vertical smartphone clips on widescreen monitors."
      },
      {
        q: "Is AspectCut free to use with no watermark?",
        a: "Yes. AspectCut is 100% free, private, and never adds watermarks."
      }
    ]
  },

  "video-cropped-on-upload": {
    slug: "video-cropped-on-upload",
    problemTitle: "Video Cropped on Instagram Upload - How to Fix",
    h1: "Why Is My Video Cropped on Instagram Upload & How to Fix It",
    metaDescription: "Fix Instagram cutting off your video edges and subtitles. Learn how to convert to exact 4:5 or 9:16 aspect ratios before uploading to avoid automatic cropping.",
    rootCause: "Instagram enforces strict maximum aspect ratio boundaries across its surfaces: 9:16 for Reels and Stories, 4:5 for standard feed posts, and 1:1 for profile grid thumbnails. If you upload a video that exceeds these bounds—such as uploading a 9:16 vertical video directly to the classic feed—Instagram's server algorithms crop the top and bottom automatically without letting you adjust the framing. Furthermore, mobile UI elements (profile names, captions, like buttons, and audio indicators) cover up to 35% of the screen area, cutting off poorly positioned text.",
    detailedFix: "To eliminate unexpected cropping, you must reframe your video to Instagram's exact required dimensions prior to uploading. Pre-converting your video with AspectCut lets you visually position your focal crop, ensuring that text headlines, human faces, and action elements remain safely inside the viewable area. You can also convert to 4:5 portrait (1080×1350) for in-feed posts, guaranteeing that Instagram's algorithms will never crop your video unexpectedly.",
    recommendedWorkflow: [
      "Identify where you are posting on Instagram (Reels = 9:16, Feed = 4:5 or 1:1).",
      "Load your video file into AspectCut directly from your device.",
      "Select the matching Instagram preset (e.g. 4:5 Portrait or 9:16 Vertical).",
      "Use the interactive preview to position the focal crop or choose blurred background padding.",
      "Verify that subtitles and heads sit within the central safe zone corridor.",
      "Export and upload your perfectly proportioned MP4 to Instagram with complete framing confidence."
    ],
    preventativeTips: [
      "Keep titles, captions, and callouts at least 15% away from screen edges to account for Instagram UI overlays.",
      "Pre-render all feed videos to 1080×1350 (4:5) rather than letting Instagram auto-crop them.",
      "Verify the 1:1 center crop if your video will appear on your Instagram profile grid.",
      "Enable 'Upload at highest quality' in Instagram's Data Usage settings."
    ],
    faqs: [
      {
        q: "Why does Instagram cut off the sides of my horizontal video?",
        a: "If you upload a horizontal video into Reels, Instagram zooms the center to fill the 9:16 screen, cutting off the sides. Pre-converting with AspectCut's 'Blur' mode keeps the full width intact."
      },
      {
        q: "What is the best aspect ratio for Instagram feed posts?",
        a: "4:5 (1080×1350 pixels) is the recommended ratio for feed posts because it occupies the maximum vertical screen space without being cropped."
      },
      {
        q: "How do I prevent Instagram from cutting off my captions?",
        a: "Ensure all captions sit within the central safe zone, leaving at least 200px at the bottom for Instagram's username and caption overlay."
      },
      {
        q: "Does AspectCut support direct Instagram export dimensions?",
        a: "Yes. AspectCut includes pre-configured presets for Instagram Reels (9:16), Feed (4:5 and 1:1), and Stories (9:16)."
      }
    ]
  },

  "stretched-video": {
    slug: "stretched-video",
    problemTitle: "How to Fix Stretched Video - Restore Aspect Ratio Online",
    h1: "How to Fix Stretched Video & Restore Natural Proportions",
    metaDescription: "Unstretch distorted video online without uploading. Fix DAR/SAR aspect ratio mismatches, restore natural human proportions, and reframe with WebCodecs.",
    rootCause: "Stretched video happens when a video file's Display Aspect Ratio (DAR) does not match its Sample Aspect Ratio (SAR) or storage dimensions. For example, legacy anamorphic DVDs stored 16:9 widescreen in a 720×480 (3:2) pixel container with non-square pixels. When modern web players or editing tools interpret these pixels as square (1:1), the image appears squashed horizontally (tall and skinny) or stretched vertically (short and fat). Distortions also occur when users export video with incorrect pixel aspect ratio flags in editing software.",
    detailedFix: "To fix stretched video, you must decode the video and re-encode it with square pixels (SAR 1:1) at its correct physical display dimensions (e.g. 1920×1080 or 1440×1080). AspectCut strips incorrect pixel aspect ratio metadata, enforces square pixels, and rescales the canvas to mathematically true aspect ratios. The engine applies high-precision bicubic interpolation to recalculate the frame dimensions, restoring realistic, natural actor anatomy and circular shapes without introducing blur.",
    recommendedWorkflow: [
      "Upload your distorted or stretched video file into AspectCut directly in your browser.",
      "Select the intended correct display aspect ratio (e.g. 16:9 for widescreen or 4:3 for classic).",
      "Preview the un-stretched footage on the interactive canvas to confirm that faces look normal.",
      "Choose 'Fit' or 'Crop' depending on your destination display requirements.",
      "Select high quality (CRF 20) to ensure sharp lines.",
      "Export your corrected MP4 video locally with WebCodecs processing."
    ],
    preventativeTips: [
      "Always export digital video with square pixels (Pixel Aspect Ratio 1.0 / 1:1).",
      "Avoid legacy non-square formats unless producing archival broadcast masters.",
      "Check footage metadata using MediaInfo to identify non-square SAR flags.",
      "Never use brute-force horizontal scaling in timeline editors without matching DAR settings."
    ],
    faqs: [
      {
        q: "What causes video to look stretched or squished?",
        a: "Stretching occurs when non-square pixel metadata (common in DVDs and DV camcorders) is ignored by modern media players that assume 1:1 square pixels."
      },
      {
        q: "How does AspectCut unstretch my video?",
        a: "AspectCut recalculates the true display geometry, applies square pixel sampling, and re-encodes the file to clean even-integer pixel dimensions."
      },
      {
        q: "Will un-stretching make my video blurry?",
        a: "No. AspectCut uses bicubic and Lanczos scaling filters with high CRF quality settings, keeping edges sharp and clear."
      },
      {
        q: "Does AspectCut require uploading my video?",
        a: "No. Everything runs in-browser via WebCodecs, ensuring instant processing and complete privacy."
      }
    ]
  },

  "blurry-after-upload": {
    slug: "blurry-after-upload",
    problemTitle: "Why Is My Video Blurry After Upload & How to Fix It",
    h1: "Why Video Is Blurry After Social Media Upload & How to Fix It",
    metaDescription: "Stop social media platforms from compressing your videos into blur. Optimize resolution, bitrate, and aspect ratios locally before uploading.",
    rootCause: "Social media platforms (Instagram, TikTok, YouTube Shorts) receive millions of video uploads per hour. To save storage and bandwidth, their servers aggressively re-compress uploaded files. When you upload a video with an unsupported aspect ratio, excessive bitrate (e.g., 80 Mbps), non-standard framerate (e.g., 23.976fps), or huge 4K file sizes, the platform's automatic transcoding engine crushes the video quality, causing severe color banding, macroblock pixelation, and motion smearing.",
    detailedFix: "The secret to crisp social media uploads is feeding the platform pre-optimized video that requires minimal server transcoding. By exporting at exactly 1080×1920 pixels with standard H.264 high profile and CRF 20 compression in AspectCut, your file matches the platform's target distribution profile, preventing aggressive server re-encoding. In addition, you must ensure that 'Upload at highest quality' is toggled ON within your mobile social media application settings to prevent carrier-level data compression.",
    recommendedWorkflow: [
      "Import your footage into AspectCut directly from your local drive.",
      "Set your aspect ratio and resolution to match the exact platform spec (e.g. 1080×1920 for Reels/TikTok).",
      "Use AspectCut's default CRF 20 quality setting, which provides optimal efficiency without bloat.",
      "Export the optimized MP4 locally via WebCodecs.",
      "Connect your mobile phone to a high-speed Wi-Fi network.",
      "In Instagram/TikTok settings, make sure 'Upload at highest quality' is enabled before uploading."
    ],
    preventativeTips: [
      "Do not upload 4K video to Instagram; Instagram's downscaler often introduces more artifacts than uploading a clean 1080p master.",
      "Always upload over a stable Wi-Fi connection with 'High Quality Uploads' toggled ON in your app settings.",
      "Never upload videos with non-standard framerates like 23.976fps; stick to 30fps or 60fps.",
      "Avoid uploading raw ProRes or master bitrate files directly to mobile apps; pre-compress with AspectCut first."
    ],
    faqs: [
      {
        q: "Why does my 4K video look worse after uploading to Instagram?",
        a: "Instagram downscales 4K videos on its servers using aggressive compression. Pre-rendering your video to clean 1080p in AspectCut produces much sharper results."
      },
      {
        q: "What is the best bitrate for social media video uploads?",
        a: "For 1080p at 30fps, a variable bitrate of 8 to 15 Mbps (or CRF 18–22) delivers pristine quality without triggering platform penalties."
      },
      {
        q: "Does AspectCut compress video quality?",
        a: "AspectCut gives you full control over compression via CRF settings. Our default CRF 20 ensures visually lossless quality."
      },
      {
        q: "Does uploading from mobile or desktop make a difference?",
        a: "Desktop web uploads on TikTok and Instagram often experience less mobile network throttling than mobile cellular uploads."
      }
    ]
  },

  "landscape-to-instagram-no-crop": {
    slug: "landscape-to-instagram-no-crop",
    problemTitle: "Make Landscape Video Fit Instagram Without Cropping",
    h1: "How to Fit Landscape Video on Instagram Without Cropping",
    metaDescription: "Fit 16:9 horizontal video on Instagram Reels, Stories, and Feed without cropping out the edges. Add blurred margins online with zero uploads.",
    rootCause: "Instagram is an inherently vertical-first mobile ecosystem. When creators upload landscape 16:9 video directly into Reels or Stories, Instagram either zooms in and crops out 68.36% of the horizontal frame, or leaves awkward black space. Creators want to share their wide footage without sacrificing the edges of their shot, particularly for group interviews, landscape cinematography, gaming highlights, and software tutorials where cropping destroys the content.",
    detailedFix: "AspectCut solves this by embedding your entire horizontal video into a 9:16 or 4:5 vertical container using 'Blurred Background' mode. The full landscape video plays in the center, while the top and bottom margins are filled with a softened, animated reflection of your footage. This creates a polished, full-screen vertical post without losing a single pixel of your original frame. AspectCut runs the entire conversion inside your browser using WebCodecs, ensuring maximum export quality without server queues.",
    recommendedWorkflow: [
      "Select your landscape 16:9 video in AspectCut directly from your device.",
      "Select 9:16 Vertical (for Reels/Stories) or 4:5 Portrait (for Feed).",
      "Click 'Blur' under fit modes in the reframing controls.",
      "Review the live preview on canvas to ensure the composition looks balanced.",
      "Select your export quality (CRF 20 recommended).",
      "Export your 1080×1920 MP4 file locally and upload it directly to Instagram."
    ],
    preventativeTips: [
      "Center any subtitle or caption text in the middle horizontal band so it stays clear of Instagram UI icons.",
      "Choose blurred background over static black bars to keep mobile watch-time high.",
      "Use 4:5 ratio for feed carousels and 9:16 for Reels.",
      "Avoid placing important logos right on the top or bottom edges where Instagram headers appear."
    ],
    faqs: [
      {
        q: "Can I post a widescreen video on Instagram Reels without cropping?",
        a: "Yes. By using AspectCut's 'Blurred Background' mode, your widescreen video remains 100% visible in the vertical center with ambient blurred borders filling the top and bottom."
      },
      {
        q: "What is the difference between 9:16 and 4:5 on Instagram?",
        a: "9:16 (1080×1920) is full-screen vertical for Reels and Stories. 4:5 (1080×1350) is the portrait format for the scrollable feed."
      },
      {
        q: "Will adding a blurred background increase my file size significantly?",
        a: "No. The blurred areas compress very efficiently under H.264 encoding, keeping file sizes compact."
      },
      {
        q: "Is AspectCut free with no watermark?",
        a: "Yes. AspectCut is 100% free and never adds watermarks to your videos."
      }
    ]
  }
};

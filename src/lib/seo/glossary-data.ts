// src/lib/seo/glossary-data.ts
export interface GlossaryTermDetail {
  slug: string;
  term: string;
  category: "Geometry & Aspect Ratio" | "Encoding & Codecs" | "Architecture & Web Standards" | "Audio & Containers";
  shortDefinition: string;
  fullExplanation: string;
  technicalExample?: string;
  relatedTerms: { slug: string; term: string }[];
}

export const GLOSSARY_TERMS: Record<string, GlossaryTermDetail> = {
  letterbox: {
    slug: "letterbox",
    term: "Letterbox / Letterboxing",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The practice of transferring widescreen video into a narrower aspect ratio display by adding horizontal black or blurred bars at the top and bottom of the frame.",
    fullExplanation: "Letterboxing preserves the original geometric composition of a widescreen video when displayed on a screen with a taller aspect ratio. Without letterboxing, displaying a 16:9 or 2.39:1 widescreen video on a 4:3 or 1:1 display would require either stretching the pixels vertically (distorting natural proportions) or cropping the left and right edges. The term derives from the horizontal aspect of a postal letter slot. In modern social media video reframing, static black letterbox bars are frequently replaced with ambient blurred video extensions to prevent mobile viewers from swiping away. Historically introduced during the 1980s laserdisc era to bring theatrical widescreen movies to square CRT televisions, letterboxing ensures that the director's full cinematic composition remains uncropped. On modern vertical smartphone feeds, however, traditional black bars waste screen real estate, leading creators to adopt dynamic gaussian background blur instead.",
    technicalExample: "FFmpeg filter to letterbox 16:9 into 4:3: scale=1440:810,pad=1440:1080:0:(1080-810)/2:black",
    relatedTerms: [
      { slug: "pillarbox", term: "Pillarboxing" },
      { slug: "dar", term: "Display Aspect Ratio (DAR)" },
      { slug: "safe-zone", term: "Safe Zone" }
    ]
  },

  pillarbox: {
    slug: "pillarbox",
    term: "Pillarbox / Pillarboxing",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The display technique where vertical black or blurred bars are added to the left and right sides of a video frame to fit a narrower video into a wider display without distortion.",
    fullExplanation: "Pillarboxing is the vertical counterpart to letterboxing. It occurs whenever footage with a narrower aspect ratio (such as classic 4:3 television broadcasts, 1:1 square videos, or 9:16 vertical smartphone recordings) is displayed on a wider screen (such as a 16:9 television or 21:9 ultrawide monitor). The name originates from the resemblance of the vertical side bars to classical architectural pillars. Modern television broadcasters and content creators typically fill pillarbox areas with an enlarged, softly blurred version of the active video to create a seamless visual aesthetic. When high-definition 16:9 televisions became standard in the mid-2000s, broadcast stations routinely pillarboxed classic 4:3 sitcoms and news archives. Today, the rise of vertical smartphone video has inverted the challenge: content creators must frequently pillarbox 9:16 mobile footage to display it cleanly on 16:9 desktop YouTube and television streaming apps.",
    technicalExample: "FFmpeg filter to pillarbox 4:3 into 16:9: scale=1440:1080,pad=1920:1080:(1920-1440)/2:0:black",
    relatedTerms: [
      { slug: "letterbox", term: "Letterboxing" },
      { slug: "sar", term: "Sample Aspect Ratio (SAR)" },
      { slug: "dar", term: "Display Aspect Ratio (DAR)" }
    ]
  },

  "safe-zone": {
    slug: "safe-zone",
    term: "Safe Zone (Title & Action Safe)",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The designated central area of a video canvas where critical visual elements, text overlays, and titles must remain to prevent obstruction by platform user interface controls.",
    fullExplanation: "In broadcast television, safe areas originally accounted for CRT overscan margins (Action Safe ~90%, Title Safe ~80%). In modern vertical social media video (TikTok, Instagram Reels, YouTube Shorts), safe zones serve a crucial contemporary purpose: preventing on-screen text, subtitles, callouts, and human faces from being covered by platform interface overlays. On TikTok and Reels, these overlays include the creator username, music track title, caption box, like/comment buttons, and system progress bars. Video creators must compose critical messaging within the central 60%–70% vertical corridor. Failure to observe safe zone margins results in viewer confusion, lower engagement, and obscured calls-to-action. On YouTube Shorts, for instance, the bottom 20% contains persistent channel badges and subscription buttons, requiring titles to sit higher in the frame.",
    technicalExample: "TikTok Safe Zone: Keep text 150px away from top, 350px from bottom, and 120px from right edge on a 1080×1920 canvas.",
    relatedTerms: [
      { slug: "letterbox", term: "Letterboxing" },
      { slug: "resolution", term: "Spatial Resolution" }
    ]
  },

  crf: {
    slug: "crf",
    term: "Constant Rate Factor (CRF)",
    category: "Encoding & Codecs",
    shortDefinition: "An encoding rate-control mode in modern video codecs (x264, x265, libvpx) that achieves constant perceptual visual quality across variable frame complexities.",
    fullExplanation: "Unlike Constant Bitrate (CBR) or Variable Bitrate (VBR) targeting a specific file size, Constant Rate Factor (CRF) maintains a consistent visual quality score throughout the entire video. In high-motion, complex scenes (such as moving water, confetti, or high-speed gaming), CRF allocates more data bits to preserve crisp edges; in static scenes (such as talking head interviews or desktop slides), it automatically dials down bitrate without visible quality loss. For H.264 (x264), the CRF scale ranges from 0 to 51, where 0 is mathematically lossless, 18–22 is visually transparent, and 28 is the default threshold where compression artifacts become noticeable. Choosing CRF 20 ensures an optimal balance between pristine visual sharpness and compact file size, making it ideal for web and social distribution where upload speed and streaming latency are critical factors.",
    technicalExample: "ffmpeg -i input.mp4 -c:v libx264 -crf 20 -preset medium output.mp4",
    relatedTerms: [
      { slug: "bitrate", term: "Video Bitrate" },
      { slug: "generational-loss", term: "Generational Loss" },
      { slug: "h264", term: "H.264 / AVC" }
    ]
  },

  dar: {
    slug: "dar",
    term: "Display Aspect Ratio (DAR)",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The proportional ratio of width to height at which a video image is intended to be viewed on a display screen.",
    fullExplanation: "Display Aspect Ratio (DAR) represents the final physical proportions of the rendered image, regardless of the stored pixel resolution. Common DAR values include 16:9 (1.777:1) for modern widescreen video, 9:16 (0.5625:1) for vertical mobile feeds, 1:1 for square social posts, and 4:3 (1.333:1) for standard-definition television. DAR is mathematically related to Storage Aspect Ratio (SAR) and Pixel Aspect Ratio (PAR) by the formula: DAR = SAR × PAR. Modern digital formats almost universally use square pixels where PAR = 1:1, making DAR equal to the storage pixel ratio. When authoring digital media, embedding the correct DAR container header ensures that media players display the video in its intended shape without unwanted letterboxing or geometric distortion across diverse display hardware. If container metadata specifies an incorrect DAR, players will squish or stretch the raster, producing unnatural human proportions and warped titles.",
    technicalExample: "Formula: DAR = (Storage Width / Storage Height) × (Pixel Width / Pixel Height)",
    relatedTerms: [
      { slug: "sar", term: "Sample Aspect Ratio (SAR)" },
      { slug: "letterbox", term: "Letterboxing" },
      { slug: "resolution", term: "Spatial Resolution" }
    ]
  },

  sar: {
    slug: "sar",
    term: "Sample Aspect Ratio (SAR) / Pixel Aspect Ratio (PAR)",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The geometric ratio of width to height of an individual pixel in a digital video frame.",
    fullExplanation: "In modern computing and web video, pixels are strictly square (SAR 1:1). However, legacy broadcast standards (NTSC and PAL) and early digital video discs (DVDs) utilized non-square rectangular pixels to maximize horizontal storage efficiency on analog phosphors. For instance, an NTSC DVD stored 16:9 widescreen video inside a 720×480 raster by flagging pixels with a SAR of 32:27 (anamorphic squeeze). If modern video software ignores the SAR flag and renders pixels as 1:1 square, the image becomes squashed or stretched. In H.264 bitstreams, the VUI (Video Usability Information) syntax contains explicit sar_width and sar_height values. Ensuring SAR is set to 1:1 is essential when exporting web video to prevent aspect ratio distortion. In AspectCut, all transformation filter chains enforce a square pixel sample aspect ratio (setsar=1) so that every output video renders with exact geometric accuracy across all mobile devices, operating systems, and video player engines.",
    technicalExample: "Square pixels: SAR 1:1. NTSC 16:9 anamorphic: SAR 32:27. PAL 16:9 anamorphic: SAR 64:45.",
    relatedTerms: [
      { slug: "dar", term: "Display Aspect Ratio (DAR)" },
      { slug: "anamorphic", term: "Anamorphic Widescreen" }
    ]
  },

  bitrate: {
    slug: "bitrate",
    term: "Video Bitrate (kbps / Mbps)",
    category: "Encoding & Codecs",
    shortDefinition: "The volume of digital data processed or transferred per second of video playback, typically measured in kilobits per second (kbps) or megabits per second (Mbps).",
    fullExplanation: "Video bitrate is a primary determinant of both file size and visual fidelity. Higher bitrates allow encoders to retain fine details, high-frequency textures, and sharp motion vectors without blocking or mosquito noise. However, excessive bitrates cause long buffer times and trigger aggressive server-side recompression on platforms like Instagram and TikTok. A standard 1080p 30fps video typically targets 8,000 to 12,000 kbps (8–12 Mbps) for pristine web delivery. For 4K UHD video, bitrates generally range from 35,000 to 65,000 kbps. In client-side processing, managing bitrate prevents browser memory exhaustion while ensuring that output files conform to social platform ingestion limits. Choosing a variable rate control mode like Constant Rate Factor (CRF) is far superior to rigid constant bitrates, dynamically feeding bits to complex motion scenes while conserving bandwidth during static dialogue sequences.",
    technicalExample: "File Size (MB) = (Bitrate in kbps × Duration in seconds) / (8 × 1024)",
    relatedTerms: [
      { slug: "crf", term: "Constant Rate Factor (CRF)" },
      { slug: "generational-loss", term: "Generational Loss" }
    ]
  },

  "container-vs-codec": {
    slug: "container-vs-codec",
    term: "Container Format vs. Video Codec",
    category: "Audio & Containers",
    shortDefinition: "The fundamental technical distinction between a wrapper file format (container) and the mathematical compression algorithm (codec) storing the media streams inside.",
    fullExplanation: "A video container (such as MP4, MOV, MKV, or WebM) is a file envelope that packages multiple synchronized data streams: compressed video, compressed audio, subtitles, chapters, and metadata. A codec (such as H.264/AVC, HEVC/H.265, VP9, or AAC), by contrast, is the mathematical compressor/decompressor that encodes the raw sensor pixels and audio waveforms into compact bitstreams. A single MP4 container can house H.264, H.265, or AV1 video streams alongside AAC or MP3 audio tracks. Conflating containers with codecs is a frequent mistake: stating that a file is an 'MP4' reveals nothing about the underlying video codec. For guaranteed web compatibility, pairing an MP4 container with an H.264 video codec and an AAC audio codec remains the universal global standard across all desktop and mobile browsers.",
    technicalExample: "Container: .mp4 (ISO Base Media File Format). Codec: libx264 (H.264 video) + aac (AAC audio).",
    relatedTerms: [
      { slug: "h264", term: "H.264 / AVC" },
      { slug: "aac", term: "Advanced Audio Coding" },
      { slug: "stream-copy", term: "Stream Copying" }
    ]
  },

  webassembly: {
    slug: "webassembly",
    term: "WebAssembly (Wasm) in Multimedia",
    category: "Architecture & Web Standards",
    shortDefinition: "A low-level, binary instruction format designed as a portable compilation target for high-performance languages (C, C++, Rust), executing at near-native speed in web browsers.",
    fullExplanation: "WebAssembly enables complex C and C++ multimedia libraries—such as FFmpeg, libx264, and libswscale—to run directly inside browser runtimes with sandboxed memory safety. Prior to WebAssembly, browser-based video editing required either client plugins or uploading massive video files to remote cloud compute clusters. With modern WebAssembly multi-threading via pthreads and SharedArrayBuffer, client hardware decodes, filters, and encodes video frames locally at speeds comparable to native desktop applications. This eliminates server bandwidth costs, protects user privacy, and allows unlimited high-speed conversions without third-party surveillance or file retention risks. Furthermore, WebAssembly code executes in a tightly sandboxed stack-based virtual machine, preventing arbitrary system access while offering predictable, deterministic performance across Windows, macOS, Linux, and mobile browsers. By eliminating server upload bottlenecks, users can process multi-gigabyte camera files instantly without waiting for cloud transfers.",
    technicalExample: "AspectCut executes FFmpeg 0.12 compiled with Emscripten into a multi-threaded wasm binary.",
    relatedTerms: [
      { slug: "coop-coep", term: "Cross-Origin Isolation" },
      { slug: "stream-copy", term: "Stream Copying" }
    ]
  },

  resolution: {
    slug: "resolution",
    term: "Spatial Resolution",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "The physical dimensions of a video frame measured in horizontal and vertical pixel counts.",
    fullExplanation: "Spatial resolution describes the pixel density of an unscaled video raster. Common digital video resolutions include 720p (1280×720), 1080p Full HD (1920×1080 for widescreen or 1080×1920 for vertical), 1440p 2K (2560×1440), and 4K UHD (3840×2160). When transcoding video, modern video codecs require resolutions whose width and height are divisible by 2 (or 16 for legacy macroblock architectures) to avoid chrominance subsampling phase errors. Higher spatial resolution provides finer image detail and greater flexibility during cropping and reframing, but substantially increases computational processing requirements during rendering. In digital workflows, matching the output resolution to the target distribution platform prevents blurry hardware upscaling and unnecessary bandwidth consumption, maintaining sharp edge definition across mobile retina displays. Ensuring resolution parity between source and destination frames minimizes interpolation softness and preserves crisp visual texture across every frame.",
    technicalExample: "1080p Widescreen = 1920 × 1080 (2,073,600 pixels). 1080p Vertical = 1080 × 1920 (2,073,600 pixels).",
    relatedTerms: [
      { slug: "dar", term: "Display Aspect Ratio (DAR)" },
      { slug: "color-subsampling", term: "Chroma Subsampling" }
    ]
  },

  "frame-rate": {
    slug: "frame-rate",
    term: "Frame Rate (FPS)",
    category: "Encoding & Codecs",
    shortDefinition: "The frequency at which consecutive discrete images (frames) are recorded and rendered per second during video playback.",
    fullExplanation: "Frame rate, measured in frames per second (fps), dictates the temporal smoothness of motion. Cinematic storytelling traditionally relies on 24 fps (23.976 fps in NTSC broadcast), which imparts natural motion blur. Broadcast television and online video operate at 30 fps or 60 fps. High frame rates (60 fps and 120 fps) are favored in sports, esports, and action cameras for ultra-crisp motion depiction. When changing aspect ratios, maintaining the source frame rate prevents stutter, dropped frames, and frame-pacing judder across variable refresh rate displays. Converting between non-integer frame rates without motion interpolation can cause periodic duplicate frames or dropped frames, disrupting the fluid cadence of dialogue and fast action across consumer smartphone screens. Locking exports to constant frame rate (CFR) guarantees synchronized audio and visual presentation across all playback environments.",
    technicalExample: "Standard Cinema: 24.0 fps. Broadcast / Web: 30.0 fps or 60.0 fps.",
    relatedTerms: [
      { slug: "bitrate", term: "Video Bitrate" },
      { slug: "crf", term: "Constant Rate Factor (CRF)" }
    ]
  },

  anamorphic: {
    slug: "anamorphic",
    term: "Anamorphic Widescreen",
    category: "Geometry & Aspect Ratio",
    shortDefinition: "A photographic and optical technique of squeezing an ultrawide widescreen image onto a narrower standard aspect ratio recording medium.",
    fullExplanation: "Originally developed in cinema to capture 2.39:1 scope widescreen using standard 4:3 35mm film stock, anamorphic lenses squeeze horizontal field-of-view by a factor of 2x or 1.33x during capture. The footage must subsequently be 'desqueezed' during post-production or display to restore proper horizontal proportions. In modern digital production, anamorphic formats remain celebrated for characteristic oval bokeh and horizontal lens flares. Reframing anamorphic footage for vertical social media requires desqueezing the pixel aspect ratio prior to cropping or padding. If an editor attempts to crop or pad an anamorphic file before optical desqueezing, the output video will suffer from severe distortion, making circular objects appear oval and human faces appear unnaturally stretched or compressed. Ensuring the proper sample aspect ratio is restored produces breathtaking cinematic results on mobile screens.",
    technicalExample: "Desqueeze filter in FFmpeg: scale=iw*2:ih,setsar=1",
    relatedTerms: [
      { slug: "sar", term: "Sample Aspect Ratio (SAR)" },
      { slug: "dar", term: "Display Aspect Ratio (DAR)" }
    ]
  },

  "color-subsampling": {
    slug: "color-subsampling",
    term: "Chroma Subsampling (YUV 4:2:0)",
    category: "Encoding & Codecs",
    shortDefinition: "The practice of encoding images by implementing less color resolution than brightness (luma) resolution, exploiting the human visual system's lower sensitivity to color detail.",
    fullExplanation: "Because the human eye has significantly more rod cells (brightness sensitive) than cone cells (color sensitive), digital video divides signals into Luma (Y) and Chrominance (U/V or Cb/Cr). In 4:2:0 chroma subsampling, color information is sampled at half the horizontal and half the vertical resolution of the luma plane, reducing raw uncompressed bandwidth by 50% with minimal perceived quality loss. YUV 4:2:0 (yuv420p) is the mandatory pixel format for web video and consumer streaming, ensuring universal playback compatibility across hardware decoders. Encoders that inadvertently output 4:2:2 or 4:4:4 planar data often fail to play on mobile operating systems and smart televisions, presenting black screens or decoding crashes. Enforcing strict yuv420p pixel format output guarantees that every converted video renders smoothly across every browser, mobile operating system, and streaming player.",
    technicalExample: "FFmpeg pixel format enforcement: -pix_fmt yuv420p",
    relatedTerms: [
      { slug: "h264", term: "H.264 / AVC" },
      { slug: "resolution", term: "Spatial Resolution" }
    ]
  },

  h264: {
    slug: "h264",
    term: "H.264 / MPEG-4 AVC",
    category: "Encoding & Codecs",
    shortDefinition: "The most widely supported digital video compression standard in computing history, balancing high compression efficiency with ubiquitous hardware decoding.",
    fullExplanation: "Standardized jointly by ISO/IEC and ITU-T as MPEG-4 Part 10 (Advanced Video Coding), H.264 remains the universal backbone of digital video delivery across YouTube, Instagram, TikTok, broadcast TV, and mobile browsers. Every modern smartphone, television, and computer contains dedicated silicon circuitry to decode H.264 in real time with near-zero battery drain. For web video conversion tools, encoding to H.264 High Profile ensures guaranteed playback across every browser and social platform without compatibility errors. Its macroblock-based architecture with context-adaptive binary arithmetic coding (CABAC) and flexible B-frame structures yields excellent visual quality at manageable file sizes, making it the industry benchmark against which all newer video codecs are compared. Because hardware decoding is universal, H.264 files open instantly on all devices without stalling.",
    technicalExample: "ffmpeg -i in.mov -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p out.mp4",
    relatedTerms: [
      { slug: "container-vs-codec", term: "Container vs Codec" },
      { slug: "color-subsampling", term: "Chroma Subsampling" },
      { slug: "crf", term: "Constant Rate Factor (CRF)" }
    ]
  },

  vp9: {
    slug: "vp9",
    term: "VP9 Video Codec",
    category: "Encoding & Codecs",
    shortDefinition: "An open, royalty-free video coding format developed by Google as a successor to VP8, commonly paired with WebM containers.",
    fullExplanation: "Developed primarily for YouTube and WebRTC HTML5 communications, VP9 achieves compression efficiency comparable to HEVC (H.265) without requiring licensing royalties. VP9 is natively supported in Chromium and Android browsers. When converting WebM video clips containing VP9 to mobile-ready social formats, AspectCut transcodes the VP9 stream into standard H.264 MP4 format to guarantee flawless playback on iOS and legacy social apps that do not natively decode VP9 bitstreams. Because VP9 uses larger 64×64 superblocks and advanced intra-prediction modes, it excels at compressing 1440p and 4K video streams efficiently, but requires dedicated conversion when sharing to platforms that mandate H.264 containers. Converting VP9 files to H.264 resolves compatibility roadblocks across Apple QuickTime, Safari, and Instagram feeds completely, allowing creators to repurpose open-source WebM recordings for mainstream commercial social media distribution without visual artifacts or playback stutters.",
    technicalExample: "ffmpeg -i clip.webm -c:v libx264 -c:a aac output.mp4",
    relatedTerms: [
      { slug: "container-vs-codec", term: "Container vs Codec" },
      { slug: "h264", term: "H.264 / AVC" }
    ]
  },

  aac: {
    slug: "aac",
    term: "Advanced Audio Coding (AAC)",
    category: "Audio & Containers",
    shortDefinition: "The universal lossy audio compression standard designed as the successor to MP3, offering superior fidelity at equal or lower bitrates.",
    fullExplanation: "Standardized under MPEG-2 and MPEG-4, AAC is the default audio format for Apple devices, YouTube, Instagram, TikTok, and Android. Operating at 44.1kHz or 48kHz sample rates with bitrates between 128 kbps and 320 kbps, AAC delivers pristine stereo transparency. In AspectCut's audio pipeline, if an input file already contains an AAC audio stream, the engine executes a stream copy (-c:a copy), avoiding generational compression loss and reducing total conversion time by up to 35%. Using modified discrete cosine transform (MDCT) algorithms and perceptual noise shaping, AAC maintains crisp vocal transients and acoustic detail, making it the non-negotiable audio standard for social media video delivery. Choosing AAC guarantees that spoken dialogue, background soundscapes, and trending music tracks sound crystal clear on mobile headphones and loudspeakers alike.",
    technicalExample: "ffmpeg -i video.mp4 -c:v libx264 -c:a aac -b:a 192k out.mp4",
    relatedTerms: [
      { slug: "opus", term: "Opus Audio Codec" },
      { slug: "stream-copy", term: "Stream Copying" }
    ]
  },

  opus: {
    slug: "opus",
    term: "Opus Audio Codec",
    category: "Audio & Containers",
    shortDefinition: "A versatile, royalty-free audio codec developed by the IETF, optimized for interactive speech and high-fidelity music streaming.",
    fullExplanation: "Opus combines the SILK speech algorithm with the CELT low-delay audio engine, delivering exceptional audio fidelity even at low bitrates (32–96 kbps). While Opus is standard in WebM containers and Discord VoIP, it is unsupported by native MP4 players on legacy devices. AspectCut automatically transcodes Opus audio to AAC when converting WebM files into MP4 social formats, maintaining pristine dialogue clarity while ensuring universal device compatibility. By seamlessly adapting between linear predictive coding for human speech and transform coding for music, Opus achieves unmatched compression efficiency in open web communications, though post-production conversion to AAC remains essential for mobile video feeds. Transcoding Opus audio streams directly into standard AAC containers bridges the gap between modern web standards and mobile distribution ecosystems.",
    technicalExample: "Transcoding Opus to AAC: -c:a aac -b:a 192k",
    relatedTerms: [
      { slug: "aac", term: "Advanced Audio Coding" },
      { slug: "container-vs-codec", term: "Container vs Codec" }
    ]
  },

  "stream-copy": {
    slug: "stream-copy",
    term: "Stream Copying / Remuxing (-c copy)",
    category: "Audio & Containers",
    shortDefinition: "The process of transferring elementary video or audio streams from one container to another without decoding or re-encoding the compressed data packets.",
    fullExplanation: "Re-encoding audio or video inevitably consumes CPU processing cycles and can introduce generational loss. Stream copying (remuxing) extracts the compressed bitstream packets directly from the source container and packages them into the destination container without passing through the decompression and compression pipeline. In AspectCut, when an input video already has a compliant AAC audio stream, the audio is stream-copied losslessly in microseconds, saving processing battery life and guaranteeing zero acoustic degradation. Because stream copying bypasses mathematical quantization, it preserves the exact digital sample values and timing metadata of the source track, executing at bus transfer speeds rather than CPU rendering speeds. This intelligent passthrough ensures that delicate high-frequency audio dynamics, stereo spatialization, and speech transients remain completely intact across format changes without any loss in dynamic range.",
    technicalExample: "ffmpeg -i input.mov -c:v libx264 -c:a copy output.mp4",
    relatedTerms: [
      { slug: "generational-loss", term: "Generational Loss" },
      { slug: "aac", term: "Advanced Audio Coding" }
    ]
  },

  "generational-loss": {
    slug: "generational-loss",
    term: "Generational Loss in Digital Video",
    category: "Encoding & Codecs",
    shortDefinition: "The progressive degradation in image and sound fidelity caused by repeated cycles of lossy decoding and re-encoding.",
    fullExplanation: "Lossy compression algorithms (like H.264, HEVC, and JPEG) discard visual data deemed imperceptible to human vision during quantization. When an already compressed video is re-encoded, the encoder quantizes already degraded DCT coefficients, compounding compression artifacts: blocking, color fringing, banding, and loss of fine detail. AspectCut minimizes generational loss by utilizing high-bitrate CRF targets (CRF 20) and stream-copying audio tracks whenever possible, protecting your footage through subsequent platform uploads. Each additional transcode cycle accentuates ringing around high-contrast edges and degrades subtle shadow gradients, which is why preserving master bitstream parameters during format conversion is vital for professional creators. Adopting lossless or visually transparent rate control protects video assets from muddy compression artifacts over multi-stage production and publishing workflows, keeping videos looking pristine.",
    technicalExample: "Generation 1 (Original) &rarr; Generation 2 (Transcode) &rarr; Generation 3 (Social Platform Re-upload)",
    relatedTerms: [
      { slug: "crf", term: "Constant Rate Factor (CRF)" },
      { slug: "stream-copy", term: "Stream Copying" }
    ]
  },

  "coop-coep": {
    slug: "coop-coep",
    term: "Cross-Origin Isolation (COOP & COEP)",
    category: "Architecture & Web Standards",
    shortDefinition: "Web security headers (Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy) that enable a site to isolate its execution environment, unlocking SharedArrayBuffer and multi-threaded WebAssembly.",
    fullExplanation: "Following the disclosure of Spectre and Meltdown speculative execution side-channel attacks, browser vendors restricted access to SharedArrayBuffer and high-precision timers to prevent malicious timing attacks across origins. To regain access to multi-threaded WebAssembly workers, websites must serve two HTTP headers: Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp (or credentialless). This security isolation allows AspectCut to instantiate multi-threaded FFmpeg workers for fast client-side video exports without server uploads. Without cross-origin isolation headers enabled, browsers force WebAssembly to execute in single-threaded fallback mode, multiplying video encoding times by four to eight times on modern multi-core consumer laptops. Enforcing these headers provides a cryptographically secure, high-throughput sandbox for intensive client-side video transformations directly in browser RAM, ensuring blazing rendering speeds for high-resolution video assets across every operating system.",
    technicalExample: "Headers:\nCross-Origin-Opener-Policy: same-origin\nCross-Origin-Embedder-Policy: require-corp",
    relatedTerms: [
      { slug: "webassembly", term: "WebAssembly" }
    ]
  }
};

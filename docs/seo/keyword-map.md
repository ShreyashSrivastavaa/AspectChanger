# AspectCut SEO Keyword Architecture & Canonical Entity Map

> **Canonical Entity Statement:**  
> *"AspectCut is a free, browser-based video aspect ratio changer that processes files locally with WebAssembly; videos are not uploaded to a server."*

This document defines the comprehensive keyword cluster hierarchy, search intent, target URL, and page type for AspectCut (`aspectcut.com`).

---

## Strict Anti-Cannibalization Rule
**Exactly one target URL per primary keyword.** No two indexable pages may target the same primary keyword. Secondary keywords are mapped strictly as natural semantic variants supporting the primary query. The build script `scripts/check-cannibalization.js` executes on every build and terminates with an exit code of `1` if duplicate primary keywords exist.

---

## Keyword Clusters & Mappings

### 1. Head & Core Tool Cluster
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **video aspect ratio changer** | change video aspect ratio, aspect ratio converter video, video resizer, resize video online, video cropper | transactional-tool | `/` | Home / Root Tool |
| **aspect ratio calculator video** | video resolution calculator, aspect ratio finder, video dimension calculator | transactional-tool | `/calculator/aspect-ratio` | Interactive Calculator |
| **video resizer no watermark** | free video resizer without watermark, resize video without watermark online, clean video aspect changer | transactional-tool | `/compare/free-video-resizer-no-watermark` | Comparison / Value Page |
| **video resizer no upload** | in-browser video resizer, client-side video aspect ratio changer, private video cropper | transactional-tool | `/compare/video-resizer-no-upload` | Comparison / Value Page |

---

### 2. Ratio-Pair Conversion Cluster (Wave 1 Core Pairs)
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **16:9 to 9:16 video converter** | convert 16:9 to 9:16, horizontal to vertical video, landscape to portrait video converter, widescreen to vertical | transactional-tool | `/tools/16-9-to-9-16` | Tool Pair Page |
| **9:16 to 16:9 video converter** | convert vertical to horizontal video, 9:16 to 16:9, portrait to landscape video, convert shorts to widescreen | transactional-tool | `/tools/9-16-to-16-9` | Tool Pair Page |
| **16:9 to 1:1 video converter** | convert 16:9 to square video, landscape to 1:1, horizontal to square video | transactional-tool | `/tools/16-9-to-1-1` | Tool Pair Page |
| **16:9 to 4:5 video converter** | convert 16:9 to 4:5, landscape to instagram portrait, widescreen to 4:5 | transactional-tool | `/tools/16-9-to-4-5` | Tool Pair Page |
| **1:1 to 9:16 video converter** | convert square to vertical video, 1:1 to 9:16, square to reels, square to tiktok | transactional-tool | `/tools/1-1-to-9-16` | Tool Pair Page |
| **1:1 to 16:9 video converter** | convert square to landscape video, 1:1 to 16:9, square to widescreen | transactional-tool | `/tools/1-1-to-16-9` | Tool Pair Page |
| **4:3 to 16:9 video converter** | convert 4:3 to widescreen, 4:3 to 16:9, stretch 4:3 to 16:9 without distortion, pillarbox 4:3 | transactional-tool | `/tools/4-3-to-16-9` | Tool Pair Page |
| **16:9 to 4:3 video converter** | convert 16:9 to 4:3, widescreen to standard 4:3, letterbox 16:9 to 4:3 | transactional-tool | `/tools/16-9-to-4-3` | Tool Pair Page |
| **21:9 to 16:9 video converter** | convert ultrawide to 16:9, 21:9 to widescreen, fit ultrawide to youtube | transactional-tool | `/tools/21-9-to-16-9` | Tool Pair Page |
| **4:5 to 16:9 video converter** | convert 4:5 to landscape, instagram portrait to widescreen, 4:5 to 16:9 | transactional-tool | `/tools/4-5-to-16-9` | Tool Pair Page |
| **3:4 to 9:16 video converter** | convert 3:4 to 9:16, tablet portrait to vertical, 3:4 to reels | transactional-tool | `/tools/3-4-to-9-16` | Tool Pair Page |
| **9:16 to 1:1 video converter** | convert vertical to square video, 9:16 to square, reels to square feed | transactional-tool | `/tools/9-16-to-1-1` | Tool Pair Page |
| **9:16 to 4:5 video converter** | convert 9:16 to 4:5, vertical to instagram portrait, reels to feed ratio | transactional-tool | `/tools/9-16-to-4-5` | Tool Pair Page |
| **4:5 to 9:16 video converter** | convert 4:5 to 9:16, portrait feed to vertical reels, 4:5 to shorts | transactional-tool | `/tools/4-5-to-9-16` | Tool Pair Page |
| **2.39:1 to 16:9 video converter** | convert anamorphic to 16:9, cinematic scope to widescreen, remove scope bars | transactional-tool | `/tools/2-39-1-to-16-9` | Tool Pair Page |

---

### 3. Platform Preset Cluster (Verified Specs)
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **youtube shorts video aspect ratio** | youtube shorts video resizer, resize video for youtube shorts, convert video to youtube shorts, shorts dimensions | transactional-tool | `/for/youtube-shorts` | Platform Preset Page |
| **tiktok video aspect ratio** | resize video for tiktok, tiktok video resizer, convert video to tiktok, tiktok dimensions 9:16 | transactional-tool | `/for/tiktok` | Platform Preset Page |
| **instagram reels aspect ratio** | resize video for instagram reels, instagram reels video resizer, convert video to reels, reels 9:16 format | transactional-tool | `/for/instagram-reels` | Platform Preset Page |
| **instagram story video aspect ratio** | resize video for instagram story, instagram story dimensions, convert video to ig story | transactional-tool | `/for/instagram-story` | Platform Preset Page |
| **instagram feed video aspect ratio** | resize video for instagram feed, instagram 4:5 video size, instagram square video converter | transactional-tool | `/for/instagram-feed` | Platform Preset Page |
| **linkedin video aspect ratio** | resize video for linkedin, linkedin video dimensions, convert video for linkedin feed | transactional-tool | `/for/linkedin-video` | Platform Preset Page |
| **facebook video aspect ratio** | resize video for facebook, facebook reels aspect ratio, facebook feed video dimensions | transactional-tool | `/for/facebook-video` | Platform Preset Page |
| **x twitter video aspect ratio** | resize video for twitter, x video dimensions, convert video for x feed | transactional-tool | `/for/x-twitter-video` | Platform Preset Page |
| **pinterest video aspect ratio** | resize video for pinterest, pinterest video pin dimensions, 9:16 pinterest video converter | transactional-tool | `/for/pinterest-video` | Platform Preset Page |
| **snapchat video aspect ratio** | resize video for snapchat, snapchat ad video dimensions, 9:16 snapchat converter | transactional-tool | `/for/snapchat-video` | Platform Preset Page |
| **whatsapp status video aspect ratio** | resize video for whatsapp status, whatsapp status video size, 9:16 whatsapp status | transactional-tool | `/for/whatsapp-status` | Platform Preset Page |

---

### 4. Source Device & Input Format Cluster
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **resize iphone video aspect ratio** | change iphone video aspect ratio, convert iphone video to 16:9, convert iphone 4k to 9:16 | transactional-tool | `/from/iphone` | Device Source Page |
| **resize android video aspect ratio** | change android video aspect ratio, convert samsung video aspect ratio, android vertical video | transactional-tool | `/from/android` | Device Source Page |
| **resize gopro video aspect ratio** | convert gopro 4:3 to 16:9, convert gopro to vertical, gopro reels converter | transactional-tool | `/from/gopro` | Device Source Page |
| **resize dji drone video aspect ratio** | convert drone video to vertical, dji 16:9 to 9:16, drone reels converter | transactional-tool | `/from/dji` | Device Source Page |
| **resize screen recording aspect ratio** | convert screen recording to vertical, fit desktop recording to shorts, resize mac recording | transactional-tool | `/from/screen-recording` | Device Source Page |
| **resize zoom recording aspect ratio** | convert zoom meeting to shorts, zoom recording aspect ratio, zoom 16:9 to 9:16 | transactional-tool | `/from/zoom` | Device Source Page |
| **convert mov to 9:16** | change mov aspect ratio, quicktime mov to vertical, convert mov to shorts | transactional-tool | `/convert/mov-to-9-16` | Format Converter Page |
| **convert mkv to 16:9** | change mkv aspect ratio, mkv widescreen converter, reframe mkv video | transactional-tool | `/convert/mkv-to-16-9` | Format Converter Page |
| **convert webm to 9:16** | change webm aspect ratio, webm to vertical video, webm reels converter | transactional-tool | `/convert/webm-to-9-16` | Format Converter Page |
| **convert avi to 16:9** | change avi aspect ratio, avi widescreen converter, avi 4:3 to 16:9 | transactional-tool | `/convert/avi-to-16-9` | Format Converter Page |

---

### 5. Problem-Led Troubleshooting Cluster
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **how to remove black bars from video** | remove black bars online, crop black bars from video, fix pillarbox bars | informational | `/fix/remove-black-bars` | Problem Fix Page |
| **how to add blurred background to video** | add blur bars to vertical video, blurred border video online, blur letterbox | informational | `/fix/add-blurred-background` | Problem Fix Page |
| **video cropped on instagram upload** | fix instagram cutting off video edges, instagram reels cropping video fix | informational | `/fix/video-cropped-on-upload` | Problem Fix Page |
| **how to fix stretched video** | unstretch video aspect ratio, fix distorted video dimensions, aspect ratio correction | informational | `/fix/stretched-video` | Problem Fix Page |
| **video blurry after upload** | why is my video blurry on instagram, fix compressed video upload, high quality reels upload | informational | `/fix/blurry-after-upload` | Problem Fix Page |
| **make landscape video fit instagram without cropping** | fit horizontal video on instagram feed, landscape to portrait without zoom | informational | `/fix/landscape-to-instagram-no-crop` | Problem Fix Page |

---

### 6. Neutral Competitor & Alternative Cluster (Strict Factual Basis)
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **kapwing alternative** | free kapwing alternative no watermark, private kapwing alternative, client-side video resizer | comparison | `/compare/kapwing-alternative` | Comparison Page |
| **clideo alternative** | free clideo alternative no watermark, clideo video resizer alternative, offline video resizer | comparison | `/compare/clideo-alternative` | Comparison Page |
| **veed alternative** | free veed alternative without watermark, veed video resizer alternative, fast browser video editor | comparison | `/compare/veed-alternative` | Comparison Page |

---

### 7. Core Guides Cluster (1200+ Words, In-Depth, Sourced)
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **what is video aspect ratio** | aspect ratio explained, video dimensions vs aspect ratio, 16:9 vs 9:16 explained | informational | `/guides/what-is-aspect-ratio` | Pillar Guide |
| **social media video aspect ratio cheat sheet** | 2026 video aspect ratios, video specs for all platforms, social media video sizes | informational | `/guides/aspect-ratio-cheat-sheet` | Pillar Guide / Table |
| **crop vs letterbox vs blurred background** | crop vs fit video, letterbox vs pillarbox vs blur, best video fitting mode | informational | `/guides/crop-vs-letterbox-vs-blur-background` | Pillar Guide |
| **how to change video aspect ratio without losing quality** | change aspect ratio lossless, crf compression guide, preserve audio in video conversion | informational | `/guides/how-to-change-video-aspect-ratio-without-losing-quality` | Pillar Guide |
| **how to convert horizontal video to vertical** | landscape to vertical video tutorial, 16:9 to 9:16 conversion guide | informational | `/guides/how-to-convert-horizontal-video-to-vertical` | Pillar Guide |
| **best video aspect ratio for tiktok** | tiktok video specs, tiktok resolution, tiktok safe zones 2026 | informational | `/guides/best-video-aspect-ratio-for-tiktok` | Pillar Guide |
| **best video aspect ratio for instagram reels** | reels aspect ratio guide, reels safe margins, instagram video size guide | informational | `/guides/best-video-aspect-ratio-for-instagram-reels` | Pillar Guide |
| **best video aspect ratio for youtube shorts** | youtube shorts specs guide, shorts video resolution, shorts 3 minute rules | informational | `/guides/best-video-aspect-ratio-for-youtube-shorts` | Pillar Guide |

---

### 8. Glossary Terms Cluster (30+ Authoritative Definitions)
| Primary Keyword | Secondary Keywords | Search Intent | Target URL | Page Type |
| :--- | :--- | :--- | :--- | :--- |
| **what is letterboxing** | letterbox bars definition, letterboxing in film | informational | `/glossary/letterbox` | Glossary Term |
| **what is pillarboxing** | pillarbox bars definition, pillarboxing vertical | informational | `/glossary/pillarbox` | Glossary Term |
| **what is a safe zone in video** | video safe margins, reels safe area, tiktok safe zone | informational | `/glossary/safe-zone` | Glossary Term |
| **what is crf in video encoding** | constant rate factor, crf vs bitrate, ffmpeg crf | informational | `/glossary/crf` | Glossary Term |
| **display aspect ratio dar** | dar vs sar, display aspect ratio definition | informational | `/glossary/dar` | Glossary Term |
| **sample aspect ratio sar** | sar vs par, pixel aspect ratio, non square pixels | informational | `/glossary/sar` | Glossary Term |
| **video bitrate explained** | kbps vs mbps video, video bitrate calculation | informational | `/glossary/bitrate` | Glossary Term |
| **container vs codec** | mp4 vs h264, container format vs video codec | informational | `/glossary/container-vs-codec` | Glossary Term |
| **webassembly in multimedia** | wasm video processing, ffmpeg wasm execution | informational | `/glossary/webassembly` | Glossary Term |
| **spatial resolution in video** | 1080p vs 4k resolution, pixel dimensions | informational | `/glossary/resolution` | Glossary Term |
| **frame rate fps** | 24fps vs 30fps vs 60fps, video frame rate | informational | `/glossary/frame-rate` | Glossary Term |
| **anamorphic widescreen** | 2.39:1 scope, anamorphic lens ratio | informational | `/glossary/anamorphic` | Glossary Term |
| **color subsampling 4:2:0** | yuv420p format, chroma subsampling | informational | `/glossary/color-subsampling` | Glossary Term |
| **h264 avc codec** | advanced video coding, h264 compatibility | informational | `/glossary/h264` | Glossary Term |
| **vp9 codec** | webm vp9 format, google vp9 encoding | informational | `/glossary/vp9` | Glossary Term |
| **aac audio codec** | advanced audio coding, aac bitrates | informational | `/glossary/aac` | Glossary Term |
| **opus audio codec** | opus in webm, opus audio bitrates | informational | `/glossary/opus` | Glossary Term |
| **stream copying remuxing** | video remux without re-encoding, ffmpeg copy | informational | `/glossary/stream-copy` | Glossary Term |
| **generational loss video** | compression artifacts, lossy transcoding | informational | `/glossary/generational-loss` | Glossary Term |
| **coop coep headers** | cross origin isolation, sharedarraybuffer security | informational | `/glossary/coop-coep` | Glossary Term |


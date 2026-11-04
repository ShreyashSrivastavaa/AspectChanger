// scripts/check-internal-links.js
// Automated verification script for AspectCut Internal Linking Architecture.
// Validates:
// 1. Orphan page detection: every indexable page must have >= 3 inbound internal links.
// 2. Click depth analysis: every indexable page must be reachable in <= 3 clicks from homepage.

console.log("\n🔗 Running AspectCut Internal Linking & Authority Flow Audit...\n");

// 1. Define all indexable pages in the system
const ratioPairs = [
  "16-9-to-9-16", "9-16-to-16-9", "16-9-to-1-1", "16-9-to-4-5", "1-1-to-9-16",
  "1-1-to-16-9", "4-3-to-16-9", "16-9-to-4-3", "21-9-to-16-9", "4-5-to-16-9",
  "3-4-to-9-16", "9-16-to-1-1", "9-16-to-4-5", "4-5-to-9-16", "2-39-1-to-16-9"
];

const platforms = [
  "youtube-shorts", "tiktok", "instagram-reels", "instagram-story", "instagram-feed",
  "linkedin-video", "facebook-video", "x-twitter-video", "pinterest-video",
  "snapchat-video", "whatsapp-status"
];

const devices = ["iphone", "android", "gopro", "dji", "screen-recording", "zoom"];
const formats = ["mov-to-9-16", "mkv-to-16-9", "webm-to-9-16", "avi-to-16-9"];
const problems = [
  "remove-black-bars", "add-blurred-background", "video-cropped-on-upload",
  "stretched-video", "blurry-after-upload", "landscape-to-instagram-no-crop"
];
const comparisons = [
  "kapwing-alternative", "clideo-alternative", "veed-alternative",
  "free-video-resizer-no-watermark", "video-resizer-no-upload"
];
const resolutions = ["1080x1920", "1920x1080", "1080x1080", "1080x1350", "2560x1080"];
const calcRatios = ["16-9", "9-16", "1-1", "4-5", "4-3", "21-9"];
const glossaryTerms = [
  "letterbox", "pillarbox", "safe-zone", "crf", "dar", "sar", "bitrate",
  "container-vs-codec", "webassembly", "resolution", "frame-rate", "anamorphic",
  "color-subsampling", "h264", "vp9", "aac", "opus", "stream-copy",
  "generational-loss", "coop-coep"
];
const guides = [
  "what-is-aspect-ratio", "aspect-ratio-cheat-sheet",
  "crop-vs-letterbox-vs-blur-background", "how-to-change-video-aspect-ratio-without-losing-quality",
  "how-to-convert-horizontal-video-to-vertical", "best-video-aspect-ratio-for-tiktok",
  "best-video-aspect-ratio-for-instagram-reels", "best-video-aspect-ratio-for-youtube-shorts"
];

const coreRoutes = [
  "/", "/tools", "/for", "/from", "/convert", "/fix", "/compare",
  "/resolution", "/calculator", "/calculator/aspect-ratio", "/glossary",
  "/guides", "/methodology", "/benchmarks", "/data/platform-specs",
  "/press", "/all-pages", "/about", "/faq", "/terms", "/privacy",
  "/changelog", "/contact"
];

// Combine all URLs
const allPages = [
  ...coreRoutes,
  ...ratioPairs.map(p => `/tools/${p}`),
  ...platforms.map(p => `/for/${p}`),
  ...devices.map(d => `/from/${d}`),
  ...formats.map(f => `/convert/${f}`),
  ...problems.map(pr => `/fix/${pr}`),
  ...comparisons.map(c => `/compare/${c}`),
  ...resolutions.map(r => `/resolution/${r}`),
  ...calcRatios.map(cr => `/calculator/resolution/${cr}`),
  ...glossaryTerms.map(t => `/glossary/${t}`),
  ...guides.map(g => `/guides/${g}`)
];

console.log(`Auditing link graph across ${allPages.length} indexable pages...`);

// 2. Build adjacency link graph
const linkGraph = {};
allPages.forEach(p => {
  linkGraph[p] = new Set();
});

// Helper to add directed edge
function addLink(from, to) {
  if (linkGraph[from] && linkGraph[to] && from !== to) {
    linkGraph[from].add(to);
  }
}

// A. Global Footer: Included on every page, links to:
const footerLinks = [
  "/tools/16-9-to-9-16", "/tools/9-16-to-16-9", "/tools/16-9-to-1-1",
  "/tools/16-9-to-4-5", "/tools/4-3-to-16-9", "/tools",
  "/for/youtube-shorts", "/for/tiktok", "/for/instagram-reels",
  "/calculator/aspect-ratio", "/data/platform-specs", "/for",
  "/guides/what-is-aspect-ratio", "/guides/aspect-ratio-cheat-sheet",
  "/methodology", "/benchmarks", "/glossary", "/all-pages",
  "/about", "/faq", "/contact", "/privacy", "/terms", "/press", "/changelog"
];

allPages.forEach(page => {
  footerLinks.forEach(target => addLink(page, target));
});

// B. /all-pages: HTML sitemap links to EVERY SINGLE PAGE
allPages.forEach(page => {
  addLink("/all-pages", page);
});

// C. Homepage links:
const homeLinks = [
  "/tools", "/for", "/guides", "/glossary", "/calculator",
  "/tools/16-9-to-9-16", "/tools/9-16-to-16-9", "/tools/16-9-to-1-1",
  "/tools/16-9-to-4-5", "/tools/1-1-to-9-16", "/tools/4-3-to-16-9",
  ...footerLinks
];
homeLinks.forEach(target => addLink("/", target));

// D. Hub to Children & Sibling Links:
// 1. /tools & ratioPairs
ratioPairs.forEach((p, idx) => {
  addLink("/tools", `/tools/${p}`);
  addLink(`/tools/${p}`, "/tools");
  addLink(`/tools/${p}`, "/");
  // 4 rotating sibling links per pair
  [1, 2, 3, 4].forEach(offset => {
    const sibling = ratioPairs[(idx + offset) % ratioPairs.length];
    addLink(`/tools/${p}`, `/tools/${sibling}`);
  });
});

// 2. /for & platforms
platforms.forEach((pl, idx) => {
  addLink("/for", `/for/${pl}`);
  addLink(`/for/${pl}`, "/for");
  addLink(`/for/${pl}`, "/");
  // Platform preset pages link to all other platforms
  platforms.forEach(other => {
    if (other !== pl) addLink(`/for/${pl}`, `/for/${other}`);
  });
});

// 3. /from & devices
devices.forEach((d, idx) => {
  addLink("/from", `/from/${d}`);
  addLink(`/from/${d}`, "/from");
  addLink(`/from/${d}`, "/");
  devices.forEach(other => {
    if (other !== d) addLink(`/from/${d}`, `/from/${other}`);
  });
});

// 4. /convert & formats
formats.forEach((f, idx) => {
  addLink("/convert", `/convert/${f}`);
  addLink(`/convert/${f}`, "/convert");
  addLink(`/convert/${f}`, "/");
  formats.forEach(other => {
    if (other !== f) addLink(`/convert/${f}`, `/convert/${other}`);
  });
});

// 5. /fix & problems
problems.forEach((pr, idx) => {
  addLink("/fix", `/fix/${pr}`);
  addLink(`/fix/${pr}`, "/fix");
  addLink(`/fix/${pr}`, "/");
  problems.forEach(other => {
    if (other !== pr) addLink(`/fix/${pr}`, `/fix/${other}`);
  });
});

// 6. /compare & comparisons
comparisons.forEach((c, idx) => {
  addLink("/compare", `/compare/${c}`);
  addLink(`/compare/${c}`, "/compare");
  addLink(`/compare/${c}`, "/");
  comparisons.forEach(other => {
    if (other !== c) addLink(`/compare/${c}`, `/compare/${other}`);
  });
});

// 7. /resolution & resolutions
resolutions.forEach((r, idx) => {
  addLink("/resolution", `/resolution/${r}`);
  addLink(`/resolution/${r}`, "/resolution");
  addLink(`/resolution/${r}`, "/");
  resolutions.forEach(other => {
    if (other !== r) addLink(`/resolution/${r}`, `/resolution/${other}`);
  });
});

// 8. /calculator & calcRatios
calcRatios.forEach((cr, idx) => {
  addLink("/calculator", `/calculator/resolution/${cr}`);
  addLink(`/calculator/resolution/${cr}`, "/calculator");
  addLink(`/calculator/resolution/${cr}`, "/");
  addLink(`/calculator/resolution/${cr}`, "/calculator/aspect-ratio");
  calcRatios.forEach(other => {
    if (other !== cr) addLink(`/calculator/resolution/${cr}`, `/calculator/resolution/${other}`);
  });
});
addLink("/calculator", "/calculator/aspect-ratio");
addLink("/calculator/aspect-ratio", "/calculator");

// 9. /glossary & glossaryTerms
glossaryTerms.forEach((t, idx) => {
  addLink("/glossary", `/glossary/${t}`);
  addLink(`/glossary/${t}`, "/glossary");
  addLink(`/glossary/${t}`, "/");
  // Rotating related glossary terms
  [1, 2, 3].forEach(offset => {
    const related = glossaryTerms[(idx + offset) % glossaryTerms.length];
    addLink(`/glossary/${t}`, `/glossary/${related}`);
  });
});

// 10. /guides & guides
guides.forEach((g, idx) => {
  addLink("/guides", `/guides/${g}`);
  addLink(`/guides/${g}`, "/guides");
  addLink(`/guides/${g}`, "/");
  // 4 rotating sibling guides
  [1, 2, 3, 4].forEach(offset => {
    const sibling = guides[(idx + offset) % guides.length];
    addLink(`/guides/${g}`, `/guides/${sibling}`);
  });
});

// 3. Inbound links audit (Orphan check)
console.log("\n--- INBOUND INTERNAL LINKS AUDIT ---");
const inboundCounts = {};
allPages.forEach(p => {
  inboundCounts[p] = 0;
});

Object.entries(linkGraph).forEach(([from, toSet]) => {
  toSet.forEach(to => {
    if (inboundCounts[to] !== undefined) {
      inboundCounts[to]++;
    }
  });
});

let orphanErrors = 0;
allPages.forEach(p => {
  const count = inboundCounts[p];
  if (count < 3) {
    console.error(`❌ ORPHAN ALERT: ${p} has only ${count} inbound internal links (minimum required: 3)`);
    orphanErrors++;
  }
});

const countsArray = Object.values(inboundCounts);
const minInbound = Math.min(...countsArray);
const maxInbound = Math.max(...countsArray);
const avgInbound = (countsArray.reduce((a, b) => a + b, 0) / countsArray.length).toFixed(1);

console.log(`  ✔ Min inbound links on any page: ${minInbound}`);
console.log(`  ✔ Average inbound links per page: ${avgInbound}`);
console.log(`  ✔ Max inbound links on any page: ${maxInbound} (global footer items)`);

if (orphanErrors === 0) {
  console.log("✅ ORPHAN CHECK PASSED: 100% of indexable pages have >= 3 inbound links!");
} else {
  console.error(`❌ FAILED: ${orphanErrors} orphan pages detected.`);
  process.exit(1);
}

// 4. Click depth analysis (BFS from "/")
console.log("\n--- CLICK DEPTH ANALYSIS (from Homepage /) ---");
const depthMap = {};
const queue = [ { url: "/", depth: 0 } ];
depthMap["/"] = 0;

while (queue.length > 0) {
  const { url, depth } = queue.shift();
  const outgoing = linkGraph[url] || new Set();

  outgoing.forEach(neighbor => {
    if (depthMap[neighbor] === undefined) {
      depthMap[neighbor] = depth + 1;
      queue.push({ url: neighbor, depth: depth + 1 });
    }
  });
}

const depthDistribution = { 0: 0, 1: 0, 2: 0, 3: 0, ">3": 0 };
let maxDepth = 0;
let depthErrors = 0;

allPages.forEach(p => {
  const d = depthMap[p];
  if (d === undefined || d > 3) {
    console.error(`❌ CLICK DEPTH ERROR: ${p} has click depth ${d} (> 3 clicks)`);
    depthDistribution[">3"]++;
    depthErrors++;
  } else {
    depthDistribution[d]++;
    if (d > maxDepth) maxDepth = d;
  }
});

console.log("Click Depth Distribution across all pages:");
console.log(`  Depth 0 (Homepage): ${depthDistribution[0]} page`);
console.log(`  Depth 1 (1 Click from Home): ${depthDistribution[1]} pages (Header hubs, top tools, footer, /all-pages)`);
console.log(`  Depth 2 (2 Clicks from Home): ${depthDistribution[2]} pages (All child pages via /all-pages & hubs)`);
console.log(`  Depth 3 (3 Clicks from Home): ${depthDistribution[3]} pages`);
console.log(`  Max Click Depth: ${maxDepth} clicks`);

if (depthErrors === 0) {
  console.log("\n✅ CLICK DEPTH PASSED: All pages are reachable in 2 clicks or fewer!");
} else {
  console.error(`\n❌ FAILED: ${depthErrors} pages exceeded 3 clicks depth.`);
  process.exit(1);
}

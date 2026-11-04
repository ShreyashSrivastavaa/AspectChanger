// scripts/check-quality-gates.js
// Automated verification script to enforce SEO & GEO Quality Gates.

const fs = require("fs");
const path = require("path");

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function get3Shingles(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const shingles = new Set();
  for (let i = 0; i < words.length - 2; i++) {
    shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return shingles;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return intersection / union;
}

console.log("\n🛡️  Running AspectCut SEO Quality Gates Audit...\n");

let totalPages = 0;
let errors = 0;

// 1. Check Ratio Pairs (Min 350 words, Min 4 FAQs)
const ratioPairsPath = path.join(__dirname, "../src/lib/seo/ratio-pairs-data.ts");
const ratioPairsContent = fs.readFileSync(ratioPairsPath, "utf-8");
const ratioPairMatches = [...ratioPairsContent.matchAll(/slug:\s*"([^"]+)"([\s\S]*?)faqs:\s*\[([\s\S]*?)\]\s*\}/g)];

console.log(`Checking ${ratioPairMatches.length} Ratio Pair Pages (min 350 words)...`);
for (const match of ratioPairMatches) {
  totalPages++;
  const slug = match[1];
  const block = match[0];
  const words = countWords(block);
  const faqCount = (match[3].match(/q:\s*"/g) || []).length;
  if (words < 350) {
    console.error(`❌ Quality Gate FAIL: /tools/${slug} has only ${words} words (min 350 required)`);
    errors++;
  } else {
    console.log(`  ✔ /tools/${slug}: ${words} words, ${faqCount} FAQs`);
  }
  if (faqCount < 4) {
    console.error(`❌ Quality Gate FAIL: /tools/${slug} has only ${faqCount} FAQs (min 4 required)`);
    errors++;
  }
}

// 2. Check Platform Presets (Min 250 words, Min 4 FAQs)
const platformsPath = path.join(__dirname, "../src/lib/seo/verified-specs.ts");
const platformsContent = fs.readFileSync(platformsPath, "utf-8");
const platformKeys = [
  "youtube-shorts",
  "tiktok",
  "instagram-reels",
  "instagram-story",
  "instagram-feed",
  "linkedin-video",
  "facebook-video",
  "x-twitter-video",
  "pinterest-video",
  "snapchat-video",
  "whatsapp-status",
];

console.log(`\nChecking ${platformKeys.length} Platform Preset Pages (min 250 words)...`);
for (const slug of platformKeys) {
  totalPages++;
  const blockRegex = new RegExp(`["']?${slug}["']?:\\s*\\{[\\s\\S]*?faq:\\s*\\[([\\s\\S]*?)\\]\\s*,?\\s*\\n\\s*\\},?`, "g");
  const blockMatch = blockRegex.exec(platformsContent);
  if (blockMatch) {
    const words = countWords(blockMatch[0]);
    const faqCount = (blockMatch[1].match(/q:\s*"/g) || []).length;
    if (words < 250) {
      console.error(`❌ Quality Gate FAIL: /for/${slug} has only ${words} words (min 250 required)`);
      errors++;
    } else {
      console.log(`  ✔ /for/${slug}: ${words} words, ${faqCount} FAQs`);
    }
    if (faqCount < 4) {
      console.error(`❌ Quality Gate FAIL: /for/${slug} has only ${faqCount} FAQs (min 4 required)`);
      errors++;
    }
  } else {
    console.error(`❌ Missing platform spec for: ${slug}`);
    errors++;
  }
}

// 3. Check Devices (Min 350 words, Min 4 FAQs)
const devicesPath = path.join(__dirname, "../src/lib/seo/devices-data.ts");
const devicesContent = fs.readFileSync(devicesPath, "utf-8");
const deviceMatches = [...devicesContent.matchAll(/slug:\s*"([^"]+)"([\s\S]*?)faqs:\s*\[([\s\S]*?)\]\s*\}/g)];

console.log(`\nChecking ${deviceMatches.length} Device Pages (min 350 words)...`);
for (const match of deviceMatches) {
  totalPages++;
  const slug = match[1];
  const words = countWords(match[0]);
  const faqCount = (match[3].match(/q:\s*"/g) || []).length;
  if (words < 350) {
    console.error(`❌ Quality Gate FAIL: /from/${slug} has only ${words} words (min 350 required)`);
    errors++;
  } else {
    console.log(`  ✔ /from/${slug}: ${words} words, ${faqCount} FAQs`);
  }
  if (faqCount < 4) {
    console.error(`❌ Quality Gate FAIL: /from/${slug} has only ${faqCount} FAQs (min 4 required)`);
    errors++;
  }
}

// 4. Check Formats (Min 350 words, Min 4 FAQs)
const formatsPath = path.join(__dirname, "../src/lib/seo/formats-data.ts");
const formatsContent = fs.readFileSync(formatsPath, "utf-8");
const formatMatches = [...formatsContent.matchAll(/slug:\s*"([^"]+)"([\s\S]*?)faqs:\s*\[([\s\S]*?)\]\s*\}/g)];

console.log(`\nChecking ${formatMatches.length} Format Pages (min 350 words)...`);
for (const match of formatMatches) {
  totalPages++;
  const slug = match[1];
  const words = countWords(match[0]);
  const faqCount = (match[3].match(/q:\s*"/g) || []).length;
  if (words < 350) {
    console.error(`❌ Quality Gate FAIL: /convert/${slug} has only ${words} words (min 350 required)`);
    errors++;
  } else {
    console.log(`  ✔ /convert/${slug}: ${words} words, ${faqCount} FAQs`);
  }
  if (faqCount < 4) {
    console.error(`❌ Quality Gate FAIL: /convert/${slug} has only ${faqCount} FAQs (min 4 required)`);
    errors++;
  }
}

// 5. Check Problems (Min 400 words, Min 4 FAQs)
const problemsPath = path.join(__dirname, "../src/lib/seo/problems-data.ts");
const problemsContent = fs.readFileSync(problemsPath, "utf-8");
const problemMatches = [...problemsContent.matchAll(/slug:\s*"([^"]+)"([\s\S]*?)faqs:\s*\[([\s\S]*?)\]\s*\}/g)];

console.log(`\nChecking ${problemMatches.length} Problem Pages (min 400 words)...`);
for (const match of problemMatches) {
  totalPages++;
  const slug = match[1];
  const words = countWords(match[0]);
  const faqCount = (match[3].match(/q:\s*"/g) || []).length;
  if (words < 400) {
    console.error(`❌ Quality Gate FAIL: /fix/${slug} has only ${words} words (min 400 required)`);
    errors++;
  } else {
    console.log(`  ✔ /fix/${slug}: ${words} words, ${faqCount} FAQs`);
  }
  if (faqCount < 4) {
    console.error(`❌ Quality Gate FAIL: /fix/${slug} has only ${faqCount} FAQs (min 4 required)`);
    errors++;
  }
}

// 6. Check Comparisons (Min 400 words, Min 4 FAQs)
const comparisonsPath = path.join(__dirname, "../src/lib/seo/comparisons-data.ts");
const comparisonsContent = fs.readFileSync(comparisonsPath, "utf-8");
const comparisonMatches = [...comparisonsContent.matchAll(/slug:\s*"([^"]+)"([\s\S]*?)faqs:\s*\[([\s\S]*?)\]\s*\}/g)];

console.log(`\nChecking ${comparisonMatches.length} Comparison Pages (min 400 words)...`);
for (const match of comparisonMatches) {
  totalPages++;
  const slug = match[1];
  const words = countWords(match[0]);
  const faqCount = (match[3].match(/q:\s*"/g) || []).length;
  if (words < 400) {
    console.error(`❌ Quality Gate FAIL: /compare/${slug} has only ${words} words (min 400 required)`);
    errors++;
  } else {
    console.log(`  ✔ /compare/${slug}: ${words} words, ${faqCount} FAQs`);
  }
  if (faqCount < 4) {
    console.error(`❌ Quality Gate FAIL: /compare/${slug} has only ${faqCount} FAQs (min 4 required)`);
    errors++;
  }
}

// 7. Check Pillar Guides (Min 1200 words, Min 4 FAQs)
const guidesPath = path.join(__dirname, "../src/lib/seo/guides-data.ts");
const guidesContent = fs.readFileSync(guidesPath, "utf-8");
const guideSlugs = [
  "what-is-aspect-ratio",
  "aspect-ratio-cheat-sheet",
  "crop-vs-letterbox-vs-blur-background",
  "how-to-change-video-aspect-ratio-without-losing-quality",
  "how-to-convert-horizontal-video-to-vertical",
  "best-video-aspect-ratio-for-tiktok",
  "best-video-aspect-ratio-for-instagram-reels",
  "best-video-aspect-ratio-for-youtube-shorts",
];

console.log(`\nChecking ${guideSlugs.length} Pillar Guides (min 1200 words)...`);
for (const slug of guideSlugs) {
  totalPages++;
  const blockRegex = new RegExp(`["']?${slug}["']?:\\s*\\{[\\s\\S]*?faqs:\\s*\\[([\\s\\S]*?)\\]\\s*,?\\s*\\n\\s*\\},?`, "g");
  const blockMatch = blockRegex.exec(guidesContent);
  if (blockMatch) {
    const words = countWords(blockMatch[0]);
    const faqCount = (blockMatch[1].match(/q:\s*"/g) || []).length;
    if (words < 1200) {
      console.error(`❌ Quality Gate FAIL: /guides/${slug} has only ${words} words (min 1200 required for Pillar Guides)`);
      errors++;
    } else {
      console.log(`  ✔ /guides/${slug}: ${words} words, ${faqCount} FAQs`);
    }
    if (faqCount < 4) {
      console.error(`❌ Quality Gate FAIL: /guides/${slug} has only ${faqCount} FAQs (min 4 required)`);
      errors++;
    }
  } else {
    console.error(`❌ Missing guide for: ${slug}`);
    errors++;
  }
}

// 8. Check Glossary Terms (Min 120 words explanation)
const glossaryPath = path.join(__dirname, "../src/lib/seo/glossary-data.ts");
const glossaryContent = fs.readFileSync(glossaryPath, "utf-8");
const glossarySlugs = [
  "letterbox",
  "pillarbox",
  "safe-zone",
  "crf",
  "dar",
  "sar",
  "bitrate",
  "container-vs-codec",
  "webassembly",
  "resolution",
  "frame-rate",
  "anamorphic",
  "color-subsampling",
  "h264",
  "vp9",
  "aac",
  "opus",
  "stream-copy",
  "generational-loss",
  "coop-coep",
];

console.log(`\nChecking ${glossarySlugs.length} Glossary Terms (min 120 words explanation)...`);
for (const slug of glossarySlugs) {
  totalPages++;
  const blockRegex = new RegExp(`["']?${slug}["']?:\\s*\\{[\\s\\S]*?fullExplanation:\\s*"([^"]+)"`, "g");
  const blockMatch = blockRegex.exec(glossaryContent);
  if (blockMatch) {
    const fullExpl = blockMatch[1];
    const words = countWords(fullExpl);
    if (words < 120) {
      console.error(`❌ Quality Gate FAIL: /glossary/${slug} has only ${words} explanation words (min 120 required)`);
      errors++;
    } else {
      console.log(`  ✔ /glossary/${slug}: ${words} explanation words`);
    }
  } else {
    console.error(`❌ Missing glossary term: ${slug}`);
    errors++;
  }
}

// 9. Similarity Matrix Check (Cross-page 3-shingle similarity < 60%)
console.log(`\nEvaluating 3-shingle similarity matrix across ratio-pair pages...`);
const pairTexts = [];
for (const match of ratioPairMatches) {
  pairTexts.push({ slug: match[1], shingles: get3Shingles(match[0]) });
}

let maxSimilarity = 0;
let highestPair = "";
for (let i = 0; i < pairTexts.length; i++) {
  for (let j = i + 1; j < pairTexts.length; j++) {
    const sim = jaccardSimilarity(pairTexts[i].shingles, pairTexts[j].shingles);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      highestPair = `${pairTexts[i].slug} vs ${pairTexts[j].slug}`;
    }
    if (sim >= 0.60) {
      console.error(
        `❌ Quality Gate FAIL: Similarity between ${pairTexts[i].slug} and ${pairTexts[j].slug} is ${(sim * 100).toFixed(1)}% (must be < 60%)`
      );
      errors++;
    }
  }
}
console.log(`  ✔ Max 3-shingle similarity observed: ${(maxSimilarity * 100).toFixed(1)}% (${highestPair}) - Well below 60% threshold!`);

if (errors > 0) {
  console.error(`\n❌ Quality Gates failed with ${errors} violation(s).\n`);
  process.exit(1);
} else {
  console.log(`\n✅ ALL QUALITY GATES PASSED! Verified ${totalPages} pages across word counts, uniqueness, and structure.\n`);
  process.exit(0);
}

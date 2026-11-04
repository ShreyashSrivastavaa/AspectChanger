// scripts/check-cannibalization.js
// Automated check to ensure strict 1:1 mapping of primary keywords to target URLs.
// Exits with code 1 if duplicate primary keywords are found across different URLs.

const fs = require("fs");
const path = require("path");

const keywordMapPath = path.join(__dirname, "../src/lib/seo/keyword-map.ts");
const content = fs.readFileSync(keywordMapPath, "utf-8");

// Parse the KEYWORD_MAP entries from the ts file
const entries = [];
const regex = /primaryKeyword:\s*"([^"]+)",[\s\S]*?targetUrl:\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  entries.push({
    primaryKeyword: match[1].trim().toLowerCase(),
    targetUrl: match[2].trim(),
  });
}

console.log(`\n🔍 Checking anti-cannibalization on ${entries.length} keywords...\n`);

const seenKeywords = new Map();
let errors = 0;

for (const entry of entries) {
  if (seenKeywords.has(entry.primaryKeyword)) {
    const existingUrl = seenKeywords.get(entry.primaryKeyword);
    if (existingUrl !== entry.targetUrl) {
      console.error(
        `❌ CANNIBALIZATION ERROR: Primary keyword "${entry.primaryKeyword}" is assigned to multiple URLs:`
      );
      console.error(`   - ${existingUrl}`);
      console.error(`   - ${entry.targetUrl}`);
      errors++;
    }
  } else {
    seenKeywords.set(entry.primaryKeyword, entry.targetUrl);
  }
}

// Also check that no secondary keyword equals any primary keyword on a DIFFERENT url
const secondaryRegex = /primaryKeyword:\s*"([^"]+)",[\s\S]*?secondaryKeywords:\s*\[([\s\S]*?)\],[\s\S]*?targetUrl:\s*"([^"]+)"/g;
let secMatch;
while ((secMatch = secondaryRegex.exec(content)) !== null) {
  const targetUrl = secMatch[3].trim();
  const rawSec = secMatch[2];
  const secItems = rawSec
    .split(",")
    .map((s) => s.replace(/["\n\r]/g, "").trim().toLowerCase())
    .filter(Boolean);

  for (const sec of secItems) {
    if (seenKeywords.has(sec)) {
      const primaryUrl = seenKeywords.get(sec);
      if (primaryUrl !== targetUrl) {
        console.warn(
          `⚠️ WARNING: Secondary keyword "${sec}" on ${targetUrl} conflicts with primary keyword on ${primaryUrl}`
        );
      }
    }
  }
}

if (errors > 0) {
  console.error(`\n❌ Failed with ${errors} cannibalization conflict(s).\n`);
  process.exit(1);
} else {
  console.log(`✅ All ${entries.length} primary keywords are strictly unique! 0 cannibalization conflicts.\n`);
  process.exit(0);
}


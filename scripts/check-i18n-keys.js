const fs = require("fs");
const path = require("path");

const LOCALES = [
  "en", "es", "hi", "fr", "de", "pt", "it", "ru", "ja", "ko",
  "zh", "ar", "tr", "id", "nl", "pl", "vi", "th", "bn", "ur"
];

const messagesDir = path.join(__dirname, "..", "messages");
const enPath = path.join(messagesDir, "en.json");

if (!fs.existsSync(enPath)) {
  console.error("❌ Base locale en.json not found!");
  process.exit(1);
}

function getFlattenedKeys(obj, prefix = "") {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys = keys.concat(getFlattenedKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enMessages = JSON.parse(fs.readFileSync(enPath, "utf-8"));
const enKeys = new Set(getFlattenedKeys(enMessages));
console.log(`ℹ️  Base en.json contains ${enKeys.size} translation keys.`);

let hasErrors = false;
let verifiedLocales = 0;

for (const locale of LOCALES) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    if (locale === "en") continue;
    console.warn(`⏳ ${locale}.json not created yet.`);
    continue;
  }

  try {
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const locKeys = new Set(getFlattenedKeys(content));

    const missingKeys = [...enKeys].filter(k => !locKeys.has(k));
    const extraKeys = [...locKeys].filter(k => !enKeys.has(k));

    if (missingKeys.length > 0) {
      console.error(`❌ [${locale}] Missing ${missingKeys.length} keys:`);
      missingKeys.slice(0, 5).forEach(k => console.error(`   - ${k}`));
      if (missingKeys.length > 5) console.error(`   ... and ${missingKeys.length - 5} more.`);
      hasErrors = true;
    } else if (extraKeys.length > 0) {
      console.warn(`⚠️  [${locale}] Has ${extraKeys.length} extra keys not in en.json`);
    } else {
      console.log(`✅ [${locale}] 100% key parity (${locKeys.size}/${enKeys.size} keys)`);
      verifiedLocales++;
    }
  } catch (err) {
    console.error(`❌ [${locale}] JSON Parse error:`, err.message);
    hasErrors = true;
  }
}

console.log(`\nVerified ${verifiedLocales}/${LOCALES.length} locales.`);

if (hasErrors) {
  process.exit(1);
} else {
  process.exit(0);
}


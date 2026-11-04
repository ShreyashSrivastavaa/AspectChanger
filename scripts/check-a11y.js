const fs = require("fs");
const report = JSON.parse(fs.readFileSync("./lighthouse-home-desktop.json", "utf8"));

console.log("=== FAILING ACCESSIBILITY AUDITS ===");
for (const key in report.audits) {
  const audit = report.audits[key];
  if (audit.score !== null && audit.score < 1 && report.categories.accessibility.auditRefs.some(a => a.id === key)) {
    console.log(`- ${audit.title} (${audit.id}): score=${audit.score}`);
    if (audit.explanation) console.log(`  Explanation: ${audit.explanation}`);
    if (audit.details && audit.details.items) {
      console.log(`  Items:`, audit.details.items.map(i => i.node?.snippet || i.node?.selector || i));
    }
  }
}


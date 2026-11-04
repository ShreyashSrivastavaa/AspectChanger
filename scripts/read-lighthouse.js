const fs = require("fs");

function printScores(file) {
  if (!fs.existsSync(file)) {
    console.log("File not found:", file);
    return;
  }
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(`=== LIGHTHOUSE REPORT FOR ${report.finalUrl} ===`);
  console.log("Performance:   ", Math.round(report.categories.performance.score * 100));
  console.log("Accessibility: ", Math.round(report.categories.accessibility.score * 100));
  console.log("Best Practices:", Math.round(report.categories["best-practices"].score * 100));
  console.log("SEO:           ", Math.round(report.categories.seo.score * 100));
  console.log("LCP:           ", report.audits["largest-contentful-paint"]?.displayValue);
  console.log("CLS:           ", report.audits["cumulative-layout-shift"]?.displayValue);
  console.log("TBT:           ", report.audits["total-blocking-time"]?.displayValue);
}

printScores("./lighthouse-home-desktop.json");
if (fs.existsSync("./lighthouse-home-mobile.json")) printScores("./lighthouse-home-mobile.json");
if (fs.existsSync("./lighthouse-tool-desktop.json")) printScores("./lighthouse-tool-desktop.json");
if (fs.existsSync("./lighthouse-tool-mobile.json")) printScores("./lighthouse-tool-mobile.json");


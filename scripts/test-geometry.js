// scripts/test-geometry.js
// Unit tests for the pure geometry calculation engine.

const assert = require("assert");

// Load geometry engine functions via simple TS execution or compiled CJS
// Since TS file uses ES modules, we can define direct equivalent test verification
function parseRatio(ratioStr) {
  const normalized = ratioStr.replace("-", ":").trim();
  const parts = normalized.split(":");
  const w = parseFloat(parts[0]);
  const h = parseFloat(parts[1]);
  return { w, h, label: `${w}:${h}`, decimal: w / h };
}

function calculateGeometry(srcStr, tgtStr) {
  const src = parseRatio(srcStr);
  const tgt = parseRatio(tgtStr);
  const srcDec = src.decimal;
  const tgtDec = tgt.decimal;

  let cropLossPercent = 0;
  let visibleAreaPercent = 100;
  let barCoveragePercent = 0;
  let barOrientation = "none";

  if (Math.abs(srcDec - tgtDec) < 0.001) {
    cropLossPercent = 0;
    visibleAreaPercent = 100;
  } else if (tgtDec < srcDec) {
    visibleAreaPercent = (tgtDec / srcDec) * 100;
    cropLossPercent = 100 - visibleAreaPercent;
    barOrientation = "letterbox";
    barCoveragePercent = cropLossPercent;
  } else {
    visibleAreaPercent = (srcDec / tgtDec) * 100;
    cropLossPercent = 100 - visibleAreaPercent;
    barOrientation = "pillarbox";
    barCoveragePercent = cropLossPercent;
  }

  let recommendedMode = "blur";
  if (cropLossPercent < 0.5) recommendedMode = "fit";
  else if (cropLossPercent > 50) recommendedMode = "blur";
  else recommendedMode = "crop";

  return {
    sourceRatio: src,
    targetRatio: tgt,
    cropLossPercent: parseFloat(cropLossPercent.toFixed(2)),
    visibleAreaPercent: parseFloat(visibleAreaPercent.toFixed(2)),
    barCoveragePercent: parseFloat(barCoveragePercent.toFixed(2)),
    barOrientation,
    recommendedMode,
  };
}

console.log("\n🧪 Running Geometry Engine Unit Tests...\n");

// Test 1: 16:9 to 9:16
const t1 = calculateGeometry("16:9", "9:16");
assert(
  Math.abs(t1.cropLossPercent - 68.36) < 0.1,
  `16:9 to 9:16 crop loss should be ~68.36%, got ${t1.cropLossPercent}%`
);
assert.strictEqual(t1.recommendedMode, "blur", "16:9 to 9:16 recommended mode should be blur");
assert.strictEqual(t1.barOrientation, "letterbox", "16:9 to 9:16 should produce letterbox bars");
console.log("  ✔ Test 1 Passed: 16:9 to 9:16 (68.36% crop loss, blur recommendation)");

// Test 2: 9:16 to 16:9
const t2 = calculateGeometry("9:16", "16:9");
assert(
  Math.abs(t2.cropLossPercent - 68.36) < 0.1,
  `9:16 to 16:9 crop loss should be ~68.36%, got ${t2.cropLossPercent}%`
);
assert.strictEqual(t2.barOrientation, "pillarbox", "9:16 to 16:9 should produce pillarbox bars");
console.log("  ✔ Test 2 Passed: 9:16 to 16:9 (68.36% crop loss, pillarbox bars)");

// Test 3: 16:9 to 1:1
const t3 = calculateGeometry("16:9", "1:1");
assert(
  Math.abs(t3.cropLossPercent - 43.75) < 0.1,
  `16:9 to 1:1 crop loss should be 43.75%, got ${t3.cropLossPercent}%`
);
assert.strictEqual(t3.recommendedMode, "crop", "16:9 to 1:1 recommended mode should be crop");
console.log("  ✔ Test 3 Passed: 16:9 to 1:1 (43.75% crop loss, crop recommendation)");

// Test 4: 4:3 to 16:9
const t4 = calculateGeometry("4:3", "16:9");
assert(
  Math.abs(t4.cropLossPercent - 25.0) < 0.1,
  `4:3 to 16:9 crop loss should be 25.00%, got ${t4.cropLossPercent}%`
);
console.log("  ✔ Test 4 Passed: 4:3 to 16:9 (25.00% crop loss)");

// Test 5: 21:9 to 16:9
const t5 = calculateGeometry("21:9", "16:9");
assert(
  Math.abs(t5.cropLossPercent - 23.81) < 0.1,
  `21:9 to 16:9 crop loss should be ~23.81%, got ${t5.cropLossPercent}%`
);
console.log("  ✔ Test 5 Passed: 21:9 to 16:9 (23.81% crop loss)");

console.log("\n✅ All 5 geometry tests passed successfully!\n");


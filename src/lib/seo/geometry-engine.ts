// src/lib/seo/geometry-engine.ts
// Pure geometry calculation engine for video aspect ratio transformations.
// All calculations are deterministic, macroblock-aligned (even integers), and explainable.

export interface AspectRatio {
  w: number;
  h: number;
  label: string; // e.g. "16:9"
  decimal: number; // e.g. 1.7777777778
}

export interface StandardResolution {
  name: string; // e.g. "1080p", "4K"
  width: number;
  height: number;
}

export interface GeometryCalculationResult {
  sourceRatio: AspectRatio;
  targetRatio: AspectRatio;
  standardResolutions: StandardResolution[];
  cropLossPercent: number; // Percentage of image discarded in crop mode
  visibleAreaPercent: number; // Percentage of image retained in crop mode
  letterboxPadding: {
    topBottomPx: number; // For 1080p base target
    leftRightPx: number; // For 1080p base target
    barCoveragePercent: number; // Percentage of total canvas occupied by black/blur bars
    barOrientation: "letterbox" | "pillarbox" | "none"; // horizontal bars, vertical bars, or none
  };
  recommendedMode: "crop" | "fit" | "blur";
  recommendationReason: string;
  workedExample: {
    sourceRes: string;
    targetRes: string;
    cropDimensions: string;
    padDimensions: string;
    calculationText: string;
  };
}

/**
 * Parses aspect ratio string (e.g. "16:9", "9:16", "1:1", "4:5", "21:9", "2.39:1", "16-9")
 */
export function parseRatio(ratioStr: string): AspectRatio {
  const normalized = ratioStr.replace("-", ":").trim();
  const parts = normalized.split(":");
  if (parts.length !== 2) {
    throw new Error(`Invalid ratio string: ${ratioStr}`);
  }
  const w = parseFloat(parts[0]);
  const h = parseFloat(parts[1]);
  if (isNaN(w) || isNaN(h) || h === 0) {
    throw new Error(`Invalid ratio values in: ${ratioStr}`);
  }
  return {
    w,
    h,
    label: `${w}:${h}`,
    decimal: w / h,
  };
}

/**
 * Generates standard standard resolutions (720p, 1080p, 1440p, 4K) for a target ratio,
 * ensuring all dimensions are even integers for H.264 / HEVC macroblock compatibility.
 */
export function getStandardResolutions(targetRatio: AspectRatio): StandardResolution[] {
  // Base heights or widths commonly used in digital video
  const dec = targetRatio.decimal;

  const makeEven = (n: number) => Math.round(n / 2) * 2;

  if (dec >= 1) {
    // Landscape or square: define standard heights (720, 1080, 1440, 2160)
    return [
      { name: "720p (HD)", width: makeEven(720 * dec), height: 720 },
      { name: "1080p (Full HD)", width: makeEven(1080 * dec), height: 1080 },
      { name: "1440p (2K QHD)", width: makeEven(1440 * dec), height: 1440 },
      { name: "2160p (4K UHD)", width: makeEven(2160 * dec), height: 2160 },
    ];
  } else {
    // Portrait (e.g. 9:16, 4:5): define standard widths (720, 1080, 1440, 2160)
    return [
      { name: "720p (HD Vertical)", width: 720, height: makeEven(720 / dec) },
      { name: "1080p (Full HD Vertical)", width: 1080, height: makeEven(1080 / dec) },
      { name: "1440p (2K Vertical)", width: 1440, height: makeEven(1440 / dec) },
      { name: "2160p (4K Vertical)", width: 2160, height: makeEven(2160 / dec) },
    ];
  }
}

/**
 * Calculates complete geometry, crop loss %, padding bar dimensions,
 * recommended transformation mode, and a worked mathematical example.
 */
export function calculateGeometry(
  sourceInput: string | AspectRatio,
  targetInput: string | AspectRatio
): GeometryCalculationResult {
  const sourceRatio = typeof sourceInput === "string" ? parseRatio(sourceInput) : sourceInput;
  const targetRatio = typeof targetInput === "string" ? parseRatio(targetInput) : targetInput;

  const srcDec = sourceRatio.decimal;
  const tgtDec = targetRatio.decimal;

  // Standard resolutions for target
  const standardResolutions = getStandardResolutions(targetRatio);
  const baseTarget = standardResolutions[1]; // 1080p target

  let cropLossPercent = 0;
  let visibleAreaPercent = 100;
  let barOrientation: "letterbox" | "pillarbox" | "none" = "none";
  let topBottomPx = 0;
  let leftRightPx = 0;
  let barCoveragePercent = 0;

  if (Math.abs(srcDec - tgtDec) < 0.001) {
    // Identical aspect ratio
    cropLossPercent = 0;
    visibleAreaPercent = 100;
    barOrientation = "none";
  } else if (tgtDec < srcDec) {
    // Target is narrower (e.g. 16:9 -> 9:16, 16:9 -> 1:1, 16:9 -> 4:5)
    // In crop mode: height is preserved, left & right are cut off.
    visibleAreaPercent = (tgtDec / srcDec) * 100;
    cropLossPercent = 100 - visibleAreaPercent;

    // In fit mode: width fills target width, height is pillarboxed / letterboxed.
    // For 1080p target base:
    const fittedHeight = Math.round((baseTarget.width / srcDec) / 2) * 2;
    topBottomPx = Math.max(0, Math.round((baseTarget.height - fittedHeight) / 2));
    leftRightPx = 0;
    barOrientation = "letterbox";
    barCoveragePercent = (1 - fittedHeight / baseTarget.height) * 100;
  } else {
    // Target is wider (e.g. 9:16 -> 16:9, 4:3 -> 16:9, 1:1 -> 16:9)
    // In crop mode: width is preserved, top & bottom are cut off.
    visibleAreaPercent = (srcDec / tgtDec) * 100;
    cropLossPercent = 100 - visibleAreaPercent;

    // In fit mode: height fills target height, left & right are pillarboxed.
    const fittedWidth = Math.round((baseTarget.height * srcDec) / 2) * 2;
    leftRightPx = Math.max(0, Math.round((baseTarget.width - fittedWidth) / 2));
    topBottomPx = 0;
    barOrientation = "pillarbox";
    barCoveragePercent = (1 - fittedWidth / baseTarget.width) * 100;
  }

  // Determine intelligent recommended mode
  let recommendedMode: "crop" | "fit" | "blur" = "blur";
  let recommendationReason = "";

  if (cropLossPercent < 0.5) {
    recommendedMode = "fit";
    recommendationReason = "The source and target aspect ratios are identical; no cropping or padding is required.";
  } else if (cropLossPercent > 50) {
    // Extreme transformation (e.g. 16:9 to 9:16)
    recommendedMode = "blur";
    recommendationReason = `Direct cropping removes ${cropLossPercent.toFixed(1)}% of the original video canvas, which frequently cuts off critical subjects. Fitting with black letterbox bars wastes ${barCoveragePercent.toFixed(1)}% of the viewer's screen estate. A blurred background preserves 100% of the active footage while filling mobile vertical screens with aesthetically pleasing ambient motion.`;
  } else if (cropLossPercent > 20) {
    // Moderate transformation (e.g. 16:9 to 1:1 or 4:3 to 16:9)
    recommendedMode = "crop";
    recommendationReason = `Cropping removes ${cropLossPercent.toFixed(1)}% of peripheral area while maintaining a full-bleed, edge-to-edge frame that feels native to platform feeds. Use our draggable focal point to center the action.`;
  } else {
    // Minor transformation (e.g. 4:5 to 1:1 or 2.39:1 to 21:9)
    recommendedMode = "crop";
    recommendationReason = `Only ${cropLossPercent.toFixed(1)}% of frame edge is trimmed, making direct focal crop the cleanest approach with zero noticeable loss in composition.`;
  }

  // Generate worked mathematical example
  const workedExample = {
    sourceRes: "1920×1080 (16:9 Widescreen)",
    targetRes: `${baseTarget.width}×${baseTarget.height} (${targetRatio.label})`,
    cropDimensions:
      tgtDec < srcDec
        ? `${Math.round(1080 * tgtDec)}×1080 px`
        : `1920×${Math.round(1920 / tgtDec)} px`,
    padDimensions:
      barOrientation === "letterbox"
        ? `Two ${topBottomPx}px horizontal bars (top & bottom)`
        : barOrientation === "pillarbox"
        ? `Two ${leftRightPx}px vertical bars (left & right)`
        : "None (0px padding)",
    calculationText: `Source ratio decimal = ${srcDec.toFixed(4)}. Target ratio decimal = ${tgtDec.toFixed(4)}. ` +
      (tgtDec < srcDec
        ? `Crop retention formula: (${tgtDec.toFixed(4)} / ${srcDec.toFixed(4)}) × 100% = ${visibleAreaPercent.toFixed(2)}% retained, discarding ${cropLossPercent.toFixed(2)}% of horizontal frame.`
        : `Crop retention formula: (${srcDec.toFixed(4)} / ${tgtDec.toFixed(4)}) × 100% = ${visibleAreaPercent.toFixed(2)}% retained, discarding ${cropLossPercent.toFixed(2)}% of vertical frame.`),
  };

  return {
    sourceRatio,
    targetRatio,
    standardResolutions,
    cropLossPercent: parseFloat(cropLossPercent.toFixed(2)),
    visibleAreaPercent: parseFloat(visibleAreaPercent.toFixed(2)),
    letterboxPadding: {
      topBottomPx,
      leftRightPx,
      barCoveragePercent: parseFloat(barCoveragePercent.toFixed(2)),
      barOrientation,
    },
    recommendedMode,
    recommendationReason,
    workedExample,
  };
}

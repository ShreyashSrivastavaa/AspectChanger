export type OutputResolution = "original" | "1080p" | "720p";

const makeEven = (value: number) => {
  const rounded = Math.max(2, Math.round(value));
  return rounded % 2 === 0 ? rounded : rounded + 1;
};

/**
 * Output frame size for a target ratio. "720p"/"1080p" set the short side;
 * "original" keeps the source's long side. Dimensions are always even because
 * H.264 4:2:0 cannot encode odd sizes.
 */
export function computeOutputSize(
  targetW: number,
  targetH: number,
  resolution: OutputResolution,
  sourceWidth?: number,
  sourceHeight?: number
): { width: number; height: number } {
  const ratio = targetW / targetH;

  if (resolution === "original" && sourceWidth && sourceHeight) {
    const longSide = Math.max(sourceWidth, sourceHeight);
    return ratio >= 1
      ? { width: makeEven(longSide), height: makeEven(longSide / ratio) }
      : { width: makeEven(longSide * ratio), height: makeEven(longSide) };
  }

  const shortSide = resolution === "720p" ? 720 : 1080;
  return ratio >= 1
    ? { width: makeEven(shortSide * ratio), height: makeEven(shortSide) }
    : { width: makeEven(shortSide), height: makeEven(shortSide / ratio) };
}

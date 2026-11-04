import { computeOutputSize } from "./video-geometry";

export interface ConvertOptions {
  file: File;
  targetW: number;
  targetH: number;
  fitMode: "crop" | "blur" | "color";
  focalX: number;
  focalY: number;
  /** Crop-mode magnification; 1 fills the frame exactly. */
  zoom?: number;
  /** Exact output pixels from a size preset; takes priority over `resolution`. */
  outputSize?: { width: number; height: number };
  bgColor: string;
  resolution: "original" | "1080p" | "720p";
  format: "mp4" | "webm";
  quality: number;
  onProgress: (percent: number, message: string, etaText?: string | null) => void;
}

export interface ConvertResult {
  blob: Blob;
  filename: string;
  /** One-line summary of the encode settings, shown in the debug panel. */
  summary: string;
}

const UNSUPPORTED_BROWSER =
  "Your browser can't encode video. Please use the latest Chrome, Edge, Safari, or Firefox.";
const UNSUPPORTED_ENCODE =
  "Your browser can't export with these settings. Try 720p output or MP4, or use Chrome or Edge.";
const UNSUPPORTED_FILE =
  "This file's format isn't supported. Please try an MP4, MOV, WebM, or MKV file.";

const STALL_TIMEOUT_MS = 30000;

class CancelledError extends Error {
  constructor() {
    super("Conversion cancelled.");
    this.name = "CancelledError";
  }
}

export const isCancelledError = (err: unknown) => err instanceof CancelledError;

let activeCancel: (() => Promise<void>) | null = null;
let cancelRequested = false;

function buildFilename(file: File, targetW: number, targetH: number, ext: string) {
  const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
  return `${baseName.replace(/[^a-zA-Z0-9_-]/g, "_")}_${targetW}x${targetH}.${ext}`;
}

const loadedAddons = new Set<string>();

async function loadAddon(name: string, load: () => Promise<void>) {
  if (loadedAddons.has(name)) return;
  await load();
  loadedAddons.add(name);
}

/**
 * Downloads codec add-ons only for files that need them, so most users never pay for them:
 * ProRes video, Dolby/DTS audio, and an AAC encoder for browsers that have none.
 */
async function loadNeededAddons(
  mb: typeof import("mediabunny"),
  input: import("mediabunny").Input,
  videoTrack: import("mediabunny").InputVideoTrack,
  format: ConvertOptions["format"]
) {
  if (videoTrack.codec === "prores" && !(await videoTrack.canDecode())) {
    await loadAddon("prores", async () => (await import("@mediabunny/prores")).registerProresDecoder());
  }

  const audioTracks = await input.getAudioTracks();
  for (const track of audioTracks) {
    if (await track.canDecode()) continue;
    if (track.codec === "ac3" || track.codec === "eac3") {
      await loadAddon("ac3", async () => (await import("@mediabunny/ac3")).registerAc3Decoder());
    } else if (track.codec === "dts") {
      await loadAddon("dts", async () => (await import("@mediabunny/dts")).registerDtsDecoder());
    } else if (track.codec === "truehd") {
      await loadAddon("truehd", async () => (await import("@mediabunny/truehd")).registerTrueHdDecoder());
    }
  }

  const needsAacEncoding = format === "mp4" && audioTracks.some((track) => track.codec !== "aac");
  if (needsAacEncoding && !(await mb.canEncodeAudio("aac"))) {
    await loadAddon("aac", async () => (await import("@mediabunny/aac-encoder")).registerAacEncoder());
  }
}

/** Draws one source frame into the output canvas for the chosen fit mode. */
function createFrameComposer(
  options: Pick<ConvertOptions, "fitMode" | "focalX" | "focalY" | "zoom" | "bgColor">,
  width: number,
  height: number
) {
  const { fitMode, focalX, focalY, zoom = 1, bgColor } = options;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("2D canvas is unavailable");

  // Blurring a small copy and scaling it up is far cheaper than a full-size blur.
  const blurW = Math.max(16, Math.round(width / 8));
  const blurH = Math.max(16, Math.round(height / 8));
  const blurCanvas = fitMode === "blur" ? new OffscreenCanvas(blurW, blurH) : null;
  const blurCtx = blurCanvas?.getContext("2d", { alpha: false }) ?? null;
  // Safari has no canvas filter; the upscale alone still gives a soft background.
  if (blurCtx && typeof blurCtx.filter === "string") blurCtx.filter = "blur(3px)";

  return {
    canvas,
    draw(sample: import("mediabunny").VideoSample) {
      const srcW = sample.displayWidth;
      const srcH = sample.displayHeight;
      const cover = Math.max(width / srcW, height / srcH);
      const contain = Math.min(width / srcW, height / srcH);
      const coverW = srcW * cover;
      const coverH = srcH * cover;
      const containW = srcW * contain;
      const containH = srcH * contain;
      const centeredX = (width - containW) / 2;
      const centeredY = (height - containH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (fitMode === "crop") {
        const cropW = coverW * zoom;
        const cropH = coverH * zoom;
        sample.draw(ctx, (width - cropW) * focalX, (height - cropH) * focalY, cropW, cropH);
      } else if (fitMode === "blur" && blurCanvas && blurCtx) {
        const scale = blurW / width;
        sample.draw(
          blurCtx,
          ((width - coverW) / 2) * scale,
          ((height - coverH) / 2) * scale,
          coverW * scale,
          coverH * scale
        );
        ctx.drawImage(blurCanvas, 0, 0, width, height);
        sample.draw(ctx, centeredX, centeredY, containW, containH);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        sample.draw(ctx, centeredX, centeredY, containW, containH);
      }
    },
  };
}

async function convertWithWebCodecs(options: ConvertOptions): Promise<ConvertResult> {
  if (typeof VideoEncoder === "undefined" || typeof OffscreenCanvas === "undefined") {
    throw new Error(UNSUPPORTED_BROWSER);
  }

  const mb = await import("mediabunny");
  const { file, targetW, targetH, resolution, format, quality, onProgress } = options;

  const input = new mb.Input({ source: new mb.BlobSource(file), formats: mb.ALL_FORMATS });
  let stallTimer: ReturnType<typeof setInterval> | null = null;

  try {
    const track = await input.getPrimaryVideoTrack().catch(() => {
      throw new Error(UNSUPPORTED_FILE);
    });
    if (!track) throw new Error("This file has no video track.");
    await loadNeededAddons(mb, input, track, format);
    if (!(await track.canDecode())) {
      throw new Error(
        `Your browser can't read this file's ${track.codec ?? "video"} video. Please try Chrome or Edge, or a different file.`
      );
    }

    const { width, height } =
      options.outputSize ??
      computeOutputSize(targetW, targetH, resolution, track.displayWidth, track.displayHeight);

    const codec = format === "mp4" ? "avc" : "vp9";
    if (!(await mb.canEncodeVideo(codec, { width, height }))) {
      throw new Error(
        format === "webm"
          ? "WebM export isn't supported in this browser. Please choose MP4 and try again."
          : `Your browser can't encode MP4 at ${width}x${height}. Try a lower resolution, or Chrome or Edge.`
      );
    }

    const composer = createFrameComposer(options, width, height);
    const output = new mb.Output({
      format:
        format === "mp4"
          ? new mb.Mp4OutputFormat({ fastStart: "in-memory" })
          : new mb.WebMOutputFormat(),
      target: new mb.BufferTarget(),
    });

    const videoQuality =
      quality <= 19
        ? mb.QUALITY_VERY_HIGH
        : quality <= 24
          ? mb.QUALITY_HIGH
          : quality <= 26
            ? mb.QUALITY_MEDIUM
            : mb.QUALITY_LOW;

    const conversion = await mb.Conversion.init({
      input,
      output,
      showWarnings: false,
      video: {
        codec,
        quality: videoQuality,
        forceTranscode: true,
        allowTransformationMetadata: false,
        processedWidth: width,
        processedHeight: height,
        process: (sample) => {
          composer.draw(sample);
          return composer.canvas;
        },
      },
      // Copy audio already in the standard codec. Anything else (AC-3, PCM, etc.) is re-encoded,
      // since phones and social apps may not play it inside an MP4 or WebM.
      audio: (audioTrack) => {
        const audioCodec = format === "mp4" ? "aac" : "opus";
        return audioTrack.codec === audioCodec ? {} : { codec: audioCodec, bitrate: mb.QUALITY_HIGH };
      },
    });

    // Never hand back a silent or video-less file.
    const lost = conversion.discardedTracks.find((d) => d.reason !== "discarded_by_user");
    if (!conversion.isValid || lost) {
      throw new Error(
        lost?.track.type === "audio"
          ? "This file's audio format isn't supported. Please re-export it with AAC audio and try again."
          : UNSUPPORTED_FILE
      );
    }

    let lastProgressAt = Date.now();
    let stalled = false;
    const startedAt = Date.now();

    conversion.onProgress = (fraction) => {
      lastProgressAt = Date.now();
      const pct = Math.min(99, Math.max(1, Math.round(fraction * 100)));
      const elapsed = (Date.now() - startedAt) / 1000;
      const eta =
        fraction > 0.03 && elapsed > 0.5
          ? `~${Math.max(1, Math.round(elapsed / fraction - elapsed))}s remaining`
          : null;
      onProgress(pct, `Encoding (${pct}%)...`, eta);
    };

    // Cancel pressed during setup, before there was a conversion to stop.
    if (cancelRequested) throw new CancelledError();

    activeCancel = () => conversion.cancel();
    stallTimer = setInterval(() => {
      if (Date.now() - lastProgressAt > STALL_TIMEOUT_MS) {
        stalled = true;
        void conversion.cancel();
      }
    }, 1000);

    onProgress(1, "Encoding...", null);
    try {
      await conversion.execute();
    } catch (err) {
      if (stalled) throw new Error("The encoder stopped responding. Try 720p output or a shorter clip.");
      throw err;
    }

    const buffer = output.target.buffer;
    if (!buffer || buffer.byteLength === 0) throw new Error("The encoder produced an empty file. Please try again.");

    return {
      blob: new Blob([buffer], { type: format === "mp4" ? "video/mp4" : "video/webm" }),
      filename: buildFilename(file, targetW, targetH, format),
      summary: `webcodecs ${codec} ${width}x${height} fit=${options.fitMode} quality=${quality}`,
    };
  } finally {
    if (stallTimer) clearInterval(stallTimer);
    activeCancel = null;
    input.dispose();
  }
}

export async function convertVideo(options: ConvertOptions): Promise<ConvertResult> {
  cancelRequested = false;
  try {
    return await convertWithWebCodecs(options);
  } catch (err) {
    if (cancelRequested) throw new CancelledError();
    if (err instanceof Error && err.message.includes("not supported in this environment")) {
      throw new Error(UNSUPPORTED_ENCODE);
    }
    throw err;
  }
}

export async function cancelConversion(): Promise<void> {
  cancelRequested = true;
  await activeCancel?.();
}

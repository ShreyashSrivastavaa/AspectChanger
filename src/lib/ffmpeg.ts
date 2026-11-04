import { chooseAudioArgs, parseAudioCodecFromLog } from "./audio-decision";

let ffmpegInstance: any = null;
let isLoading = false;
let currentCoreType: "single" | "multi" = "single";
let coreLoadTimeMs = 0;
let recentLogs: string[] = [];

export function getRecentLogs(): string[] {
  return [...recentLogs];
}

export function getCoreDiagnostics() {
  return {
    coreType: currentCoreType,
    loadTimeMs: coreLoadTimeMs,
    crossOriginIsolated: typeof window !== "undefined" ? Boolean(window.crossOriginIsolated) : false,
    hasSharedArrayBuffer: typeof window !== "undefined" ? "SharedArrayBuffer" in window : false,
  };
}

// Dynamically load the self-hosted ESM browser modules from /ffmpeg/*
async function loadBrowserFFmpegLibraries() {
  if (typeof window === "undefined") {
    throw new Error("FFmpeg can only be executed in browser environments.");
  }

  // Pure dynamic import to bypass Turbopack static AST analysis of worker URLs
  const importDynamic = new Function("url", "return import(url)");

  try {
    const ffmpegModule = await importDynamic("/ffmpeg/ffmpeg-esm/index.js");
    const utilModule = await importDynamic("/ffmpeg/util-esm/index.js");

    return {
      FFmpeg: ffmpegModule.FFmpeg,
      toBlobURL: utilModule.toBlobURL,
      fetchFile: utilModule.fetchFile,
    };
  } catch (err: any) {
    throw new Error(`Failed to load self-hosted FFmpeg ESM from /ffmpeg/: ${err?.message || err}`);
  }
}

export async function terminateFFmpeg(): Promise<void> {
  if (ffmpegInstance) {
    try {
      await ffmpegInstance.terminate();
    } catch {
      // Ignore
    }
    ffmpegInstance = null;
    isLoading = false;
  }
}

export function parseTimeFromLog(log: string): number | null {
  const match = log.match(/time=(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)/);
  if (!match) return null;
  const hours = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  return hours * 3600 + minutes * 60 + seconds;
}

export async function getFFmpeg(
  onLog?: (msg: string) => void,
  preferMultiThread = false
): Promise<{ ffmpeg: any; fetchFile: any; coreType: "single" | "multi"; loadTimeMs: number }> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    const { fetchFile } = await loadBrowserFFmpegLibraries();
    return {
      ffmpeg: ffmpegInstance,
      fetchFile,
      coreType: currentCoreType,
      loadTimeMs: coreLoadTimeMs,
    };
  }

  if (isLoading) {
    while (isLoading) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (ffmpegInstance && ffmpegInstance.loaded) {
      const { fetchFile } = await loadBrowserFFmpegLibraries();
      return {
        ffmpeg: ffmpegInstance,
        fetchFile,
        coreType: currentCoreType,
        loadTimeMs: coreLoadTimeMs,
      };
    }
  }

  isLoading = true;
  const loadStart = Date.now();

  try {
    const { FFmpeg, toBlobURL, fetchFile } = await loadBrowserFFmpegLibraries();
    const ffmpeg = new FFmpeg();

    ffmpeg.on("log", ({ message }: { message: string }) => {
      recentLogs.push(`[${new Date().toISOString().substring(11, 19)}] ${message}`);
      if (recentLogs.length > 50) recentLogs.shift();
      if (onLog) onLog(message);
    });

    const isIsolated = typeof window !== "undefined" && Boolean(window.crossOriginIsolated);
    const hasSAB = typeof window !== "undefined" && "SharedArrayBuffer" in window;
    const canAttemptMT = preferMultiThread && isIsolated && hasSAB;

    let loadedSuccessfully = false;

    // Multi-threaded path (only if explicitly preferred and environment allows)
    if (canAttemptMT) {
      try {
        const mtPromise = async () => {
          await ffmpeg.load({
            classWorkerURL: "/ffmpeg/ffmpeg-esm/worker.js",
            coreURL: await toBlobURL("/ffmpeg/core-mt/ffmpeg-core.js", "text/javascript"),
            wasmURL: await toBlobURL("/ffmpeg/core-mt/ffmpeg-core.wasm", "application/wasm"),
            workerURL: await toBlobURL("/ffmpeg/core-mt/ffmpeg-core.worker.js", "text/javascript"),
          });
        };

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Multi-threaded load timed out after 15s")), 15000)
        );

        await Promise.race([mtPromise(), timeoutPromise]);
        currentCoreType = "multi";
        loadedSuccessfully = true;
      } catch (mtErr) {
        console.warn("Multi-threaded core load timed out or failed. Falling back to single-threaded core:", mtErr);
      }
    }

    // Single-threaded core is the primary default
    if (!loadedSuccessfully) {
      const singleCore = new FFmpeg();
      singleCore.on("log", ({ message }: { message: string }) => {
        recentLogs.push(`[${new Date().toISOString().substring(11, 19)}] ${message}`);
        if (recentLogs.length > 50) recentLogs.shift();
        if (onLog) onLog(message);
      });

      await singleCore.load({
        classWorkerURL: "/ffmpeg/ffmpeg-esm/worker.js",
        coreURL: await toBlobURL("/ffmpeg/core/ffmpeg-core.js", "text/javascript"),
        wasmURL: await toBlobURL("/ffmpeg/core/ffmpeg-core.wasm", "application/wasm"),
      });

      ffmpegInstance = singleCore;
      currentCoreType = "single";
    } else {
      ffmpegInstance = ffmpeg;
    }

    coreLoadTimeMs = Date.now() - loadStart;
    isLoading = false;

    return {
      ffmpeg: ffmpegInstance,
      fetchFile,
      coreType: currentCoreType,
      loadTimeMs: coreLoadTimeMs,
    };
  } catch (err) {
    isLoading = false;
    await terminateFFmpeg();
    throw new Error(
      `Failed to initialize local video processor: ${err instanceof Error ? err.message : "Browser memory or WebAssembly error"}`
    );
  }
}

export interface ConvertOptions {
  file: File;
  duration?: number;
  targetW: number;
  targetH: number;
  fitMode: "crop" | "blur" | "color";
  focalX: number;
  focalY: number;
  bgColor: string;
  resolution: "original" | "1080p" | "720p";
  format: "mp4" | "webm";
  quality: number;
  onProgress: (percent: number, message: string, etaText?: string | null) => void;
  onLogLine?: (line: string) => void;
}

export async function processVideoLocally(options: ConvertOptions): Promise<{ blob: Blob; filename: string; command: string }> {
  const {
    file,
    duration: knownDuration,
    targetW,
    targetH,
    fitMode,
    focalX,
    focalY,
    bgColor,
    resolution,
    format,
    quality,
    onProgress,
    onLogLine,
  } = options;

  let capturedProbeLogs = "";
  let lastLogTimestamp = Date.now();
  let lastProgressTimestamp = Date.now();
  let detectedDuration = knownDuration || 0;
  const startTime = Date.now();

  const { ffmpeg, fetchFile } = await getFFmpeg((msg: string) => {
    lastLogTimestamp = Date.now();
    if (onLogLine) onLogLine(msg);

    // Parse duration from probe if not known
    if (detectedDuration <= 0) {
      const durMatch = msg.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)/);
      if (durMatch) {
        detectedDuration =
          parseFloat(durMatch[1]) * 3600 +
          parseFloat(durMatch[2]) * 60 +
          parseFloat(durMatch[3]);
      }
    }

    // Real progress parsing from ffmpeg time=
    const currentTimeSec = parseTimeFromLog(msg);
    if (currentTimeSec !== null && detectedDuration > 0) {
      lastProgressTimestamp = Date.now();
      const progressFraction = Math.min(0.99, currentTimeSec / detectedDuration);
      const pct = Math.max(1, Math.round(progressFraction * 100));
      const elapsed = (Date.now() - startTime) / 1000;

      let etaText: string | null = null;
      if (progressFraction > 0.03 && elapsed > 0.5) {
        const estimatedTotal = elapsed / progressFraction;
        const remaining = Math.max(1, Math.round(estimatedTotal - elapsed));
        etaText = `~${remaining}s remaining`;
      }

      onProgress(pct, `Encoding frame-by-frame (${pct}%)...`, etaText);
    }
  });

  const inputName = `input_${Date.now()}.${file.name.split(".").pop() || "mp4"}`;
  const outputExt = format;
  const outputName = `output_${Date.now()}.${outputExt}`;

  // 45-second inactivity watchdog + 20-second no-progress indicator
  let watchdogTriggered = false;
  const watchdogInterval = setInterval(async () => {
    const timeSinceLastLog = Date.now() - lastLogTimestamp;
    const timeSinceLastProgress = Date.now() - lastProgressTimestamp;

    if (timeSinceLastLog > 45000 && !watchdogTriggered) {
      watchdogTriggered = true;
      clearInterval(watchdogInterval);
      console.error("FFmpeg watchdog triggered: no log activity for 45 seconds.");
      await terminateFFmpeg();
      onProgress(
        -1,
        "Watchdog timeout: job produced no output for 45s. Worker was reset."
      );
    } else if (timeSinceLastProgress > 20000 && timeSinceLastLog <= 45000) {
      onProgress(-1, "Still working... (encoding high-complexity frames)");
    }
  }, 1000);

  try {
    onProgress(1, "Reading video into device memory...", null);
    const data = await fetchFile(file);
    await ffmpeg.writeFile(inputName, data);

    onProgress(3, "Probing streams...", null);
    try {
      const probeLogger = ({ message }: { message: string }) => {
        capturedProbeLogs += message + "\n";
      };
      ffmpeg.on("log", probeLogger);
      await ffmpeg.exec(["-i", inputName]);
      ffmpeg.off("log", probeLogger);
    } catch {
      // Expected exit code for probe
    }

    const detectedAudioCodec = parseAudioCodecFromLog(capturedProbeLogs + "\n" + recentLogs.join("\n"));
    const audioDecision = chooseAudioArgs(detectedAudioCodec, format);

    // Compute even dimensions for width and height
    let outWidth = 1080;
    let outHeight = Math.round((1080 * targetH) / targetW);

    if (targetW > targetH) {
      outWidth = resolution === "720p" ? 1280 : 1920;
      outHeight = Math.round((outWidth * targetH) / targetW);
    } else {
      outHeight = resolution === "720p" ? 1280 : 1920;
      outWidth = Math.round((outHeight * targetW) / targetH);
    }

    // Must be even numbers for YUV420p
    outWidth = outWidth % 2 === 0 ? outWidth : outWidth + 1;
    outHeight = outHeight % 2 === 0 ? outHeight : outHeight + 1;

    let filterComplex = "";
    if (fitMode === "crop") {
      filterComplex = `[0:v]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=increase,crop=${outWidth}:${outHeight}:(in_w-${outWidth})*${focalX}:(in_h-${outHeight})*${focalY},setsar=1`;
    } else if (fitMode === "blur") {
      // Downscaled blur filter for ultrafast WASM execution:
      // scale background by 1/8th, boxblur(4:2), upscale back to full resolution
      filterComplex = `[0:v]split[a][b];[a]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=increase,crop=${outWidth}:${outHeight},scale=iw/8:ih/8,boxblur=4:2,scale=${outWidth}:${outHeight}[bg];[b]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1`;
    } else {
      const cleanHex = bgColor.replace("#", "");
      filterComplex = `[0:v]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=decrease,pad=${outWidth}:${outHeight}:(ow-iw)/2:(oh-ih)/2:color=0x${cleanHex},setsar=1`;
    }

    const crf = quality.toString();

    const ffmpegArgs = [
      "-i",
      inputName,
      "-filter_complex",
      filterComplex,
      ...(audioDecision.action !== "omit" ? ["-map", "0:a?"] : []),
      "-c:v",
      format === "mp4" ? "libx264" : "libvpx-vp9",
      "-preset",
      "ultrafast",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-crf",
      crf,
      ...audioDecision.args,
      outputName,
    ];

    const commandStr = `ffmpeg ${ffmpegArgs.join(" ")}`;
    recentLogs.push(`[EXEC] ${commandStr}`);

    onProgress(5, "Encoding with WebAssembly...", null);
    lastProgressTimestamp = Date.now();

    await ffmpeg.exec(ffmpegArgs);

    if (watchdogTriggered) {
      throw new Error("Job timed out by watchdog (no activity for 45s).");
    }

    onProgress(95, "Finalizing container file...", null);
    const outputData = await ffmpeg.readFile(outputName);

    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch {}

    const mime = format === "mp4" ? "video/mp4" : "video/webm";
    const u8 = outputData as Uint8Array;
    const copyBuffer = new Uint8Array(u8.length);
    copyBuffer.set(u8);
    const blob = new Blob([copyBuffer.buffer as ArrayBuffer], { type: mime });

    const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const sanitizedName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${sanitizedName}_${targetW}x${targetH}.${outputExt}`;

    clearInterval(watchdogInterval);
    onProgress(100, "Done!", null);
    return { blob, filename, command: commandStr };
  } catch (err: any) {
    clearInterval(watchdogInterval);
    try {
      await ffmpeg.deleteFile(inputName);
    } catch {}
    try {
      await ffmpeg.deleteFile(outputName);
    } catch {}

    const errMsg = String(err?.message || err || "").toLowerCase();
    const isOom =
      errMsg.includes("memory") ||
      errMsg.includes("abort") ||
      errMsg.includes("oombound") ||
      errMsg.includes("out of memory");

    if (isOom) {
      await terminateFFmpeg();
      throw new Error("Ran out of memory. Try 720p output, a shorter clip, or a desktop browser.");
    }

    throw err;
  }
}

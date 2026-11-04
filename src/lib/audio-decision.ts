export type AudioCodec =
  | "aac"
  | "mp3"
  | "opus"
  | "vorbis"
  | "ac3"
  | "eac3"
  | "flac"
  | "pcm_s16le"
  | "pcm_s24le"
  | "pcm_u8"
  | "wav"
  | "none"
  | string;

export interface AudioDecision {
  args: string[];
  action: "copy" | "reencode" | "omit";
  reason: string;
}

/**
 * Pure decision logic for selecting FFmpeg audio flags.
 *
 * Rules:
 * - No audio stream present: omit audio entirely using `-an`.
 * - MP4 output:
 *   - Copy audio if codec is AAC or MP3 (`-c:a copy`).
 *   - Otherwise re-encode to AAC at 192k (`-c:a aac -b:a 192k`).
 * - WebM output:
 *   - Copy audio only if codec is Opus or Vorbis (`-c:a copy`).
 *   - Otherwise re-encode to Opus at 128k (`-c:a libopus -b:a 128k`).
 */
export function chooseAudioArgs(
  inputCodec: AudioCodec | null | undefined,
  outputFormat: "mp4" | "webm"
): AudioDecision {
  // Normalize codec name
  const codec = (inputCodec || "").trim().toLowerCase();

  // If no audio stream or 'none'
  if (!codec || codec === "none" || codec === "null" || codec === "undefined") {
    return {
      args: ["-an"],
      action: "omit",
      reason: "No input audio stream detected. Stripping audio cleanly with -an.",
    };
  }

  if (outputFormat === "mp4") {
    // MP4 container natively supports AAC and MP3 stream copy without remux issues
    if (codec === "aac" || codec === "mp3") {
      return {
        args: ["-c:a", "copy"],
        action: "copy",
        reason: `Input codec '${codec}' is natively compatible with MP4 container. Stream copied without generational loss.`,
      };
    }

    // Incompatible or non-standard audio (e.g. AC3, PCM, Opus, Vorbis, FLAC) -> re-encode to AAC 192k
    return {
      args: ["-c:a", "aac", "-b:a", "192k"],
      action: "reencode",
      reason: `Input codec '${codec}' is not standard for MP4 stream copy. Re-encoded to AAC 192kbps.`,
    };
  }

  if (outputFormat === "webm") {
    // WebM strictly accepts Opus or Vorbis
    if (codec === "opus" || codec === "vorbis") {
      return {
        args: ["-c:a", "copy"],
        action: "copy",
        reason: `Input codec '${codec}' is natively compatible with WebM container. Stream copied.`,
      };
    }

    // Incompatible audio for WebM (e.g. AAC, MP3, AC3, PCM) -> re-encode to Opus 128k
    return {
      args: ["-c:a", "libopus", "-b:a", "128k"],
      action: "reencode",
      reason: `Input codec '${codec}' cannot be copied into WebM container. Re-encoded to Opus 128kbps.`,
    };
  }

  // Fallback
  return {
    args: ["-c:a", "copy"],
    action: "copy",
    reason: "Default stream copy fallback.",
  };
}

/**
 * Parses FFmpeg error/log output or probe logs to detect audio codec.
 * Typical FFmpeg probe pattern:
 * Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
 * Stream #0:1: Audio: ac3, 48000 Hz, 5.1(side), fltp, 384 kb/s
 * Stream #0:1: Audio: pcm_s16le, 44100 Hz, 2 channels, s16, 1411 kb/s
 */
export function parseAudioCodecFromLog(logText: string): string | null {
  if (!logText) return null;

  // Search for "Audio: <codec>" pattern
  const audioMatch = logText.match(/Stream\s+#\d+:\d+(?:\[[^\]]+\])?(?:\([^)]+\))?:\s+Audio:\s+([a-zA-Z0-9_]+)/i);
  if (audioMatch && audioMatch[1]) {
    return audioMatch[1].toLowerCase();
  }

  // Secondary check if no stream found
  if (logText.includes("no audio") || !logText.includes("Audio:")) {
    return null;
  }

  return null;
}


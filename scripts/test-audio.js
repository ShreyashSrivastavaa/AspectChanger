const assert = require("assert");

// Compile-free testing of pure audio-decision logic
function chooseAudioArgs(inputCodec, outputFormat) {
  const codec = (inputCodec || "").trim().toLowerCase();

  if (!codec || codec === "none" || codec === "null" || codec === "undefined") {
    return {
      args: ["-an"],
      action: "omit",
      reason: "No input audio stream detected. Stripping audio cleanly with -an.",
    };
  }

  if (outputFormat === "mp4") {
    if (codec === "aac" || codec === "mp3") {
      return {
        args: ["-c:a", "copy"],
        action: "copy",
        reason: `Input codec '${codec}' is natively compatible with MP4 container. Stream copied without generational loss.`,
      };
    }
    return {
      args: ["-c:a", "aac", "-b:a", "192k"],
      action: "reencode",
      reason: `Input codec '${codec}' is not standard for MP4 stream copy. Re-encoded to AAC 192kbps.`,
    };
  }

  if (outputFormat === "webm") {
    if (codec === "opus" || codec === "vorbis") {
      return {
        args: ["-c:a", "copy"],
        action: "copy",
        reason: `Input codec '${codec}' is natively compatible with WebM container. Stream copied.`,
      };
    }
    return {
      args: ["-c:a", "libopus", "-b:a", "128k"],
      action: "reencode",
      reason: `Input codec '${codec}' cannot be copied into WebM container. Re-encoded to Opus 128kbps.`,
    };
  }

  return { args: ["-c:a", "copy"], action: "copy" };
}

function parseAudioCodecFromLog(logText) {
  if (!logText) return null;
  const audioMatch = logText.match(/Stream\s+#\d+:\d+(?:\[[^\]]+\])?(?:\([^)]+\))?:\s+Audio:\s+([a-zA-Z0-9_]+)/i);
  if (audioMatch && audioMatch[1]) {
    return audioMatch[1].toLowerCase();
  }
  return null;
}

function parseTimeFromLog(log) {
  const match = log.match(/time=(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)/);
  if (!match) return null;
  const hours = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  return hours * 3600 + minutes * 60 + seconds;
}

console.log("=== RUNNING AUDIO DECISION UNIT TESTS ===");

// 0. Time log parser tests
const timeLog1 = "frame=  120 fps= 45 q=23.0 size=    1024kB time=00:00:04.80 bitrate=1747.6kbits/s speed=1.8x";
assert.strictEqual(parseTimeFromLog(timeLog1), 4.8);
console.log("PASS: parseTimeFromLog (00:00:04.80 -> 4.8s)");

const timeLog2 = "frame= 3000 fps= 60 q=20.0 size=   45000kB time=01:12:35.50 bitrate=1200.0kbits/s speed=2.1x";
assert.strictEqual(parseTimeFromLog(timeLog2), 1 * 3600 + 12 * 60 + 35.5);
console.log("PASS: parseTimeFromLog (01:12:35.50 -> 4355.5s)");

const noTimeLog = "Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mp4':";
assert.strictEqual(parseTimeFromLog(noTimeLog), null);
console.log("PASS: parseTimeFromLog (no time pattern -> null)");

// 1. AAC -> MP4 => copy
const test1 = chooseAudioArgs("aac", "mp4");
assert.deepStrictEqual(test1.args, ["-c:a", "copy"]);
assert.strictEqual(test1.action, "copy");
console.log("PASS: AAC -> MP4 (Stream Copy)");

// 2. AAC -> WebM => re-encode to Opus 128k
const test2 = chooseAudioArgs("aac", "webm");
assert.deepStrictEqual(test2.args, ["-c:a", "libopus", "-b:a", "128k"]);
assert.strictEqual(test2.action, "reencode");
console.log("PASS: AAC -> WebM (Re-encode to Opus 128k)");

// 3. Opus -> WebM => copy
const test3 = chooseAudioArgs("opus", "webm");
assert.deepStrictEqual(test3.args, ["-c:a", "copy"]);
assert.strictEqual(test3.action, "copy");
console.log("PASS: Opus -> WebM (Stream Copy)");

// 4. AC3 -> MP4 => re-encode to AAC 192k
const test4 = chooseAudioArgs("ac3", "mp4");
assert.deepStrictEqual(test4.args, ["-c:a", "aac", "-b:a", "192k"]);
assert.strictEqual(test4.action, "reencode");
console.log("PASS: AC3 -> MP4 (Re-encode to AAC 192k)");

// 5. PCM -> MP4 => re-encode to AAC 192k
const test5 = chooseAudioArgs("pcm_s16le", "mp4");
assert.deepStrictEqual(test5.args, ["-c:a", "aac", "-b:a", "192k"]);
assert.strictEqual(test5.action, "reencode");
console.log("PASS: PCM (pcm_s16le) -> MP4 (Re-encode to AAC 192k)");

// 6. No audio -> MP4 => omit with -an
const test6a = chooseAudioArgs(null, "mp4");
assert.deepStrictEqual(test6a.args, ["-an"]);
assert.strictEqual(test6a.action, "omit");
console.log("PASS: No Audio -> MP4 (-an)");

// 7. No audio -> WebM => omit with -an
const test7b = chooseAudioArgs("none", "webm");
assert.deepStrictEqual(test7b.args, ["-an"]);
assert.strictEqual(test7b.action, "omit");
console.log("PASS: No Audio ('none') -> WebM (-an)");

// 8. Log parsing tests
const logWithAac = `
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mp4':
  Duration: 00:00:15.00, start: 0.000000, bitrate: 4500 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1920x1080, 29.97 fps
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
`;
assert.strictEqual(parseAudioCodecFromLog(logWithAac), "aac");
console.log("PASS: Log Parsing (AAC detected)");

const logWithAc3 = `
Input #0, matroska,webm, from 'sample.mkv':
  Stream #0:0: Video: h264, yuv420p, 1920x1080
  Stream #0:1: Audio: ac3, 48000 Hz, 5.1(side), fltp, 384 kb/s
`;
assert.strictEqual(parseAudioCodecFromLog(logWithAc3), "ac3");
console.log("PASS: Log Parsing (AC3 detected)");

const logWithoutAudio = `
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'silent.mp4':
  Stream #0:0[0x1](und): Video: h264, 1920x1080, 30 fps
`;
assert.strictEqual(parseAudioCodecFromLog(logWithoutAudio), null);
console.log("PASS: Log Parsing (No Audio detected)");

console.log("=== ALL 9 AUDIO UNIT TESTS PASSED SUCCESSFULLY ===");


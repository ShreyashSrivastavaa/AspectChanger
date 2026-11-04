const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Copying FFmpeg core, worker, and browser bundle assets to public/ffmpeg/...");

// 1. Copy core (single-thread)
copyDir(
  path.join(__dirname, "..", "node_modules", "@ffmpeg", "core", "dist", "esm"),
  path.join(__dirname, "..", "public", "ffmpeg", "core")
);

// 2. Copy core-mt (multi-thread)
copyDir(
  path.join(__dirname, "..", "node_modules", "@ffmpeg", "core-mt", "dist", "esm"),
  path.join(__dirname, "..", "public", "ffmpeg", "core-mt")
);

// 3. Copy @ffmpeg/ffmpeg/dist/esm to public/ffmpeg/ffmpeg-esm
copyDir(
  path.join(__dirname, "..", "node_modules", "@ffmpeg", "ffmpeg", "dist", "esm"),
  path.join(__dirname, "..", "public", "ffmpeg", "ffmpeg-esm")
);

// 4. Copy @ffmpeg/util/dist/esm to public/ffmpeg/util-esm
copyDir(
  path.join(__dirname, "..", "node_modules", "@ffmpeg", "util", "dist", "esm"),
  path.join(__dirname, "..", "public", "ffmpeg", "util-esm")
);

console.log("FFmpeg assets successfully copied to public/ffmpeg/.");

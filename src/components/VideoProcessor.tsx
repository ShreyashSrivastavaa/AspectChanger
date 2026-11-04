"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  processVideoLocally, 
  terminateFFmpeg, 
  getRecentLogs, 
  getCoreDiagnostics 
} from "@/lib/ffmpeg";

interface VideoProcessorProps {
  initialRatio?: { w: number; h: number };
  initialPlatform?: string;
}

export default function VideoProcessor({ initialRatio }: VideoProcessorProps) {
  // Hydration & debug state
  const [mounted, setMounted] = useState(false);
  const [isIsolated, setIsIsolated] = useState<boolean | null>(null);
  const [isDebug, setIsDebug] = useState(false);

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<{ width: number; height: number; duration: number } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Settings state
  const [targetRatio, setTargetRatio] = useState<{ w: number; h: number }>(
    initialRatio || { w: 9, h: 16 }
  );
  const [customW, setCustomW] = useState<string>("16");
  const [customH, setCustomH] = useState<string>("9");
  const [isCustom, setIsCustom] = useState(false);

  // Fit mode: 'blur' | 'crop' | 'color' (Bars)
  const [fitMode, setFitMode] = useState<"blur" | "crop" | "color">("blur");
  const [focalX, setFocalX] = useState(0.5);
  const [focalY, setFocalY] = useState(0.5);
  const [bgColor, setBgColor] = useState("#000000");

  // Output configuration (collapsed in Advanced)
  const [resolution, setResolution] = useState<"original" | "1080p" | "720p">("720p");
  const [format, setFormat] = useState<"mp4" | "webm">("mp4");
  const [quality, setQuality] = useState(23); // CRF: 18-28

  // Execution state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<{ blob: Blob; url: string; filename: string } | null>(null);

  // Debug Diagnostics
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string>("");
  const [coreInfo, setCoreInfo] = useState<{ coreType: string; loadTimeMs: number } | null>(null);

  // Drag state for focal point
  const [isDraggingFocal, setIsDraggingFocal] = useState(false);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewBoxRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setIsIsolated(typeof window !== "undefined" && Boolean(window.crossOriginIsolated));
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("debug") === "1") {
        setIsDebug(true);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
      if (resultBlob?.url) URL.revokeObjectURL(resultBlob.url);
      terminateFFmpeg();
    };
  }, [videoSrc, resultBlob]);

  const handleFile = (selectedFile: File) => {
    setErrorMessage(null);
    setResultBlob(null);

    if (selectedFile.size > 500 * 1024 * 1024) {
      setErrorMessage("File exceeds 500 MB limit. Please select a smaller clip.");
      return;
    }

    const validExts = [".mp4", ".mov", ".webm", ".mkv", ".avi"];
    const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();
    if (!validExts.includes(ext) && !selectedFile.type.startsWith("video/")) {
      setErrorMessage("Unsupported format. Please upload MP4, MOV, WebM, MKV, or AVI.");
      return;
    }

    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setVideoSrc(objectUrl);
    setProgress(0);
    setStatusText("");
    setEstimatedTime(null);
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      const duration = videoRef.current.duration || 0;
      setVideoMetadata({ width, height, duration });

      if (width > 0 && height > 0) {
        if (!initialRatio) {
          if (width > height) {
            setTargetRatio({ w: 9, h: 16 });
          } else {
            setTargetRatio({ w: 16, h: 9 });
          }
        }
      }
    }
  };

  const handleFocalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (fitMode !== "crop" || !previewBoxRef.current) return;
    setIsDraggingFocal(true);
    updateFocalPoint(e.clientX, e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleFocalPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingFocal || fitMode !== "crop") return;
    updateFocalPoint(e.clientX, e.clientY);
  };

  const handleFocalPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingFocal) return;
    setIsDraggingFocal(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const updateFocalPoint = (clientX: number, clientY: number) => {
    if (!previewBoxRef.current) return;
    const rect = previewBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setFocalX(x);
    setFocalY(y);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setStatusText("Initializing WebAssembly engine...");
    setErrorMessage(null);
    setResultBlob(null);
    setEstimatedTime("Estimating...");

    const startTime = Date.now();
    let hasUpdatedProgress = false;

    try {
      const activeRatioW = isCustom ? (parseInt(customW, 10) || 16) : targetRatio.w;
      const activeRatioH = isCustom ? (parseInt(customH, 10) || 9) : targetRatio.h;

      const { blob, filename, command } = await processVideoLocally({
        file,
        duration: videoMetadata?.duration,
        targetW: activeRatioW,
        targetH: activeRatioH,
        fitMode,
        focalX,
        focalY,
        bgColor,
        resolution,
        format,
        quality,
        onProgress: (pct, msg, eta) => {
          if (pct >= 0) setProgress(pct);
          setStatusText(msg);
          if (eta) setEstimatedTime(eta);
        },
        onLogLine: (line) => {
          setDebugLogs((prev) => [...prev.slice(-30), line]);
        },
      });

      const url = URL.createObjectURL(blob);
      setResultBlob({ blob, url, filename });
      setLastExecutedCommand(command);
      setProgress(100);
      setStatusText("Complete!");
      setEstimatedTime(null);

      // Collect diagnostics for inspection
      setDebugLogs(getRecentLogs());
      setCoreInfo(getCoreDiagnostics());
    } catch (err: any) {
      console.error("Conversion failed:", err);
      setErrorMessage(err?.message || "An error occurred during local conversion. Please try a different preset or file.");
      setDebugLogs(getRecentLogs());
      setCoreInfo(getCoreDiagnostics());
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    terminateFFmpeg();
    setIsProcessing(false);
    setProgress(0);
    setStatusText("Cancelled");
    setEstimatedTime(null);
  };

  const currentRatioW = isCustom ? (parseInt(customW, 10) || 16) : targetRatio.w;
  const currentRatioH = isCustom ? (parseInt(customH, 10) || 9) : targetRatio.h;
  const ratioLabel = `${currentRatioW}:${currentRatioH}`;

  const ratioOptions = [
    { label: "9:16", w: 9, h: 16, caption: "Shorts, Reels, TikTok" },
    { label: "16:9", w: 16, h: 9, caption: "YouTube, Landscape" },
    { label: "1:1", w: 1, h: 1, caption: "Instagram Feed, Square" },
    { label: "4:5", w: 4, h: 5, caption: "Portrait Mobile" },
  ];

  return (
    <div className="w-full" suppressHydrationWarning>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/x-matroska,video/x-msvideo"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* STATE 1: EMPTY STATE — Architectural Frosted Glass Well */}
      {!file ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full glass-panel py-16 px-6 text-center cursor-pointer transition-all duration-300 group ${
            isDraggingOver
              ? "border-[#c89c6e] scale-[1.01] shadow-[0_0_40px_rgba(200,156,110,0.3)]"
              : "hover:border-white hover:shadow-2xl"
          }`}
        >
          {/* Viewfinder Camera Corner Marks in Champagne Gold */}
          <div className="viewfinder-corner viewfinder-tl" />
          <div className="viewfinder-corner viewfinder-tr" />
          <div className="viewfinder-corner viewfinder-bl" />
          <div className="viewfinder-corner viewfinder-br" />

          <div className="max-w-md mx-auto space-y-4">
            {/* Elegant Frosted Frame Icon with Metallic Gold Ripple */}
            <div className="flex justify-center">
              <div className="relative w-14 h-14 rounded-2xl glass-pill flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="6" width="24" height="20" rx="3" stroke="#a89b8d" strokeWidth="1.2" strokeDasharray="3 2" />
                  <rect x="11" y="4" width="10" height="24" rx="2" stroke="#c89c6e" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="1.5" fill="#c89c6e" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-main)]">
                Drop your video clip here
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Processed privately inside browser memory. Never uploaded.
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-radiant-glow text-xs font-semibold tracking-wide shadow-lg">
                Choose Video File
              </span>
            </div>

            <p className="font-mono text-[11px] text-[var(--text-muted)] pt-2 tracking-wider">
              MP4 · MOV · WEBM · MKV · AVI (UP TO 500 MB)
            </p>
          </div>
        </div>
      ) : (
        /* STATE 2: 2-COLUMN WORKSPACE — Sleek Frosted Glass Instrument */
        <div className="glass-panel overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* LEFT COLUMN: Dark Obsidian Broadcast Monitor */}
            <div className="lg:col-span-7 p-6 bg-[#161412]/95 text-[#f6f1e8] flex flex-col justify-between items-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Stage Top Bar: Frame dimensions & aspect mono badge */}
              <div className="w-full flex items-center justify-between font-mono text-[11px] text-neutral-400 pb-3 border-b border-neutral-800/80">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
                  CANVAS: {ratioLabel}
                </span>
                <span className="text-neutral-400">
                  {videoMetadata ? `${videoMetadata.width}×${videoMetadata.height} (${videoMetadata.duration.toFixed(1)}s)` : "PROBING..."}
                </span>
              </div>

              {/* Centered Ratio Frame with Viewfinder Corners */}
              <div className="flex-1 flex items-center justify-center w-full py-4 relative">
                <div
                  ref={previewBoxRef}
                  onPointerDown={handleFocalPointerDown}
                  onPointerMove={handleFocalPointerMove}
                  onPointerUp={handleFocalPointerUp}
                  className="relative max-h-[380px] max-w-full flex items-center justify-center overflow-hidden border border-neutral-700/80 rounded-xl select-none shadow-2xl"
                  style={{
                    aspectRatio: `${currentRatioW} / ${currentRatioH}`,
                    backgroundColor: fitMode === "color" ? bgColor : "#000000",
                    cursor: fitMode === "crop" ? (isDraggingFocal ? "grabbing" : "grab") : "default",
                  }}
                >
                  {/* Viewfinder corner crop-marks in Champagne */}
                  <div className="viewfinder-corner viewfinder-tl" />
                  <div className="viewfinder-corner viewfinder-tr" />
                  <div className="viewfinder-corner viewfinder-bl" />
                  <div className="viewfinder-corner viewfinder-br" />

                  {/* Mode: Blur Ambient Background */}
                  {fitMode === "blur" && videoSrc && (
                    <video
                      ref={bgVideoRef}
                      src={videoSrc}
                      playsInline
                      muted
                      loop
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
                      style={{ filter: "blur(22px) brightness(0.65)" }}
                    />
                  )}

                  {/* Primary Video Element (Native hardware GPU decode) */}
                  {videoSrc && (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      onLoadedMetadata={onLoadedMetadata}
                      playsInline
                      muted
                      autoPlay
                      loop
                      className={`relative z-10 w-full h-full ${
                        fitMode === "crop" ? "object-cover" : "object-contain"
                      }`}
                      style={
                        fitMode === "crop"
                          ? { objectPosition: `${focalX * 100}% ${focalY * 100}%` }
                          : undefined
                      }
                    />
                  )}

                  {/* Framing Overlay Border & Rule of Thirds */}
                  <div className="absolute inset-0 z-20 pointer-events-none border border-white/20">
                    <div className="absolute left-1/3 top-0 bottom-0 border-r border-white/10" />
                    <div className="absolute right-1/3 top-0 bottom-0 border-r border-white/10" />
                    <div className="absolute top-1/3 left-0 right-0 border-b border-white/10" />
                    <div className="absolute bottom-1/3 left-0 right-0 border-b border-white/10" />
                  </div>

                  {/* Draggable Focal Crosshair Indicator */}
                  {fitMode === "crop" && (
                    <div
                      className="absolute z-30 w-7 h-7 -ml-3.5 -mt-3.5 border-2 border-white rounded-full pointer-events-none flex items-center justify-center bg-black/60 shadow"
                      style={{ left: `${focalX * 100}%`, top: `${focalY * 100}%` }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#c89c6e] rounded-full shadow-[0_0_6px_#c89c6e]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Stage Bottom Bar */}
              <div className="w-full flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
                <span className="truncate max-w-[220px] font-mono text-[11px] text-neutral-300">
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-mono text-[11px] text-[#e8c7a2] hover:underline"
                >
                  Change clip
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Frosted Glass Controls Panel */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                
                {/* 1. RATIO SELECTOR (Frosted Glass Chips) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      1. Target Aspect Ratio
                    </label>
                    <span className="font-mono text-xs font-bold text-[#c89c6e]">
                      {ratioLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {ratioOptions.map((opt) => {
                      const isSelected = !isCustom && targetRatio.w === opt.w && targetRatio.h === opt.h;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => {
                            setIsCustom(false);
                            setTargetRatio({ w: opt.w, h: opt.h });
                          }}
                          className={`p-3 rounded-2xl text-left transition-all duration-200 ${
                            isSelected
                              ? "bg-white/90 dark:bg-white/15 border border-[#c89c6e] text-[var(--text-main)] shadow-[0_4px_16px_rgba(200,156,110,0.25)] font-semibold"
                              : "glass-pill text-[var(--text-main)] opacity-85 hover:opacity-100"
                          }`}
                        >
                          <div className="font-mono text-xs mb-0.5">{opt.label}</div>
                          <div className="text-[10px] text-[var(--text-muted)] leading-tight">{opt.caption}</div>
                        </button>
                      );
                    })}

                    {/* 5th Chip: Custom */}
                    <button
                      type="button"
                      onClick={() => setIsCustom(true)}
                      className={`p-3 rounded-2xl text-left transition-all duration-200 ${
                        isCustom
                          ? "bg-white/90 dark:bg-white/15 border border-[#c89c6e] text-[var(--text-main)] shadow-[0_4px_16px_rgba(200,156,110,0.25)] font-semibold"
                          : "glass-pill text-[var(--text-main)] opacity-85 hover:opacity-100"
                      }`}
                    >
                      <div className="font-mono text-xs mb-0.5">Custom</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-tight">Dimensions</div>
                    </button>
                  </div>

                  {isCustom && (
                    <div className="flex items-center gap-2 mt-2 p-2 rounded-xl glass-pill">
                      <input
                        type="number"
                        min="1"
                        value={customW}
                        onChange={(e) => setCustomW(e.target.value)}
                        placeholder="W"
                        className="w-16 px-2 py-1 bg-white/50 dark:bg-black/30 border border-[var(--color-hairline-strong)] rounded-lg font-mono text-xs text-center text-[var(--text-main)] outline-none focus:border-[#c89c6e]"
                      />
                      <span className="font-mono text-xs text-[var(--text-muted)]">:</span>
                      <input
                        type="number"
                        min="1"
                        value={customH}
                        onChange={(e) => setCustomH(e.target.value)}
                        placeholder="H"
                        className="w-16 px-2 py-1 bg-white/50 dark:bg-black/30 border border-[var(--color-hairline-strong)] rounded-lg font-mono text-xs text-center text-[var(--text-main)] outline-none focus:border-[#c89c6e]"
                      />
                      <span className="text-[11px] text-[var(--text-muted)]">Custom Ratio</span>
                    </div>
                  )}
                </div>

                {/* 2. FIT SEGMENTED CONTROL (Frosted Glass Toggle) */}
                <div>
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    2. Fitting Mode
                  </label>
                  <div className="grid grid-cols-3 p-1 rounded-full glass-pill">
                    {[
                      { id: "blur", label: "Blur" },
                      { id: "crop", label: "Crop" },
                      { id: "color", label: "Bars" },
                    ].map((mode) => {
                      const isSelected = fitMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setFitMode(mode.id as any)}
                          className={`py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                            isSelected
                              ? "bg-white/90 dark:bg-white/20 text-[var(--text-main)] shadow-sm font-semibold"
                              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                          }`}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Color picker only for Bars */}
                  {fitMode === "color" && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 rounded-xl glass-pill">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-6 h-6 rounded-full border-0 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-[var(--text-muted)]">Bar color:</span>
                      <code className="font-mono text-xs text-[var(--text-main)]">{bgColor}</code>
                    </div>
                  )}

                  {fitMode === "crop" && (
                    <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">
                      Drag crosshair on the monitor to frame action.
                    </p>
                  )}
                </div>

                {/* Collapsed Advanced Section */}
                <details className="border-t border-[var(--color-hairline)] pt-3 text-xs">
                  <summary className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-[11px] select-none mb-2">
                    + Advanced Options (Resolution, Format, CRF)
                  </summary>
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[var(--text-muted)] mb-1">Resolution</label>
                        <select
                          value={resolution}
                          onChange={(e) => setResolution(e.target.value as any)}
                          className="w-full px-2.5 py-1.5 rounded-xl glass-pill text-xs text-[var(--text-main)] outline-none"
                        >
                          <option value="720p">720p (Fastest)</option>
                          <option value="1080p">1080p (Standard HD)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[var(--text-muted)] mb-1">Format</label>
                        <select
                          value={format}
                          onChange={(e) => setFormat(e.target.value as any)}
                          className="w-full px-2.5 py-1.5 rounded-xl glass-pill text-xs text-[var(--text-main)] outline-none"
                        >
                          <option value="mp4">MP4 (H.264)</option>
                          <option value="webm">WebM (VP9)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                        <span>Quality (CRF)</span>
                        <span className="font-mono text-[var(--text-main)]">{quality}</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="28"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                        className="w-full accent-[#c89c6e]"
                      />
                    </div>
                  </div>
                </details>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-600 dark:text-red-400">
                    <p className="font-semibold mb-0.5">Encoding Error</p>
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Processing State: Progress bar, real percentage, real ETA */}
                {isProcessing && (
                  <div className="p-4 rounded-2xl glass-panel space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-main)] font-medium">{statusText}</span>
                      <span className="font-mono text-[#c89c6e] font-bold">
                        {progress > 0 ? `${progress}%` : "Processing"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#dfb58a] via-[#c89c6e] to-[#9e7149] transition-all duration-300 rounded-full shadow-[0_0_12px_#c89c6e]"
                        style={{ width: `${Math.max(5, progress)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                      <span>{estimatedTime || "Processing locally..."}</span>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-red-500 hover:underline font-mono text-[10px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Done State: Success Card & Glowing Download Button */}
                {resultBlob && (
                  <div className="p-4 rounded-2xl glass-panel space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--text-main)]">Ready for Download</span>
                      <span className="font-mono text-[var(--text-muted)]">
                        {(resultBlob.blob.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>
                    <a
                      href={resultBlob.url}
                      download={resultBlob.filename}
                      className="w-full h-12 rounded-full btn-radiant-glow font-bold text-xs uppercase tracking-wider flex items-center justify-center shadow-lg"
                    >
                      Download Video ({resultBlob.filename})
                    </a>
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setResultBlob(null);
                          setProgress(0);
                        }}
                        className="hover:underline text-[var(--text-main)]"
                      >
                        Convert another
                      </button>
                      <span className="font-mono">100% Lossless copy</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PRIMARY CONVERT BUTTON (Illuminated Radiant Glow Pill like reference) */}
              <div className="pt-4 border-t border-[var(--color-hairline)]">
                {!resultBlob && !isProcessing && (
                  <button
                    type="button"
                    onClick={handleConvert}
                    className="w-full h-12 rounded-full btn-radiant-glow font-bold text-xs uppercase tracking-wider shadow-lg"
                  >
                    Convert to {ratioLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden by default: Details & Engine Logs bar (Shows ONLY on error or ?debug=1) */}
      {(isDebug || errorMessage) && (
        <details className="mt-4 rounded-2xl glass-panel text-xs overflow-hidden" open={Boolean(errorMessage)}>
          <summary className="px-4 py-2 cursor-pointer font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] select-none flex items-center justify-between">
            <span>Debug Diagnostics & Log Feed ({debugLogs.length} events)</span>
            <span className="text-[#c89c6e]">
              {coreInfo ? `${coreInfo.coreType.toUpperCase()} (${coreInfo.loadTimeMs}ms)` : "DEBUG MODE"}
            </span>
          </summary>
          <div className="p-4 border-t border-[var(--color-hairline)] space-y-2 text-[11px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2 border-b border-[var(--color-hairline)]">
              <div>
                <span className="text-[var(--text-muted)] block">Core Mode:</span>
                <strong>{coreInfo?.coreType || "Single-thread"}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Engine Load:</span>
                <strong>{coreInfo?.loadTimeMs ? `${coreInfo.loadTimeMs}ms` : "N/A"}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">crossOriginIsolated:</span>
                <strong>{isIsolated ? "Active (COOP/COEP on)" : "Inactive"}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Assets Origin:</span>
                <strong>Same-Origin (/public/ffmpeg/)</strong>
              </div>
            </div>

            {lastExecutedCommand && (
              <div>
                <span className="text-[var(--text-muted)] block font-mono text-[10px] mb-1">Last Executed FFmpeg Command:</span>
                <code className="text-[var(--text-main)] bg-black/20 p-2 rounded-lg text-[10px] block break-all font-mono border border-[var(--color-hairline)]">
                  {lastExecutedCommand}
                </code>
              </div>
            )}

            <div>
              <span className="text-[var(--text-muted)] block mb-1">Recent Engine Logs:</span>
              <pre className="bg-[#141311] text-emerald-400 p-2.5 rounded-xl font-mono text-[10px] leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap select-all">
                {debugLogs.length > 0 ? debugLogs.slice(-20).join("\n") : "Awaiting job..."}
              </pre>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

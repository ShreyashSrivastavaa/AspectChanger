"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import CometDial from "./CometDial";
import NervousCatcher from "./NervousCatcher";
import Dropdown from "./Dropdown";
import { convertVideo, cancelConversion, isCancelledError, ConvertError } from "@/lib/video-engine";
import { PRESET_GROUPS, findPreset, findPresetGroup, type SizePreset } from "@/lib/video-presets";

const MAX_CUSTOM_RATIO = 4;
const DEFAULT_PRESET_ID = "instagram-reels";

const parseRatioPart = (value: string) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

interface VideoProcessorProps {
  initialRatio?: { w: number; h: number };
  initialPlatform?: string;
}

export default function VideoProcessor({ initialRatio }: VideoProcessorProps) {
  const tHero = useTranslations("hero");
  const tEditor = useTranslations("editor");
  const tTool = useTranslations("home.tool");
  const tErrors = useTranslations("home.errors");
  const presetNames = useTranslations("home").raw("presets") as Record<string, string>;
  const presetName = (name: string) => presetNames[name] ?? name;

  // Hydration & debug state
  const [mounted, setMounted] = useState(false);
  const [isDebug, setIsDebug] = useState(false);

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<{ width: number; height: number; duration: number } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Settings state
  // Portrait entry points start on Instagram Reels; other ratios keep what the page asked for.
  const startsOnDefaultPreset = !initialRatio || initialRatio.w * 16 === initialRatio.h * 9;
  const [targetRatio, setTargetRatio] = useState<{ w: number; h: number }>(
    initialRatio || { w: 9, h: 16 }
  );
  const [customW, setCustomW] = useState<string>("16");
  const [customH, setCustomH] = useState<string>("9");
  const [isCustom, setIsCustom] = useState(false);
  const [presetId, setPresetId] = useState<string | null>(startsOnDefaultPreset ? DEFAULT_PRESET_ID : null);
  const activePreset = findPreset(presetId);
  const activeGroup = findPresetGroup(presetId);
  // Stays set when a ratio chip clears the preset, so Size can always be opened.
  const [platformId, setPlatformId] = useState(PRESET_GROUPS[0].id);
  const platform = PRESET_GROUPS.find((group) => group.id === platformId) ?? PRESET_GROUPS[0];

  // Fit mode: 'blur' | 'crop' | 'color' (Bars)
  const [fitMode, setFitMode] = useState<"blur" | "crop" | "color">("blur");
  const [focalX, setFocalX] = useState(0.5);
  const [focalY, setFocalY] = useState(0.5);
  const [zoom, setZoom] = useState(1);
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
  const [lastEncodeSummary, setLastEncodeSummary] = useState<string>("");

  // Drag state for focal point
  const [isDraggingFocal, setIsDraggingFocal] = useState(false);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewBoxRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
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
    };
  }, [videoSrc]);

  useEffect(() => {
    return () => {
      if (resultBlob?.url) URL.revokeObjectURL(resultBlob.url);
    };
  }, [resultBlob]);

  useEffect(() => {
    return () => {
      void cancelConversion();
    };
  }, []);

  const parsedCustomW = parseRatioPart(customW);
  const parsedCustomH = parseRatioPart(customH);
  const customRatioValid =
    parsedCustomW !== null &&
    parsedCustomH !== null &&
    parsedCustomW / parsedCustomH <= MAX_CUSTOM_RATIO &&
    parsedCustomH / parsedCustomW <= MAX_CUSTOM_RATIO;
  const customRatioInvalid = isCustom && !customRatioValid;
  const useCustomRatio = isCustom && customRatioValid;
  const currentRatioW = useCustomRatio ? parsedCustomW : targetRatio.w;
  const currentRatioH = useCustomRatio ? parsedCustomH : targetRatio.h;
  const ratioLabel = activePreset?.ratio ?? `${currentRatioW}:${currentRatioH}`;

  // A finished result or old error no longer describes the settings once they change.
  useEffect(() => {
    setResultBlob(null);
    setErrorMessage(null);
  }, [currentRatioW, currentRatioH, presetId, fitMode, focalX, focalY, zoom, bgColor, resolution, format, quality]);

  const applyPreset = (preset: SizePreset) => {
    setIsCustom(false);
    setPresetId(preset.id);
    setPlatformId(findPresetGroup(preset.id)?.id ?? PRESET_GROUPS[0].id);
    setTargetRatio({ w: preset.width, h: preset.height });
  };

  // Size links on the page use #size=<preset id> to load a preset into the tool.
  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#size=(.+)$/);
      if (!match) return;
      const preset = findPreset(match[1]);
      if (preset && !isProcessing) {
        applyPreset(preset);
        document.getElementById("tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [isProcessing]);

  const handleFile = (selectedFile: File) => {
    setErrorMessage(null);
    setResultBlob(null);

    if (selectedFile.size > 500 * 1024 * 1024) {
      setErrorMessage(tErrors("tooLarge"));
      return;
    }

    const validExts = [".mp4", ".mov", ".webm", ".mkv"];
    const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();
    if (!validExts.includes(ext) && !selectedFile.type.startsWith("video/")) {
      setErrorMessage(tErrors("unsupportedFormat"));
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
        if (!initialRatio && !presetId) {
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
    if (fitMode !== "crop" || isProcessing || !previewBoxRef.current) return;
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
    if (!file || customRatioInvalid) return;

    setIsProcessing(true);
    setProgress(0);
    setStatusText(tTool("preparing"));
    setErrorMessage(null);
    setResultBlob(null);
    setEstimatedTime(tTool("estimating"));

    const startTime = Date.now();
    let hasUpdatedProgress = false;

    try {
      const { blob, filename, summary } = await convertVideo({
        file,
        targetW: currentRatioW,
        targetH: currentRatioH,
        fitMode,
        focalX,
        focalY,
        zoom: fitMode === "crop" ? zoom : 1,
        outputSize: activePreset ? { width: activePreset.width, height: activePreset.height } : undefined,
        bgColor,
        resolution,
        format,
        quality,
        onProgress: (pct, etaSeconds) => {
          setProgress(pct);
          setStatusText(etaSeconds === null && pct <= 1 ? tTool("encodingStart") : tTool("encoding", { pct }));
          if (etaSeconds !== null) setEstimatedTime(tTool("etaRemaining", { seconds: etaSeconds }));
        },
      });

      const url = URL.createObjectURL(blob);
      setResultBlob({ blob, url, filename });
      setLastEncodeSummary(summary);
      setProgress(100);
      setStatusText(tTool("complete"));
      setEstimatedTime(null);
    } catch (err: any) {
      if (isCancelledError(err)) return;
      console.error("Conversion failed:", err);
      setErrorMessage(err instanceof ConvertError ? tErrors(err.code, err.values) : tErrors("generic"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    void cancelConversion();
    setIsProcessing(false);
    setProgress(0);
    setStatusText(tTool("cancelled"));
    setEstimatedTime(null);
  };

  const ratioOptions = [
    { label: "9:16", w: 9, h: 16, caption: tTool("capVertical") },
    { label: "16:9", w: 16, h: 9, caption: tTool("capLandscape") },
    { label: "1:1", w: 1, h: 1, caption: tTool("capSquare") },
    { label: "4:5", w: 4, h: 5, caption: tTool("capPortrait") },
  ];

  return (
    <div className="w-full" suppressHydrationWarning>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/x-matroska,.mkv"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
          // Lets the same file be picked again.
          e.target.value = "";
        }}
      />

      {/* STATE 1: EMPTY STATE — Architectural Frosted Glass Hero Card (Progria Nova styling) */}
      {!file ? (
        <div
          suppressHydrationWarning
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full max-w-2xl mx-auto glass-panel flex items-center justify-center py-8 sm:py-10 px-6 sm:px-12 text-center cursor-pointer transition-all duration-300 group rounded-[32px] ${
            isDraggingOver
              ? "border-[#c89c6e] scale-[1.01] shadow-[0_0_50px_rgba(200,156,110,0.35)]"
              : "hover:border-white dark:hover:border-white/30 hover:shadow-[0_30px_70px_-10px_rgba(140,110,80,0.22)]"
          }`}
        >
          {/* Top-Right Frosted Glass Reticle Icon (matching reference) */}
          <div className="absolute top-5 right-6 w-5 h-5 rounded-full border border-white/80 dark:border-white/20 flex items-center justify-center opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c89c6e]" />
          </div>

          {/* Viewfinder Camera Corner Marks in Champagne Gold */}
          <div className="viewfinder-corner viewfinder-tl" />
          <div className="viewfinder-corner viewfinder-tr" />
          <div className="viewfinder-corner viewfinder-bl" />
          <div className="viewfinder-corner viewfinder-br" />

          <div className="max-w-md mx-auto space-y-3">
            {/* Elegant Frosted Frame Icon with Metallic Gold Ripple */}
            <div className="flex justify-center">
              <div className="relative w-14 h-14 rounded-2xl glass-pill flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="6" width="24" height="20" rx="3" stroke="#a89b8d" strokeWidth="1.2" strokeDasharray="3 2" />
                  <rect x="11" y="4" width="10" height="24" rx="2" stroke="#c89c6e" strokeWidth="1.6" />
                  <circle cx="16" cy="16" r="1.5" fill="#c89c6e" />
                </svg>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-main)]">
              {tHero("dropTitle")}
            </p>

            {activePreset && activeGroup && (
              <p className="font-mono text-[11px] text-[var(--accent-text)]">
                {tTool("selected", { name: `${presetName(activeGroup.name)} ${presetName(activePreset.label)} · ${activePreset.width}×${activePreset.height}` })}
              </p>
            )}

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-8 py-3 rounded-full btn-radiant-glow text-xs sm:text-sm font-semibold tracking-wide shadow-xl group-hover:scale-105 transition-all">
                {tHero("chooseFile")}
              </span>
            </div>

            <p className="font-mono text-[11px] text-[var(--text-muted)] pt-1 tracking-widest uppercase">
              {tHero("supportedFormats")}
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
                  {tEditor("canvas")}: {ratioLabel}
                </span>
                <span className="text-neutral-400">
                  {videoMetadata ? `${videoMetadata.width}×${videoMetadata.height} (${videoMetadata.duration.toFixed(1)}s)` : tEditor("probing")}
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
                          ? {
                              objectPosition: `${focalX * 100}% ${focalY * 100}%`,
                              transform: `scale(${zoom})`,
                              transformOrigin: `${focalX * 100}% ${focalY * 100}%`,
                            }
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
                  disabled={isProcessing}
                  className="font-mono text-[11px] text-[#e8c7a2] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tEditor("changeClip")}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Frosted Glass Controls Panel */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                
                {/* Settings are locked mid-encode so the result always matches what is shown. */}
                <fieldset disabled={isProcessing} className="space-y-6 min-w-0 disabled:opacity-60">
                {/* 1. RATIO SELECTOR (Frosted Glass Chips) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {tTool("resizeFor")}
                    </label>
                    <span className="font-mono text-xs font-bold text-[var(--accent-text)]">
                      {ratioLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Dropdown
                      label={tTool("platform")}
                      value={platform.id}
                      options={PRESET_GROUPS.map((group) => ({ value: group.id, label: presetName(group.name) }))}
                      onChange={(id) => {
                        const group = PRESET_GROUPS.find((g) => g.id === id);
                        if (group) applyPreset(group.presets[0]);
                      }}
                    />
                    <Dropdown
                      label={tTool("size")}
                      placeholder={tTool("size")}
                      value={presetId}
                      options={platform.presets.map((preset) => ({
                        value: preset.id,
                        label: presetName(preset.label),
                        hint: preset.ratio,
                      }))}
                      onChange={(id) => {
                        const preset = findPreset(id);
                        if (preset) applyPreset(preset);
                      }}
                    />
                  </div>

                  {activePreset && (
                    <p className="mb-2 font-mono text-[11px] text-[var(--text-muted)]">
                      {tTool("exportsAt", { size: `${activePreset.width}×${activePreset.height}` })}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {ratioOptions.map((opt) => {
                      const isSelected = !isCustom && !presetId && targetRatio.w === opt.w && targetRatio.h === opt.h;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => {
                            setIsCustom(false);
                            setPresetId(null);
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
                      onClick={() => {
                        setPresetId(null);
                        setIsCustom(true);
                      }}
                      className={`p-3 rounded-2xl text-left transition-all duration-200 ${
                        isCustom
                          ? "bg-white/90 dark:bg-white/15 border border-[#c89c6e] text-[var(--text-main)] shadow-[0_4px_16px_rgba(200,156,110,0.25)] font-semibold"
                          : "glass-pill text-[var(--text-main)] opacity-85 hover:opacity-100"
                      }`}
                    >
                      <div className="font-mono text-xs mb-0.5">{tTool("custom")}</div>
                      <div className="text-[10px] text-[var(--text-muted)] leading-tight">{tTool("dimensions")}</div>
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

                  {customRatioInvalid && (
                    <p className="mt-1.5 text-[11px] text-red-600 dark:text-red-400">
                      {tTool("invalidRatio")}
                    </p>
                  )}
                </div>

                {/* 2. FIT SEGMENTED CONTROL (Frosted Glass Toggle) */}
                <div>
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    {tTool("fittingMode")}
                  </label>
                  <div className="grid grid-cols-3 p-1 rounded-full glass-pill">
                    {[
                      { id: "blur", label: tEditor("blur") },
                      { id: "crop", label: tEditor("crop") },
                      { id: "color", label: tEditor("bars") },
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
                      <span className="text-xs text-[var(--text-muted)]">{tTool("barColor")}</span>
                      <code className="font-mono text-xs text-[var(--text-main)]">{bgColor}</code>
                    </div>
                  )}

                  {fitMode === "crop" && (
                    <div className="mt-2 space-y-2">
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {tTool("cropHint")}
                      </p>
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                          <label htmlFor="crop-zoom">{tTool("zoom")}</label>
                          <span className="font-mono text-[var(--text-main)]">{Math.round(zoom * 100)}%</span>
                        </div>
                        <input
                          id="crop-zoom"
                          type="range"
                          min="1"
                          max="3"
                          step="0.05"
                          value={zoom}
                          onChange={(e) => setZoom(parseFloat(e.target.value))}
                          className="w-full accent-[#c89c6e]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setZoom(1);
                          setFocalX(0.5);
                          setFocalY(0.5);
                        }}
                        className="font-mono text-[11px] text-[var(--accent-text)] hover:underline"
                      >
                        {tTool("resetFraming")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Collapsed Advanced Section */}
                <details className="border-t border-[var(--color-hairline)] pt-3 text-xs">
                  <summary className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-[11px] select-none mb-2">
                    {tTool("advanced")}
                  </summary>
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[var(--text-muted)] mb-1">{tTool("resolution")}</label>
                        <Dropdown
                          label={tTool("resolution")}
                          value={resolution}
                          disabled={!!activePreset}
                          options={[
                            { value: "720p", label: tTool("res720") },
                            { value: "1080p", label: tTool("res1080") },
                            { value: "original", label: tTool("resOriginal") },
                          ]}
                          onChange={(v) => setResolution(v as typeof resolution)}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[var(--text-muted)] mb-1">{tTool("format")}</label>
                        <Dropdown
                          label={tTool("format")}
                          value={format}
                          options={[
                            { value: "mp4", label: "MP4 (H.264)" },
                            { value: "webm", label: "WebM (VP9)" },
                          ]}
                          onChange={(v) => setFormat(v as typeof format)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                        <span>{tTool("quality")}</span>
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
                </fieldset>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-600 dark:text-red-400">
                    <p className="font-semibold mb-0.5">{tErrors("title")}</p>
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Processing State: CometDial circular progress, real percentage, ETA, and cancellation (matching Image 1) */}
                {isProcessing && (
                  <div className="p-5 rounded-3xl glass-panel space-y-3 flex flex-col items-center justify-center text-center shadow-lg">
                    <div className="text-xs font-semibold tracking-wide text-[var(--text-main)]">
                      {statusText || tEditor("renderingFrames")}
                    </div>

                    <div className="py-1">
                      <CometDial
                        value={progress}
                        min={0}
                        max={100}
                        step={1}
                        unit="%"
                        label={tTool("progressAria")}
                        accent="#c89c6e"
                        ink="#dfb58a"
                        size={170}
                        sweep={320}
                        thickness={6}
                        speed={35}
                        cometReach={160}
                        cometWidth={10}
                        disabled={false}
                      />
                    </div>

                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--color-hairline)] px-2">
                      <span>{estimatedTime || tEditor("processingLocally")}</span>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-red-500 hover:text-red-600 hover:underline font-mono text-[11px] font-semibold transition-colors"
                      >
                        {tEditor("cancel")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Done State: Success Card & StickMan Nervous Catcher */}
                {resultBlob && (
                  <div className="p-4 rounded-3xl glass-panel shadow-lg">
                    <NervousCatcher
                      blobUrl={resultBlob.url}
                      filename={resultBlob.filename}
                      fileSize={resultBlob.blob.size}
                      onConvertAnother={() => {
                        setResultBlob(null);
                        setProgress(0);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 3. PRIMARY CONVERT BUTTON (Illuminated Radiant Glow Pill like reference) */}
              <div className="pt-4 border-t border-[var(--color-hairline)]">
                {!resultBlob && !isProcessing && (
                  <button
                    type="button"
                    onClick={handleConvert}
                    disabled={customRatioInvalid}
                    className="w-full h-12 rounded-full btn-radiant-glow font-bold text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tTool("convertTo", { ratio: ratioLabel })}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejected uploads never reach the workspace, so their error is shown here. */}
      {!file && errorMessage && (
        <div role="alert" className="mt-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Encode settings, shown only with ?debug=1 */}
      {isDebug && (
        <details className="mt-4 rounded-2xl glass-panel text-xs overflow-hidden">
          <summary className="px-4 py-2 cursor-pointer font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] select-none">
            Debug: last encode
          </summary>
          <code className="block p-4 border-t border-[var(--color-hairline)] font-mono text-[10px] break-all text-[var(--text-main)]">
            {lastEncodeSummary || "Awaiting job..."}
          </code>
        </details>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, RefreshCw, Layers } from "lucide-react";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function AspectRatioCalculatorWidget() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [newWidth, setNewWidth] = useState<number>(1080);
  const [newHeight, setNewHeight] = useState<number>(608);

  const safeW = Math.max(1, Math.round(width || 1));
  const safeH = Math.max(1, Math.round(height || 1));

  const divisor = gcd(safeW, safeH);
  const ratioW = safeW / divisor;
  const ratioH = safeH / divisor;
  const decimal = (safeW / safeH).toFixed(4);

  const calculateProportionalHeight = (w: number) => {
    return Math.round((w / (safeW / safeH)) / 2) * 2;
  };

  const calculateProportionalWidth = (h: number) => {
    return Math.round((h * (safeW / safeH)) / 2) * 2;
  };

  return (
    <div className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--color-hairline)] pb-4">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-[#c89c6e]" />
          <h2 className="text-base sm:text-lg font-semibold text-[var(--text-main)]">
            Interactive Aspect Ratio & Resolution Calculator
          </h2>
        </div>
        <div className="font-mono text-xs text-[#c89c6e] font-bold px-2.5 py-1 rounded-full bg-[#c89c6e]/10">
          Even-Integer Mode
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Input Dimensions */}
        <div className="space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Base Resolution (Pixels)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-[11px] text-[var(--text-muted)] mb-1">Width</span>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-[var(--text-main)] focus:outline-none focus:border-[#c89c6e]"
              />
            </div>
            <div>
              <span className="block text-[11px] text-[var(--text-muted)] mb-1">Height</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-[var(--text-main)] focus:outline-none focus:border-[#c89c6e]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => { setWidth(1920); setHeight(1080); }}
              className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              1080p (16:9)
            </button>
            <button
              onClick={() => { setWidth(1080); setHeight(1920); }}
              className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Vertical (9:16)
            </button>
            <button
              onClick={() => { setWidth(1080); setHeight(1080); }}
              className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Square (1:1)
            </button>
            <button
              onClick={() => { setWidth(3840); setHeight(2160); }}
              className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              4K UHD
            </button>
          </div>
        </div>

        {/* Calculated Ratio Result */}
        <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Derived Proportions
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-mono font-bold text-[#c89c6e]">
              {ratioW}:{ratioH}
            </span>
            <span className="font-mono text-sm text-[var(--text-muted)]">
              ({decimal}:1)
            </span>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Total Pixel Volume: <span className="font-mono text-[var(--text-main)]">{(safeW * safeH).toLocaleString()} px</span> ({((safeW * safeH) / 1000000).toFixed(2)} Megapixels)
          </div>
        </div>
      </div>

      {/* Resize Scaling Calculator */}
      <div className="border-t border-[var(--color-hairline)] pt-5 space-y-4">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          Proportional Scaler (Keeps Exact Aspect Ratio)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 space-y-2">
            <span className="text-xs font-semibold text-[var(--text-main)]">Scale by Width</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newWidth}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setNewWidth(val);
                  setNewHeight(calculateProportionalHeight(val));
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 font-mono text-xs text-[var(--text-main)]"
                placeholder="Width"
              />
              <ArrowRight className="w-4 h-4 text-[#c89c6e] shrink-0" />
              <div className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-[#c89c6e] font-bold">
                {calculateProportionalHeight(newWidth)} px
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 space-y-2">
            <span className="text-xs font-semibold text-[var(--text-main)]">Scale by Height</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newHeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setNewHeight(val);
                  setNewWidth(calculateProportionalWidth(val));
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 font-mono text-xs text-[var(--text-main)]"
                placeholder="Height"
              />
              <ArrowRight className="w-4 h-4 text-[#c89c6e] shrink-0" />
              <div className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-[#c89c6e] font-bold">
                {calculateProportionalWidth(newHeight)} px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


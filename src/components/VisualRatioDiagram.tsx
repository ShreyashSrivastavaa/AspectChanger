import React from "react";

interface VisualRatioDiagramProps {
  fromW: number;
  fromH: number;
  toW: number;
  toH: number;
  fromLabel: string;
  toLabel: string;
}

export default function VisualRatioDiagram({
  fromW,
  fromH,
  toW,
  toH,
  fromLabel,
  toLabel,
}: VisualRatioDiagramProps) {
  const boxSize = 180;

  const fromScale = Math.min((boxSize - 20) / fromW, (boxSize - 20) / fromH);
  const fromBoxW = Math.round(fromW * fromScale);
  const fromBoxH = Math.round(fromH * fromScale);

  const toScale = Math.min((boxSize - 20) / toW, (boxSize - 20) / toH);
  const toBoxW = Math.round(toW * toScale);
  const toBoxH = Math.round(toH * toScale);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-[var(--color-hairline)] text-xs text-[var(--text-muted)]">
        <span className="font-mono uppercase text-[9px] tracking-wider">Geometry Mapping</span>
        <span className="font-mono text-xs text-[var(--text-main)]">{fromLabel} &rarr; {toLabel}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Source Box */}
        <div className="flex flex-col items-center">
          <div 
            className="w-full max-w-[200px] h-[150px] bg-[var(--bg-page)] border border-[var(--color-hairline)] rounded flex items-center justify-center relative p-2"
          >
            <div 
              style={{ width: `${fromBoxW}px`, height: `${fromBoxH}px` }}
              className="border border-[var(--text-main)] bg-[var(--panel-bg)] rounded-sm flex flex-col items-center justify-center relative transition-all"
            >
              <span className="font-mono text-xs font-semibold text-[var(--text-main)]">
                {fromLabel}
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)]">
                Source
              </span>
            </div>
            <div className="absolute top-1 left-1.5 font-mono text-[8px] text-[var(--text-muted)]">0,0</div>
            <div className="absolute bottom-1 right-1.5 font-mono text-[8px] text-[var(--text-muted)]">{fromW}:{fromH}</div>
          </div>
          <span className="font-mono text-[11px] mt-1.5 text-[var(--text-muted)]">
            Original ({fromLabel})
          </span>
        </div>

        {/* Target Box */}
        <div className="flex flex-col items-center">
          <div 
            className="w-full max-w-[200px] h-[150px] bg-[#c89c6e]/5 border border-[#c89c6e]/30 rounded-xl flex items-center justify-center relative p-2 shadow-sm"
          >
            <div 
              style={{ width: `${toBoxW}px`, height: `${toBoxH}px` }}
              className="border-2 border-[#c89c6e] bg-[var(--panel-bg)] rounded flex flex-col items-center justify-center relative transition-all shadow-[0_0_12px_rgba(200,156,110,0.2)]"
            >
              <span className="font-mono text-xs font-semibold text-[#c89c6e]">
                {toLabel}
              </span>
              <span className="font-mono text-[9px] text-[#c89c6e]/80">
                Target Reframe
              </span>
            </div>
            <div className="absolute top-1 left-1.5 font-mono text-[8px] text-[#c89c6e]/70">0,0</div>
            <div className="absolute bottom-1 right-1.5 font-mono text-[8px] text-[#c89c6e]/70">{toW}:{toH}</div>
          </div>
          <span className="font-mono text-[11px] mt-1.5 text-[var(--text-muted)]">
            Target Canvas ({toLabel})
          </span>
        </div>
      </div>
    </div>
  );
}

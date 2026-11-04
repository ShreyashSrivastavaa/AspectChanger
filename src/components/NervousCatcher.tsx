"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import "./NervousCatcher.css";

interface NervousCatcherProps {
  blobUrl: string;
  filename: string;
  fileSize: number;
  onConvertAnother?: () => void;
  className?: string;
}

// Procedural Web Audio Foley synthesizer
class OddlyFoley {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Set<AudioScheduledSourceNode>();

  start() {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.context ??= new AudioCtx();
    if (!this.master && this.context) {
      this.master = this.context.createGain();
      this.master.gain.value = 1.6;
      this.master.connect(this.context.destination);
    }
    this.context?.resume().catch(() => {});
  }

  stop() {
    for (const source of this.voices) {
      try {
        source.stop();
      } catch {}
    }
    this.voices.clear();
  }

  close() {
    this.stop();
    this.context?.close().catch(() => {});
    this.context = null;
    this.master = null;
  }

  layer({
    duration = 0.1,
    volume = 0.1,
    frequency = 800,
    end = frequency,
    delay = 0,
    noise = true,
    q = 0.7,
    attack = 0.004,
    pulse = 0,
  }: {
    duration?: number;
    volume?: number;
    frequency?: number;
    end?: number;
    delay?: number;
    noise?: boolean;
    q?: number;
    attack?: number;
    pulse?: number;
  }) {
    const c = this.context;
    if (!c || c.state !== "running" || !this.master) return;
    const at = c.currentTime + delay;
    const g = c.createGain();
    const f = c.createBiquadFilter();
    let s: AudioScheduledSourceNode;

    if (noise) {
      const src = c.createBufferSource();
      const b = c.createBuffer(1, Math.ceil(c.sampleRate * duration), c.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        const t = i / c.sampleRate;
        d[i] = (Math.random() * 2 - 1) * (pulse ? 0.3 + 0.7 * Math.pow(Math.sin(t * pulse * Math.PI), 2) : 1);
      }
      src.buffer = b;
      s = src;
    } else {
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, at);
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, end), at + duration);
      s = osc;
    }

    f.type = noise ? "bandpass" : "lowpass";
    f.Q.value = q;
    f.frequency.setValueAtTime(noise ? frequency : 1800, at);
    if (noise) f.frequency.exponentialRampToValueAtTime(Math.max(1, end), at + duration);

    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(volume, at + Math.min(attack, duration * 0.4));
    g.gain.exponentialRampToValueAtTime(0.0001, at + duration);

    s.connect(f).connect(g).connect(this.master);
    this.voices.add(s);
    s.onended = () => {
      this.voices.delete(s);
      try {
        s.disconnect();
        f.disconnect();
        g.disconnect();
      } catch {}
    };
    s.start(at);
    s.stop(at + duration);
  }

  play(name: string) {
    const n = (duration: number, volume: number, frequency: number, end = frequency, extra = {}) =>
      this.layer({ duration, volume, frequency, end, ...extra });
    const thud = (v = 0.22) => {
      n(0.16, v, 95, 42, { noise: false });
      n(0.065, v * 0.6, 320);
    };

    switch (name) {
      case "step":
        n(0.055, 0.075, 520);
        break;
      case "scuff":
        n(0.14, 0.1, 950, 450, { pulse: 35 });
        break;
      case "strain":
        n(0.38, 0.065, 260, 430, { q: 5, pulse: 27 });
        n(0.3, 0.05, 850, 550, { pulse: 40 });
        break;
      case "land":
        thud();
        break;
      case "heavy":
        thud(0.32);
        n(0.25, 0.1, 180, 80);
        break;
      case "air":
        n(0.4, 0.12, 700, 2400, { attack: 0.14 });
        break;
    }
  }
}

// Keyframes & Poses
type PoseKey =
  | "peek"
  | "stand"
  | "ready"
  | "left"
  | "right"
  | "confident"
  | "panic"
  | "squashed"
  | "lift"
  | "carry"
  | "stepL"
  | "stepR"
  | "push"
  | "spent"
  | "proud";

const POSES: Record<PoseKey, [number, number][]> = {
  peek: [[-5, -42], [-3, -31], [0, -15], [-13, -24], [-18, -40], [8, -22], [15, -39], [-10, -8], [-16, 0], [7, -8], [15, 0]],
  stand: [[0, -67], [0, -56], [0, -29], [-8, -43], [-8, -31], [9, -43], [10, -32], [-5, -14], [-10, 0], [6, -14], [11, 0]],
  ready: [[0, -68], [0, -56], [0, -29], [-19, -49], [-28, -65], [19, -49], [28, -65], [-9, -14], [-17, 0], [9, -14], [17, 0]],
  left: [[-6, -67], [-4, -55], [0, -28], [-22, -48], [-29, -65], [14, -47], [25, -64], [-15, -17], [-26, 0], [6, -13], [17, 0]],
  right: [[6, -67], [4, -55], [0, -28], [-14, -47], [-25, -64], [22, -48], [29, -65], [-6, -13], [-17, 0], [15, -17], [26, 0]],
  confident: [[0, -70], [0, -58], [0, -30], [-20, -56], [-27, -72], [20, -56], [27, -72], [-8, -15], [-17, 0], [8, -15], [17, 0]],
  panic: [[0, -63], [0, -51], [0, -26], [-21, -60], [-24, -82], [21, -60], [24, -82], [-16, -14], [-26, 0], [16, -14], [26, 0]],
  squashed: [[0, -13], [0, -9], [0, -5], [-12, -7], [-20, -5], [12, -7], [20, -5], [-19, -5], [-30, 0], [19, -5], [30, 0]],
  lift: [[0, -39], [0, -28], [0, -15], [-22, -22], [-23, -46], [22, -22], [23, -46], [-16, -8], [-25, 0], [16, -8], [25, 0]],
  carry: [[0, -55], [0, -43], [0, -24], [-25, -39], [-24, -67], [25, -39], [24, -67], [-11, -12], [-18, 0], [11, -12], [18, 0]],
  stepL: [[-3, -54], [-2, -42], [0, -24], [-27, -38], [-26, -66], [23, -38], [22, -66], [-14, -14], [-24, 0], [8, -9], [15, -3]],
  stepR: [[3, -54], [2, -42], [0, -24], [-23, -38], [-22, -66], [27, -38], [26, -66], [-8, -9], [-15, -3], [14, -14], [24, 0]],
  push: [[9, -57], [7, -45], [13, -26], [-12, -49], [-33, -63], [-7, -38], [-32, -51], [0, -14], [-14, 0], [22, -14], [29, 0]],
  spent: [[-8, -49], [-3, -37], [3, -23], [-12, -23], [-15, -14], [8, -23], [12, -13], [-5, -11], [-13, 0], [12, -11], [20, 0]],
  proud: [[0, -64], [0, -52], [0, -27], [-12, -39], [-13, -28], [14, -48], [18, -62], [-6, -14], [-13, 0], [7, -14], [14, 0]],
};

type KeyPoint = [number, PoseKey, number, number, number];

const KEYS: KeyPoint[] = [
  [0, "peek", 402, 335, 0],
  [0.25, "peek", 420, 328, 1],
  [0.55, "stand", 448, 328, 1],
  [0.85, "ready", 467, 328, 1],
  [1.18, "left", 447, 328, 1],
  [1.4, "ready", 447, 328, 1],
  [1.75, "right", 500, 328, 1],
  [1.95, "ready", 500, 328, 1],
  [2.2, "left", 476, 328, 1],
  [2.45, "confident", 484, 328, 1],
  [2.85, "confident", 484, 328, 1],
  [3.08, "panic", 484, 328, 1],
  [3.22, "panic", 484, 328, 1],
  [3.36, "squashed", 484, 328, 1],
  [4.05, "squashed", 484, 328, 1],
  [4.45, "lift", 484, 328, 1],
  [4.85, "carry", 484, 328, 1],
  [5.15, "stepL", 476, 328, 1],
  [5.43, "stepR", 465, 328, 1],
  [5.71, "stepL", 454, 328, 1],
  [5.98, "stepR", 443, 328, 1],
  [6.22, "carry", 437, 328, 1],
  [6.52, "push", 437, 328, 1],
  [6.82, "spent", 443, 328, 1],
  [7.24, "spent", 443, 328, 1],
  [7.52, "proud", 443, 328, 1],
  [8.92, "proud", 443, 328, 1],
  [9.45, "peek", 408, 337, 0],
];

const CUES: [number, string][] = [
  [0.48, "step"],
  [0.78, "step"],
  [1.14, "scuff"],
  [1.62, "scuff"],
  [2.12, "scuff"],
  [2.9, "air"],
  [3.36, "heavy"],
  [4.16, "strain"],
  [4.95, "step"],
  [5.23, "step"],
  [5.51, "step"],
  [5.79, "step"],
  [6.3, "scuff"],
  [6.72, "land"],
];

const DURATION = 9.5;

function clamp(x: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, x));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smooth(x: number) {
  x = clamp(x);
  return x * x * (3 - 2 * x);
}

function interval(t: number, a: number, b: number) {
  return clamp((t - a) / (b - a));
}

function limbPath(a: [number, number], b: [number, number], c: [number, number], bend = 1) {
  return `M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2 + bend} ${(a[1] + b[1]) / 2} ${b[0]} ${b[1]} Q${(b[0] + c[0]) / 2 - bend} ${(b[1] + c[1]) / 2} ${c[0]} ${c[1]}`;
}

export default function NervousCatcher({
  blobUrl,
  filename,
  fileSize,
  onConvertAnother,
  className = "",
}: NervousCatcherProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `nc-clip-${safeId}`;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const foleyRef = useRef<OddlyFoley | null>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(-0.01);
  const runningRef = useRef<boolean>(false);
  const deliveredRef = useRef<boolean>(false);

  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [captionText, setCaptionText] = useState<string>("Click button to summon download manager");
  const [isDelivered, setIsDelivered] = useState<boolean>(false);

  // Initialize foley
  useEffect(() => {
    foleyRef.current = new OddlyFoley();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      foleyRef.current?.close();
    };
  }, []);

  const poseAt = (t: number) => {
    let a = KEYS[0];
    let b = KEYS[1];
    for (let i = 0; i < KEYS.length - 1; i++) {
      a = KEYS[i];
      b = KEYS[i + 1];
      if (t <= b[0]) break;
    }
    const f = smooth(interval(t, a[0], b[0]));
    const points = POSES[a[1]].map((p, i) => [
      mix(p[0], POSES[b[1]][i][0], f),
      mix(p[1], POSES[b[1]][i][1], f),
    ]) as [number, number][];

    const shake = t > 4.05 && t < 4.85 ? Math.sin(t * 65) * 0.7 : 0;
    return {
      points,
      x: mix(a[2], b[2], f) + shake,
      y: mix(a[3], b[3], f),
      alpha: mix(a[4], b[4], f),
    };
  };

  const fileAt = (t: number, personPose: ReturnType<typeof poseAt>) => {
    if (t < 2.85) {
      return {
        x: 484 + Math.sin(t * 4) * 8,
        y: 60 + smooth(interval(t, 0.7, 2.85)) * 33,
        angle: Math.sin(t * 4) * 5,
      };
    }
    if (t < 3.36) {
      const f = interval(t, 2.85, 3.36);
      return { x: 484, y: 93 + 177 * f * f, angle: 0 };
    }
    if (t < 4.05) return { x: 484, y: 270, angle: 0 };
    if (t < 6.22) {
      const hand = personPose.points[4];
      return {
        x: personPose.x + (hand[0] + 24),
        y: personPose.y + hand[1] - 56,
        angle: t > 4.85 ? Math.sin(t * 13) * 4 : 0,
      };
    }
    const f = smooth(interval(t, 6.22, 6.78));
    return {
      x: mix(437, 355, f),
      y: mix(205, 294, f) - Math.sin(f * Math.PI) * 25,
      angle: Math.sin(f * Math.PI) * -18,
    };
  };

  const triggerRealDownload = () => {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderFrame = (t: number) => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (sel: string) => root.querySelector(sel) as HTMLElement | SVGElement | null;
    const attr = (el: Element | null, k: string, v: string | number) => el?.setAttribute(k, String(v));
    const opacity = (el: Element | null, v: number) => attr(el, "opacity", v);

    const p = poseAt(t);
    const v = p.points;
    const approval = smooth(interval(t, 7.28, 7.6)) * (1 - smooth(interval(t, 8.92, 9.14)));
    const tilt = t < 2.85 ? -9 : t < 3.36 ? 0 : t < 6.7 ? 7 : mix(13, -8, smooth(interval(t, 7.24, 7.6)));

    attr($("[data-head-group]"), "transform", `rotate(${tilt} ${v[0][0]} ${v[0][1]})`);
    opacity($("[data-thumb]"), approval);
    attr($("[data-thumb]"), "transform", `translate(${v[6][0]} ${v[6][1]}) scale(${0.8 + 0.2 * approval})`);

    const person = $("[data-person]");
    attr(person, "transform", `translate(${p.x} ${p.y})`);
    opacity(person, p.alpha);

    attr($("[data-head]"), "cx", v[0][0]);
    attr($("[data-head]"), "cy", v[0][1]);
    attr($("[data-face]"), "transform", `translate(${v[0][0]} ${v[0][1]})`);

    const neck = v[1];
    const hip = v[2];

    const prevPose = poseAt(Math.max(0, t - 0.14));
    const drift = clamp((prevPose.x - p.x) * 1.4, -13, 13);
    const flutter = Math.sin(t * 8 - 1) * (t > 4.05 && t < 6.7 ? 3 : 1.3);
    const tail = hip[0] - 24 + drift;

    attr(
      $("[data-cape]"),
      "d",
      `M${neck[0] - 2} ${neck[1] + 2} Q${neck[0] - 16 + drift} ${neck[1] + 8} ${tail} ${hip[1] + 8 + flutter} Q${tail + 8} ${hip[1] + 5} ${tail + 12} ${hip[1] + 12} Q${hip[0] - 3} ${hip[1] + 8} ${neck[0] + 3} ${neck[1] + 3} Z`
    );
    attr(
      $("[data-cape-fold]"),
      "d",
      `M${neck[0] - 4} ${neck[1] + 7} Q${hip[0] - 12 + drift / 2} ${hip[1] - 2} ${tail + 10} ${hip[1] + 7 + flutter / 2}`
    );
    attr($("[data-body]"), "d", `M${neck[0]} ${neck[1]} Q${neck[0] + 4} ${(neck[1] + hip[1]) / 2} ${hip[0]} ${hip[1]}`);
    attr($("[data-arm-left]"), "d", limbPath(neck, v[3], v[4], -2));
    attr($("[data-arm-right]"), "d", limbPath(neck, v[5], v[6], 2));
    attr($("[data-leg-left]"), "d", limbPath(hip, v[7], v[8], -1.8));
    attr($("[data-leg-right]"), "d", limbPath(hip, v[9], v[10], 1.8));

    for (const [side, hand, foot, direction] of [
      ["left", v[4], v[8], -1],
      ["right", v[6], v[10], 1],
    ] as const) {
      attr($(`[data-palm-${side}]`), "d", `M${hand[0] - 3} ${hand[1] + 2} q-2 -5 1 -5 q2 -1 3 2 l2 -1 q3 1 0 4 q-3 2 -6 0`);
      opacity($(`[data-palm-${side}]`), side === "right" ? 1 - approval : 1);
      attr($(`[data-foot-${side}]`), "d", `M${foot[0] - direction * 2} ${foot[1] - 3} q${direction * 4} -1 ${direction * 8} 2 q${direction * 2} 2 -1 2 h${-direction * 9} Z`);
    }

    const surprised = t > 2.92 && t < 3.4;
    const strained = t >= 3.4 && t < 6.7;
    const embarrassed = t >= 6.7;
    const eyeY = t < 2.92 ? -2 : 0;

    attr($("[data-face]"), "transform", `translate(${v[0][0]} ${v[0][1] + eyeY})`);
    attr($("[data-eyes]"), "d", strained ? "M-6 -2l3 2-3 1 M3 -2l-3 2 3 1" : surprised ? "M-5 -3v3 M2 -3v3" : "M-5 -1v.8 M2 -1v.8");
    attr($("[data-brows]"), "d", surprised ? "M-8 -6q3 -3 5 -1 M0 -7q3 -2 5 1" : strained ? "M-8 -5l5 2 M0 -3l5 -2" : embarrassed ? "M-8 -4q3 -2 5 0 M0 -5l5 2" : "M-8 -5q3 -2 5 0 M0 -6q3 -1 5 1");
    attr($("[data-mouth]"), "d", surprised ? "M-2 4q-3 0 -2 4q2 3 4 0q1 -4 -2 -4Z" : strained ? "M-5 6q4 -5 8 0l-1 2h-6Z" : embarrassed ? `M-5 5q4 ${mix(-1, 5, approval)} 8 -1` : "M-4 5q3 2 6 -1");
    opacity($("[data-cheeks]"), embarrassed ? 0.65 : 0);

    const sweat = $("[data-sweat]");
    opacity(sweat, surprised || (strained && t > 4.1) ? 0.85 : 0);
    attr(sweat, "d", `M${v[0][0] + 16} ${v[0][1] - 4}q5 4 1 7m4 1q3 3 0 5`);

    const load = smooth(interval(t, 4.05, 4.3)) * (1 - smooth(interval(t, 6.15, 6.5)));
    opacity($("[data-effort]"), load * 0.65);
    attr($("[data-effort]"), "d", `M${v[8][0] - 10} -2l-5 -3m7 8h-9 M${v[10][0] + 10} -2l5 -3m-7 8h9`);

    const f = fileAt(t, p);
    const fileEl = $("[data-file]");
    opacity(fileEl, smooth(interval(t, 0.65, 0.95)));
    attr(fileEl, "transform", `translate(${f.x} ${f.y}) rotate(${f.angle} 0 28)`);

    const hit = t >= 3.3 && t < 3.58;
    const delivered = t >= 6.62 && t < 6.96;
    const impactEl = $("[data-impact]");
    opacity(impactEl, hit ? Math.sin(interval(t, 3.3, 3.58) * Math.PI) : delivered ? Math.sin(interval(t, 6.62, 6.96) * Math.PI) : 0);
    attr(impactEl, "transform", hit ? "translate(484 325)" : "translate(355 282)");

    let sx = 1;
    let sy = 1;
    const btn = $("[data-download]") as HTMLElement | null;
    if (delivered) {
      const fr = interval(t, 6.62, 6.96);
      sx += Math.sin(fr * Math.PI * 2) * 0.06 * (1 - fr);
      sy -= Math.sin(fr * Math.PI * 2) * 0.1 * (1 - fr);
    }
    if (btn) btn.style.transform = `scale(${sx},${sy})`;

    const progressVal = Math.round(t < 3.36 ? mix(0, 65, interval(t, 0, 3.36)) : t < 4.05 ? 65 : t < 6.7 ? mix(65, 99, interval(t, 4.05, 6.7)) : 100);
    const progressFill = $(".nc-progress-fill") as HTMLElement | null;
    if (progressFill) progressFill.style.transform = `scaleX(${progressVal / 100})`;

    const label = $("[data-label]");
    if (label) {
      label.textContent = t < 0.65 ? "Hold on..." : t < 6.7 ? `Catching ${progressVal}%` : "Download again";
    }

    const icon = $("[data-button-icon]") as HTMLElement | null;
    if (icon) {
      icon.style.display = t >= 0.3 && t <= 6.7 ? "none" : "";
      icon.style.opacity = t < 0.3 ? String(1 - t / 0.3) : t > 6.7 ? "1" : "0";
      if (t > 6.7) {
        icon.innerHTML = '<path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
        btn?.classList.add("is-done");
      }
    }

    // Dynamic humorous subtitle
    const currentCaption =
      t < 2.45
        ? "He's got this."
        : t < 3.3
        ? "Definitely got this."
        : t < 4.05
        ? "..."
        : t < 6.7
        ? "A little heavier than expected!"
        : "Delivered. With dignity. Mostly.";
    setCaptionText(currentCaption);
  };

  const deliver = (shouldDownload: boolean) => {
    if (deliveredRef.current) return;
    deliveredRef.current = true;
    setIsDelivered(true);
    if (shouldDownload) {
      triggerRealDownload();
    }
  };

  const finishAnimation = () => {
    runningRef.current = false;
    const root = containerRef.current;
    if (!root) return;
    const $ = (sel: string) => root.querySelector(sel) as HTMLElement | SVGElement | null;
    const btn = $("[data-download]");
    btn?.classList.remove("is-running");
    btn?.classList.add("is-done");
    const label = $("[data-label]");
    if (label) label.textContent = "Download again";
    const icon = $("[data-button-icon]");
    if (icon) {
      icon.innerHTML = '<path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
      icon.style.display = "";
      icon.style.opacity = "1";
    }
    const fill = $(".nc-progress-fill") as HTMLElement | null;
    if (fill) fill.style.transform = "scaleX(1)";

    $("[data-person]")?.setAttribute("opacity", "0");
    $("[data-file]")?.setAttribute("opacity", "0");
    $("[data-impact]")?.setAttribute("opacity", "0");
    if (btn) btn.style.transform = "";
  };

  const playAnimation = (shouldDownload = false) => {
    if (runningRef.current) {
      if (shouldDownload && deliveredRef.current) {
        triggerRealDownload();
      }
      return;
    }

    if (soundOn) {
      foleyRef.current?.start();
    }

    // Immediate fallback if user prefers reduced motion
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCaptionText("Delivered directly. No heavy lifting required.");
      deliver(shouldDownload);
      finishAnimation();
      return;
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    runningRef.current = true;
    deliveredRef.current = false;

    const root = containerRef.current;
    const btn = root?.querySelector("[data-download]");
    btn?.classList.remove("is-done");
    btn?.classList.add("is-running");
    const icon = root?.querySelector("[data-button-icon]") as HTMLElement | null;
    if (icon) {
      icon.innerHTML = '<path d="M10 3v10m-4-4 4 4 4-4M4 15v2h12v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
    }

    startTimeRef.current = performance.now();
    lastTimeRef.current = -0.01;

    const tick = (now: number) => {
      if (!runningRef.current) return;
      const t = (now - startTimeRef.current) / 1000;
      renderFrame(Math.min(t, DURATION));

      if (t >= 6.7) {
        deliver(shouldDownload);
      }

      // Audio cue trigger
      if (soundOn && foleyRef.current) {
        for (const [cueTime, sfxName] of CUES) {
          if (cueTime > lastTimeRef.current && cueTime <= t && t - cueTime < 0.15) {
            foleyRef.current.play(sfxName);
          }
        }
      }
      lastTimeRef.current = t;

      if (t < DURATION) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        finishAnimation();
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const toggleSound = () => {
    const nextSound = !soundOn;
    setSoundOn(nextSound);
    if (nextSound) {
      foleyRef.current?.start();
    } else {
      foleyRef.current?.stop();
    }
  };

  const mbSize = (fileSize / (1024 * 1024)).toFixed(1);

  return (
    <div ref={containerRef} className={`nervous-catcher ${className}`}>
      {/* File info banner */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-[var(--color-hairline)] mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="font-semibold text-[var(--text-main)]">Ready for Download</span>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
          {filename} ({mbSize} MB)
        </span>
      </div>

      {/* Interactive StickMan Scene */}
      <div className="nc-scene-wrapper">
        <svg className="nc-scene-art" viewBox="0 0 640 380" fill="none" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="640" height="280" />
              <rect x="420" y="0" width="220" height="380" />
            </clipPath>
          </defs>

          {/* Stick Figure Rig */}
          <g data-person opacity="0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            {/* Cape */}
            <path data-cape fill="#d84b4b" stroke="#ac353c" strokeWidth="1.5" />
            <path data-cape-fold stroke="#ac353c" strokeWidth="1" />

            {/* Skeleton & Limbs */}
            <path data-body strokeWidth="3" />
            <path data-arm-left strokeWidth="2.5" />
            <path data-arm-right strokeWidth="2.8" />
            <path data-leg-left strokeWidth="2.8" />
            <path data-leg-right strokeWidth="2.5" />

            {/* Hands & Feet */}
            <path data-foot-left fill="currentColor" strokeWidth="1.3" />
            <path data-foot-right fill="currentColor" strokeWidth="1.3" />
            <path data-palm-left fill="currentColor" strokeWidth="1.5" />
            <path data-palm-right fill="currentColor" strokeWidth="1.5" />

            {/* Head & Expression */}
            <g data-head-group>
              <circle data-head r="12" fill="var(--color-sand-base, #f4eee5)" stroke="currentColor" strokeWidth="2.5" />
              <g data-face>
                <path data-eyes stroke="currentColor" strokeWidth="2.1" />
                <path data-brows stroke="currentColor" strokeWidth="1.4" />
                <path data-mouth stroke="currentColor" strokeWidth="1.4" />
                <path data-cheeks d="M-8 3l2 1m10-1 2 1" stroke="#d84b4b" strokeWidth="2.3" opacity="0" />
              </g>
            </g>

            {/* Thumbs up badge */}
            <g data-thumb opacity="0" strokeWidth="1.2">
              <path
                d="M-3 2V-6L1-11V-18Q1-21 4-20Q7-19 6-15L5-10H12Q15-10 14-6L12 1Q12 3 9 3H1L-3 2Z"
                fill="currentColor"
                stroke="currentColor"
              />
              <path d="M0-5V1M7-6H12" stroke="var(--color-sand-base, #f4eee5)" />
            </g>

            {/* Sweat drops & effort bursts */}
            <path data-sweat opacity="0" stroke="currentColor" strokeWidth="1.3" />
            <path data-effort opacity="0" stroke="currentColor" strokeWidth="1.2" />
          </g>

          {/* Falling Video File Item */}
          <g clipPath={`url(#${clipId})`}>
            <g data-file opacity="0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M-24 0H9l15 15v41h-48z" fill="var(--color-sand-base, #f4eee5)" />
              <path d="M9 0v15h15M-13 31H12M-13 39H4" />
            </g>
          </g>

          {/* Impact dust burst */}
          <g data-impact opacity="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="m-35-9-8-5m8 13-10 2m80-10 8-5m-8 13 10 2" />
          </g>
        </svg>

        {/* The Animated Download Button */}
        <button
          className="nc-download-button"
          data-download
          type="button"
          onClick={() => playAnimation(true)}
          aria-label="Download video clip"
        >
          <span className="nc-progress-fill" />
          <span className="nc-button-content">
            <svg data-button-icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 3v10m-4-4 4 4 4-4M4 15v2h12v-2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span data-label>{isDelivered ? "Download again" : "Download Video"}</span>
          </span>
        </button>
      </div>

      {/* Humorous sub-caption */}
      <p className="nc-caption" aria-live="polite">
        {captionText}
      </p>

      {/* Bottom controls bar: Replay, Sound toggle, and Instant direct download */}
      <div className="nc-toolbar">
        <div className="flex items-center gap-2">
          {/* Replay Button */}
          <button
            type="button"
            className="nc-quiet-button"
            onClick={() => playAnimation(false)}
            aria-label="Replay StickMan catching animation"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 7a6 6 0 1 1 0 6M4 3v4h4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Replay</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            className="nc-quiet-button"
            aria-pressed={soundOn}
            onClick={toggleSound}
            aria-label={soundOn ? "Mute animation sound" : "Enable animation sound"}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {soundOn ? (
                <path
                  d="M3 8h3l4-4v12l-4-4H3zM13 7c2 2 2 4 0 6m3-9c4 4 4 8 0 12"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 8h3l4-4v12l-4-4H3zM14 6l5 8M19 6l-5 8"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
        </div>

        {/* Direct Instant Download (Bypasses animation if user is in a hurry) */}
        <a
          href={blobUrl}
          download={filename}
          className="nc-direct-link"
          title="Download immediately without waiting for animation"
        >
          Instant save
        </a>
      </div>

      {/* Convert another button */}
      {onConvertAnother && (
        <div className="pt-3 border-t border-[var(--color-hairline)] mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <button
            type="button"
            onClick={onConvertAnother}
            className="hover:underline text-[var(--text-main)] font-semibold"
          >
            Convert another clip
          </button>
          <span className="font-mono text-[11px]">100% Client-side copy</span>
        </div>
      )}
    </div>
  );
}

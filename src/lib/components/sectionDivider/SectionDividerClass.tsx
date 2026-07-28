import React from "react";

type DividerVariant =
  | "wave" | "curl" | "zigzag" | "dots" | "tilde"
  | "heart" | "diamond" | "leaf" | "curve" | "pulse"
  | "loop" | "scroll";

type Easing =
  | "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  | (string & {});

const WAVE_VARIANTS = new Set(["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"]);
const FILLED = new Set(["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"]);

const PACKETS: { speed: number; amp: number; width: number; freq: number; phase: number }[] = [];
for (let i = 0; i < 5; i++) {
  PACKETS.push({
    speed: 0.6 + i * 0.15,
    amp: 0.4 + i * 0.15,
    width: 0.15 + i * 0.05,
    freq: 0.5 + i * 0.35,
    phase: i * 1.2,
  });
}

function sampleWave(nx: number, t: number, ampFact: number, freq: number): number {
  let y = 0;
  for (let k = 0; k < PACKETS.length; k++) {
    const p = PACKETS[k];
    const env = Math.exp(-Math.pow(nx - t * p.speed, 2) / (2 * p.width * p.width));
    const osc = Math.sin((nx * p.freq * freq + t * p.speed * 3) * 2 * Math.PI + p.phase);
    y += env * osc * p.amp;
  }
  y += Math.sin((nx * freq + t) * 2 * Math.PI) * 0.3;
  return y * ampFact;
}

function pointsToSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  const sx = pts[1].x - pts[0].x;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
    const t = (p2.y - p0.y) / 6;
    d += ` C${(p1.x - sx / 3).toFixed(1)},${(p1.y - t).toFixed(1)} ${(p1.x + sx / 3).toFixed(1)},${(p1.y + t).toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
  }
  return d;
}

export interface SectionDividerProp {
  variant?: DividerVariant;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  height?: number;
  width?: string;
  flip?: boolean;
  customPath?: string;
  className?: string;
  style?: React.CSSProperties;
  child?: React.JSX.ElementType;
  gest?: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>;
  onFunc?: (self: _SectionDivider) => void;
  animate?: boolean;
  duration?: number;
  delay?: number;
  easing?: Easing;
  float?: boolean;
  amplitude?: number;
  frequency?: number;
  life?: boolean;
}

export class _SectionDivider {
  private svg: SVGSVGElement | null = null;
  private pathAnim: Animation | null = null;
  private floatAnim: Animation | null = null;

  public attach(svg: SVGSVGElement) {
    this.svg = svg;
  }

  public update(props: SectionDividerProp) {
    const { animate, float, life, variant } = props;
    const isWave = WAVE_VARIANTS.has(variant ?? "wave");

    if ((animate || life) && isWave) {
      this.startPathAnimation(props);
    } else {
      this.stopPathAnimation();
    }

    if (float || life) {
      this.startFloatAnimation(props);
    } else {
      this.stopFloatAnimation();
    }
  }

  public destroy() {
    this.stopPathAnimation();
    this.stopFloatAnimation();
  }

  private stopPathAnimation() {
    if (this.pathAnim) {
      this.pathAnim.cancel();
      this.pathAnim = null;
    }
  }

  private stopFloatAnimation() {
    if (this.floatAnim) {
      this.floatAnim.cancel();
      this.floatAnim = null;
    }
  }

  private startPathAnimation(props: SectionDividerProp) {
    if (!this.svg) return;
    const path = this.svg.querySelector("path");
    if (!path) return;

    const { variant, amplitude, frequency, duration, delay, easing, life } = props;
    const amp = amplitude ?? 15;
    const freq = frequency ?? 2;
    const dur = duration ?? 4000;
    const v = variant ?? "wave";

    this.stopPathAnimation();

    const n = 80;
    const step = 1440 / (n - 1);
    const base = 40;
    const kfs: Keyframe[] = [];
    for (let f = 0; f <= 60; f++) {
      const t = f / 60;
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const nx = i / (n - 1);
        const offset = life
          ? sampleWave(nx, t, amp * 2, freq)
          : Math.sin((nx * freq + t) * 2 * Math.PI) * amp;
        pts.push({ x: i * step, y: Math.max(5, base + offset) });
      }
      let d = pointsToSmoothPath(pts);
      if (FILLED.has(v)) d += " L1440,120 L0,120 Z";
      kfs.push({ d: `path("${d}")` });
    }
    this.pathAnim = path.animate(kfs, {
      duration: dur,
      iterations: Infinity,
      easing: life ? "cubic-bezier(0.33, 0.08, 0.63, 0.97)" : (easing as string) ?? "linear",
      delay: delay ?? 0,
    });
  }

  private startFloatAnimation(props: SectionDividerProp) {
    if (!this.svg) return;
    const g = this.svg.querySelector("g[data-float]");
    if (!g) return;

    const { amplitude, frequency, duration, delay, life } = props;
    const amp = amplitude ?? 15;
    const freq = frequency ?? 2;
    const dur = duration ?? 4000;

    this.stopFloatAnimation();

    const kfs: Keyframe[] = [];
    for (let f = 0; f <= 60; f++) {
      const t = f / 60;
      if (life) {
        let y = 0;
        for (let k = 0; k < PACKETS.length; k++) {
          const p = PACKETS[k];
          y += Math.sin(t * p.speed * 3 * 2 * Math.PI + p.phase) * p.amp * amp * 0.15;
        }
        y += Math.sin(t * freq * 2 * Math.PI) * amp * 0.3;
        kfs.push({ transform: `translateY(${y.toFixed(2)}px)` });
      } else {
        kfs.push({ transform: `translateY(${(Math.sin(t * freq * 2 * Math.PI) * amp).toFixed(2)}px)` });
      }
    }
    this.floatAnim = g.animate(kfs, {
      duration: dur,
      iterations: Infinity,
      easing: life ? "cubic-bezier(0.33, 0.08, 0.63, 0.97)" : "ease-in-out",
      delay: delay ?? 0,
    });
  }
}

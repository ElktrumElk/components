import React from "react";

type DividerVariant =
  | "wave"
  | "curl"
  | "zigzag"
  | "dots"
  | "tilde"
  | "heart"
  | "diamond"
  | "leaf"
  | "curve"
  | "pulse"
  | "loop"
  | "scroll";

type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | (string & {});

const FILLED = new Set(["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"]);

interface WavePacket {
  speed: number;
  amp: number;
  width: number;
  freq: number;
  phase: number;
}

const PACKETS: WavePacket[] = (() => {
  const p: WavePacket[] = [];
  for (let i = 0; i < 5; i++) {
    p.push({
      speed: 0.6 + i * 0.15,
      amp: 0.4 + i * 0.15,
      width: 0.15 + i * 0.05,
      freq: 0.5 + i * 0.35,
      phase: i * 1.2,
    });
  }
  return p;
})();

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
  d += ` L${pts[pts.length - 1].x.toFixed(1)},${pts[pts.length - 1].y.toFixed(1)}`;
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
  private props: SectionDividerProp;

  constructor(props: SectionDividerProp) {
    this.props = props;
  }

  public init(svg: SVGSVGElement) {
    this.svg = svg;
    this.startAnimations();
  }

  private buildMorphedPath(
    progress: number,
    amp: number,
    freq: number,
    variant: DividerVariant,
    life: boolean,
  ): string {
    const n = 80;
    const w = 1440;
    const step = w / (n - 1);
    const base = 40;
    const pts: { x: number; y: number }[] = [];

    for (let i = 0; i < n; i++) {
      const x = i * step;
      const nx = i / (n - 1);
      const offset = life ? sampleWave(nx, progress, amp * 2, freq) : Math.sin((nx * freq + progress) * 2 * Math.PI) * amp;
      pts.push({ x, y: Math.max(5, base + offset) });
    }

    let d = pointsToSmoothPath(pts);
    if (FILLED.has(variant)) d += ` L1440,120 L0,120 Z`;
    return d;
  }

  private startAnimations() {
    if (!this.svg) return;

    const path = this.svg.querySelector("path");
    const floatGroup = this.svg.querySelector("g[data-float]");
    if (!path) return;

    const { animate, float, life, variant, amplitude, frequency, duration, delay, easing } = this.props;
    const amp = amplitude ?? 15;
    const freq = frequency ?? 2;
    const dur = duration ?? 4000;
    const v = variant ?? "wave";

    if (animate || life) {
      const kfCount = 60;
      const kfs: Keyframe[] = [];
      for (let f = 0; f <= kfCount; f++) {
        const t = f / kfCount;
        kfs.push({ d: `path("${this.buildMorphedPath(t, amp, freq, v, !!life)}")` });
      }
      if (this.pathAnim) this.pathAnim.cancel();
      this.pathAnim = path.animate(kfs, {
        duration: dur,
        iterations: Infinity,
        easing: life ? "cubic-bezier(0.33, 0.08, 0.63, 0.97)" : (easing as string) ?? "linear",
        delay: delay ?? 0,
      });
    }

    if ((float || life) && floatGroup) {
      const floatSteps = 60;
      const kfs: Keyframe[] = [];
      for (let f = 0; f <= floatSteps; f++) {
        const t = f / floatSteps;
        if (life) {
          let y = 0;
          for (let k = 0; k < PACKETS.length; k++) {
            const p = PACKETS[k];
            y += Math.sin(t * p.speed * 3 * 2 * Math.PI + p.phase) * p.amp * amp * 0.15;
          }
          y += Math.sin(t * freq * 2 * Math.PI) * amp * 0.15;
          kfs.push({ transform: `translateY(${y.toFixed(2)}px)` });
        } else {
          const y = Math.sin(t * freq * 2 * Math.PI) * amp;
          kfs.push({ transform: `translateY(${y.toFixed(2)}px)` });
        }
      }
      if (this.floatAnim) this.floatAnim.cancel();
      this.floatAnim = floatGroup.animate(kfs, {
        duration: dur,
        iterations: Infinity,
        easing: life ? "cubic-bezier(0.33, 0.08, 0.63, 0.97)" : "ease-in-out",
        delay: delay ?? 0,
      });
    }
  }

  public destroy() {
    if (this.pathAnim) this.pathAnim.cancel();
    if (this.floatAnim) this.floatAnim.cancel();
  }
}

import React from "react";
import type { Store } from "../../../hooks/createStore";

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

type Gesture = "click" | "hover" | "focus" | "scroll" | "none";
type Direction = "ltr" | "rtl" | "ttb" | "btt";
type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | (string & {});

const FILLED_VARIANTS = new Set(["wave", "curl", "tilde", "heart", "leaf", "curve", "loop", "scroll"]);

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
  direction?: Direction;
  easing?: Easing;
  gesture?: Gesture;
  listen?: Store<Record<string, unknown>>;
  float?: boolean;
  amplitude?: number;
  frequency?: number;
  life?: boolean;
}

export class _SectionDivider {
  private element: SVGPathElement | null = null;
  private animationInstance: Animation | null = null;
  private props: SectionDividerProp;

  constructor(props: SectionDividerProp) {
    this.props = props;
  }

  public init(element: SVGPathElement) {
    this.element = element;
    if (this.props.animate || this.props.float || this.props.life) {
      this.startAnimation();
    }
  }

  private buildMorphedPath = (
    progress: number,
    amplitude: number,
    frequency: number,
    variant: DividerVariant,
    life?: boolean,
  ): string => {
    const totalPoints = 32;
    const width = 1440;
    const step = width / (totalPoints - 1);

    let pathString = "";

    for (let i = 0; i < totalPoints; i++) {
      const x = i * step;
      const normalizedX = i / (totalPoints - 1);
      const baseHeight = 40;

      let w1: number, w2: number, w3: number, w4: number, w5: number;

      if (life) {
        const env = 0.5 + 0.5 * Math.sin(progress * 2 * Math.PI * 0.7 + 0.3);
        const phaseDrift = Math.sin(progress * 2 * Math.PI * 0.4) * 0.8;
        const ampMod = 0.7 + 0.3 * Math.sin(progress * 2 * Math.PI * 0.5 + 1.2);

        w1 = Math.sin((normalizedX * frequency + progress) * 1 * 2 * Math.PI) * (0.8 + 0.2 * env);
        w2 = Math.sin((normalizedX * frequency * 2.1 + progress * 1.5 + phaseDrift) * 2 * Math.PI) * 0.55 * ampMod;
        w3 = Math.sin((normalizedX * frequency * 3.5 + progress * 0.8 - phaseDrift * 0.5) * 2 * Math.PI) * 0.35 * env;
        w4 = Math.sin((normalizedX * frequency * 5.2 + progress * 2.2 + phaseDrift * 0.3) * 2 * Math.PI) * 0.20 * ampMod;
        w5 = Math.sin((normalizedX * frequency * 7.0 + progress * 0.5 - phaseDrift * 0.2) * 2 * Math.PI) * 0.15 * env;
      } else {
        w1 = Math.sin((normalizedX * frequency + progress) * 1 * 2 * Math.PI);
        w2 = Math.sin((normalizedX * frequency * 2.1 + progress * 1.5) * 2 * Math.PI) * 0.55;
        w3 = Math.sin((normalizedX * frequency * 3.5 + progress * 0.8) * 2 * Math.PI) * 0.35;
        w4 = Math.sin((normalizedX * frequency * 5.2 + progress * 2.2) * 2 * Math.PI) * 0.20;
        w5 = Math.sin((normalizedX * frequency * 7.0 + progress * 0.5) * 2 * Math.PI) * 0.15;
      }

      const waveOffset = (w1 + w2 + w3 + w4 + w5) * amplitude * 0.45;
      const y = Math.max(5, baseHeight + waveOffset);

      if (i === 0) {
        pathString += `M${x.toFixed(1)},${y.toFixed(1)}`;
      } else {
        pathString += ` L${x.toFixed(1)},${y.toFixed(1)}`;
      }
    }

    if (FILLED_VARIANTS.has(variant)) {
      pathString += ` L1440,120 L0,120 Z`;
    }

    return pathString;
  };

  private startAnimation() {
    if (!this.element) return;

    const variant = this.props.variant ?? "wave";
    const amplitude = this.props.amplitude ?? 15;
    const frequency = this.props.frequency ?? 2;
    const duration = this.props.duration ?? 4000;
    const life = this.props.life;

    const keyframesCount = 60;
    const keyframes: Keyframe[] = [];

    for (let f = 0; f <= keyframesCount; f++) {
      const progress = f / keyframesCount;
      const pathData = this.buildMorphedPath(progress, amplitude, frequency, variant, life);
      keyframes.push({ d: `path("${pathData}")` });
    }

    if (this.animationInstance) {
      this.animationInstance.cancel();
    }

    this.animationInstance = this.element.animate(keyframes, {
      duration: duration,
      iterations: Infinity,
      easing: life ? 'cubic-bezier(0.33, 0.08, 0.63, 0.97)' : (this.props.easing as string) ?? "linear",
      delay: this.props.delay ?? 0
    });
  }

  public destroy() {
    if (this.animationInstance) {
      this.animationInstance.cancel();
    }
  }
}

import React from "react";

type DividerVariant =
  | "wave" | "curl" | "zigzag" | "dots" | "tilde"
  | "heart" | "diamond" | "leaf" | "curve" | "pulse"
  | "loop" | "scroll";

type Easing =
  | "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  | (string & {});

type Direction = "ltr" | "rtl" | "ttb" | "btt";
type Gesture = "click" | "hover" | "focus" | "none";
type Subscribable = {
  subscribe: (listener: () => void) => () => void;
};

const DEFAULT_DURATION: Record<DividerVariant, number> = {
  wave: 5000,
  curl: 4500,
  zigzag: 3000,
  dots: 3500,
  tilde: 4500,
  heart: 4000,
  diamond: 3000,
  leaf: 4500,
  curve: 5000,
  pulse: 2500,
  loop: 4000,
  scroll: 5000,
};

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
  gest?: React.SVGProps<SVGSVGElement>;
  onFunc?: (self: _SectionDivider) => void;
  animate?: boolean;
  duration?: number;
  delay?: number;
  easing?: Easing;
  direction?: Direction;
  gesture?: Gesture;
  listen?: Subscribable;
  float?: boolean;
  amplitude?: number;
  frequency?: number;
  life?: boolean;
}

export class _SectionDivider {
  private svg: SVGSVGElement | null = null;
  private scrollAnim: Animation | null = null;
  private floatAnim: Animation | null = null;
  private gestureCleanups: (() => void)[] = [];
  private unsubscribe: (() => void) | null = null;

  public attach(svg: SVGSVGElement) {
    this.svg = svg;
  }

  public update(props: SectionDividerProp) {
    this.bindGesture(props.gesture);
    this.bindStore(props.listen);

    if (props.animate || props.life || (props.gesture && props.gesture !== "none") || props.listen) {
      this.startScrollAnimation(props);
    } else {
      this.stopScrollAnimation();
    }

    if (props.float || props.life) {
      this.startFloatAnimation(props);
    } else {
      this.stopFloatAnimation();
    }
  }

  public play = () => {
    this.scrollAnim?.play();
    this.floatAnim?.play();
  };

  public pause = () => {
    this.scrollAnim?.pause();
    this.floatAnim?.pause();
  };

  public reverse = () => {
    this.scrollAnim?.reverse();
    this.floatAnim?.reverse();
  };

  public stop = () => {
    this.stopScrollAnimation();
    this.stopFloatAnimation();
  };

  public destroy() {
    this.stop();
    this.clearBindings();
    this.svg = null;
  }

  private prefersReducedMotion() {
    return typeof window !== "undefined"
      && typeof window.matchMedia === "function"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  private bindGesture(gesture?: Gesture) {
    this.gestureCleanups.forEach((cleanup) => cleanup());
    this.gestureCleanups = [];
    if (!this.svg || !gesture || gesture === "none") return;

    const eventName = gesture === "hover" ? "mouseenter" : gesture === "focus" ? "focusin" : "click";
    const play = () => this.play();
    this.svg.addEventListener(eventName, play);
    this.gestureCleanups.push(() => this.svg?.removeEventListener(eventName, play));

    if (gesture === "click") {
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.play();
        }
      };
      this.svg.addEventListener("keydown", keydown);
      this.gestureCleanups.push(() => this.svg?.removeEventListener("keydown", keydown));
    }
  }

  private bindStore(store?: Subscribable) {
    this.unsubscribe?.();
    this.unsubscribe = store?.subscribe(() => this.play()) ?? null;
  }

  private clearBindings() {
    this.gestureCleanups.forEach((cleanup) => cleanup());
    this.gestureCleanups = [];
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  private stopScrollAnimation() {
    this.scrollAnim?.cancel();
    this.scrollAnim = null;
  }

  private stopFloatAnimation() {
    this.floatAnim?.cancel();
    this.floatAnim = null;
  }

  private startScrollAnimation(props: SectionDividerProp) {
    const group = this.svg?.querySelector<SVGGElement>("g[data-scroll]");
    if (!group) return;
    this.stopScrollAnimation();

    const direction = props.direction ?? "ltr";
    const endpoints: Record<Direction, [string, string]> = {
      ltr: ["translateX(-1440px)", "translateX(0px)"],
      rtl: ["translateX(0px)", "translateX(-1440px)"],
      ttb: ["translateY(-1440px)", "translateY(0px)"],
      btt: ["translateY(1440px)", "translateY(0px)"],
    };
    const [start, end] = endpoints[direction];
    const axis = direction === "ltr" || direction === "rtl" ? "X" : "Y";
    const startValue = Number(start.match(/-?\d+/)?.[0] ?? 0);
    const endValue = Number(end.match(/-?\d+/)?.[0] ?? 0);
    const keyframes = Array.from({ length: 61 }, (_, index) => ({
      transform: `translate${axis}(${startValue + (endValue - startValue) * index / 60}px)`,
    }));

    this.scrollAnim = group.animate(keyframes, {
      duration: props.duration ?? DEFAULT_DURATION[props.variant ?? "wave"],
      iterations: Infinity,
      easing: props.easing ?? "linear",
      delay: props.delay ?? 0,
    });

    if (this.prefersReducedMotion()) this.scrollAnim.pause();
    if (!props.animate && !props.life) this.scrollAnim.pause();
  }

  private startFloatAnimation(props: SectionDividerProp) {
    const group = this.svg?.querySelector<SVGGElement>("g[data-float]");
    if (!group) return;
    this.stopFloatAnimation();

    const amplitude = props.amplitude ?? 15;
    const frequency = props.frequency ?? 2;
    const keyframes = Array.from({ length: 121 }, (_, index) => {
      const raw = Math.sin(index / 120 * frequency * 2 * Math.PI) * amplitude;
      const value = Math.abs(raw) < 0.0001 ? 0 : raw;
      return { transform: `translateY(${value.toFixed(2)}px)` };
    });

    this.floatAnim = group.animate(keyframes, {
      duration: props.duration ?? DEFAULT_DURATION[props.variant ?? "wave"],
      iterations: Infinity,
      easing: props.life ? "cubic-bezier(0.33, 0.08, 0.63, 0.97)" : "ease-in-out",
      delay: props.delay ?? 0,
    });
    if (this.prefersReducedMotion()) this.floatAnim.pause();
  }
}

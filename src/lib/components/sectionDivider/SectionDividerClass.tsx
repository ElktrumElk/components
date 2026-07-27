import type { ElementType } from "react";
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

const SVG_PATHS: Record<DividerVariant, string> = {
  wave: "M0,32 C160,80 320,0 480,32 C640,64 800,16 960,32 C1120,48 1280,16 1440,32 L1440,0 L0,0 Z",
  curl: "M0,40 C80,10 120,70 200,40 C280,10 320,70 400,40 C480,10 520,70 600,40 C680,10 720,70 800,40 C880,10 920,70 1000,40 C1080,10 1120,70 1200,40 C1280,10 1320,70 1440,40 L1440,0 L0,0 Z",
  zigzag:
    "M0,0 L120,60 L240,0 L360,60 L480,0 L600,60 L720,0 L840,60 L960,0 L1080,60 L1200,0 L1320,60 L1440,0 Z",
  dots: "M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z",
  tilde:
    "M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,0 L0,0 Z",
  heart:
    "M0,50 C180,20 240,70 360,40 C480,10 540,60 720,40 C900,20 960,70 1080,40 C1200,10 1260,60 1440,40 L1440,0 L0,0 Z",
  diamond:
    "M0,40 L120,0 L240,40 L360,0 L480,40 L600,0 L720,40 L840,0 L960,40 L1080,0 L1200,40 L1320,0 L1440,40 L1440,0 L0,0 Z",
  leaf: "M0,50 C120,10 240,60 360,30 C480,0 600,50 720,30 C840,10 960,60 1080,30 C1200,0 1320,50 1440,30 L1440,0 L0,0 Z",
  curve: "M0,48 C240,80 480,0 720,48 C960,96 1200,0 1440,48 L1440,0 L0,0 Z",
  pulse:
    "M0,40 L200,40 L280,0 L360,80 L440,0 L520,80 L600,0 L680,40 L880,40 C1040,40 1040,40 1200,40 L1440,40 L1440,0 L0,0 Z",
  loop: "M0,40 C180,80 180,0 360,40 C540,80 540,0 720,40 C900,80 900,0 1080,40 C1260,80 1260,0 1440,40 L1440,0 L0,0 Z",
  scroll:
    "M0,50 C80,20 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 L1440,0 L0,0 Z",
};

const DECORATIVE_DOTS: Record<string, string> = {
  dots: "M60,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M180,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M300,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M420,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M540,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M660,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M780,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M900,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M1020,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M1140,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M1260,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M1380,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0",
};

const FILLED_VARIANTS = new Set([
  "wave",
  "curl",
  "tilde",
  "heart",
  "leaf",
  "curve",
  "loop",
  "scroll",
]);

interface VariantAnimConfig {
  defaultDuration: number;
  defaultFrequency: number;
}

const VARIANT_ANIM: Record<DividerVariant, VariantAnimConfig> = {
  wave: { defaultDuration: 5000, defaultFrequency: 2 },
  curl: { defaultDuration: 4000, defaultFrequency: 4 },
  zigzag: { defaultDuration: 3000, defaultFrequency: 6 },
  dots: { defaultDuration: 6000, defaultFrequency: 1 },
  tilde: { defaultDuration: 4500, defaultFrequency: 3 },
  heart: { defaultDuration: 4000, defaultFrequency: 3 },
  diamond: { defaultDuration: 3500, defaultFrequency: 5 },
  leaf: { defaultDuration: 5500, defaultFrequency: 2 },
  curve: { defaultDuration: 5000, defaultFrequency: 1 },
  pulse: { defaultDuration: 2500, defaultFrequency: 3 },
  loop: { defaultDuration: 4500, defaultFrequency: 4 },
  scroll: { defaultDuration: 6000, defaultFrequency: 3 },
};

/**
 * Props for the SectionDivider component.
 *
 * Renders an SVG divider with twelve built-in visual variants.
 * Supports continuous scroll animation, floating undulation, gesture triggering,
 * and cross-component animation via store subscription.
 *
 * The SVG is structured as nested `<g data-scroll>` > `<g data-float>` so that
 * scroll and float animations run independently and can be combined.
 *
 * @example
 * // Static wave divider
 * <SectionDivider variant="wave" color="#6366f1" height={60} />
 *
 * @example
 * // Scroll + float with tight ripples
 * <SectionDivider variant="curl" animate float amplitude={20} frequency={6} />
 *
 * @see {@link SectionDividerProp} for all available props.
 */
export interface SectionDividerProp {
  /** Visual style of the divider. Defaults to `"wave"`. */
  variant?: DividerVariant;

  /** Stroke color for stroked variants, also used as fallback fill color. Defaults to `"#e2e8f0"`. */
  color?: string;

  /** Fill color for filled variants (wave, curl, tilde, heart, leaf, curve, loop, scroll). Falls back to `color`. */
  fillColor?: string;

  /** Stroke width in pixels for stroked variants (zigzag, diamond, pulse). Defaults to `2`. */
  strokeWidth?: number;

  /** Height of the SVG element in pixels. Defaults to `80`. */
  height?: number;

  /** CSS width of the SVG element. Defaults to `"100%"`. */
  width?: string;

  /** If `true`, mirrors the divider vertically via `scaleY(-1)`. */
  flip?: boolean;

  /** A custom SVG path string to override the built-in variant path. */
  customPath?: string;

  /** Additional CSS class names applied to the root `<svg>` element. */
  className?: string;

  /** Inline styles merged onto the root `<svg>` element. */
  style?: React.CSSProperties;

  /** A React component type rendered as a child element (reserved for extensibility). */
  child?: React.JSX.ElementType;

  /** Additional HTML/SVG attributes spread onto the root `<svg>` element. */
  gest?: React.DetailedHTMLProps<
    React.SVGAttributes<SVGSVGElement>,
    SVGSVGElement
  >;

  /** Callback invoked with the internal `_SectionDivider` instance after initialization. */
  onFunc?: (self: _SectionDivider) => void;

  /** When `true`, enables continuous scroll animation on the divider path(s). */
  animate?: boolean;

  /**
   * Scroll animation duration per cycle in milliseconds.
   * Defaults to a variant-specific value (e.g. wave=5000ms, pulse=2500ms).
   */
  duration?: number;

  /** Delay before the animation starts in milliseconds. Defaults to `0`. */
  delay?: number;

  /**
   * Scroll direction for the continuous scroll animation.
   * - `"ltr"` — left-to-right (pattern scrolls left, new content appears from right)
   * - `"rtl"` — right-to-left
   * - `"ttb"` — top-to-bottom
   * - `"btt"` — bottom-to-top
   *
   * Defaults to `"ltr"`.
   */
  direction?: Direction;

  /**
   * CSS easing function for the scroll animation.
   * Accepts any valid CSS easing: `"linear"`, `"ease"`, `"ease-in"`, `"ease-out"`, `"ease-in-out"`,
   * or a custom `"cubic-bezier(...)"` string.
   *
   * Defaults to `"linear"`.
   */
  easing?: Easing;

  /**
   * Gesture that triggers the animation. When set, `animate` is implied.
   * - `"click"` — plays on click
   * - `"hover"` — plays on mouseenter
   * - `"focus"` — plays on focusin
   * - `"scroll"` — plays on scroll
   * - `"none"` — no gesture binding
   */
  gesture?: Gesture;

  /**
   * A `Store` instance. When its state changes, the animation replays.
   * Useful for cross-component animation triggering.
   */
  listen?: Store<Record<string, unknown>>;

  /**
   * When `true`, enables continuous vertical undulation on the path(s).
   * The divider bobs up and down like a boat on water, independent of the scroll animation.
   * Can be combined with `animate` for scroll + float simultaneously.
   */
  float?: boolean;

  /**
   * Vertical distance in pixels the float travels from center.
   * Higher values = more dramatic bobbing. Defaults to `15`.
   */
  amplitude?: number;

  /**
   * Number of full oscillation cycles per animation duration for the float effect.
   * Higher values = more ripples per cycle. Defaults to variant-specific
   * (wave=2, curl=4, zigzag=6, dots=1, etc.).
   */
  frequency?: number;
}

export class _SectionDivider {
  child!: ElementType;
  private svgRef: SVGSVGElement | null = null;
  private scrollAnimations: Animation[] = [];
  private floatAnimations: Animation[] = [];
  private gestureCleanups: (() => void)[] = [];
  private listenUnsubscribes: (() => void)[] = [];

  play = () => {
    [...this.scrollAnimations, ...this.floatAnimations].forEach((a) => {
      a.cancel();
      a.play();
    });
  };

  stop = () => {
    [...this.scrollAnimations, ...this.floatAnimations].forEach((a) =>
      a.cancel(),
    );
  };

  dispose = () => {
    this.stop();
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];
    this.listenUnsubscribes.forEach((fn) => fn());
    this.listenUnsubscribes = [];
  };

  private buildScrollKeyframes = (
    direction: Direction,
    duration: number,
    easing: Easing,
  ): { keyframes: Keyframe[]; easing: string; dur: number } => {
    const cycle = 1440;
    const steps = 60;

    switch (direction) {
      case "ltr":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateX(${-cycle + (i * cycle) / steps}px)`,
          })),
          easing,
          dur: duration,
        };
      case "rtl":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateX(${-(i * cycle) / steps}px)`,
          })),
          easing,
          dur: duration,
        };
      case "ttb":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateY(${-cycle + (i * cycle) / steps}px)`,
          })),
          easing,
          dur: duration,
        };
      case "btt":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateY(${cycle - (i * cycle) / steps}px)`,
          })),
          easing,
          dur: duration,
        };
    }
  };

  private buildFloatKeyframes = (
    amplitude: number,
    frequency: number,
  ): Keyframe[] => {
    const steps = 120;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const y = Math.sin(t * frequency * 2 * Math.PI) * amplitude;
      return { transform: `translateY(${y.toFixed(2)}px)` };
    });
  };

  private applyAnimation = (props: SectionDividerProp) => {
    if (!this.svgRef) return;

    const shouldAnimate =
      props.animate || (props.gesture && props.gesture !== "none");
    const shouldFloat = props.float;
    if (!shouldAnimate && !shouldFloat) return;

    const variant = props.variant || "wave";
    const variantAnim = VARIANT_ANIM[variant];
    const direction = props.direction || "ltr";
    const easing = props.easing || "linear";
    const duration = props.duration ?? variantAnim.defaultDuration;
    const delay = props.delay ?? 0;

    const pathContainer = this.svgRef.querySelector("g[data-scroll]");
    const floatContainer = this.svgRef.querySelector("g[data-float]");

    if (shouldAnimate && pathContainer) {
      const scrollConfig = this.buildScrollKeyframes(
        direction,
        duration,
        easing,
      );
      const anim = pathContainer.animate(scrollConfig.keyframes, {
        duration: scrollConfig.dur,
        delay,
        iterations: Infinity,
        easing: scrollConfig.easing,
      });
      anim.pause();
      this.scrollAnimations.push(anim);
    }

    if (shouldFloat && floatContainer) {
      const amplitude = props.amplitude ?? 15;
      const frequency = props.frequency ?? variantAnim.defaultFrequency;
      const floatKeyframes = this.buildFloatKeyframes(
        amplitude,
        frequency,
      );
      const anim = floatContainer.animate(floatKeyframes, {
        duration,
        delay,
        iterations: Infinity,
        easing: "ease-in-out",
      });
      anim.pause();
      this.floatAnimations.push(anim);
    }

    if (
      (shouldAnimate || shouldFloat) &&
      (!props.gesture || props.gesture === "none")
    ) {
      [...this.scrollAnimations, ...this.floatAnimations].forEach((a) =>
        a.play(),
      );
    }

    this.bindGestures(props.gesture, props.delay);
    this.bindListen(props.listen);
  };

  private bindGestures = (gesture?: Gesture, delay?: number) => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];

    if (!this.svgRef || !gesture || gesture === "none") return;

    const playAll = () => {
      [...this.scrollAnimations, ...this.floatAnimations].forEach((a) => {
        a.cancel();
        if (delay) {
          setTimeout(() => a.play(), delay);
        } else {
          a.play();
        }
      });
    };

    const eventMap: Record<string, string> = {
      click: "click",
      hover: "mouseenter",
      focus: "focusin",
      scroll: "scroll",
    };

    const eventName = eventMap[gesture];
    if (eventName) {
      this.svgRef.addEventListener(eventName, playAll);
      this.gestureCleanups.push(() => {
        this.svgRef?.removeEventListener(eventName, playAll);
      });
    }
  };

  private bindListen = (store?: Store<Record<string, unknown>>) => {
    this.listenUnsubscribes.forEach((fn) => fn());
    this.listenUnsubscribes = [];

    if (!store) return;

    const unsubscribe = store.subscribe(() => {
      this.play();
    });
    this.listenUnsubscribes.push(unsubscribe);
  };

  build? = ({ ...a }: SectionDividerProp): React.JSX.Element => {
    this.child = a.child as ElementType;
    const variant = a.variant || "wave";
    const color = a.color || "#e2e8f0";
    const fillColor = a.fillColor || color;
    const strokeWidth = a.strokeWidth || 2;
    const h = a.height || 80;
    const w = a.width || "100%";
    const flip = a.flip ? -1 : 1;
    const isFilled = FILLED_VARIANTS.has(variant);

    const path = a.customPath || SVG_PATHS[variant] || SVG_PATHS.wave;
    const dots = DECORATIVE_DOTS[variant];

    const pathContent = isFilled ? (
      <>
        <path d={path} fill={fillColor} opacity={0.9} />
        <path
          d={path}
          fill={fillColor}
          opacity={0.9}
          transform="translate(1440, 0)"
        />
      </>
    ) : (
      <>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(1440, 0)"
        />
        {dots && (
          <>
            <path d={dots} fill={color} opacity={0.5} />
            <path
              d={dots}
              fill={color}
              opacity={0.5}
              transform="translate(1440, 0)"
            />
          </>
        )}
      </>
    );

    return (
      <>
        <svg
          ref={(el) => {
            this.svgRef = el;
            if (el) this.applyAnimation(a);
          }}
          className={a.className}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{
            display: "block",
            width: w,
            height: `${h}px`,
            transform: `scaleY(${flip})`,
            overflow: "hidden",
            ...a.style,
          }}
          {...a.gest}
        >
          <g data-scroll="">
            <g data-float="">{pathContent}</g>
          </g>
        </svg>
      </>
    );
  };
}

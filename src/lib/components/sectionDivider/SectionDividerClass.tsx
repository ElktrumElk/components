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

const SVG_PATHS: Record<DividerVariant, string> = {
  wave: "M0,32 C160,80 320,0 480,32 C640,64 800,16 960,32 C1120,48 1280,16 1440,32 L1440,0 L0,0 Z",
  curl: "M0,40 C80,10 120,70 200,40 C280,10 320,70 400,40 C480,10 520,70 600,40 C680,10 720,70 800,40 C880,10 920,70 1000,40 C1080,10 1120,70 1200,40 C1280,10 1320,70 1440,40 L1440,0 L0,0 Z",
  zigzag: "M0,0 L120,60 L240,0 L360,60 L480,0 L600,60 L720,0 L840,60 L960,0 L1080,60 L1200,0 L1320,60 L1440,0 Z",
  dots: "M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z",
  tilde: "M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,0 L0,0 Z",
  heart: "M0,50 C180,20 240,70 360,40 C480,10 540,60 720,40 C900,20 960,70 1080,40 C1200,10 1260,60 1440,40 L1440,0 L0,0 Z",
  diamond: "M0,40 L120,0 L240,40 L360,0 L480,40 L600,0 L720,40 L840,0 L960,40 L1080,0 L1200,40 L1320,0 L1440,40 L1440,0 L0,0 Z",
  leaf: "M0,50 C120,10 240,60 360,30 C480,0 600,50 720,30 C840,10 960,60 1080,30 C1200,0 1320,50 1440,30 L1440,0 L0,0 Z",
  curve: "M0,48 C240,80 480,0 720,48 C960,96 1200,0 1440,48 L1440,0 L0,0 Z",
  pulse: "M0,40 L200,40 L280,0 L360,80 L440,0 L520,80 L600,0 L680,40 L880,40 C1040,40 1040,40 1200,40 L1440,40 L1440,0 L0,0 Z",
  loop: "M0,40 C180,80 180,0 360,40 C540,80 540,0 720,40 C900,80 900,0 1080,40 C1260,80 1260,0 1440,40 L1440,0 L0,0 Z",
  scroll: "M0,50 C80,20 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 L1440,0 L0,0 Z",
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
  keyframes: Keyframe[];
  easing: string;
  duration: number;
}

const VARIANT_ANIM: Record<DividerVariant, VariantAnimConfig> = {
  wave: {
    keyframes: [
      { transform: "translateX(0) scaleY(1)", opacity: "0.85" },
      { transform: "translateX(-50px) scaleY(1.08)", opacity: "1" },
      { transform: "translateX(-100px) scaleY(0.95)", opacity: "0.9" },
      { transform: "translateX(-50px) scaleY(1.04)", opacity: "1" },
      { transform: "translateX(0) scaleY(1)", opacity: "0.85" },
    ],
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 4000,
  },
  curl: {
    keyframes: [
      { transform: "translateX(0) rotate(0deg)" },
      { transform: "translateX(-70px) rotate(-1deg)" },
      { transform: "translateX(-140px) rotate(0deg)" },
      { transform: "translateX(-70px) rotate(1deg)" },
      { transform: "translateX(0) rotate(0deg)" },
    ],
    easing: "linear",
    duration: 3000,
  },
  zigzag: {
    keyframes: [
      { transform: "translateX(0) skewX(0deg)" },
      { transform: "translateX(-12px) skewX(3deg)" },
      { transform: "translateX(8px) skewX(-2deg)" },
      { transform: "translateX(-6px) skewX(1.5deg)" },
      { transform: "translateX(0) skewX(0deg)" },
    ],
    easing: "steps(5)",
    duration: 1200,
  },
  dots: {
    keyframes: [
      { opacity: "0.3", filter: "blur(0px)" },
      { opacity: "1", filter: "blur(1.5px)" },
      { opacity: "0.5", filter: "blur(0px)" },
      { opacity: "1", filter: "blur(0.5px)" },
      { opacity: "0.3", filter: "blur(0px)" },
    ],
    easing: "ease-in-out",
    duration: 2500,
  },
  tilde: {
    keyframes: [
      { transform: "translateX(0) translateY(0)" },
      { transform: "translateX(-35px) translateY(-6px)" },
      { transform: "translateX(-70px) translateY(0)" },
      { transform: "translateX(-35px) translateY(6px)" },
      { transform: "translateX(0) translateY(0)" },
    ],
    easing: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
    duration: 3500,
  },
  heart: {
    keyframes: [
      { transform: "scale(1)", opacity: "1" },
      { transform: "scale(1.15)", opacity: "1" },
      { transform: "scale(0.95)", opacity: "0.85" },
      { transform: "scale(1.1)", opacity: "1" },
      { transform: "scale(1)", opacity: "1" },
    ],
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    duration: 1200,
  },
  diamond: {
    keyframes: [
      { transform: "rotate(0deg) scale(1)", opacity: "0.8" },
      { transform: "rotate(4deg) scale(1.06)", opacity: "1" },
      { transform: "rotate(0deg) scale(1)", opacity: "0.8" },
      { transform: "rotate(-4deg) scale(1.06)", opacity: "1" },
      { transform: "rotate(0deg) scale(1)", opacity: "0.8" },
    ],
    easing: "ease-in-out",
    duration: 3000,
  },
  leaf: {
    keyframes: [
      { transform: "rotate(0deg) translateY(0)" },
      { transform: "rotate(6deg) translateY(-4px)" },
      { transform: "rotate(-2deg) translateY(1px)" },
      { transform: "rotate(-5deg) translateY(-3px)" },
      { transform: "rotate(3deg) translateY(-1px)" },
      { transform: "rotate(0deg) translateY(0)" },
    ],
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    duration: 4500,
  },
  curve: {
    keyframes: [
      { transform: "scaleY(1) scaleX(1)", opacity: "0.9" },
      { transform: "scaleY(1.18) scaleX(0.97)", opacity: "1" },
      { transform: "scaleY(0.92) scaleX(1.03)", opacity: "0.92" },
      { transform: "scaleY(1.08) scaleX(0.99)", opacity: "0.97" },
      { transform: "scaleY(1) scaleX(1)", opacity: "0.9" },
    ],
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 3500,
  },
  pulse: {
    keyframes: [
      { transform: "translateY(0) scaleY(1)" },
      { transform: "translateY(-10px) scaleY(1.4)" },
      { transform: "translateY(3px) scaleY(0.7)" },
      { transform: "translateY(-4px) scaleY(1.15)" },
      { transform: "translateY(0) scaleY(1)" },
    ],
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    duration: 1000,
  },
  loop: {
    keyframes: [
      { transform: "translateX(0) scaleX(1)" },
      { transform: "translateX(-60px) scaleX(0.95)" },
      { transform: "translateX(-120px) scaleX(1)" },
      { transform: "translateX(-60px) scaleX(1.05)" },
      { transform: "translateX(0) scaleX(1)" },
    ],
    easing: "cubic-bezier(0.45, 0, 0.55, 1)",
    duration: 3500,
  },
  scroll: {
    keyframes: [
      { transform: "translateX(0) perspective(400px) rotateY(0deg)", opacity: "1" },
      { transform: "translateX(-25px) perspective(400px) rotateY(6deg)", opacity: "0.88" },
      { transform: "translateX(0) perspective(400px) rotateY(0deg)", opacity: "1" },
      { transform: "translateX(15px) perspective(400px) rotateY(-4deg)", opacity: "0.92" },
      { transform: "translateX(0) perspective(400px) rotateY(0deg)", opacity: "1" },
    ],
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 4000,
  },
};

/**
 * Props for the SectionDivider component.
 *
 * Renders an SVG divider with multiple decorative variants (wave, curl, zigzag, etc.).
 * Supports both stroked and filled rendering modes, with optional Web Animations API
 * powered animation per variant.
 *
 * @property variant - The visual style of the divider. Defaults to `"wave"`.
 * @property color - Stroke color for stroked variants, also used as fallback fill. Defaults to `"#e2e8f0"`.
 * @property fillColor - Fill color for filled variants. Falls back to `color` if omitted.
 * @property strokeWidth - Stroke width in pixels for stroked variants. Defaults to `2`.
 * @property height - Height of the SVG in pixels. Defaults to `80`.
 * @property width - CSS width of the SVG. Defaults to `"100%"`.
 * @property flip - If `true`, mirrors the divider vertically.
 * @property customPath - A custom SVG path string to override the built-in variant path.
 * @property className - Additional CSS class names applied to the root `<svg>` element.
 * @property style - Inline styles merged onto the root `<svg>` element.
 * @property child - A React component type rendered as a child element (reserved for extensibility).
 * @property gest - Additional HTML/SVG attributes spread onto the root `<svg>` element.
 * @property onFunc - Callback invoked with the internal `_SectionDivider` instance after initialization.
 * @property animate - When `true`, enables Web Animations API animation on the divider path(s).
 * @property duration - Animation duration in milliseconds. Defaults to `3000`.
 * @property delay - Delay before the animation starts in milliseconds. Defaults to `0`.
 * @property gesture - Gesture that triggers the animation: `"click"`, `"hover"`, `"focus"`, `"scroll"`, or `"none"`. When set, `animate` is implied.
 * @property listen - A `Store` instance. When its state changes, the animation replays. Useful for cross-component triggering.
 */
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
  gest?: React.DetailedHTMLProps<
    React.SVGAttributes<SVGSVGElement>,
    SVGSVGElement
  >;
  onFunc?: (self: _SectionDivider) => void;
  animate?: boolean;
  duration?: number;
  delay?: number;
  gesture?: Gesture;
  listen?: Store<Record<string, unknown>>;
}

export class _SectionDivider {
  child!: ElementType;
  private svgRef: SVGSVGElement | null = null;
  private animations: Animation[] = [];
  private gestureCleanups: (() => void)[] = [];
  private listenUnsubscribes: (() => void)[] = [];

  play = () => {
    this.animations.forEach((a) => {
      a.cancel();
      a.play();
    });
  };

  stop = () => {
    this.animations.forEach((a) => a.cancel());
  };

  dispose = () => {
    this.stop();
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];
    this.listenUnsubscribes.forEach((fn) => fn());
    this.listenUnsubscribes = [];
  };

  private applyAnimation = (props: SectionDividerProp) => {
    if (!this.svgRef) return;

    const shouldAnimate =
      props.animate || (props.gesture && props.gesture !== "none");
    if (!shouldAnimate) return;

    const variant = props.variant || "wave";
    const variantAnim = VARIANT_ANIM[variant];
    const duration = props.duration ?? variantAnim.duration;
    const delay = props.delay ?? 0;
    const keyframes = variantAnim.keyframes;

    const paths = this.svgRef.querySelectorAll("path");
    paths.forEach((path) => {
      const anim = path.animate(keyframes, {
        duration,
        delay,
        iterations: Infinity,
        easing: variantAnim.easing,
      });
      anim.pause();
      this.animations.push(anim);
    });

    if (shouldAnimate && (!props.gesture || props.gesture === "none")) {
      this.animations.forEach((a) => a.play());
    }

    this.bindGestures(props.gesture, props.delay);
    this.bindListen(props.listen);
  };

  private bindGestures = (gesture?: Gesture, delay?: number) => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];

    if (!this.svgRef || !gesture || gesture === "none") return;

    const playAll = () => {
      this.animations.forEach((a) => {
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
            ...a.style,
          }}
          {...a.gest}
        >
          {isFilled ? (
            <path
              d={path}
              fill={fillColor}
              opacity={0.9}
            />
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
              {dots && (
                <path
                  d={dots}
                  fill={color}
                  opacity={0.5}
                />
              )}
            </>
          )}
        </svg>
      </>
    );
  };
}

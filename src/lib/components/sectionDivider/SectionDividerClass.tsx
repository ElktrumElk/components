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
  easing: string;
  duration: number;
  perPathDuration?: number;
}

const VARIANT_ANIM: Record<DividerVariant, VariantAnimConfig> = {
  wave: { easing: "linear", duration: 5000, perPathDuration: 5000 },
  curl: { easing: "linear", duration: 4000, perPathDuration: 4000 },
  zigzag: { easing: "linear", duration: 3000, perPathDuration: 3000 },
  dots: { easing: "linear", duration: 6000, perPathDuration: 6000 },
  tilde: { easing: "linear", duration: 4500, perPathDuration: 4500 },
  heart: { easing: "linear", duration: 4000, perPathDuration: 4000 },
  diamond: { easing: "linear", duration: 3500, perPathDuration: 3500 },
  leaf: { easing: "linear", duration: 5500, perPathDuration: 5500 },
  curve: { easing: "linear", duration: 5000, perPathDuration: 5000 },
  pulse: { easing: "linear", duration: 2500, perPathDuration: 2500 },
  loop: { easing: "linear", duration: 4500, perPathDuration: 4500 },
  scroll: { easing: "linear", duration: 6000, perPathDuration: 6000 },
};

/**
 * Props for the SectionDivider component.
 *
 * Renders an SVG divider with multiple decorative variants (wave, curl, zigzag, etc.).
 * Supports both stroked and filled rendering modes, with optional Web Animations API
 * powered continuous scroll animation per variant.
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
 * @property animate - When `true`, enables continuous scroll animation on the divider path(s).
 * @property duration - Animation duration per cycle in milliseconds. Defaults to variant-specific.
 * @property delay - Delay before the animation starts in milliseconds. Defaults to `0`.
 * @property direction - Scroll direction: `"ltr"` (left-to-right), `"rtl"` (right-to-left), `"ttb"` (top-to-bottom), `"btt"` (bottom-to-top). Defaults to `"ltr"`.
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
  direction?: Direction;
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

  private buildScrollKeyframes = (
    direction: Direction,
    duration: number,
  ): { keyframes: Keyframe[]; easing: string; dur: number } => {
    const cycle = 1440;
    const steps = 60;

    switch (direction) {
      case "ltr":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateX(${-cycle + (i * cycle) / steps}px)`,
          })),
          easing: "linear",
          dur: duration,
        };
      case "rtl":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateX(${(i * cycle) / steps}px)`,
          })),
          easing: "linear",
          dur: duration,
        };
      case "ttb":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateY(${(i * 80) / steps}px)`,
          })),
          easing: "linear",
          dur: duration,
        };
      case "btt":
        return {
          keyframes: Array.from({ length: steps + 1 }, (_, i) => ({
            transform: `translateY(${-80 + (i * 80) / steps}px)`,
          })),
          easing: "linear",
          dur: duration,
        };
    }
  };

  private applyAnimation = (props: SectionDividerProp) => {
    if (!this.svgRef) return;

    const shouldAnimate =
      props.animate || (props.gesture && props.gesture !== "none");
    if (!shouldAnimate) return;

    const variant = props.variant || "wave";
    const variantAnim = VARIANT_ANIM[variant];
    const direction = props.direction || "ltr";
    const duration = props.duration ?? variantAnim.duration;
    const delay = props.delay ?? 0;

    const scrollConfig = this.buildScrollKeyframes(direction, duration);

    const pathContainer = this.svgRef.querySelector("g");
    if (!pathContainer) return;

    const anim = pathContainer.animate(scrollConfig.keyframes, {
      duration: scrollConfig.dur,
      delay,
      iterations: Infinity,
      easing: scrollConfig.easing,
    });
    anim.pause();
    this.animations.push(anim);

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
            overflow: "hidden",
            ...a.style,
          }}
          {...a.gest}
        >
          <g>
            {isFilled ? (
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
            )}
          </g>
        </svg>
      </>
    );
  };
}

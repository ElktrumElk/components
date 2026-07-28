import React from "react";
import { createStore } from "../../../hooks/createStore";
import { rrender } from "../../utility/lib";

type Gesture = "click" | "hover" | "focus" | "scroll" | "none";

type TransitionEffect =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down"
  | "zoom"
  | "flip"
  | "liquid"
  | "smooth"
  | "morph"
  | "glide"
  | "reveal"
  | "pop";

type MotionTransition = {
  type?: "spring" | "tween";
  duration?: number;
  ease?: string | number[];
  bounce?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  delay?: number;
};

/**
 * Props for the Transition component.
 * Supports both CSS transition-based effects and Motion (motion/react) declarative enter/exit animations.
 */
export interface TransitionProp {
  /** Element type to render as the initial/base state. */
  from?: React.JSX.ElementType;
  /** Element type to render as the target state. */
  to?: React.JSX.ElementType;
  /** Boolean to manually control which state is active (true = "to", false = "from"). */
  active?: boolean;
  /** Built-in transition effect preset. */
  effect?: TransitionEffect;
  /** Transition duration in milliseconds. Defaults to 300. */
  duration?: number;
  /** Delay before transition starts in milliseconds. */
  delay?: number;
  /** CSS easing function string. Defaults to "cubic-bezier(0.4, 0, 0.2, 1)". */
  easing?: string;
  /** If true, transition starts automatically on mount. */
  isAutomatic?: boolean;
  /** Gesture type to trigger transition: "click", "hover", "focus", "scroll", or "none". */
  gesture?: Gesture;
  /** Optional CSS class name for the container. */
  className?: string;
  /** Optional inline CSS styles for the container. */
  style?: React.CSSProperties;
  /** Optional HTML div attributes spread onto the container. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** Transform origin for CSS transitions. Defaults to "top left". */
  origin?: string;
  /** Threshold for gesture timing calculations. */
  threshold?: number;
  /** Callback receiving the _Transition instance for imperative control. */
  onFunc?: (self: _Transition) => void;
  /** Callback fired when the transition animation ends. */
  onTransitionEnd?: () => void;

  // --- Motion props ---
  /** Enable Motion-based enter/exit animations instead of CSS transitions. */
  useMotion?: boolean;
  /** Motion enter animation state (e.g. `{ opacity: 1, x: 0 }`). Overrides effect preset when useMotion is true. */
  motionInitial?: Record<string, any>;
  /** Motion exit animation state (e.g. `{ opacity: 0, x: -100 }`). Overrides effect preset when useMotion is true. */
  motionExit?: Record<string, any>;
  /** Motion transition configuration (spring or tween). */
  motionTransition?: MotionTransition;
}

export const LAYER_BASE = createStore<{
  position: "absolute" | "relative";
  willChange: string;
  backfaceVisibility: string;
}>({
  position: "absolute",
  willChange: "opacity, transform, filter",
  backfaceVisibility: "hidden",
});

const EFFECTS: Record<
  TransitionEffect,
  { enter: React.CSSProperties; exit: React.CSSProperties }
> = {
  fade: {
    enter: { opacity: "1" },
    exit: { opacity: "0" },
  },
  "slide-left": {
    enter: { transform: "translate3d(0,0,0)", opacity: "1" },
    exit: { transform: "translate3d(-100%,0,0)", opacity: "0" },
  },
  "slide-right": {
    enter: { transform: "translate3d(0,0,0)", opacity: "1" },
    exit: { transform: "translate3d(100%,0,0)", opacity: "0" },
  },
  "slide-up": {
    enter: { transform: "translate3d(0,0,0)", opacity: "1" },
    exit: { transform: "translate3d(0,-100%,0)", opacity: "0" },
  },
  "slide-down": {
    enter: { transform: "translate3d(0,0,0)", opacity: "1" },
    exit: { transform: "translate3d(0,100%,0)", opacity: "0" },
  },
  zoom: {
    enter: { transform: "translate3d(0,0,0) scale(1)", opacity: "1" },
    exit: { transform: "translate3d(0,0,0) scale(0.85)", opacity: "0" },
  },
  flip: {
    enter: { transform: "perspective(600px) rotateY(0deg)", opacity: "1" },
    exit: { transform: "perspective(600px) rotateY(-90deg)", opacity: "0" },
  },
  liquid: {
    enter: {
      filter: "blur(0px) saturate(1)",
      opacity: "1",
      transform: "scale(1)",
    },
    exit: {
      filter: "blur(16px) saturate(1.5)",
      opacity: "0",
      transform: "scale(1.08)",
    },
  },
  smooth: {
    enter: { transform: "translate3d(0,0,0) scale(1)", opacity: "1" },
    exit: { transform: "translate3d(0,16px,0) scale(0.96)", opacity: "0" },
  },
  morph: {
    enter: {
      transform: "scale(1) rotate(0deg)",
      opacity: "1",
      borderRadius: "0",
    },
    exit: {
      transform: "scale(0.6) rotate(8deg)",
      opacity: "0",
      borderRadius: "24px",
    },
  },
  glide: {
    enter: { transform: "translate3d(0,0,0) skewX(0deg)", opacity: "1" },
    exit: { transform: "translate3d(-60%,0,0) skewX(-4deg)", opacity: "0" },
  },
  reveal: {
    enter: { clipPath: "inset(0 0 0 0)", opacity: "1" },
    exit: { clipPath: "inset(0 0 100% 0)", opacity: "0.5" },
  },
  pop: {
    enter: { transform: "translate3d(0,0,0) scale(1)", opacity: "1" },
    exit: { transform: "translate3d(0,0,0) scale(0.5)", opacity: "0" },
  },
};

/** Convert effect presets to motion-compatible initial/animate/exit objects. */
export const effectToMotion = (
  effect: TransitionEffect,
): { initial: Record<string, any>; animate: Record<string, any>; exit: Record<string, any> } => {
  const toMotionStyle = (css: React.CSSProperties): Record<string, any> => {
    const result: Record<string, any> = {};
    if (css.opacity !== undefined) result.opacity = parseFloat(css.opacity as string);
    if (css.transform) {
      const transforms: Record<string, any> = {};
      const regex = /(\w+3d|translateX|translateY|translateZ|scale|scaleX|scaleY|rotate|rotateX|rotateY|rotateZ|skewX|skewY)\(([^)]+)\)/g;
      let match;
      while ((match = regex.exec(css.transform as string)) !== null) {
        const [, fn, val] = match;
        if (fn === "translate3d") {
          const [x, y] = val.split(",").map((v) => v.trim());
          transforms.x = x;
          transforms.y = y;
        } else {
          transforms[fn] = val;
        }
      }
      if (Object.keys(transforms).length > 0) Object.assign(result, transforms);
    }
    if (css.filter) result.filter = css.filter;
    if (css.clipPath) result.clipPath = css.clipPath;
    if (css.borderRadius) result.borderRadius = css.borderRadius;
    return result;
  };

  const preset = EFFECTS[effect];
  return {
    initial: toMotionStyle(preset.exit),
    animate: toMotionStyle(preset.enter),
    exit: toMotionStyle(preset.exit),
  };
};

export class _Transition {
  containerRef = React.createRef<HTMLDivElement>();
  isBasehide: boolean = false;
  isBaseTransition: boolean = false;
  timer: ReturnType<typeof setTimeout> | null = null;
  private gestureCleanups: (() => void)[] = [];
  private transformOrigin: string = "top left";

  trigger = () => {
    this.isBaseTransition = !this.isBaseTransition;
  };

  startTimer = (duration: number, cb?: () => void) => {
    this.disposeTimer();
    this.timer = setTimeout(() => {
      cb?.();
      this.timer = null;
    }, duration);
  };

  disposeTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  bindGestures = (
    gesture?: Gesture,
    delay?: number,
    threshold?: number,
    onTrigger?: () => void,
  ) => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];

    const el = this.containerRef.current;

    if (!el || !gesture || gesture === "none") return;

    const handler = () => {
      onTrigger?.();

      const id = setTimeout(
        () => {
          this.isBasehide = !this.isBasehide;
          rrender.setState({ isGestureActivate: true });
        },
        delay! / (threshold || 2),
      );

      return () => clearTimeout(id);
    };

    const eventMap: Record<string, string> = {
      click: "click",
      hover: "mouseenter",
      focus: "focusin",
      scroll: "scroll",
    };

    const eventName = eventMap[gesture];
    if (eventName) {
      el.addEventListener(eventName, handler);
      this.gestureCleanups.push(() => {
        el.removeEventListener(eventName, handler);
      });
    }
  };

  dispose = () => {
    this.disposeTimer();
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];
  };

  build? = ({ ...a }: TransitionProp): React.JSX.Element => {
    if (a.useMotion) {
      return this.buildMotion({ ...a });
    }
    return this.buildCSS({ ...a });
  };

  private buildMotion = (a: TransitionProp): React.JSX.Element => {
    const effect = a.effect ?? "fade";
    const motionAnim = effectToMotion(effect);
    const duration = (a.duration ?? 300) / 1000;
    const delay = (a.delay ?? 0) / 1000;

    const initial = a.motionInitial ?? motionAnim.initial;
    const exit = a.motionExit ?? motionAnim.exit;
    const animate = motionAnim.animate;

    const motionTransition = a.motionTransition ?? {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration,
      delay,
    };

    let AnimatePresence: any;
    let MotionDiv: any;
    try {
      const motion = require("motion/react");
      AnimatePresence = motion.AnimatePresence;
      MotionDiv = motion.motion.div;
    } catch {
      return this.buildCSS(a);
    }

    const showTo = this.isBaseTransition;

    return (
      <div
        ref={this.containerRef}
        className={a.className}
        style={{
          position: "relative",
          overflow: "visible",
          width: "max-content",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          ...a.style,
        }}
        {...a.gest}
      >
        <AnimatePresence mode="wait">
          {!showTo && a.from && (
            <MotionDiv
              key="from"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={motionTransition}
              style={{
                position: "absolute",
                width: "max-content",
                height: "max-content",
                zIndex: showTo ? 0 : 1,
                pointerEvents: showTo ? "none" : "auto",
              }}
            >
              <a.from />
            </MotionDiv>
          )}
          {showTo && a.to && (
            <MotionDiv
              key="to"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={motionTransition}
              style={{
                position: "absolute",
                width: "max-content",
                height: "max-content",
                zIndex: 1,
                pointerEvents: "auto",
              }}
            >
              <a.to />
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    );
  };

  private buildCSS = (a: TransitionProp): React.JSX.Element => {
    const effect = EFFECTS[a.effect ?? "fade"];

    this.transformOrigin = a.origin || "top left";

    const duration = a.duration ?? 300;
    const easing = a.easing ?? "cubic-bezier(0.4, 0, 0.2, 1)";

    const transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, filter ${duration}ms ${easing}, clip-path ${duration}ms ${easing}, border-radius ${duration}ms ${easing}`;

    const showTo = this.isBaseTransition;

    const fromStyle: React.CSSProperties = {
      transformOrigin: this.transformOrigin,
      position: LAYER_BASE.getState().position,
      backfaceVisibility: LAYER_BASE.getState().backfaceVisibility,
      willChange: LAYER_BASE.getState().willChange,
      transition,
      ...(showTo ? effect.exit : effect.enter),
      width: "max-content",
      height: "max-content",
      zIndex: showTo ? 0 : 1,
      pointerEvents: showTo ? "none" : "auto",
      display: this.isBasehide ? "none" : "flex",
    };

    const toStyle: React.CSSProperties = {
      transformOrigin: this.transformOrigin,
      position: LAYER_BASE.getState().position,
      backfaceVisibility: LAYER_BASE.getState().backfaceVisibility,
      willChange: LAYER_BASE.getState().willChange,
      transition,
      ...(this.isBasehide ? effect.enter : effect.exit),
      width: "max-content",
      height: "max-content",
      zIndex: this.isBasehide ? 1 : 0,
      pointerEvents: this.isBasehide ? "auto" : "none",
      display: showTo ? "flex" : "none",
    };

    return (
      <div
        ref={this.containerRef}
        className={a.className}
        style={{
          position: "relative",
          overflow: "visible",
          width: "max-content",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          ...a.style,
        }}
        {...a.gest}
      >
        {a.from && (
          <div style={fromStyle}>
            <a.from />
          </div>
        )}
        {a.to && (
          <div style={toStyle}>
            <a.to />
          </div>
        )}
      </div>
    );
  };
}

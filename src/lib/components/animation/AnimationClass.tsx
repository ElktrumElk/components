import React from "react";

type Gesture = "click" | "hover" | "focus" | "scroll" | "none";

export type MotionTransition = {
  type?: "spring" | "tween";
  duration?: number;
  ease?: string | number[];
  bounce?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  delay?: number;
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
   
};

/**
 * Props for the Animation component.
 * Supports both Web Animations API (keyframes) and Motion (motion/react) declarative animations.
 */
export interface AnimationProp {
  /** Component type to render as the child of the animation wrapper. */
  child?: React.JSX.ElementType;
  /** Custom inline styles applied to the wrapper element. */
  style?: React.CSSProperties;

  // --- Web Animations API props (legacy) ---
  /** Array of Keyframe objects defining the animation steps. Defaults to a fade-in + slide-up. */
  keyframes?: Keyframe[];
  /** Duration of the animation in milliseconds. Defaults to 300. */
  duration?: number;
  /** Delay before the animation starts in milliseconds. Defaults to 0. */
  delay?: number;
  /** Number of times the animation repeats. Use Infinity for looping. Defaults to 1. */
  iterations?: number;
  /** Whether the animation plays forward, backward, or alternates. Defaults to "normal". */
  direction?: PlaybackDirection;
  /** How the animation applies styles before and after execution. Defaults to "forwards". */
  fill?: FillMode;
  /** CSS easing function string for timing. Defaults to "ease". */
  easing?: string;

  // --- Motion props ---
  /** Initial state for motion animation (e.g. `{ opacity: 0, y: 20 }`). */
  initial?: Record<string, any>;
  /** Target state for motion animation (e.g. `{ opacity: 1, y: 0 }`). Animates automatically when this changes. */
  animate?: Record<string, any>;
  /** Exit state for motion animation when used with AnimatePresence (e.g. `{ opacity: 0 }`). */
  exit?: Record<string, any>;
  /** State applied on hover (e.g. `{ scale: 1.05 }`). */
  whileHover?: Record<string, any>;
  /** State applied on tap/click (e.g. `{ scale: 0.95 }`). */
  whileTap?: Record<string, any>;
  /** State applied when element enters viewport (e.g. `{ opacity: 1 }`). */
  whileInView?: Record<string, any>;
  /** Motion transition configuration (spring or tween). */
  transition?: MotionTransition;
  /** Named animation states for variant-based animation. */
  variants?: Record<string, any>;
  /** Enable layout animations for automatic size/position transitions. */
  layout?: boolean | "position" | "size" | "preserve";
  /** Viewport configuration for whileInView (e.g. `{ once: true, amount: 0.5 }`). */
  viewport?: { once?: boolean; amount?: number | "some" | "all" };

  // --- Shared props ---
  /** When true the animation plays immediately on mount. When false it pauses until triggered. Defaults to true. */
  isAutomatic?: boolean;
  /**play the animation */
  // play: boolean;
  /**Pause the Animation */
  //pause: boolean;
  /**Clear the animation */
  //cancel: boolean;
  /** Gesture type that triggers the animation: "click", "hover", "focus", "scroll", or "none". */
  gesture?: Gesture;
  /** Additional CSS class name for the wrapper element. */
  className?: string;
  /** Additional HTML attributes spread onto the wrapper div. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** Callback invoked after mount, receiving the internal _Animation instance for imperative control. */
  onFunc?: (self: _Animation) => void;
}

const DEFAULT_KEYFRAMES: Keyframe[] = [
  { opacity: "0", transform: "translateY(8px)" },
  { opacity: "1", transform: "translateY(0)" },
];

export class _Animation {
  wrapperRef = React.createRef<any>();
  animation: Animation | null = null;
  private gestureCleanups: (() => void)[] = [];

  /** Whether this instance is using motion mode (has initial/animate props). */
  isMotionMode = false;

  play = () => this.animation?.play();
  pause = () => this.animation?.pause();
  reverse = () => this.animation?.reverse();
  cancel = () => this.animation?.cancel();

  applyAnimation = (props: AnimationProp) => {
    const el = this.wrapperRef.current;
    if (!el) return;

    this.isMotionMode = !!(props.initial || props.animate || props.exit || props.variants || props.whileHover || props.whileTap || props.whileInView);

    if (this.isMotionMode) return;

    this.animation?.cancel();

    const keyframes = props.keyframes || DEFAULT_KEYFRAMES;
    const options: KeyframeAnimationOptions = {
      duration: props.duration ?? 300,
      delay: props.delay ?? 0,
      iterations: props.iterations ?? 1,
      direction: props.direction ?? "normal",
      fill: props.fill ?? "forwards",
      easing: props.easing ?? "ease",
    };

    this.animation = el.animate(keyframes, options);

    if (!props.isAutomatic) {
      this.animation?.pause();
    }

    this.bindGestures(props.gesture);
  };

  bindGestures = (gesture?: Gesture) => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];

    const el = this.wrapperRef.current;
    if (!el || !gesture || gesture === "none") return;

    const play = () => this.play();
    let cleanup: (() => void) | undefined;

    switch (gesture) {
      case "click": {
        el.addEventListener("click", play);
        cleanup = () => el.removeEventListener("click", play);
        break;
      }
      case "hover": {
        el.addEventListener("mouseenter", play);
        cleanup = () => el.removeEventListener("mouseenter", play);
        break;
      }
      case "focus": {
        el.addEventListener("focusin", play);
        cleanup = () => el.removeEventListener("focusin", play);
        break;
      }
      case "scroll": {
        el.addEventListener("scroll", play);
        cleanup = () => el.removeEventListener("scroll", play);
        break;
      }
    }

    if (cleanup) this.gestureCleanups.push(cleanup);
  };

  dispose = () => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];
    this.animation?.cancel();
  };

  build? = ({ ...a }: AnimationProp): React.JSX.Element => {
    const useMotion = !!(a.initial || a.animate || a.exit || a.variants || a.whileHover || a.whileTap || a.whileInView);

    if (useMotion) {
      let MotionDiv: any;
      try {
        MotionDiv = require("motion/react").motion.div;
      } catch {
        MotionDiv = "div";
      }

      const motionProps: Record<string, any> = {};
      if (a.initial !== undefined) motionProps.initial = a.initial;
      if (a.animate !== undefined) motionProps.animate = a.animate;
      if (a.exit !== undefined) motionProps.exit = a.exit;
      if (a.whileHover !== undefined) motionProps.whileHover = a.whileHover;
      if (a.whileTap !== undefined) motionProps.whileTap = a.whileTap;
      if (a.whileInView !== undefined) motionProps.whileInView = a.whileInView;
      if (a.variants !== undefined) motionProps.variants = a.variants;
      if (a.layout !== undefined) motionProps.layout = a.layout;
      if (a.transition !== undefined) {
        motionProps.transition = a.transition;
      } else {
        motionProps.transition = {
          type: "spring",
          stiffness: 100,
          damping: 15,
          ...(a.duration !== undefined ? { duration: a.duration / 1000 } : {}),
          ...(a.delay !== undefined ? { delay: a.delay / 1000 } : {}),
        };
      }
      if (a.viewport !== undefined) motionProps.viewport = a.viewport;

      return (
        <MotionDiv
          ref={this.wrapperRef}
          className={a.className}
          style={{ width: "auto", height: "auto", ...a.style }}
          {...motionProps}
          {...a.gest}
        >
          {a.child && <a.child />}
        </MotionDiv>
      );
    }

    return (
      <div
        ref={this.wrapperRef}
        className={a.className}
        style={{ width: "auto", height: "auto", ...a.style }}
        {...a.gest}
      >
        {a.child && <a.child />}
      </div>
    );
  };
}

import React from "react";

type Gesture = "click" | "hover" | "focus" | "scroll" | "none";

/**
 * Props for the Animation component.
 * Provides Web Animation API integration with gesture-based triggers.
 */
export interface AnimationProp {
  /** Component type to render as the child of the animation wrapper. */
  child?: React.JSX.ElementType;
  /** Custom inline styles applied to the wrapper element. */
  style?: React.CSSProperties;
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
  /** When true the animation plays immediately on mount. When false it pauses until triggered. Defaults to true. */
  isAutomatic?: boolean;
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
  wrapperRef = React.createRef<HTMLDivElement>();
  animation: Animation | null = null;
  private gestureCleanups: (() => void)[] = [];

  play = () => this.animation?.play();
  pause = () => this.animation?.pause();
  reverse = () => this.animation?.reverse();
  cancel = () => this.animation?.cancel();

  applyAnimation = (props: AnimationProp) => {
    const el = this.wrapperRef.current;
    if (!el) return;

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
      this.animation.pause();
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
    return (
      <div
        ref={this.wrapperRef}
        className={a.className}
        style={{width: 'auto', height: 'auto',...a.style}}
        {...a.gest}
      >
        {a.child && <a.child />}
      </div>
    );
  };
}

import React from "react";

type Gesture = "click" | "hover" | "focus" | "scroll" | "none";

export interface AnimationProp {
  child?: React.JSX.ElementType;
  keyframes?: Keyframe[];
  duration?: number;
  delay?: number;
  iterations?: number;
  direction?: PlaybackDirection;
  fill?: FillMode;
  easing?: string;
  isAutomatic?: boolean;
  gesture?: Gesture;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
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
        style={a.style}
        {...a.gest}
      >
        {a.child && <a.child />}
      </div>
    );
  };
}

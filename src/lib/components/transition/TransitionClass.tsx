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

export interface TransitionProp {
  from?: React.JSX.ElementType;
  to?: React.JSX.ElementType;
  active?: boolean;
  effect?: TransitionEffect;
  duration?: number;
  delay?: number;
  easing?: string;
  isAutomatic?: boolean;
  gesture?: Gesture;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  origin?: string;
  threshold?: number;
  onFunc?: (self: _Transition) => void;
  onTransitionEnd?: () => void;
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

export class _Transition {
  /**
   * The transition container that apply transition to its childere
   * @see https://components-doc
   */
  containerRef = React.createRef<HTMLDivElement>();

  /**
   * This triggers the display of the base component(from) to set it display between flex / none
   */
  isBasehide: boolean = false;

  /**
   * This helps to apply the transition before the isBasehide is triggered to true
   */
  isBaseTransition: boolean = false;

  /**
   * Set the time delay
   */
  timer: ReturnType<typeof setTimeout> | null = null;

  /**
   * This listen for use gesture to trigger the transition
   */
  private gestureCleanups: (() => void)[] = [];

  /**
   * Set the origin of transformation
   */
  private transformOrigin: string = 'top left';

  /**
   * method that starts the transition flag
   */
  trigger = () => {
    this.isBaseTransition = true;
  };

  /**
   * start the transition animation
   * @param duration
   * @param cb
   */
  startTimer = (duration: number, cb?: () => void) => {
    this.disposeTimer();
    this.timer = setTimeout(() => {
      cb?.();
      this.timer = null;
    }, duration);
  };

  /**
   * clean up timmer
   */
  disposeTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  /**
   * Method that listen to user Gesture
   * @param gesture
   * @param onTrigger
   * @returns
   */
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
          this.isBasehide = true;
          rrender.setState({ isGestureActivate: true });
        },
        delay! / (threshold || 2),
      );
      return () => clearTimeout(id);
    };

    let cleanup: (() => void) | undefined;

    switch (gesture) {
      case "click": {
        el.addEventListener("click", () => handler());
        cleanup = () => el.removeEventListener("click", handler);
        break;
      }
      case "hover": {
        el.addEventListener("mouseenter", handler);
        cleanup = () => el.removeEventListener("mouseenter", handler);
        break;
      }
      case "focus": {
        el.addEventListener("focusin", handler);
        cleanup = () => el.removeEventListener("focusin", handler);
        break;
      }
      case "scroll": {
        el.addEventListener("scroll", handler);
        cleanup = () => el.removeEventListener("scroll", handler);
        break;
      }
    }

    if (cleanup) this.gestureCleanups.push(cleanup);
  };

  dispose = () => {
    this.disposeTimer();
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];
  };

  /**
   * Build method
   * @param param0
   * @returns
   */
  build? = ({ ...a }: TransitionProp): React.JSX.Element => {
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
      zIndex: showTo ? 1 : 0,
      pointerEvents: showTo ? "auto" : "none",
      display: this.isBaseTransition ? "flex" : "none",
    };

    return (
      <div
        ref={this.containerRef}
        className={a.className}
        style={{
          position: "relative",
          overflow: "vissible",
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

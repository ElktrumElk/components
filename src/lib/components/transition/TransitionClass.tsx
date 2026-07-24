import React from "react";

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
  | "smooth";

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
  onFunc?: (self: _Transition) => void;
  onTransitionEnd?: () => void;
}

const EFFECTS: Record<TransitionEffect, { enter: React.CSSProperties; exit: React.CSSProperties }> = {
  fade: {
    enter: { opacity: "1" },
    exit: { opacity: "0" },
  },
  "slide-left": {
    enter: { transform: "translateX(0)", opacity: "1" },
    exit: { transform: "translateX(-100%)", opacity: "0" },
  },
  "slide-right": {
    enter: { transform: "translateX(0)", opacity: "1" },
    exit: { transform: "translateX(100%)", opacity: "0" },
  },
  "slide-up": {
    enter: { transform: "translateY(0)", opacity: "1" },
    exit: { transform: "translateY(-100%)", opacity: "0" },
  },
  "slide-down": {
    enter: { transform: "translateY(0)", opacity: "1" },
    exit: { transform: "translateY(100%)", opacity: "0" },
  },
  zoom: {
    enter: { transform: "scale(1)", opacity: "1" },
    exit: { transform: "scale(0.8)", opacity: "0" },
  },
  flip: {
    enter: { transform: "perspective(800px) rotateY(0deg)", opacity: "1" },
    exit: { transform: "perspective(800px) rotateY(90deg)", opacity: "0" },
  },
  liquid: {
    enter: { filter: "blur(0px)", opacity: "1", transform: "scale(1)" },
    exit: { filter: "blur(12px)", opacity: "0", transform: "scale(1.05)" },
  },
  smooth: {
    enter: { transform: "translateY(0) scale(1)", opacity: "1" },
    exit: { transform: "translateY(12px) scale(0.97)", opacity: "0" },
  },
};

export class _Transition {
  containerRef = React.createRef<HTMLDivElement>();
  switched = false;
  timer: ReturnType<typeof setTimeout> | null = null;
  private gestureCleanups: (() => void)[] = [];

  trigger = () => {
    this.switched = !this.switched;
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

  bindGestures = (gesture?: Gesture, onTrigger?: () => void) => {
    this.gestureCleanups.forEach((fn) => fn());
    this.gestureCleanups = [];

    const el = this.containerRef.current;
    if (!el || !gesture || gesture === "none") return;

    const handler = () => onTrigger?.();
    let cleanup: (() => void) | undefined;

    switch (gesture) {
      case "click": {
        el.addEventListener("click", handler);
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

  build? = ({ ...a }: TransitionProp): React.JSX.Element => {
    const effect = EFFECTS[a.effect ?? "fade"];
    const duration = a.duration ?? 300;
    const easing = a.easing ?? "cubic-bezier(0.4, 0, 0.2, 1)";

    const transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, filter ${duration}ms ${easing}`;

    const showTo = this.switched;

    const fromStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition,
      ...(showTo ? effect.exit : effect.enter),
      zIndex: showTo ? 0 : 1,
      pointerEvents: showTo ? "none" : "auto",
      visibility: showTo ? "hidden" : "visible",
    };

    const toStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition,
      ...(showTo ? effect.enter : effect.exit),
      zIndex: showTo ? 1 : 0,
      pointerEvents: showTo ? "auto" : "none",
      visibility: showTo ? "visible" : "hidden",
    };

    return (
      <div
        ref={this.containerRef}
        className={a.className}
        style={{
          position: "relative",
          overflow: "hidden",
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

import { useRef } from "react";
import { _Animation, type AnimationProp } from "./AnimationClass";
import { useMountEffect } from "../../../components";

const InitializeAnimation = () => {
  const _animation = useRef<_Animation>(null);

  if (!_animation.current) {
    _animation.current = new _Animation();
  }

  return { _animation };
};

/**
 * ## Animation
 * child?: React.JSX.ElementType;
 * 
 * style?: React.CSSProperties;
 * 
 * keyframes?: Keyframe[];
 * 
 * duration?: number;
 * 
 * delay?: number;
 * 
 * iterations?: number;
 * 
 * direction?: PlaybackDirection;
 * 
 * fill?: FillMode;
 * 
 * easing?: string;
 * 
 * isAutomatic?: boolean;
 * 
 * gesture?: Gesture;
 * 
 * className?: string;
 * 
 * gest?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>;
 * 
 * onFunc?: (self: _Animation) => void;  
 */
export default function Animation({ ...a }: AnimationProp) {
  const { _animation } = InitializeAnimation();
  const self = _animation.current;

  a?.onFunc?.(self as _Animation);
  useMountEffect(() => {
    if (!self) return;
    self.applyAnimation(a);
    return () => self.dispose();
  });

  return self?.build?.({ ...a });
}

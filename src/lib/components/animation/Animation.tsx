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
 * Animation component providing Web Animation API integration with gesture-based triggers.
 *
 * Wraps child content in a div and applies CSS keyframe animations. Supports automatic
 * playback on mount or gesture-triggered playback via click, hover, focus, or scroll.
 *
 * @example
 * <Animation
 *   duration={500}
 *   easing="ease-in-out"
 *   gesture="hover"
 * >
 *   {() => <MyComponent />}
 * </Animation>
 *
 * @example
 * // Imperative control via onFunc
 * <Animation
 *   keyframes={[{ opacity: 0 }, { opacity: 1 }]}
 *   isAutomatic={false}
 *   gesture="click"
 *   onFunc={(self) => (animationRef.current = self)}
 * />
 *
 * @see AnimationClass.tsx for the underlying _Animation class.
 *
 * @param child - Component type to render inside the animation wrapper.
 * @param style - Custom inline styles for the wrapper element.
 * @param keyframes - Array of Keyframe objects defining the animation.
 * @param duration - Animation duration in milliseconds (default: 300).
 * @param delay - Delay before animation starts in milliseconds (default: 0).
 * @param iterations - Number of repetitions; use Infinity to loop (default: 1).
 * @param direction - Playback direction: "normal", "reverse", "alternate", etc. (default: "normal").
 * @param fill - How styles apply before/after animation (default: "forwards").
 * @param easing - CSS easing function string (default: "ease").
 * @param isAutomatic - Whether to play immediately on mount (default: true).
 * @param gesture - Trigger gesture: "click", "hover", "focus", "scroll", or "none".
 * @param className - Additional CSS class for the wrapper element.
 * @param gest - Additional HTML attributes spread onto the wrapper div.
 * @param onFunc - Callback receiving the _Animation instance for imperative control.
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

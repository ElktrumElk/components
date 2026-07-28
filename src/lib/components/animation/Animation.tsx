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
 * Animation component providing Web Animation API and Motion (motion/react) integration.
 *
 * Supports both legacy keyframes-based animations and modern Motion declarative animations.
 * When `initial`/`animate`/`exit` props are provided, renders as a Motion component.
 * Otherwise falls back to Web Animations API with gesture-based triggers.
 *
 * @example
 * // Motion mode - declarative animation
 * <Animation
 *   initial={{ opacity: 0, y: 20 }}
 *   animate={{ opacity: 1, y: 0 }}
 *   exit={{ opacity: 0, y: -20 }}
 *   transition={{ type: "spring", stiffness: 200 }}
 * >
 *   {() => <MyComponent />}
 * </Animation>
 *
 * @example
 * // Motion with gestures
 * <Animation
 *   initial={{ opacity: 0, scale: 0.8 }}
 *   animate={{ opacity: 1, scale: 1 }}
 *   whileHover={{ scale: 1.05 }}
 *   whileTap={{ scale: 0.95 }}
 *   layout
 * >
 *   {() => <Button />}
 * </Animation>
 *
 * @example
 * // Legacy mode - Web Animations API
 * <Animation
 *   keyframes={[{ opacity: 0 }, { opacity: 1 }]}
 *   duration={500}
 *   gesture="hover"
 * >
 *   {() => <MyComponent />}
 * </Animation>
 *
 * @see AnimationProp for all available props.
 * @see AnimationClass.tsx for the underlying _Animation class.
 *
 * @param child - Component type to render inside the animation wrapper.
 * @param style - Custom inline styles for the wrapper element.
 * @param keyframes - Array of Keyframe objects (legacy mode).
 * @param initial - Initial state for Motion animation.
 * @param animate - Target state for Motion animation.
 * @param exit - Exit state for Motion animation (with AnimatePresence).
 * @param whileHover - State applied on hover.
 * @param whileTap - State applied on tap/click.
 * @param whileInView - State applied when entering viewport.
 * @param transition - Motion transition configuration (spring or tween).
 * @param variants - Named animation states for variant-based animation.
 * @param layout - Enable layout animations.
 * @param duration - Animation duration in milliseconds (legacy mode).
 * @param delay - Delay before animation starts in milliseconds.
 * @param easing - CSS easing function string (legacy mode).
 * @param isAutomatic - Whether to play immediately on mount (legacy mode, default: true).
 * @param gesture - Trigger gesture: "click", "hover", "focus", "scroll", or "none" (legacy mode).
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

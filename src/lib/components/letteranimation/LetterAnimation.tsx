import { useRef } from "react";
import {
  _LetterAnimation,
  type LetterAnimationProp,
} from "./LetterAnimationClass";
import { useMountEffect } from "../../../components";

const InitializeLetterAnimation = () => {
  const _letterAnimation = useRef<_LetterAnimation>(null);

  if (!_letterAnimation.current) {
    _letterAnimation.current = new _LetterAnimation();
  }

  return { _letterAnimation };
};

/**
 * LetterAnimation
 *
 * Animates individual letters or words of a text string using the Web Animations API.
 * Pick a built-in preset or supply custom keyframes for full control.
 *
 * @example
 * ```tsx
 * <LetterAnimation
 *   text="Hello World"
 *   animation="bounceIn"
 *   duration={500}
 *   stagger={80}
 *   iterations={Infinity}
 * />
 * ```
 *
 * @see {@link LetterAnimationProp} for the full list of accepted props.
 *
 * @param text - The text to animate.
 * @param type - `"letters"` (default) or `"words"`.
 * @param animation - Built-in preset name (e.g. `"fadeUp"`, `"typewriter"`).
 * @param keyframes - Custom keyframes overriding the preset.
 * @param letterKeyframes - Per-letter keyframe overrides.
 * @param words - Word segments with optional per-word keyframes.
 * @param duration - Animation duration in ms (default 300).
 * @param delay - Base delay in ms (default 0).
 * @param stagger - Delay between tokens in ms (default 50).
 * @param iterations - Repeat count (default 1).
 * @param direction - Playback direction (default `"normal"`).
 * @param fill - Fill mode (default `"forwards"`).
 * @param easing - Timing function (default `"ease"`).
 * @param className - CSS class on the container.
 * @param style - Inline styles on the container.
 * @param gest - Additional HTML attributes on the container.
 * @param onFunc - Callback receiving the imperative `_LetterAnimation` instance.
 */
export default function LetterAnimation({ ...a }: LetterAnimationProp) {
  const { _letterAnimation } = InitializeLetterAnimation();
  const self = _letterAnimation.current;

  a?.onFunc?.(self as _LetterAnimation);

  useMountEffect(() => {
    if (!self) return;
    self.apply(a);
    return () => self.dispose();
  });

  return self?.build?.({ ...a });
}

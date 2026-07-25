import { useRef, useEffect, useCallback, useState } from "react";
import {

  _Transition,
  LAYER_BASE,
  type TransitionProp,
} from "./TransitionClass";
import {  useSetState, useStore } from "../../../components";
import { rrender } from "../../utility/lib";

const InitializeTransition = () => {
  const _transition = useRef<_Transition>(null);

  if (!_transition.current) {
    _transition.current = new _Transition();
  }

  return { _transition };
};


/**
 * Transition component animates between two states using configurable effects.
 * @example
 * <Transition from={ComponentA} to={ComponentB} effect="fade" duration={500} active={true} />
 * @see TransitionProp
 * @prop from - Optional React element type for the initial state.
 * @prop to - Optional React element type for the final state.
 * @prop active - Optional boolean to manually control transition state.
 * @prop effect - Transition effect type (e.g., "fade", "slide-left", "zoom").
 * @prop duration - Transition duration in milliseconds (default: 300).
 * @prop delay - Delay before transition starts in milliseconds.
 * @prop easing - CSS easing function.
 * @prop isAutomatic - If true, transition starts automatically on mount.
 * @prop gesture - Gesture type to trigger transition.
 * @prop className - Optional CSS class name.
 * @prop style - Optional inline CSS styles.
 * @prop gest - Optional HTML div attributes.
 * @prop origin - Transform origin.
 * @prop threshold - Threshold for gesture timing calculations.
 * @prop onFunc - Callback receiving the _Transition instance.
 * @prop onTransitionEnd - Callback when transition animation ends.
 */
export default function Transition({ ...a }: TransitionProp) {
  const setLayerBase = useSetState(LAYER_BASE);
  const { _transition } = InitializeTransition();
  const self = _transition.current;
  const [, rerender] = useState(0);
  const [s, setSwitch] = useState(false);
  const {isGestureActivate} = useStore(rrender)

  const trigger = useCallback(() => {
    if (!self) return;
    self.trigger();
    rerender((n) => n + 1);
  }, [self]);

  a?.onFunc?.(self as _Transition);

  useEffect(() => {
    if (!self) return;
    self.bindGestures(a.gesture, a.delay, a.threshold,  trigger);
    return () => self.dispose();
  }, [a.gesture, isGestureActivate]);

  useEffect(() => {
    if (!self) return;

    if (a.active !== undefined) {
      // if active is true and switched is equals to false
      if (a.active && !self.isBasehide) {
        // the delay before the transition take place if not given then the transition start immediately
        const delay = a.delay ?? 0;

        // start the timmer
        self.startTimer(delay, () => {
          setSwitch(!s);
          trigger(); // triggers the display from flex to none vice versa
          setTimeout(
            () => {
              self.isBasehide = true;
             setLayerBase({ position: "relative" });
              setSwitch(false);
            },
            delay / (a.threshold || 2),
          );

          a.onTransitionEnd?.();
        });
      } else if (!a.active && self.isBasehide) {
        const delay = a.delay ?? 0;
        self.startTimer(delay, () => {
          trigger();
          a.onTransitionEnd?.();
        });
      }
      return () => self.disposeTimer();
    }

    if (a.isAutomatic && !self.isBasehide) {
      const delay = a.delay ?? 0;
      self.startTimer(delay, () => {
        trigger();
        a.onTransitionEnd?.();
      });
    }

    return () => self.disposeTimer();
  }, [a.active, a.isAutomatic, s]);

  return self?.build?.({ ...a });
}

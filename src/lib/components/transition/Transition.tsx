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

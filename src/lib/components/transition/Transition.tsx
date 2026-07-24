import { useRef, useEffect, useCallback, useState } from "react";
import { _Transition, type TransitionProp } from "./TransitionClass";

const InitializeTransition = () => {
  const _transition = useRef<_Transition>(null);

  if (!_transition.current) {
    _transition.current = new _Transition();
  }

  return { _transition };
};

export default function Transition({ ...a }: TransitionProp) {
  const { _transition } = InitializeTransition();
  const self = _transition.current;
  const [, rerender] = useState(0);

  const trigger = useCallback(() => {
    if (!self) return;
    self.trigger();
    rerender((n) => n + 1);
  }, [self]);

  a?.onFunc?.(self as _Transition);

  useEffect(() => {
    if (!self) return;
    self.bindGestures(a.gesture, trigger);
    return () => self.dispose();
  }, [a.gesture]);

  useEffect(() => {
    if (!self) return;

    if (a.active !== undefined) {
      if (a.active && !self.switched) {
        const delay = a.delay ?? 0;
        self.startTimer(delay, () => {
          trigger();
          a.onTransitionEnd?.();
        });
      } else if (!a.active && self.switched) {
        const delay = a.delay ?? 0;
        self.startTimer(delay, () => {
          trigger();
          a.onTransitionEnd?.();
        });
      }
      return () => self.disposeTimer();
    }

    if (a.isAutomatic && !self.switched) {
      const delay = a.delay ?? 0;
      self.startTimer(delay, () => {
        trigger();
        a.onTransitionEnd?.();
      });
    }

    return () => self.disposeTimer();
  }, [a.active, a.isAutomatic]);

  return self?.build?.({ ...a });
}

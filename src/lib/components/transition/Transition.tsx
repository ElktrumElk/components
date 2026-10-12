import { useCallback, useEffect, useRef, useState } from "react";
import { _Transition, type TransitionProp } from "./TransitionClass";

/**
 * Transition component animates between two component states using CSS or Motion presets.
 */
export default function Transition(a: TransitionProp) {
  const instanceRef = useRef<_Transition | null>(null);
  if (!instanceRef.current) instanceRef.current = new _Transition();
  const self = instanceRef.current;
  const [, rerender] = useState(0);
  const playsRef = useRef(0);
  const callbackRef = useRef(a.onTransitionEnd);
  const onFunc = a.onFunc;
  callbackRef.current = a.onTransitionEnd;

  const update = useCallback(() => rerender((value) => value + 1), []);

  useEffect(() => {
    self.setOnChange(update);
    return () => self.dispose();
  }, [self, update]);

  useEffect(() => {
    onFunc?.(self);
  }, [onFunc, self]);

  useEffect(() => {
    self.bindGestures(a.gesture, a.delay, a.threshold, self.trigger);
    return () => self.clearGestures();
  }, [a.gesture, a.delay, a.threshold, self]);

  useEffect(() => {
    const requested = a.active ?? (a.isAutomatic ? true : undefined);
    if (requested === undefined || requested === self.isBaseTransition) return;

    if (requested && playsRef.current >= (a.renderAmount ?? Infinity)) return;
    self.startTimer(a.delay ?? 0, () => {
      if (requested) playsRef.current += 1;
      self.setActive(requested);
      callbackRef.current?.();
    });
    return () => self.disposeTimer();
  }, [a.active, a.isAutomatic, a.delay, a.renderAmount, self]);

  return self.build({ ...a });
}

import { useRef, useEffect } from "react";
import { _Animation, type AnimationProp } from "./AnimationClass";

const InitializeAnimation = () => {
  const _animation = useRef<_Animation>(null);

  if (!_animation.current) {
    _animation.current = new _Animation();
  }

  return { _animation };
};

export default function Animation({ ...a }: AnimationProp) {
  const { _animation } = InitializeAnimation();
  const self = _animation.current;

  a?.onFunc?.(self as _Animation);

  useEffect(() => {
    if (!self) return;
    self.applyAnimation(a);
    return () => self.dispose();
  }, []);

  return self?.build?.({ ...a });
}

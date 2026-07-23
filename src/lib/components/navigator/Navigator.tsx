import { useRef } from "react";
import { _Navigator, type _NavigatorProp } from "./navigatorClass";

const InitializeNavigator = () => {
  const _navigator = useRef<_Navigator | null>(null);

  if (!_navigator.current) {
    _navigator.current = new _Navigator();
  }

  return { _navigator };
}

export default function Navigator({ ...a }: _NavigatorProp) {
  const { _navigator } = InitializeNavigator();
  a?.onFunc?.(_navigator?.current as _Navigator);
  return _navigator.current?.build?.({ ...a });
}

import { useRef } from "react";
import { _Tab, type _TabProp } from "./tabClass";

const InitializeTab = () => {
  const _tab = useRef<_Tab | null>(null);

  if (!_tab.current) {
    _tab.current = new _Tab();
  }

  return { _tab };
}

export default function Tab({ ...a }: _TabProp) {
  const { _tab } = InitializeTab();
  a?.onFunc?.(_tab?.current as _Tab);
  return _tab.current?.build?.({ ...a });
}

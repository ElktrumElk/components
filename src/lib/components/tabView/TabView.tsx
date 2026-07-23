import { useRef } from "react";
import { _TabView, type _TabViewProp } from "./tabViewClass";

const InitializeTabView = () => {
  const _tabView = useRef<_TabView | null>(null);

  if (!_tabView.current) {
    _tabView.current = new _TabView();
  }

  return { _tabView };
}

export default function TabView({ ...a }: _TabViewProp) {
  const { _tabView } = InitializeTabView();
  a?.onFunc?.(_tabView?.current as _TabView);
  return _tabView.current?.build?.({ ...a });
}

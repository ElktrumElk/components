import { useRef } from "react";
import { _GridView, type GridViewProp } from "./GridViewClass";

const InitializeGridView = () => {
  const _gridView = useRef<_GridView>(null);

  if (!_gridView.current) {
    _gridView.current = new _GridView();
  }
  return { _gridView };
};

export default function GridView({ ...a }: GridViewProp) {
  const { _gridView } = InitializeGridView();

  a?.onFunc?.(_gridView?.current as _GridView)
  return _gridView?.current?.build?.({ ...a });
}

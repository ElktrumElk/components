import { useRef } from "react"
import { _ListView, type ListViewProp } from "./listViewClass"

const InitializeListView = () => {
  const _listView = useRef<_ListView>(null)

  if (!_listView.current) {
    _listView.current = new _ListView()
  }

  return { _listView }
}

export default function ListView({ ...a }: ListViewProp) {
  const { _listView } = InitializeListView()
  a?.onFunc?.(_listView?.current as _ListView)
  return _listView.current?.build?.({ ...a })
}

import { useRef } from "react"
import { _List, type ListProp } from "./listClass"

const InitializeList = () => {
  const _list = useRef<_List>(null)

  if (!_list.current) {
    _list.current = new _List()
  }

  return { _list }
}

export default function List({ ...a }: ListProp) {
  const { _list } = InitializeList()
  a?.onFunc?.(_list?.current as _List)
  return _list.current?.build?.({ ...a })
}

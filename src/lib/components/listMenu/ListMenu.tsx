import { useRef } from "react"
import { _ListMenu, type ListMenuProp } from "./listMenuClass"

const InitializeListMenu = () => {
  const _listMenu = useRef<_ListMenu>(null)

  if (!_listMenu.current) {
    _listMenu.current = new _ListMenu()
  }

  return { _listMenu }
}

export default function ListMenu({ ...a }: ListMenuProp) {
  const { _listMenu } = InitializeListMenu()
  a?.onFunc?.(_listMenu?.current as _ListMenu)
  return _listMenu.current?.build?.({ ...a })
}

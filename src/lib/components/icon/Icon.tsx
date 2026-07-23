import { useRef } from "react"
import { _Icon, type IconProp } from "./iconClass"

const InitializeIcon = () => {
  const _icon = useRef<_Icon>(null)

  if (!_icon.current) {
    _icon.current = new _Icon()
  }

  return { _icon }
}

export default function Icon({ ...a }: IconProp) {
  const { _icon } = InitializeIcon()
  a?.onFunc?.(_icon?.current as _Icon)
  return _icon.current?.build?.({ ...a })
}

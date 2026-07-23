import { useRef } from "react"
import { _Divider, type DividerProp } from "./dividerClass"

const InitializeDivider = () => {
  const _divider = useRef<_Divider>(null)

  if (!_divider.current) {
    _divider.current = new _Divider()
  }

  return { _divider }
}

export default function Divider({ ...a }: DividerProp) {
  const { _divider } = InitializeDivider()
  return _divider.current?.build?.({ ...a })
}

import { useRef } from "react"
import { _Badge, type BadgeProp } from "./badgeClass"

const InitializeBadge = () => {
  const _badge = useRef<_Badge>(null)

  if (!_badge.current) {
    _badge.current = new _Badge()
  }

  return { _badge }
}

export default function Badge({ ...a }: BadgeProp) {
  const { _badge } = InitializeBadge()
  a?.onFunc?.(_badge?.current as _Badge)
  return _badge.current?.build?.({ ...a })
}

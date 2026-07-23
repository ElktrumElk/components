import { useRef } from "react"
import { _IconNetwork, type IconNetworkProp } from "./iconNetworkClass"

const InitializeIconNetwork = () => {
  const _iconNetwork = useRef<_IconNetwork>(null)

  if (!_iconNetwork.current) {
    _iconNetwork.current = new _IconNetwork()
  }

  return { _iconNetwork }
}

export default function IconNetwork({ ...a }: IconNetworkProp) {
  const { _iconNetwork } = InitializeIconNetwork()
  a?.onFunc?.(_iconNetwork?.current as _IconNetwork)
  return _iconNetwork.current?.build?.({ ...a })
}

import { useRef } from "react"
import { _SidePanel, type SidePanelProp } from "./sidePanelClass"

const InitializeSidePanel = () => {
  const _sidePanel = useRef<_SidePanel>(null)

  if (!_sidePanel.current) {
    _sidePanel.current = new _SidePanel()
  }

  return { _sidePanel }
}

export default function SidePanel({ ...a }: SidePanelProp) {
  const { _sidePanel } = InitializeSidePanel()
  a?.onFunc?.(_sidePanel?.current as _SidePanel)
  return _sidePanel.current?.build?.({ ...a })
}

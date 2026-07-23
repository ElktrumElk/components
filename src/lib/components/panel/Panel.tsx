import { useRef } from "react"
import { _Panel, type _PanelProp } from "./panelClass"

const InitializePanel = () => {
    const _panel = useRef<_Panel>(null)

    if (!_panel.current) {
        _panel.current = new _Panel()
    }

    return { _panel }
}

export default function Panel({ ...a }: _PanelProp) {
    const { _panel } = InitializePanel()
    a?.onFunc?.(_panel?.current as _Panel);
    return _panel.current?.build?.({ ...a })
}

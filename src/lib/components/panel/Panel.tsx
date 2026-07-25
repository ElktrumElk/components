import { useRef } from "react"
import { _Panel, type _PanelProp } from "./panelClass"

/**
 * Panel component that renders a styled container div with optional child content.
 *
 * @example
 * <Panel
 *   child={() => <CardContent />}
 *   width="400px"
 *   padding="1.5rem"
 *   color="#1e1e2e"
 *   borderRadius="0.75rem"
 *   border="1px solid rgba(255,255,255,0.1)"
 * />
 *
 * @see {@link _PanelProp} for available props
 *
 * @param {_PanelProp} props - The panel configuration props
 * @param {React.JSX.ElementType} [props.child] - Child component to render
 * @param {string} [props.width] - Panel width
 * @param {string} [props.height] - Panel height
 * @param {string} [props.padding] - Inner padding
 * @param {string} [props.margin] - Outer margin
 * @param {string} [props.color] - Background color
 * @param {string} [props.border] - Border style
 * @param {string} [props.borderRadius] - Border radius
 * @param {"visible" | "hidden" | "scroll" | "auto"} [props.overflow] - Overflow behavior
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [props.gest] - HTML attributes
 * @param {(self: _Panel) => void} [props.onFunc] - Instance access callback
 */
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

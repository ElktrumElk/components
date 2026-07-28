import { useRef } from "react"
import { _SidePanel, type SidePanelProp } from "./sidePanelClass"

const InitializeSidePanel = () => {
  const _sidePanel = useRef<_SidePanel>(null)

  if (!_sidePanel.current) {
    _sidePanel.current = new _SidePanel()
  }

  return { _sidePanel }
}

/**
 * A fixed-position side panel component with a backdrop overlay.
 *
 * Renders an `<aside>` element anchored to the left or right edge of the viewport
 * with a semi-transparent backdrop that closes the panel on click.
 *
 * @example
 * <SidePanel isOpen={open} onClose={() => setOpen(false)} side="left">
 *   {MenuContent}
 * </SidePanel>
 *
 * @example
 * <SidePanel isOpen={show} side="right" width="360px" backgroundColor="#1e1e2e">
 *   {DetailPanel}
 * </SidePanel>
 *
 * @see {@link SidePanelProp} for all available props.
 *
 * @param child - Content component rendered inside the panel
 * @param side - `"left"` or `"right"` — which edge the panel slides from
 * @param width - CSS width of the panel
 * @param isOpen - Controls visibility; panel is hidden when `false`
 * @param onClose - Fires when the backdrop is clicked
 * @param backgroundColor - Panel background color
 * @param padding - Panel inner padding
 * @param className - CSS class on the `<aside>` element
 * @param style - Inline styles on the `<aside>` element
 * @param gest - Extra HTML attributes on the `<aside>` element
 * @param onFunc - Callback receiving the internal class instance
 */
export default function SidePanel({ ...a }: SidePanelProp) {
  const { _sidePanel } = InitializeSidePanel()
  a?.onFunc?.(_sidePanel?.current as _SidePanel)
  return _sidePanel.current?.build?.({ ...a })
}

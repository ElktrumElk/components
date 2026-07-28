import { useRef } from "react"
import { _Icon, type IconProp } from "./iconClass"

const InitializeIcon = () => {
  const _icon = useRef<_Icon>(null)

  if (!_icon.current) {
    _icon.current = new _Icon()
  }

  return { _icon }
}

/**
 * A flexible icon wrapper that normalizes icon sizing and alignment.
 *
 * Renders an icon component inside an inline `<span>`, applying size via
 * predefined tokens or a custom numeric value.
 *
 * @example
 * ```tsx
 * <Icon
 *   icon={FaRocket}
 *   size="lg"
 *   color="#6366f1"
 *   className="icon-wrapper"
 * />
 * ```
 *
 * @see {@link IconProp} for all available props.
 *
 * @param icon - React component to render as the icon.
 * @param size - Preset token (`"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`) or number (default `"md"`).
 * @param color - Color passed to the icon component.
 * @param className - CSS class name(s) for the wrapper.
 * @param style - Additional inline styles for the wrapper.
 * @param onFunc - Callback receiving the internal `_Icon` instance.
 */
export default function Icon({ name, ...a }: IconProp) {
  const { _icon } = InitializeIcon()
  a?.onFunc?.(_icon?.current as _Icon)
  return _icon.current?.build?.({ ...a, name })
}

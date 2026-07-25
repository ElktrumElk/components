import { useRef } from "react"
import { _Divider, type DividerProp } from "./dividerClass"

const InitializeDivider = () => {
  const _divider = useRef<_Divider>(null)

  if (!_divider.current) {
    _divider.current = new _Divider()
  }

  return { _divider }
}

/**
 * Renders a horizontal or vertical divider line separator.
 *
 * @example
 * <Divider direction="horizontal" size="sm" color="rgba(255,255,255,0.15)" />
 *
 * @see {@link DividerProp} for all available props.
 *
 * @param direction - Orientation: `'horizontal'` or `'vertical'`.
 * @param size      - Line thickness: `'xs' | 'sm' | 'md' | 'lg'`.
 * @param color     - Color of the divider.
 * @param margin    - CSS margin around the divider.
 * @param className - Additional CSS class name(s).
 * @param style     - Inline CSS styles.
 * @param child     - Optional component rendered inside the divider.
 * @param gest      - Native HTML div attributes forwarded to the root element.
 */
export default function Divider({ ...a }: DividerProp) {
  const { _divider } = InitializeDivider()
  return _divider.current?.build?.({ ...a })
}

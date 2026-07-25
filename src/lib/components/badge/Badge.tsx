import { useRef } from "react"
import { _Badge, type BadgeProp } from "./badgeClass"

const InitializeBadge = () => {
  const _badge = useRef<_Badge>(null)

  if (!_badge.current) {
    _badge.current = new _Badge()
  }

  return { _badge }
}

/**
 * Badge component that renders a small inline label or status indicator.
 *
 * Supports filled, outlined, and soft visual variants with configurable sizes
 * from "xs" to "lg". Displays either a text string or a custom child component.
 *
 * @example
 * <Badge text="New" variant="filled" color="#fff" backgroundColor="#3b82f6" />
 *
 * @example
 * // Outlined badge with custom size
 * <Badge text="v2.0" variant="outlined" size="md" borderColor="#10b981" />
 *
 * @example
 * // Badge with custom child content
 * <Badge child={() => <Count count={5} />} variant="soft" />
 *
 * @see badgeClass.tsx for the underlying _Badge class.
 *
 * @param text - Text content displayed inside the badge.
 * @param variant - Visual variant: "filled", "outlined", or "soft" (default: "soft").
 * @param size - Preset size: "xs", "sm", "md", "lg" (default: "sm").
 * @param color - Text color (default: "#fff").
 * @param backgroundColor - Background color (default: semi-transparent white).
 * @param borderColor - Border color when variant is "outlined".
 * @param borderRadius - CSS border-radius (default: "9999px" for pill shape).
 * @param className - Additional CSS class for the badge element.
 * @param style - Custom inline styles for the badge element.
 * @param child - Component type rendered as badge content, replacing text.
 * @param gest - Additional HTML attributes spread onto the wrapper div.
 * @param onFunc - Callback receiving the _Badge instance after mount.
 */
export default function Badge({ ...a }: BadgeProp) {
  const { _badge } = InitializeBadge()
  a?.onFunc?.(_badge?.current as _Badge)
  return _badge.current?.build?.({ ...a })
}

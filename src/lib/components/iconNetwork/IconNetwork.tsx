import { useRef } from "react"
import { _IconNetwork, type IconNetworkProp } from "./iconNetworkClass"

const InitializeIconNetwork = () => {
  const _iconNetwork = useRef<_IconNetwork>(null)

  if (!_iconNetwork.current) {
    _iconNetwork.current = new _IconNetwork()
  }

  return { _iconNetwork }
}

/**
 * A network image avatar/icon with error fallback support.
 *
 * Renders a remote image inside a circular (by default) container.
 * Automatically displays a fallback component if the image fails to load.
 *
 * @example
 * ```tsx
 * <IconNetwork
 *   src="https://example.com/avatar.png"
 *   alt="User avatar"
 *   size="lg"
 *   borderRadius="50%"
 *   fallback={() => <DefaultAvatarIcon />}
 * />
 * ```
 *
 * @see {@link IconNetworkProp} for all available props.
 *
 * @param src - URL of the image to display.
 * @param alt - Accessible alt text.
 * @param size - Preset token or CSS value (default `"md"`).
 * @param borderRadius - CSS border-radius (default `"50%"`).
 * @param backgroundColor - Container background color.
 * @param fallback - Component shown when the image fails to load.
 * @param loading - `"lazy"` (default) or `"eager"`.
 * @param className - CSS class name(s) for the container.
 * @param style - Additional inline styles for the container.
 * @param onFunc - Callback receiving the internal `_IconNetwork` instance.
 */
export default function IconNetwork({ ...a }: IconNetworkProp) {
  const { _iconNetwork } = InitializeIconNetwork()
  a?.onFunc?.(_iconNetwork?.current as _IconNetwork)
  return _iconNetwork.current?.build?.({ ...a })
}

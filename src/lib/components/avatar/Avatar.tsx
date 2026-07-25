import { useRef } from "react"
import { _Avatar, type AvatarProp } from "./avatarClass"

const InitializeAvatar = () => {
  const _avatar = useRef<_Avatar>(null)

  if (!_avatar.current) {
    _avatar.current = new _Avatar()
  }

  return { _avatar }
}

/**
 * Avatar component that displays an image, icon, or fallback in a sized container.
 *
 * Attempts to render the image at `src` first; on load failure, falls back to `icon`,
 * then to `fallback`. Supports preset sizes from "xs" (1.5rem) to "xl" (5rem).
 *
 * @example
 * <Avatar src="/photos/user.jpg" alt="User" size="lg" />
 *
 * @example
 * // Icon-only avatar
 * <Avatar icon={() => <UserIcon />} size="md" backgroundColor="#3b82f6" />
 *
 * @example
 * // Fallback text avatar
 * <Avatar fallback={() => <span>JD</span>} borderRadius="0.5rem" />
 *
 * @see avatarClass.tsx for the underlying _Avatar class.
 *
 * @param src - URL of the avatar image.
 * @param alt - Alt text for the avatar image.
 * @param icon - Component type rendered when no image is available.
 * @param size - Preset size: "xs", "sm", "md", "lg", "xl" (default: "md").
 * @param borderRadius - CSS border-radius (default: "50%" for a circle).
 * @param backgroundColor - Background color of the container when empty.
 * @param fallback - Component type rendered as final fallback.
 * @param className - Additional CSS class for the container.
 * @param style - Custom inline styles for the container.
 * @param gest - Additional HTML attributes spread onto the wrapper div.
 * @param onFunc - Callback receiving the _Avatar instance after mount.
 */
export default function Avatar({ ...a }: AvatarProp) {
  const { _avatar } = InitializeAvatar()
  a?.onFunc?.(_avatar?.current as _Avatar)
  return _avatar.current?.build?.({ ...a })
}

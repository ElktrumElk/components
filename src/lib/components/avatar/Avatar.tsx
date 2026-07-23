import { useRef } from "react"
import { _Avatar, type AvatarProp } from "./avatarClass"

const InitializeAvatar = () => {
  const _avatar = useRef<_Avatar>(null)

  if (!_avatar.current) {
    _avatar.current = new _Avatar()
  }

  return { _avatar }
}

export default function Avatar({ ...a }: AvatarProp) {
  const { _avatar } = InitializeAvatar()
  a?.onFunc?.(_avatar?.current as _Avatar)
  return _avatar.current?.build?.({ ...a })
}

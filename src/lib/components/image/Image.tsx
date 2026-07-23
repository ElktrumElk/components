import { useRef } from "react"
import { _Image, type ImageProp } from "./imageClass"

const InitializeImage = () => {
  const _image = useRef<_Image>(null)

  if (!_image.current) {
    _image.current = new _Image()
  }

  return { _image }
}

export default function Image({ ...a }: ImageProp) {
  const { _image } = InitializeImage()
  a?.onFunc?.(_image?.current as _Image)
  return _image.current?.build?.({ ...a })
}

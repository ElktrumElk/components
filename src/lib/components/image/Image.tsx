import { useRef } from "react"
import { _Image, type ImageProp } from "./imageClass"

const InitializeImage = () => {
  const _image = useRef<_Image>(null)

  if (!_image.current) {
    _image.current = new _Image()
  }

  return { _image }
}

/**
 * A responsive image component with placeholder and error fallback.
 *
 * Displays a network image with configurable dimensions, aspect ratio, and
 * object-fit. Shows a styled placeholder when no source is provided or when
 * the image fails to load.
 *
 * @example
 * ```tsx
 * <Image
 *   src="https://example.com/photo.jpg"
 *   alt="Landscape photo"
 *   width="400px"
 *   height="300px"
 *   aspectRatio="16/9"
 *   objectFit="cover"
 *   borderRadius="0.5rem"
 *   fallback={() => <ImagePlaceholderIcon />}
 * />
 * ```
 *
 * @see {@link ImageProp} for all available props.
 *
 * @param src - URL of the image.
 * @param alt - Accessible alt text.
 * @param width - CSS width (default `"100%"`).
 * @param height - CSS height (default `"auto"`).
 * @param aspectRatio - Aspect ratio in `"W/H"` format.
 * @param objectFit - CSS object-fit (default `"cover"`).
 * @param borderRadius - CSS border-radius.
 * @param placeholder - Placeholder background (default `"rgba(255,255,255,0.05)"`).
 * @param loading - `"lazy"` (default) or `"eager"`.
 * @param className - CSS class name(s) for the wrapper div.
 * @param style - Additional inline styles for the wrapper div.
 * @param fallback - Component shown in the placeholder on error.
 * @param gest - Extra HTML props spread on the wrapper div.
 * @param onFunc - Callback receiving the internal `_Image` instance.
 */
export default function Image({ ...a }: ImageProp) {
  const { _image } = InitializeImage()
  a?.onFunc?.(_image?.current as _Image)
  return _image.current?.build?.({ ...a })
}

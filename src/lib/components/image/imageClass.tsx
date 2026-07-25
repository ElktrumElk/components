import type { ElementType } from "react";

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

/**
 * Props for the Image component, a responsive image with placeholder and error fallback.
 *
 * Renders an `<img>` with configurable sizing, aspect ratio, and object-fit.
 * Displays a placeholder with optional fallback component on missing source or load error.
 *
 * @property src - URL of the image to display.
 * @property alt - Accessible alt text for the image.
 * @property width - CSS width value. Defaults to `"100%"`.
 * @property height - CSS height value. Defaults to `"auto"`.
 * @property aspectRatio - Aspect ratio in `"W/H"` format (e.g. `"16/9"`).
 * @property objectFit - CSS `object-fit` value: `"cover"` (default) | `"contain"` | `"fill"` | `"none"` | `"scale-down"`.
 * @property borderRadius - CSS `border-radius` value.
 * @property placeholder - Background color/gradient for the placeholder. Defaults to `"rgba(255,255,255,0.05)"`.
 * @property loading - Image loading strategy: `"lazy"` (default) or `"eager"`.
 * @property className - CSS class name(s) applied to the outer `<div>`.
 * @property style - Additional inline styles applied to the outer `<div>`.
 * @property fallback - Component rendered inside the placeholder on error or missing source.
 * @property gest - Additional HTML props spread onto the outer `<div>` (e.g. event handlers, ARIA attributes).
 * @property onFunc - Callback invoked with the internal `_Image` instance after mount.
 */
export interface ImageProp {
  src?: string
  alt?: string
  width?: string
  height?: string
  aspectRatio?: `${number}/${number}`
  objectFit?: ObjectFit
  borderRadius?: string
  placeholder?: string
  loading?: 'lazy' | 'eager'
  className?: string
  style?: React.CSSProperties
  fallback?: React.JSX.ElementType
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _Image) => void
}

export class _Image {
  fallback!: ElementType
  hasError = false

  build? = ({ ...a }: ImageProp): React.JSX.Element => {
    this.fallback = a.fallback as ElementType

    const imgStyle: React.CSSProperties = {
      width: a.width || '100%',
      height: a.height || 'auto',
      aspectRatio: a.aspectRatio,
      objectFit: a.objectFit || 'cover',
      borderRadius: a.borderRadius,
      display: 'block',
    }

    const placeholderStyle: React.CSSProperties = {
      width: a.width || '100%',
      height: a.height || 'auto',
      aspectRatio: a.aspectRatio,
      background: a.placeholder || 'rgba(255,255,255,0.05)',
      borderRadius: a.borderRadius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <>
        <div
          className={a.className}
          style={{
            overflow: 'hidden',
            ...a.style,
          }}
          {...a.gest}
        >
          {a.src && !this.hasError ? (
            <img
              src={a.src}
              alt={a.alt || ''}
              style={imgStyle}
              loading={a.loading || 'lazy'}
              onError={() => { this.hasError = true }}
            />
          ) : this.fallback ? (
            <div style={placeholderStyle}>
              <this.fallback />
            </div>
          ) : (
            <div style={placeholderStyle} />
          )}
        </div>
      </>
    )
  }
}

import type { ElementType } from "react";

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

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

import type { ElementType } from "react";

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3.5rem',
  xl: '5rem',
}

export interface AvatarProp {
  src?: string
  alt?: string
  icon?: React.JSX.ElementType
  size?: AvatarSize
  borderRadius?: string
  backgroundColor?: string
  fallback?: React.JSX.ElementType
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _Avatar) => void
}

export class _Avatar {
  fallback!: ElementType
  icon!: ElementType
  private _hasError = false

  build? = ({ ...a }: AvatarProp): React.JSX.Element => {
    this.fallback = a.fallback as ElementType
    this.icon = a.icon as ElementType
    const dim = SIZE_MAP[a.size || 'md']
    const rad = a.borderRadius || '50%'

    const containerStyle: React.CSSProperties = {
      width: dim,
      height: dim,
      borderRadius: rad,
      overflow: 'hidden',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: a.backgroundColor || 'rgba(255,255,255,0.1)',
      ...a.style,
    }

    return (
      <>
        <div
          className={a.className}
          style={containerStyle}
          {...a.gest}
        >
          {a.src && !this._hasError ? (
            <img
              src={a.src}
              alt={a.alt || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={() => { this._hasError = true }}
            />
          ) : this.icon ? (
            <this.icon />
          ) : this.fallback ? (
            <this.fallback />
          ) : null}
        </div>
      </>
    )
  }
}

type IconNetworkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<IconNetworkSize, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
}

export interface IconNetworkProp {
  src: string
  alt?: string
  size?: IconNetworkSize | string
  borderRadius?: string
  backgroundColor?: string
  fallback?: React.JSX.ElementType
  loading?: 'lazy' | 'eager'
  className?: string
  style?: React.CSSProperties
  onFunc?: (self: _IconNetwork) => void
}

export class _IconNetwork {
  fallback!: React.JSX.ElementType
  private _hasError = false

  build? = ({ ...a }: IconNetworkProp): React.JSX.Element => {
    this.fallback = a.fallback as React.JSX.ElementType
    const dim = typeof a.size === 'string' && SIZE_MAP[a.size as IconNetworkSize]
      ? SIZE_MAP[a.size as IconNetworkSize]
      : (a.size || '24px')
    const rad = a.borderRadius || '50%'

    const containerStyle: React.CSSProperties = {
      width: dim,
      height: dim,
      borderRadius: rad,
      overflow: 'hidden',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: a.backgroundColor || 'transparent',
      ...a.style,
    }

    return (
      <>
        <span
          className={a.className}
          style={containerStyle}
        >
          {!this._hasError ? (
            <img
              src={a.src}
              alt={a.alt || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading={a.loading || 'lazy'}
              onError={() => { this._hasError = true }}
            />
          ) : this.fallback ? (
            <this.fallback />
          ) : null}
        </span>
      </>
    )
  }
}

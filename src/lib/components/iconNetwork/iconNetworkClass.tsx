type IconNetworkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<IconNetworkSize, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
}

/**
 * Props for the IconNetwork component, a network image avatar/icon renderer.
 *
 * Displays a remote image with predefined or custom sizing, border radius,
 * and automatic fallback on load error.
 *
 * @property src - URL of the network image to display.
 * @property alt - Accessible alt text for the image.
 * @property size - Preset token (`"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`) or CSS value.
 *   Tokens: xs=12px, sm=16px, md=24px, lg=32px, xl=48px. Defaults to `"md"`.
 * @property borderRadius - CSS border-radius value. Defaults to `"50%"` (circular).
 * @property backgroundColor - Background color of the container.
 * @property fallback - Component rendered when the image fails to load.
 * @property loading - Image loading strategy: `"lazy"` (default) or `"eager"`.
 * @property className - CSS class name(s) applied to the container `<span>`.
 * @property style - Additional inline styles applied to the container `<span>`.
 * @property onFunc - Callback invoked with the internal `_IconNetwork` instance after mount.
 */
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

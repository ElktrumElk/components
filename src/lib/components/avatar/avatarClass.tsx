import type { ElementType } from "react";

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3.5rem',
  xl: '5rem',
}

/**
 * Props for the Avatar component.
 * Displays an image, icon, or fallback element in a circular or rounded container.
 */
export interface AvatarProp {
  /** URL of the avatar image. Falls back to icon or fallback if the image fails to load. */
  src?: string
  /** Alt text for the avatar image. */
  alt?: string
  /** Component type rendered when no image is provided or the image fails to load. */
  icon?: React.JSX.ElementType
  /** Preset size of the avatar. One of "xs", "sm", "md", "lg", "xl". Defaults to "md". */
  size?: AvatarSize
  /** CSS border-radius applied to the avatar container. Defaults to "50%" (circle). */
  borderRadius?: string
  /** Background color of the avatar container when no image is visible. */
  backgroundColor?: string
  /** Component type rendered as the final fallback when no image or icon is available. */
  fallback?: React.JSX.ElementType
  /** Additional CSS class name for the avatar container. */
  className?: string
  /** Custom inline styles applied to the avatar container. */
  style?: React.CSSProperties
  /** Additional HTML attributes spread onto the wrapper div. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  /** Callback invoked after mount, receiving the internal _Avatar instance. */
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

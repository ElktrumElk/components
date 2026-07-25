import type { ElementType } from "react";

type BadgeVariant = 'filled' | 'outlined' | 'soft'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<BadgeSize, { padding: string; fontSize: string }> = {
  xs: { padding: '.1rem .4rem', fontSize: '.65rem' },
  sm: { padding: '.15rem .5rem', fontSize: '.75rem' },
  md: { padding: '.2rem .65rem', fontSize: '.85rem' },
  lg: { padding: '.3rem .85rem', fontSize: '1rem' },
}

/**
 * Props for the Badge component.
 * Renders a small inline label or status indicator with variant and size options.
 */
export interface BadgeProp {
  /** Text content displayed inside the badge. Ignored if child is provided. */
  text?: string
  /** Visual style variant: "filled", "outlined", or "soft". Defaults to "soft". */
  variant?: BadgeVariant
  /** Preset size of the badge. One of "xs", "sm", "md", "lg". Defaults to "sm". */
  size?: BadgeSize
  /** Text color applied to the badge. Defaults to "#fff". */
  color?: string
  /** Background color of the badge. Defaults to a semi-transparent white. */
  backgroundColor?: string
  /** Border color used when variant is "outlined". Defaults to the text color. */
  borderColor?: string
  /** CSS border-radius applied to the badge. Defaults to "9999px" (pill shape). */
  borderRadius?: string
  /** Additional CSS class name for the badge element. */
  className?: string
  /** Custom inline styles applied to the badge element. */
  style?: React.CSSProperties
  /** Component type rendered as the badge content, replacing text. */
  child?: React.JSX.ElementType
  /** Additional HTML attributes spread onto the badge wrapper div. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  /** Callback invoked after mount, receiving the internal _Badge instance. */
  onFunc?: (self: _Badge) => void
}

export class _Badge {
  child!: ElementType

  build? = ({ ...a }: BadgeProp): React.JSX.Element => {
    this.child = a.child as ElementType
    const variant = a.variant || 'soft'
    const size = SIZE_MAP[a.size || 'sm']
    const color = a.color || '#fff'
    const bgColor = a.backgroundColor || 'rgba(255,255,255,0.1)'

    const variantStyle: React.CSSProperties = variant === 'filled'
      ? { background: bgColor, color, border: 'none' }
      : variant === 'outlined'
        ? { background: 'transparent', color, border: `1px solid ${a.borderColor || color}` }
        : { background: bgColor, color, border: 'none' }

    return (
      <>
        <div
          className={a.className}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: size.padding,
            fontSize: size.fontSize,
            fontWeight: 600,
            borderRadius: a.borderRadius || '9999px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            ...variantStyle,
            ...a.style,
          }}
          {...a.gest}
        >
          {this.child ? <this.child /> : a.text}
        </div>
      </>
    )
  }
}

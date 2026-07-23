import type { ElementType } from "react";

type BadgeVariant = 'filled' | 'outlined' | 'soft'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<BadgeSize, { padding: string; fontSize: string }> = {
  xs: { padding: '.1rem .4rem', fontSize: '.65rem' },
  sm: { padding: '.15rem .5rem', fontSize: '.75rem' },
  md: { padding: '.2rem .65rem', fontSize: '.85rem' },
  lg: { padding: '.3rem .85rem', fontSize: '1rem' },
}

export interface BadgeProp {
  text?: string
  variant?: BadgeVariant
  size?: BadgeSize
  color?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  className?: string
  style?: React.CSSProperties
  child?: React.JSX.ElementType
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
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

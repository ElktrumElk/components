import type { ElementType } from "react";

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

export interface IconProp {
  icon: React.JSX.ElementType
  size?: IconSize | number
  color?: string
  className?: string
  style?: React.CSSProperties
  onFunc?: (self: _Icon) => void
}

export class _Icon {
  icon!: ElementType

  build? = ({ ...a }: IconProp): React.JSX.Element => {
    this.icon = a.icon as ElementType
    const resolvedSize = typeof a.size === 'number'
      ? a.size
      : SIZE_MAP[a.size || 'md']

    return (
      <>
        <span
          className={a.className}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0,
            ...a.style,
          }}
        >
          <this.icon
            size={resolvedSize}
            color={a.color}
          />
        </span>
      </>
    )
  }
}

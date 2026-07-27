import type { ElementType } from "react";

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

/**
 * Props for the Icon component, a size-aware icon renderer.
 *
 * Supports predefined size tokens (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`)
 * or a custom numeric pixel value.
 *
 * @property icon - A React component that accepts `size`, `color`, `fill`, and `fillColor` props.
 * @property size - Preset token or pixel value. Defaults to `"md"` (24px).
 *   Tokens: xs=12, sm=16, md=24, lg=32, xl=48.
 * @property color - Color string passed to the icon component.
 * @property name - Optional name identifier for the icon.
 * @property fill - Whether to apply fill to the icon paths (default false).
 * @property fillColor - Custom fill color when `fill` is true. Falls back to `color`.
 * @property className - CSS class name(s) applied to the wrapper `<span>`.
 * @property style - Additional inline styles applied to the wrapper `<span>`.
 * @property onFunc - Callback invoked with the internal `_Icon` instance after mount.
 */
export interface IconProp {
  icon: React.ComponentType<{ size?: number; color?: string; fill?: boolean; fillColor?: string }> | ElementType
  size?: IconSize | number
  color?: string
  name?: string
  fill?: boolean
  fillColor?: string
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
            fill={a.fill}
            fillColor={a.fillColor}
          />
        </span>
      </>
    )
  }
}

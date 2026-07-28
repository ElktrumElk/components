import type { ElementType } from "react";

type DividerDirection = 'horizontal' | 'vertical'
type DividerSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<DividerSize, string> = {
  xs: '1px',
  sm: '2px',
  md: '4px',
  lg: '8px',
}

/**
 * Props for the Divider component.
 * Renders a horizontal or vertical line separator with configurable
 * thickness, color, and spacing.
 */
export interface DividerProp {
  /** Orientation of the divider. One of `'horizontal'` or `'vertical'`. Defaults to `'horizontal'`. */
  direction?: DividerDirection
  /** Thickness of the divider. One of `'xs'`, `'sm'`, `'md'`, `'lg'`. Defaults to `'sm'`. */
  size?: DividerSize
  /** Color of the divider line. Defaults to `'rgba(255,255,255,0.1)'`. */
  color?: string
  /** CSS margin around the divider. Defaults to `'.5rem 0'` (horizontal) or `'0 .5rem'` (vertical). */
  margin?: string
  /** Additional CSS class name(s) to apply. */
  className?: string
  /** Inline CSS styles applied to the divider element. */
  style?: React.CSSProperties
  /** Optional component rendered inside the divider. */
  child?: React.JSX.ElementType
  /** Native HTML div props forwarded to the root element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

export class _Divider {
  child!: ElementType

  build? = ({ ...a }: DividerProp): React.JSX.Element => {
    this.child = a.child as ElementType
    const dir = a.direction || 'horizontal'
    const thickness = SIZE_MAP[a.size || 'sm']
    const isH = dir === 'horizontal'

    return (
      <>
        <div
          className={a.className}
          style={{
            width: isH ? '100%' : thickness,
            height: isH ? thickness : '100%',
            background: a.color || 'rgba(255,255,255,0.1)',
            margin: a.margin || (isH ? '.5rem 0' : '0 .5rem'),
            flexShrink: 0,
            ...a.style,
          }}
          {...a.gest}
        >
          {a.child && <this.child />}
        </div>
      </>
    )
  }
}

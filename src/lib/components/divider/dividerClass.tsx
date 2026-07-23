import type { ElementType } from "react";

type DividerDirection = 'horizontal' | 'vertical'
type DividerSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<DividerSize, string> = {
  xs: '1px',
  sm: '2px',
  md: '4px',
  lg: '8px',
}

export interface DividerProp {
  direction?: DividerDirection
  size?: DividerSize
  color?: string
  margin?: string
  className?: string
  style?: React.CSSProperties
  child?: React.JSX.ElementType
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

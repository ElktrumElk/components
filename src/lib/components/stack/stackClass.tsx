import type { ElementType } from "react";

type Direction = 'column' | 'row' | 'row-reverse' | 'column-reverse'
type Align = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

export interface StackProp {
  child?: React.JSX.ElementType
  direction?: Direction
  gap?: (string & `${string}rem`) | `${string}px` | `${string}em`
  align?: Align
  justify?: Justify
  wrap?: boolean
  width?: string
  height?: string
  padding?: string
  margin?: string
  position?: Position
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
  style?: React.CSSProperties
  className?: string
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _Stack) => void
}

export class _Stack {
  child!: ElementType

  build? = ({ ...a }: StackProp): React.JSX.Element => {
    this.child = a.child as ElementType

    return (
      <>
        <div
          className={a.className}
          style={{
            display: 'flex',
            flexDirection: a.direction || 'column',
            alignItems: a.align || 'stretch',
            justifyContent: a.justify || 'flex-start',
            gap: a.gap || '0',
            flexWrap: a.wrap ? 'wrap' : undefined,
            width: a.width,
            height: a.height,
            padding: a.padding,
            margin: a.margin,
            position: a.position,
            top: a.top,
            right: a.right,
            bottom: a.bottom,
            left: a.left,
            zIndex: a.zIndex,
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

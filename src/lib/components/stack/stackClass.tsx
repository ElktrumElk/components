import type { ElementType } from "react";

type Direction = 'column' | 'row' | 'row-reverse' | 'column-reverse'
type Align = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

/**
 * Props for the Stack component.
 *
 * Renders a flexbox `<div>` container with shorthand props for direction,
 * alignment, spacing, sizing, and positioning.
 *
 * @property child - A React component type rendered as the stack's content.
 * @property direction - Flex direction: `"column"`, `"row"`, `"row-reverse"`, or `"column-reverse"`. Defaults to `"column"`.
 * @property gap - CSS gap between children (e.g. `"1rem"`, `"16px"`). Defaults to `"0"`.
 * @property align - CSS `align-items` value. Defaults to `"stretch"`.
 * @property justify - CSS `justify-content` value. Defaults to `"flex-start"`.
 * @property wrap - If `true`, enables `flex-wrap: wrap`.
 * @property width - CSS `width` of the container.
 * @property height - CSS `height` of the container.
 * @property padding - CSS `padding` shorthand.
 * @property margin - CSS `margin` shorthand.
 * @property position - CSS `position` value.
 * @property top - CSS `top` offset (requires non-static `position`).
 * @property right - CSS `right` offset (requires non-static `position`).
 * @property bottom - CSS `bottom` offset (requires non-static `position`).
 * @property left - CSS `left` offset (requires non-static `position`).
 * @property zIndex - CSS `z-index` value.
 * @property style - Inline styles merged onto the root `<div>` element.
 * @property className - Additional CSS class names applied to the root `<div>` element.
 * @property gest - Additional HTML attributes spread onto the root `<div>` element.
 * @property onFunc - Callback invoked with the internal `_Stack` instance after initialization.
 */
export interface StackProp {
  child?: React.JSX.ElementType
  direction?: Direction
  gap?: string
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

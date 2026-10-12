import type { ElementType } from "react";
import { _Stack } from "../stack/stackClass";

/**
 * Props for the ListMenu component.
 *
 * Renders a vertical stack (`_Stack` with `direction: "column"`) that arranges
 * its children in a menu-style vertical list with configurable gap.
 */
export interface ListMenuProp {
  /** Component type rendered as the menu's content. */
  child?: React.JSX.ElementType
  /** Gap between stacked items. Accepts `rem`, `px`, or `em` values (e.g. `"0.5rem"`, `"8px"`). */
  gap?: string
  /** Additional CSS class name on the container `<div>`. */
  className?: string
  /** Inline styles merged onto the container `<div>`. */
  style?: React.CSSProperties
  /** Additional HTML attributes spread onto the container `<div>`. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  /** Callback invoked with the `_ListMenu` instance after mount. */
  onFunc?: (self: _ListMenu) => void
}

export class _ListMenu {
  child!: ElementType

  build? = ({ ...a }: ListMenuProp): React.JSX.Element => {
    this.child = a.child as ElementType
    const stack = new _Stack()

    return (
      <>
        {stack.build?.({
          direction: 'column',
          gap: a.gap || '0rem',
          className: a.className,
          style: a.style,
          gest: a.gest as React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
          >,
          child: a.child,
        })}
      </>
    )
  }
}

import type { ElementType } from "react";
import { _Stack } from "../stack/stackClass";

export interface ListMenuProp {
  child?: React.JSX.ElementType
  gap?: (string & `${string}rem`) | `${string}px` | `${string}em`
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
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
          gap: (a.gap || '0rem') as `${string}rem`,
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

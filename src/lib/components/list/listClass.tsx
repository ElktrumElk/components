import type { ElementType } from "react";

export interface ListProp {
  child?: React.JSX.ElementType
  padding?: string
  margin?: string
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >
  onFunc?: (self: _List) => void
}

export class _List {
  child!: ElementType

  build? = ({ ...a }: ListProp): React.JSX.Element => {
    this.child = a.child as ElementType

    return (
      <>
        <li
          className={a.className}
          style={{
            padding: a.padding,
            margin: a.margin,
            ...a.style,
          }}
          {...a.gest}
        >
          {a.child && <this.child />}
        </li>
      </>
    )
  }
}

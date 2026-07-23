import type { ElementType } from "react";

export interface ListViewProp {
  child?: React.JSX.ElementType
  ordered?: boolean
  padding?: string
  margin?: string
  gap?: (string & `${string}rem`) | `${string}px` | `${string}em`
  className?: string
  style?: React.CSSProperties
  onFunc?: (self: _ListView) => void
}

export class _ListView {
  child!: ElementType

  build? = ({ ...a }: ListViewProp): React.JSX.Element => {
    this.child = a.child as ElementType

    return (
      <>
        <ul
          className={a.className}
          style={{
            padding: a.padding,
            margin: a.margin,
            gap: a.gap,
            listStyle: 'none',
            ...a.style,
          }}
        >
          {a.child && <this.child />}
        </ul>
      </>
    )
  }
}

import type { ElementType } from "react";

/**
 * Props for the List component.
 *
 * Renders a single `<li>` element intended to be used inside a list container.
 * Accepts a child element type, spacing controls, and standard HTML attributes.
 */
export interface ListProp {
  /** Component type rendered as the list item's content. */
  child?: React.JSX.ElementType
  /** CSS `padding` applied to the `<li>`. */
  padding?: string
  /** CSS `margin` applied to the `<li>`. */
  margin?: string
  /** Additional CSS class name on the `<li>`. */
  className?: string
  /** Inline styles merged onto the `<li>`. */
  style?: React.CSSProperties
  /** Additional HTML attributes spread onto the `<li>`. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >
  /** Callback invoked with the `_List` instance after mount. */
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

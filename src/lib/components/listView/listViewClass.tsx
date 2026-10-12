import type { ElementType } from "react";

/**
 * Props for the ListView component.
 *
 * Renders an ordered or unordered list with optional padding, margin, and gap spacing.
 */
export interface ListViewProp {
  /** Component type rendered as the list's content (typically `<List>` items). */
  child?: React.JSX.ElementType
  /** When `true`, the list renders as an ordered list. */
  ordered?: boolean
  /** CSS `padding` applied to the `<ul>`. */
  padding?: string
  /** CSS `margin` applied to the `<ul>`. */
  margin?: string
  /** Gap between list items. Accepts `rem`, `px`, or `em` values (e.g. `"0.5rem"`). */
  gap?: string
  /** Additional CSS class name on the `<ul>`. */
  className?: string
  /** Inline styles merged onto the `<ul>`. */
  style?: React.CSSProperties
  /** Callback invoked with the `_ListView` instance after mount. */
  onFunc?: (self: _ListView) => void
}

export class _ListView {
  child!: ElementType

  build? = ({ ...a }: ListViewProp): React.JSX.Element => {
    this.child = a.child as ElementType

    const ListElement = a.ordered ? 'ol' : 'ul'

    return (
      <>
        <ListElement
          className={a.className}
          style={{
            padding: a.padding,
            margin: a.margin,
            gap: a.gap,
            display: 'flex',
            flexDirection: 'column',
            listStyle: a.ordered ? undefined : 'none',
            ...a.style,
          }}
        >
          {a.child && <this.child />}
        </ListElement>
      </>
    )
  }
}

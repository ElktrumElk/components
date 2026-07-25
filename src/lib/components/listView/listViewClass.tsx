import type { ElementType } from "react";

/**
 * Props for the ListView component.
 *
 * Renders an unordered list (`<ul>`) with optional padding, margin, and gap spacing.
 * The `ordered` prop is accepted but the component currently always renders a `<ul>`.
 */
export interface ListViewProp {
  /** Component type rendered as the list's content (typically `<List>` items). */
  child?: React.JSX.ElementType
  /** When `true`, the list renders as ordered. Currently unused — always renders `<ul>`. */
  ordered?: boolean
  /** CSS `padding` applied to the `<ul>`. */
  padding?: string
  /** CSS `margin` applied to the `<ul>`. */
  margin?: string
  /** Gap between list items. Accepts `rem`, `px`, or `em` values (e.g. `"0.5rem"`). */
  gap?: (string & `${string}rem`) | `${string}px` | `${string}em`
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

import { useRef } from "react"
import { _List, type ListProp } from "./listClass"

const InitializeList = () => {
  const _list = useRef<_List>(null)

  if (!_list.current) {
    _list.current = new _List()
  }

  return { _list }
}

/**
 * List
 *
 * Renders a styled `<li>` element for use inside a list container such as
 * `ListView` or a native `<ul>` / `<ol>`.
 *
 * @example
 * ```tsx
 * <List
 *   child={() => <span>Item content</span>}
 *   padding="0.5rem"
 *   margin="0"
 * />
 * ```
 *
 * @see {@link ListProp} for the full list of accepted props.
 *
 * @param child - Component type rendered as the list item's content.
 * @param padding - CSS `padding` on the `<li>`.
 * @param margin - CSS `margin` on the `<li>`.
 * @param className - Additional CSS class on the `<li>`.
 * @param style - Inline styles on the `<li>`.
 * @param gest - Additional HTML attributes on the `<li>`.
 * @param onFunc - Callback receiving the imperative `_List` instance.
 */
export default function List({ ...a }: ListProp) {
  const { _list } = InitializeList()
  a?.onFunc?.(_list?.current as _List)
  return _list.current?.build?.({ ...a })
}

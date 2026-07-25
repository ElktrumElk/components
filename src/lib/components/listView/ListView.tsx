import { useRef } from "react"
import { _ListView, type ListViewProp } from "./listViewClass"

const InitializeListView = () => {
  const _listView = useRef<_ListView>(null)

  if (!_listView.current) {
    _listView.current = new _ListView()
  }

  return { _listView }
}

/**
 * ListView
 *
 * Renders an unordered `<ul>` list container with built-in spacing controls.
 * Use with `List` children to build structured list layouts.
 *
 * @example
 * ```tsx
 * <ListView
 *   child={() => (
 *     <>
 *       <List child={() => <span>First</span>} />
 *       <List child={() => <span>Second</span>} />
 *     </>
 *   )}
 *   padding="0"
 *   margin="0"
 *   gap="1rem"
 * />
 * ```
 *
 * @see {@link ListViewProp} for the full list of accepted props.
 *
 * @param child - Component type rendered inside the `<ul>`.
 * @param ordered - Currently unused (always renders `<ul>`).
 * @param padding - CSS `padding` on the `<ul>`.
 * @param margin - CSS `margin` on the `<ul>`.
 * @param gap - Gap between items (`rem`, `px`, or `em`).
 * @param className - CSS class on the `<ul>`.
 * @param style - Inline styles on the `<ul>`.
 * @param onFunc - Callback receiving the imperative `_ListView` instance.
 */
export default function ListView({ ...a }: ListViewProp) {
  const { _listView } = InitializeListView()
  a?.onFunc?.(_listView?.current as _ListView)
  return _listView.current?.build?.({ ...a })
}

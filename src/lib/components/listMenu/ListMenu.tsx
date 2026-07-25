import { useRef } from "react"
import { _ListMenu, type ListMenuProp } from "./listMenuClass"

const InitializeListMenu = () => {
  const _listMenu = useRef<_ListMenu>(null)

  if (!_listMenu.current) {
    _listMenu.current = new _ListMenu()
  }

  return { _listMenu }
}

/**
 * ListMenu
 *
 * Renders a vertical menu by delegating to `_Stack` with `direction: "column"`.
 * Use this to lay out a set of interactive items in a vertical list with consistent spacing.
 *
 * @example
 * ```tsx
 * <ListMenu
 *   child={() => <MenuItems />}
 *   gap="0.5rem"
 *   className="my-menu"
 * />
 * ```
 *
 * @see {@link ListMenuProp} for the full list of accepted props.
 *
 * @param child - Component type rendered as the menu's content.
 * @param gap - Gap between stacked items (`rem`, `px`, or `em`).
 * @param className - CSS class on the container.
 * @param style - Inline styles on the container.
 * @param gest - Additional HTML attributes on the container.
 * @param onFunc - Callback receiving the imperative `_ListMenu` instance.
 */
export default function ListMenu({ ...a }: ListMenuProp) {
  const { _listMenu } = InitializeListMenu()
  a?.onFunc?.(_listMenu?.current as _ListMenu)
  return _listMenu.current?.build?.({ ...a })
}

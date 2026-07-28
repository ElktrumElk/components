import { useRef } from "react";
import { _Navigator, type _NavigatorProp } from "./navigatorClass";

const InitializeNavigator = () => {
  const _navigator = useRef<_Navigator | null>(null);

  if (!_navigator.current) {
    _navigator.current = new _Navigator();
  }

  return { _navigator };
}

/**
 * Navigator
 *
 * Renders a semantic `<nav>` element with a flexbox layout for building
 * navigation bars, side menus, and other navigational structures.
 *
 * @example
 * ```tsx
 * <Navigator
 *   child={() => <NavLinks />}
 *   direction="horizontal"
 *   gap="1rem"
 *   className="main-nav"
 * />
 * ```
 *
 * @see {@link _NavigatorProp} for the full list of accepted props.
 *
 * @param child - Component type rendered inside the `<nav>`.
 * @param direction - `"horizontal"` (default) or `"vertical"` flex direction.
 * @param gap - CSS gap between flex items.
 * @param className - CSS class on the `<nav>`.
 * @param style - Inline styles on the `<nav>`.
 * @param gest - Additional HTML attributes on the `<nav>`.
 * @param onFunc - Callback receiving the imperative `_Navigator` instance.
 */
export default function Navigator({ ...a }: _NavigatorProp) {
  const { _navigator } = InitializeNavigator();
  a?.onFunc?.(_navigator?.current as _Navigator);
  return _navigator.current?.build?.({ ...a });
}

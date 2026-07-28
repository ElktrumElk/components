import { useRef } from "react";
import { _Tab, type _TabProp } from "./tabClass";

const InitializeTab = () => {
  const _tab = useRef<_Tab | null>(null);

  if (!_tab.current) {
    _tab.current = new _Tab();
  }

  return { _tab };
}

/**
 * A tab button component with active/inactive color states.
 *
 * Renders a transparent `<button>` whose text color toggles between
 * `activeColor` and `inactiveColor` based on the `isActive` prop.
 *
 * @example
 * <Tab label={TabLabel} isActive={selected === 0} onClick={() => select(0)} />
 *
 * @example
 * <Tab
 *   label={SettingsLabel}
 *   isActive={current === "settings"}
 *   onClick={() => setCurrent("settings")}
 *   activeColor="#818cf8"
 *   inactiveColor="gray"
 * />
 *
 * @see {@link _TabProp} for all available props.
 *
 * @param label - Component type rendered as the tab label (**required**)
 * @param isActive - Whether this tab is selected
 * @param onClick - Click handler
 * @param activeColor - Text color when active
 * @param inactiveColor - Text color when inactive
 * @param padding - Tab inner padding
 * @param className - CSS class on the `<button>`
 * @param style - Inline styles on the `<button>`
 * @param gest - Extra HTML attributes on the `<button>`
 * @param onFunc - Callback receiving the internal class instance
 */
export default function Tab({ ...a }: _TabProp) {
  const { _tab } = InitializeTab();
  a?.onFunc?.(_tab?.current as _Tab);
  return _tab.current?.build?.({ ...a });
}

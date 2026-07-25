import { useRef } from "react";
import { _TabView, type _TabViewProp } from "./tabViewClass";

const InitializeTabView = () => {
  const _tabView = useRef<_TabView | null>(null);

  if (!_tabView.current) {
    _tabView.current = new _TabView();
  }

  return { _tabView };
}

/**
 * A self-contained tabbed view component.
 *
 * Renders a horizontal row of tab buttons and the content panel for the
 * currently active tab. Supports both controlled (`activeTab`) and
 * uncontrolled (`defaultTab`) usage patterns.
 *
 * @example
 * <TabView
 *   tabs={[
 *     { id: "overview", label: OverviewLabel, content: OverviewPanel },
 *     { id: "settings", label: SettingsLabel, content: SettingsPanel },
 *   ]}
 *   defaultTab="overview"
 *   onChange={(id) => console.log("switched to", id)}
 * />
 *
 * @example
 * <TabView
 *   tabs={myTabs}
 *   activeTab={currentTab}
 *   gap="0.25rem"
 *   style={{ background: "#1a1a2e" }}
 * />
 *
 * @see {@link _TabViewProp} for all available props.
 *
 * @param tabs - Array of `{ id, label, content }` tab definitions
 * @param activeTab - Controlled active tab id
 * @param defaultTab - Uncontrolled default active tab id
 * @param onChange - Tab change callback
 * @param gap - Spacing between tab buttons
 * @param className - CSS class on the root container
 * @param style - Inline styles on the root container
 * @param onFunc - Callback receiving the internal class instance
 */
export default function TabView({ ...a }: _TabViewProp) {
  const { _tabView } = InitializeTabView();
  a?.onFunc?.(_tabView?.current as _TabView);
  return _tabView.current?.build?.({ ...a });
}

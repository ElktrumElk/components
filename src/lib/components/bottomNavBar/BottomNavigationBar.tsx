import { useComponent } from "../../../hooks/useComponent";
import {
  _BottomNavigationBar,
  type BottomNavigationBarProp,
} from "./btm";
import "./bottomNavigationBar.css";

/**
 * A safe-area-aware bottom navigation controller for app-shell layouts.
 *
 * Use `activeIndex` for controlled selection, or `defaultActiveIndex` for
 * internal selection. Items with an `href` render as anchors; all others
 * render as buttons.
 */
export default function BottomNavigationBar(props: BottomNavigationBarProp) {
  const [controller, state] = useComponent(
    () => new _BottomNavigationBar(props.defaultActiveIndex),
    props.onFunc,
  );
  const resolvedActiveIndex = props.activeIndex ?? state.activeIndex;

  return controller.build({
    ...props,
    resolvedActiveIndex,
    selectItem: (index, item) =>
      controller.select(index, item, props.activeIndex != null, props.onChange),
  });
}

/** @deprecated Use the correctly spelled `BottomNavigationBar`. */
export const ButtomNavigationBar = BottomNavigationBar;

export type { BottomNavigationBarItem, BottomNavigationBarProp } from "./btm";

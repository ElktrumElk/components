import { useRef } from "react";
import { _GridView, type GridViewProp } from "./GridViewClass";

const InitializeGridView = () => {
  const _gridView = useRef<_GridView>(null);

  if (!_gridView.current) {
    _gridView.current = new _GridView();
  }
  return { _gridView };
};

/**
 * A flexible CSS Grid container component.
 *
 * Wraps a `<div>` with `display: grid` and maps props to grid-related CSS
 * properties. A single `child` component is rendered inside the grid.
 *
 * @example
 * ```tsx
 * <GridView
 *   templateColumns="1fr 1fr 1fr"
 *   templateRows="auto"
 *   autoFlow="row"
 *   justifyItems="center"
 *   child={() => (
 *     <>
 *       <div>Cell 1</div>
 *       <div>Cell 2</div>
 *       <div>Cell 3</div>
 *     </>
 *   )}
 * />
 * ```
 *
 * @see {@link GridViewProp} for all available props.
 *
 * @param key - React key for list rendering.
 * @param templateRows - CSS `grid-template-rows` value.
 * @param templateColumns - CSS `grid-template-columns` value (default `"1fr 1fr"`).
 * @param autoRows - CSS `grid-auto-rows` value.
 * @param autoColumn - CSS `grid-auto-columns` value.
 * @param area - CSS `grid-area` value.
 * @param autoFlow - CSS `grid-auto-flow` value.
 * @param justifyItems - CSS `justify-items` value (default `"center"`).
 * @param style - Additional inline styles.
 * @param className - string.
 * @param child - Component rendered as the grid's children.
 * @param onFunc - Callback receiving the internal `_GridView` instance.
 */
export default function GridView({ ...a }: GridViewProp) {
  const { _gridView } = InitializeGridView();

  a?.onFunc?.(_gridView?.current as _GridView)
  return _gridView?.current?.build?.({ ...a });
}

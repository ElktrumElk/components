import { useRef } from "react";
import { _Example, type ExampleProp } from "./ExampleClass";

const InitializeExample = () => {
  const _example = useRef<_Example>(null);

  if (!_example.current) {
    _example.current = new _Example();
  }

  return { _example };
};

/**
 * A lightweight demo/placeholder component that renders a `<span>` with
 * configurable inline styles and HTML content.
 *
 * @example
 * <Example
 *   width="100%"
 *   height="2rem"
 *   background="#222"
 *   border="1px solid #444"
 *   borderRadius="4px"
 *   text="<strong>Hello</strong>"
 * />
 *
 * @see {@link ExampleProp} for all available props.
 *
 * @param width       - CSS width.
 * @param height      - CSS height.
 * @param background  - Background color.
 * @param border      - CSS border value.
 * @param borderRadius - CSS border-radius value.
 * @param text        - HTML string rendered inside the span.
 * @param onFunc      - Callback with the internal `_Example` instance.
 */
export default function Example({ ...a }: ExampleProp) {
  const { _example } = InitializeExample();
  a?.onFunc?.(_example?.current as _Example);
  return _example?.current?.build?.({ ...a });
}

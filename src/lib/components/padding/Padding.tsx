import { useRef } from "react";
import { _Padding, type _keypadding, type PaddingProp } from "./PaddingClass";

const InitializePadding = () => {
  const _padding = useRef<_Padding>(null);

  if (!_padding.current) {
    _padding.current = new _Padding();
  }

  return { _padding };
};

/**
 * Padding
 *
 * A wrapper `<div>` that applies configurable padding using both physical and
 * logical CSS properties. Defaults to `1rem` padding, filling `100%` width and height.
 *
 * @example
 * ```tsx
 * <Padding
 *   child={() => <MyContent />}
 *   padding="2rem"
 *   left="0.5rem"
 *   right="0.5rem"
 * />
 * ```
 *
 * @see {@link PaddingProp} and {@link _keypadding} for the full list of accepted props.
 *
 * @param key - React key for list rendering.
 * @param child - Component type rendered inside the padded container.
 * @param left - Physical left padding.
 * @param right - Physical right padding.
 * @param top - Physical top padding.
 * @param bottom - Physical bottom padding.
 * @param inline - Logical inline (horizontal) padding.
 * @param block - Logical block (vertical) padding.
 * @param blockStart - Logical block-start padding.
 * @param blockEnd - Logical block-end padding.
 * @param padding - Shorthand CSS padding overriding the default `1rem`.
 */
export default function Padding({ ...a }: PaddingProp & _keypadding) {
  const { _padding } = InitializePadding();
  return _padding?.current?.build?.({ ...a });
}

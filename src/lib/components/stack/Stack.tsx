import { useRef } from "react"
import { _Stack, type StackProp } from "./stackClass"

const InitializeStack = () => {
  const _stack = useRef<_Stack>(null)

  if (!_stack.current) {
    _stack.current = new _Stack()
  }

  return { _stack }
}

/**
 * A flexbox stack container component.
 *
 * Provides a `<div>` with `display: flex` and shorthand props for direction,
 * alignment, gap, sizing, and absolute/fixed positioning.
 *
 * @example
 * <Stack direction="row" gap="1rem" align="center">
 *   {ButtonGroup}
 * </Stack>
 *
 * @example
 * <Stack direction="column" gap="0.5rem" padding="1rem" width="100%">
 *   {FormFields}
 * </Stack>
 *
 * @example
 * <Stack position="fixed" top="0" left="0" width="100%" zIndex={50}>
 *   {StickyHeader}
 * </Stack>
 *
 * @see {@link StackProp} for all available props.
 *
 * @param child - Content component rendered inside the stack
 * @param direction - Flex direction
 * @param gap - Spacing between children
 * @param align - Cross-axis alignment
 * @param justify - Main-axis alignment
 * @param wrap - Enable flex wrapping
 * @param width - Container width
 * @param height - Container height
 * @param padding - Inner spacing
 * @param margin - Outer spacing
 * @param position - CSS position value
 * @param top / right / bottom / left - Position offsets
 * @param zIndex - Stacking order
 * @param className - CSS class on the root `<div>`
 * @param style - Inline styles on the root `<div>`
 * @param gest - Extra HTML attributes on the root `<div>`
 * @param onFunc - Callback receiving the internal class instance
 */
export default function Stack({ ...a }: StackProp) {
  const { _stack } = InitializeStack()
  a?.onFunc?.(_stack?.current as _Stack)
  return _stack.current?.build?.({ ...a })
}

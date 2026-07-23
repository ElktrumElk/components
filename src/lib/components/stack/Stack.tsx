import { useRef } from "react"
import { _Stack, type StackProp } from "./stackClass"

const InitializeStack = () => {
  const _stack = useRef<_Stack>(null)

  if (!_stack.current) {
    _stack.current = new _Stack()
  }

  return { _stack }
}

export default function Stack({ ...a }: StackProp) {
  const { _stack } = InitializeStack()
  a?.onFunc?.(_stack?.current as _Stack)
  return _stack.current?.build?.({ ...a })
}

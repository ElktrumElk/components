import { useRef } from "react"
import { _Input, type InputProp } from "./inputClass"

const InitializeInput = () => {
  const _input = useRef<_Input>(null)

  if (!_input.current) {
    _input.current = new _Input()
  }

  return { _input }
}

export default function Input({ ...a }: InputProp) {
  const { _input } = InitializeInput()
  a?.onFunc?.(_input?.current as _Input)
  return _input.current?.build?.({ ...a })
}

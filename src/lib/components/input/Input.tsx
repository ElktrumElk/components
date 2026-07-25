import { useRef } from "react"
import { _Input, type InputProp } from "./inputClass"

const InitializeInput = () => {
  const _input = useRef<_Input>(null)

  if (!_input.current) {
    _input.current = new _Input()
  }

  return { _input }
}

/**
 * A styled text input with optional prefix and suffix element slots.
 *
 * Renders a flex-wrapped `<input>` that supports leading/trailing icons or
 * buttons, configurable dimensions, colors, and borders.
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="you@example.com"
 *   prefix={() => <MailIcon size={16} />}
 *   suffix={() => <ClearButton onClick={handleClear} />}
 *   width="300px"
 *   borderRadius="8px"
 *   borderColor="rgba(255,255,255,0.2)"
 * />
 * ```
 *
 * @see {@link InputProp} for all available props.
 *
 * @param type - Input type (default `"text"`).
 * @param placeholder - Placeholder text.
 * @param value - Default input value.
 * @param disabled - Whether the input is disabled.
 * @param readOnly - Whether the input is read-only.
 * @param prefix - Component rendered before the input.
 * @param suffix - Component rendered after the input.
 * @param width - CSS width (default `"100%"`).
 * @param height - CSS height (default `"2.5rem"`).
 * @param borderRadius - CSS border-radius (default `".5rem"`).
 * @param backgroundColor - Input background color (default `"transparent"`).
 * @param color - Input text color (default `"inherit"`).
 * @param borderColor - Input border color (default `"rgba(255,255,255,0.15)"`).
 * @param className - CSS class name(s) for the wrapper div.
 * @param style - Additional inline styles for the wrapper div.
 * @param gest - Extra HTML input props spread on the `<input>`.
 * @param onFunc - Callback receiving the internal `_Input` instance.
 */
export default function Input({ ...a }: InputProp) {
  const { _input } = InitializeInput()
  a?.onFunc?.(_input?.current as _Input)
  return _input.current?.build?.({ ...a })
}

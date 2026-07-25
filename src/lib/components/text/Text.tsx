import { useRef } from "react"
import { _Text, type _TextProp } from "./_textClass"


const InitializeText = () => {
    const _text = useRef<_Text>(null)

    if (!_text.current) {
        _text.current = new _Text()
    }

    return {_text}
}

/**
 * Text component renders a typed HTML element with optional styling.
 * @example
 * <Text type="h1" text="Hello" color="blue" size="2rem" />
 * @see _TextProp
 * @prop text - The text content to display.
 * @prop type - The HTML element type (h1-h6, p, pre).
 * @prop style - Optional inline CSS styles.
 * @prop className - Optional CSS class name.
 * @prop size - Optional font size.
 * @prop color - Optional text color.
 */
export default function Text ({...a}: _TextProp) {
    const {_text} = InitializeText()
    return _text.current?.build?.({...a})
}
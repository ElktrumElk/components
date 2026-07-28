import { useRef } from "react"
import { _Button, type ButtonProp } from "./_buttonClass"


const InitializeButton = () => {
    const _button = useRef<_Button>(null)

    if (!_button.current) {
        _button.current = new _Button()
    }

    return {_button}
}

/**
 * Button component that renders a standard HTML <button> with customizable styling.
 *
 * Wraps a child component inside a <button> element with control over colors,
 * dimensions, border, and padding. Supports spreading additional HTML attributes.
 *
 * @example
 * <Button
 *   child={() => <span>Click Me</span>}
 *   color="#fff"
 *   backgroundColor="#3b82f6"
 *   padding="0.5rem 1rem"
 *   borderRadius="0.375rem"
 * />
 *
 * @example
 * // With gesture attributes
 * <Button
 *   child={() => <span>Submit</span>}
 *   gest={{ onClick: handleSubmit, type: "submit" }}
 *   border="none"
 *   borderRadius="0.5rem"
 * />
 *
 * @see _buttonClass.tsx for the underlying _Button class.
 *
 * @param child - Component type rendered as the button's inner content.
 * @param border - CSS border value for the button.
 * @param color - Text color of the button.
 * @param borderRadius - CSS border-radius of the button.
 * @param padding - CSS padding inside the button.
 * @param width - CSS width of the button.
 * @param height - CSS height of the button.
 * @param className - Additional CSS class for the button element.
 * @param style - Custom inline styles for the button element.
 * @param gest - Additional HTML attributes spread onto the <button> element.
 * @param onFunc - Callback receiving the _Button instance after mount.
 */
export default function Button ({...a}: ButtonProp) {

    const {_button} = InitializeButton()
    a?.onFunc?.(_button?.current as _Button);
    return _button.current?.build?.({...a})
}
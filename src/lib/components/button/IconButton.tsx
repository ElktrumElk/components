import { useRef } from "react"
import { _Button} from "./_buttonClass"
import { _IconButton, type IconButtonProp } from "./IconButtonClass"


const InitializeIconButton = () => {
    const _button = useRef<_IconButton>(null)

    if (!_button.current) {
        _button.current = new _IconButton()
    }

    return {_button}
}

/**
 * IconButton component that renders a circular icon-only button.
 *
 * Extends the base Button with an `icon` prop. Renders a transparent-background
 * button with a default circular border-radius and pointer cursor. Uses the
 * "---icon-btn" CSS class by default.
 *
 * @example
 * <IconButton
 *   icon={() => <TrashIcon />}
 *   gest={{ onClick: handleDelete }}
 * />
 *
 * @example
 * // With custom sizing and border
 * <IconButton
 *   icon={() => <SettingsIcon />}
 *   width="2.5rem"
 *   height="2.5rem"
 *   border="1px solid #ccc"
 *   borderRadius="50%"
 * />
 *
 * @see IconButtonClass.tsx for the underlying _IconButton class.
 * @see _buttonClass.tsx for inherited ButtonProp properties.
 *
 * @param icon - Component type rendered as the button's icon content.
 * @param child - (Inherited) Component type rendered as inner content.
 * @param border - (Inherited) CSS border value (default: "none").
 * @param color - (Inherited) Text/icon color of the button.
 * @param borderRadius - (Inherited) CSS border-radius (default: "4rem").
 * @param padding - (Inherited) CSS padding (default: ".3rem").
 * @param width - (Inherited) CSS width of the button.
 * @param height - (Inherited) CSS height of the button.
 * @param className - (Inherited) Additional CSS class (default: "---icon-btn").
 * @param style - (Inherited) Custom inline styles for the button.
 * @param gest - (Inherited) Additional HTML attributes spread onto the <button>.
 * @param onFunc - Callback receiving the _IconButton instance after mount.
 */
export default function IconButton ({...a}: IconButtonProp) {

    const {_button} = InitializeIconButton()
    a?.onFunc?.(_button?.current as _Button);
    return _button.current?.build?.({...a})
}
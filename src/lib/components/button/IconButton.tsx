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

export default function IconButton ({...a}: IconButtonProp) {

    const {_button} = InitializeIconButton()
    a?.onFunc?.(_button?.current as _Button);
    return _button.current?.build?.({...a})
}
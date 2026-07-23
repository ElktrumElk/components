import { useRef } from "react"
import { _Button, type ButtonProp } from "./_buttonClass"


const InitializeButton = () => {
    const _button = useRef<_Button>(null)

    if (!_button.current) {
        _button.current = new _Button()
    }

    return {_button}
}

export default function Button ({...a}: ButtonProp) {

    const {_button} = InitializeButton()
    a?.onFunc?.(_button?.current as _Button);
    return _button.current?.build?.({...a})
}
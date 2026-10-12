import { useRef } from "react"
import { _Hover, type HoverProp } from "./HoverClass";


const InitializeHover = () => {
    const _hover = useRef<_Hover>(null);

    if (!_hover.current) {
        _hover.current = new _Hover();
    }
    return {_hover}
}

export default function Hover ({...a}: HoverProp) {
    const {_hover} = InitializeHover()
    return _hover?.current?.build?.({...a}) ?? <></>

}

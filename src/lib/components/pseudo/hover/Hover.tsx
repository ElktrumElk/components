import { useRef } from "react"
import { __hoverStore, _Hover, type HoverProp } from "./HoverClass";
import { useStore } from "../../../../components";


const InitializeHover = () => {
    const _hover = useRef<_Hover>(null);

    if (!_hover.current) {
        _hover.current = new _Hover();
    }
    return {_hover}
}

export default function Hover ({...a}: HoverProp) {
    useStore(__hoverStore)
    const {_hover} = InitializeHover()
    return _hover?.current?.build?.({...a}) ?? <></>

}
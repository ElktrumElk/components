import { useRef } from "react"
import { _Container, type ContainerProp } from "./containerClass"



const InitializeContainer = () => {
    const _container = useRef<_Container>(null)

    if (!_container.current) {
        _container.current = new _Container()
    }

    return {_container}
}

export default function Container ({...a}: ContainerProp) {

    const {_container} = InitializeContainer()
    a?.onFunc?.(_container?.current as _Container);
    return _container.current?.build?.({...a})
}
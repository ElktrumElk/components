import { useRef } from "react";
import { _Header, type _HeaderProp } from "./_headerClass";



const InitializeHeader = () => {
    const _header = useRef<_Header | null>(null)

    if (!_header.current) {
        _header.current = new _Header()
    }

    return {_header}
}

export default function Header ({...a}: _HeaderProp) {
    const {_header} = InitializeHeader()

    return _header.current?.build?.({...a})
}
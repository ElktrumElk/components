import { useRef } from "react"
import { _Center, type _CenterProp } from "./_CenterClass"



const InitializeCenter = () => {
    const _center = useRef<_Center>(null)

    if (!_center.current) {
        _center.current = new _Center()
    }

    return {_center}
}

export default function Center ({...a}: _CenterProp) {
    const {_center} = InitializeCenter()
    return _center.current?.build?.({...a})
}
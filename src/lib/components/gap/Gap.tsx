import { useRef } from "react"
import { _Gap, type GapProp } from "./GapClass"


const InitializeGap = () => {
    const _gap = useRef<_Gap>(null);

    if (!_gap?.current) {
        _gap.current = new _Gap()
    }

    return {_gap}
}

/**
 * 
 * @param {GapProp} param0
 * 
 * @returns 
 */
export default function Gap ({...a}: GapProp) {
    const {_gap} = InitializeGap()
    return _gap?.current?.build?.({...a})
}
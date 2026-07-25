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
 * Renders an empty spacer `<div>` used as spacing between sibling elements.
 * Supports width, height, and flex properties for flexible layout control.
 *
 * @example
 * <Gap width="1rem" />
 * <Gap height="2rem" flex="1" />
 *
 * @see {@link GapProp} for all available props.
 *
 * @param width  - CSS width of the spacer.
 * @param height - CSS height of the spacer.
 * @param flex   - CSS flex value of the spacer.
 */
export default function Gap ({...a}: GapProp) {
    const {_gap} = InitializeGap()
    return _gap?.current?.build?.({...a})
}
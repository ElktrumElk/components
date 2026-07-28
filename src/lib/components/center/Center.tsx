import { useRef } from "react"
import { _Center, type _CenterProp } from "./_CenterClass"



const InitializeCenter = () => {
    const _center = useRef<_Center>(null)

    if (!_center.current) {
        _center.current = new _Center()
    }

    return {_center}
}

/**
 * Centers a child component both horizontally and vertically using a
 * full-width, full-height flex container.
 *
 * @example
 * <Center child={MyContent} />
 *
 * @see {@link _CenterProp} for all available props.
 *
 * @param child - Component type to render as the centered content.
 */
export default function Center ({...a}: _CenterProp) {
    const {_center} = InitializeCenter()
    return _center.current?.build?.({...a})
}
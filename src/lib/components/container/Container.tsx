import { useRef } from "react"
import { _Container, type ContainerProp } from "./containerClass"



const InitializeContainer = () => {
    const _container = useRef<_Container>(null)

    if (!_container.current) {
        _container.current = new _Container()
    }

    return {_container}
}

/**
 * A general-purpose layout container that wraps a child component in a
 * styled `<div>` with configurable dimensions, padding, and background.
 *
 * @example
 * <Container
 *   child={MyContent}
 *   width="100%"
 *   height="100vh"
 *   padding="2rem"
 *   color="#1a1a2e"
 * />
 *
 * @see {@link ContainerProp} for all available props.
 *
 * @param width     - CSS width of the container.
 * @param height    - CSS height of the container.
 * @param style     - Inline CSS styles.
 * @param className - Additional CSS class name(s).
 * @param padding   - CSS padding value.
 * @param color     - Background color.
 * @param gest      - Native HTML div attributes forwarded to the root element.
 * @param child     - Component type rendered as the container's content.
 * @param onFunc    - Callback with the internal `_Container` instance.
 */
export default function Container ({...a}: ContainerProp) {

    const {_container} = InitializeContainer()
    a?.onFunc?.(_container?.current as _Container);
    return _container.current?.build?.({...a})
}
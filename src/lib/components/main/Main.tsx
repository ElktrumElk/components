import { useRef } from "react"
import { _Main, type MainProp } from "./MainClass"


const InitializeMain = () => {
    const _main = useRef<_Main>(null)

    if (!_main.current) {
        _main.current = new _Main();
    }
    return {_main}
}


/**
 * # Main
 * Semantic main component 
 * @param child - Accept jsx elements type
 * @param style - React.CSSProperties
 * @param className - String
 * @param key - React.key
 * 
 */
export default function Main ({...a}: MainProp): React.JSX.Element {
    const {_main} = InitializeMain()
    a?.onFunc?.(_main?.current as _Main)
    return _main?.current?.build?.({...a}) as React.JSX.Element
}
import { useRef } from "react"
import { _Text, type _TextProp } from "./_textClass"


const InitializeText = () => {
    const _text = useRef<_Text>(null)

    if (!_text.current) {
        _text.current = new _Text()
    }

    return {_text}
}

export default function Text ({...a}: _TextProp) {
    const {_text} = InitializeText()
    return _text.current?.build?.({...a})
}
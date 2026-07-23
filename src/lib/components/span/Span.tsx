import { useRef } from "react"
import { _Span, type _SpanProp } from "./spanClass"

const InitializeSpan = () => {
    const _span = useRef<_Span>(null)

    if (!_span.current) {
        _span.current = new _Span()
    }

    return { _span }
}

export default function Span({ ...a }: _SpanProp) {
    const { _span } = InitializeSpan()
    a?.onFunc?.(_span?.current as _Span);
    return _span.current?.build?.({ ...a })
}

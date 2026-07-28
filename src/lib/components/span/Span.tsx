import { useRef } from "react"
import { _Span, type _SpanProp } from "./spanClass"

const InitializeSpan = () => {
    const _span = useRef<_Span>(null)

    if (!_span.current) {
        _span.current = new _Span()
    }

    return { _span }
}

/**
 * An inline `<span>` component with convenient style shorthand props.
 *
 * Wraps a child component in a `<span>` element, applying color, font, and
 * spacing styles via props rather than inline style objects.
 *
 * @example
 * <Span color="#6366f1" fontSize="1.25rem" fontWeight={700}>
 *   {HighlightText}
 * </Span>
 *
 * @example
 * <Span color="gray" fontSize="0.875rem" margin="0 0.5rem">
 *   {SecondaryLabel}
 * </Span>
 *
 * @see {@link _SpanProp} for all available props.
 *
 * @param child - Content component rendered inside the `<span>`
 * @param color - Text color
 * @param fontSize - Font size
 * @param fontWeight - Font weight
 * @param padding - Inner spacing
 * @param margin - Outer spacing
 * @param className - CSS class on the `<span>` element
 * @param style - Inline styles on the `<span>` element
 * @param gest - Extra HTML attributes on the `<span>` element
 * @param onFunc - Callback receiving the internal class instance
 */
export default function Span({ ...a }: _SpanProp) {
    const { _span } = InitializeSpan()
    a?.onFunc?.(_span?.current as _Span);
    return _span.current?.build?.({ ...a })
}

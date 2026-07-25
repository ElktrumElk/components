
import React from "react";

/**
 * Props for the Example component.
 * A lightweight demo/placeholder component that renders a `<span>` with
 * configurable inline styles and HTML content.
 */
export interface ExampleProp {
    /** CSS width of the span. */
    width?: string,
    /** CSS height of the span. */
    height?: string
    /** Background color of the span. */
    background?: string
    /** CSS border value. */
    border?: string
    /** CSS border-radius value. */
    borderRadius?: string
    /** HTML string injected via `dangerouslySetInnerHTML`. */
    text?: string,
    /** Callback invoked with the internal `_Example` instance after construction. */
    onFunc?: (self: _Example) => void
}

export class _Example {
    text: React.RefObject<HTMLSpanElement | null> = React.createRef<HTMLSpanElement>();

    build? = ({...a}: ExampleProp): React.JSX.Element => {
        return (
            <span ref={this.text} style={{...a}} dangerouslySetInnerHTML={{ __html: a.text ?? "" }} />
        )
    }
}
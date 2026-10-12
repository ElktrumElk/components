
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
    /** Text rendered inside the span. */
    text?: string,
    /** Callback invoked with the internal `_Example` instance after construction. */
    onFunc?: (self: _Example) => void
}

export class _Example {
    text: React.RefObject<HTMLSpanElement | null> = React.createRef<HTMLSpanElement>();

    build? = ({ text, onFunc: _onFunc, ...style }: ExampleProp): React.JSX.Element => {
        return (
            <span ref={this.text} style={style}>{text}</span>
        )
    }
}

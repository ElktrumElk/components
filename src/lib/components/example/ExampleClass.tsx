
import React from "react";

export interface ExampleProp {
    width?: string,
    height?: string
    background?: string
    border?: string
    borderRadius?: string
    text?: string,
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
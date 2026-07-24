

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
    text?: React.RefObject<HTMLSpanElement> 

    build? = ({...a}: ExampleProp, cb?: (self: typeof this.text) => void): React.JSX.Element => {
        cb?.(this.text)
        return (
            <span ref={this.text} style={{...a}}></span>
        )
    }
}
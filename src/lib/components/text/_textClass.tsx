

export type textType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre' 

/**
 * Props for the Text component.
 * @prop text - The text content to display.
 * @prop type - The HTML element type to render (h1-h6, p, pre).
 * @prop style - Optional inline CSS styles.
 * @prop className - Optional CSS class name.
 * @prop size - Optional font size (e.g., "1rem", "16px").
 * @prop color - Optional text color.
 */
export interface _TextProp {
    text: string,
    type: textType
    style?: React.CSSProperties
    className?: string,
    size?: string,
    color?: string
}

export class _Text {

    build? = ({...a}: _TextProp) => {

        return (
            <>
                {
                    a.type && a.text && <a.type className={a.className} style={{fontSize: a.size, color: a.color,...a.style}}>{a.text}</a.type>
                }
            </>
        )
    }
}


export type textType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre' 

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
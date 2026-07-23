import type { JSX } from "react/jsx-runtime"
import './__page.css'


export interface PageProp {
    header?: React.JSX.ElementType
    body: React.JSX.ElementType 
    footer?: React.JSX.ElementType
    className?: string
    style?: React.CSSProperties
    atrib?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    onFunc?: _Page

}

export class _Page {
    Header?: JSX.ElementType | null = null
    Body: JSX.ElementType | null = null
    Footer?: JSX.ElementType | null = null
    style?: React.CSSProperties = {}
    

    build? = ({header, body, footer, className = 'page', style, atrib}: PageProp): React.JSX.Element => {

        this.Header = header || null
        this.Body = body 
        this.Footer = footer || null
        this.style = style || {}
        return (
            <>
                <section className={className} style={style} {...atrib}>

                    {this.Header && <this.Header />}
                    {this.Body && <this.Body />}
                    {this.Footer && <this.Footer />}

                </section>
            </>
        )
    }
}
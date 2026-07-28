import type { JSX } from "react/jsx-runtime"
import './__page.css'


/**
 * Props for the Page component.
 * @property {React.JSX.ElementType} [header] - Header component to render at the top
 * @property {React.JSX.ElementType} body - Body component to render as main content
 * @property {React.JSX.ElementType} [footer] - Footer component to render at the bottom
 * @property {string} [background] - Background color/style for the page
 * @property {string} [className] - CSS class name for the page element
 * @property {React.CSSProperties} [style] - Additional inline styles
 * @property {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} [atrib] - HTML attributes to spread onto the section element
 * @property {_Page} [onFunc] - Callback that receives the Page instance for imperative access
 */
export interface PageProp {
    header?: React.JSX.ElementType
    body: React.JSX.ElementType 
    footer?: React.JSX.ElementType
    background?: string
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
    

    build? = ({header, body, footer, background, className = 'page', style, atrib}: PageProp): React.JSX.Element => {

        this.Header = header || null
        this.Body = body 
        this.Footer = footer || null
        this.style = style || {}
        return (
            <>
                <section className={className} style={{background: background, height: '100%', display: 'flex', flexDirection: 'column', ...this.style}} {...atrib}>

                    {this.Header && <this.Header />}
                    {this.Body && <this.Body />}
                    {this.Footer && <this.Footer />}

                </section>
            </>
        )
    }
}
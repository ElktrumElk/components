import { useRef } from "react"
import { _Page, type PageProp } from "./pageClass"
import './__page.css'

/**
 * Page component that provides a full-height layout with header, body, and footer sections.
 *
 * @example
 * <Page
 *   header={() => <Header />}
 *   body={() => <MainContent />}
 *   footer={() => <Footer />}
 *   background="#ffffff"
 *   style={{ minHeight: '100vh' }}
 * />
 *
 * @see {@link PageProp} for available props
 *
 * @param {PageProp} props - The page configuration props
 * @param {React.JSX.ElementType} [props.header] - Header component
 * @param {React.JSX.ElementType} props.body - Body component (required)
 * @param {React.JSX.ElementType} [props.footer] - Footer component
 * @param {string} [props.background] - Background style
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} [props.atrib] - HTML attributes
 * @param {_Page} [props.onFunc] - Callback for imperative instance access
 */
const InitializePage = () => {
    const __page = useRef<_Page>(null)

    if (!__page.current) {
        __page.current = new _Page();
    }

    return {__page}
}

//============================================
// PAGE
//============================================
export default function Page({...a}: PageProp) {

    const {__page} = InitializePage() 

    return __page.current?.build?.({...a})
}
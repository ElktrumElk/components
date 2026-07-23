import { useRef } from "react"
import { _Page, type PageProp } from "./pageClass"


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
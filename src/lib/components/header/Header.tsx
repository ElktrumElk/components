import { useRef } from "react";
import { _Header, type _HeaderProp } from "./_headerClass";



const InitializeHeader = () => {
    const _header = useRef<_Header | null>(null)

    if (!_header.current) {
        _header.current = new _Header()
    }

    return {_header}
}

/**
 * A horizontal header bar component with leading, title, subtitle, and action slots.
 *
 * Renders a flex `<header>` with a leading element, a vertical title/subtitle column,
 * and an action element. Useful for app bars, page headers, and navigation rows.
 *
 * @example
 * ```tsx
 * <Header
 *   leading={() => <MenuIcon />}
 *   title={() => <span>My App</span>}
 *   subTitle={() => <span className="text-sm opacity-60">Dashboard</span>}
 *   action={() => <Button onClick={handleLogout}>Logout</Button>}
 *   underLine="1px solid rgba(255,255,255,0.1)"
 *   titleGap="0.25rem"
 * />
 * ```
 *
 * @see {@link _HeaderProp} for all available props.
 *
 * @param style - Additional inline styles.
 * @param className - CSS class name(s).
 * @param underLine - CSS `border-bottom` value.
 * @param leading - Component rendered at the header start.
 * @param title - Required component rendered as the primary title.
 * @param subTitle - Component rendered below the title.
 * @param action - Component rendered at the header end.
 * @param titleGap - Gap between title and subtitle.
 */
export default function Header ({...a}: _HeaderProp) {
    const {_header} = InitializeHeader()

    return _header.current?.build?.({...a})
}
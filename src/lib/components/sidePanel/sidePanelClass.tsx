import type { ElementType } from "react";

/**
 * Props for the SidePanel component.
 *
 * Renders a fixed-position slide-in panel with a semi-transparent backdrop.
 * The panel can open from the left or right side of the viewport.
 *
 * @property child - A React component type rendered as the panel's content.
 * @property side - Which side the panel slides in from. Defaults to `"left"`.
 * @property width - CSS width of the panel. Defaults to `"280px"`.
 * @property isOpen - Whether the panel is currently visible. When `false`, nothing is rendered.
 * @property onClose - Callback invoked when the backdrop is clicked, typically used to close the panel.
 * @property backgroundColor - Background color of the panel. Defaults to `"rgba(255,255,255,0.05)"`.
 * @property padding - CSS padding inside the panel. Defaults to `"1rem"`.
 * @property className - Additional CSS class names applied to the `<aside>` element.
 * @property style - Inline styles merged onto the `<aside>` element.
 * @property gest - Additional HTML attributes spread onto the `<aside>` element.
 * @property onFunc - Callback invoked with the internal `_SidePanel` instance after initialization.
 */
export interface SidePanelProp {
  child?: React.JSX.ElementType
  side?: 'left' | 'right'
  width?: string
  isOpen?: boolean
  onClose?: () => void
  backgroundColor?: string
  padding?: string
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >
  onFunc?: (self: _SidePanel) => void
}

export class _SidePanel {
  child!: ElementType

  build? = ({ ...a }: SidePanelProp): React.JSX.Element => {
    if (!a.isOpen) return <></>

    this.child = a.child as ElementType

    const isLeft = a.side !== 'right'

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={a.onClose}
        />
        <aside
          className={a.className}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            ...(isLeft ? { left: 0 } : { right: 0 }),
            width: a.width || '280px',
            backgroundColor: a.backgroundColor || 'rgba(255,255,255,0.05)',
            padding: a.padding || '1rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            ...a.style,
          }}
          {...a.gest}
        >
          {this.child && <this.child />}
        </aside>
      </>
    )
  }
}

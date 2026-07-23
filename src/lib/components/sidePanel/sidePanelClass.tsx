import type { ElementType } from "react";

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

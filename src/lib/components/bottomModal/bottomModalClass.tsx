import type { ElementType } from "react";

export interface BottomModalProp {
  child?: React.JSX.ElementType
  title?: React.JSX.ElementType
  isOpen?: boolean
  onClose?: () => void
  height?: string
  padding?: string
  showHandle?: boolean
  backgroundColor?: string
  className?: string
  style?: React.CSSProperties
  onFunc?: (self: _BottomModal) => void
}

export class _BottomModal {
  child!: ElementType
  title?: ElementType

  build? = ({ ...a }: BottomModalProp): React.JSX.Element => {
    if (!a.isOpen) return <></>

    this.child = a.child as ElementType
    this.title = a.title as ElementType | undefined

    return (
      <>
        <div
          className={a.className}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: a.backgroundColor || 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1000,
            ...a.style,
          }}
          onClick={a.onClose}
        >
          <div
            style={{
              width: '100%',
              maxHeight: a.height || '80vh',
              backgroundColor: 'rgba(28,28,30,1)',
              borderRadius: '1rem 1rem 0 0',
              padding: a.padding || '1rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {a.showHandle !== false && (
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  alignSelf: 'center',
                  marginBottom: '0.75rem',
                  cursor: 'grab',
                }}
                onMouseUp={a.onClose}
              />
            )}
            {this.title && (
              <div style={{ marginBottom: '0.75rem' }}>
                <this.title />
              </div>
            )}
            {this.child && (
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <this.child />
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

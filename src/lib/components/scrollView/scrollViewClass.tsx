import type { ElementType } from "react";

export interface ScrollViewProp {
  child?: React.JSX.ElementType
  direction?: 'vertical' | 'horizontal' | 'both'
  width?: string
  height?: string
  padding?: string
  hideScrollbar?: boolean
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _ScrollView) => void
}

export class _ScrollView {
  child!: ElementType

  build? = ({ ...a }: ScrollViewProp): React.JSX.Element => {
    this.child = a.child as ElementType

    const dir = a.direction || 'vertical'

    const overflowX = dir === 'horizontal' || dir === 'both' ? 'auto' : 'hidden'
    const overflowY = dir === 'vertical' || dir === 'both' ? 'auto' : 'hidden'

    const scrollbarHide: React.CSSProperties = a.hideScrollbar
      ? {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }
      : {}

    return (
      <>
        <div
          className={a.className}
          style={{
            width: a.width || '100%',
            height: a.height || '100%',
            padding: a.padding,
            overflowX,
            overflowY,
            ...scrollbarHide,
            ...a.style,
          }}
          {...a.gest}
        >
          <style>{a.hideScrollbar ? `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          ` : ''}</style>
          <div className={a.hideScrollbar ? 'hide-scrollbar' : undefined} style={{ width: '100%', height: '100%' }}>
            {this.child && <this.child />}
          </div>
        </div>
      </>
    )
  }
}

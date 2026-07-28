import type { ElementType } from "react";

/**
 * Props for the ScrollView component.
 * @property {React.JSX.ElementType} [child] - Child component to render inside the scroll container
 * @property {'vertical' | 'horizontal' | 'both'} [direction] - Scroll direction (default: 'vertical')
 * @property {string} [width] - Width of the scroll container (default: '100%')
 * @property {string} [height] - Height of the scroll container (default: '100%')
 * @property {string} [padding] - Inner padding of the scroll container
 * @property {boolean} [hideScrollbar] - Whether to hide the scrollbar visually
 * @property {string} [className] - CSS class name
 * @property {React.CSSProperties} [style] - Additional inline styles
 * @property {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [gest] - HTML attributes to spread onto the div
 * @property {(self: _ScrollView) => void} [onFunc] - Callback that receives the ScrollView instance for imperative access
 */
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

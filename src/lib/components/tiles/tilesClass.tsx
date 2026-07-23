import type { ElementType } from "react";

export interface TilesProp {
  leading?: React.JSX.ElementType
  title?: React.JSX.ElementType
  subtitle?: React.JSX.ElementType
  trailing?: React.JSX.ElementType
  padding?: string
  gap?: string
  borderBottom?: string
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _Tiles) => void
}

export class _Tiles {
  leading!: ElementType
  title!: ElementType
  subtitle!: ElementType
  trailing!: ElementType

  build? = ({ ...a }: TilesProp): React.JSX.Element => {
    this.leading = a.leading as ElementType
    this.title = a.title as ElementType
    this.subtitle = a.subtitle as ElementType
    this.trailing = a.trailing as ElementType

    return (
      <>
        <div
          className={a.className}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: a.padding || '.75rem 1rem',
            gap: a.gap || '.75rem',
            borderBottom: a.borderBottom,
            ...a.style,
          }}
          {...a.gest}
        >
          {this.leading && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <this.leading />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {this.title && <this.title />}
            {this.subtitle && <this.subtitle />}
          </div>
          {this.trailing && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <this.trailing />
            </div>
          )}
        </div>
      </>
    )
  }
}

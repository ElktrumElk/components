import type { ElementType } from "react";

type CardPadding = 'none' | 'sm' | 'md' | 'lg'
type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

const PADDING_MAP: Record<CardPadding, string> = {
  none: '0',
  sm: '.5rem',
  md: '1rem',
  lg: '1.5rem',
}

const RADIUS_MAP: Record<CardRadius, string> = {
  none: '0',
  sm: '.25rem',
  md: '.5rem',
  lg: '.75rem',
  xl: '1rem',
}

export interface CardProp {
  header?: React.JSX.ElementType
  body?: React.JSX.ElementType
  footer?: React.JSX.ElementType
  padding?: CardPadding
  radius?: CardRadius
  backgroundColor?: string
  borderColor?: string
  width?: string
  height?: string
  shadow?: boolean
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  onFunc?: (self: _Card) => void
}

export class _Card {
  header!: ElementType
  body!: ElementType
  footer!: ElementType

  build? = ({ ...a }: CardProp): React.JSX.Element => {
    this.header = a.header as ElementType
    this.body = a.body as ElementType
    this.footer = a.footer as ElementType

    const pad = PADDING_MAP[a.padding || 'md']
    const rad = RADIUS_MAP[a.radius || 'md']

    return (
      <>
        <div
          className={a.className}
          style={{
            width: a.width,
            height: a.height,
            padding: pad,
            borderRadius: rad,
            backgroundColor: a.backgroundColor || 'rgba(255,255,255,0.05)',
            borderColor: a.borderColor || 'rgba(255,255,255,0.08)',
            border: `1px solid ${a.borderColor || 'rgba(255,255,255,0.08)'}`,
            boxShadow: a.shadow ? '0 2px 8px rgba(0,0,0,0.2)' : undefined,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            ...a.style,
          }}
          {...a.gest}
        >
          {this.header && (
            <div style={{ paddingBottom: pad, borderBottom: `1px solid ${a.borderColor || 'rgba(255,255,255,0.08)'}` }}>
              <this.header />
            </div>
          )}
          {this.body && (
            <div style={{ flex: 1, padding: pad }}>
              <this.body />
            </div>
          )}
          {this.footer && (
            <div style={{ paddingTop: pad, borderTop: `1px solid ${a.borderColor || 'rgba(255,255,255,0.08)'}` }}>
              <this.footer />
            </div>
          )}
        </div>
      </>
    )
  }
}

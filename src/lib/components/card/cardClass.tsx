import type { ElementType } from "react";

type CardPadding = "none" | "sm" | "md" | "lg" | string;
type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | string;

const PADDING_MAP: Record<CardPadding, string> = {
  none: "0",
  sm: ".5rem",
  md: "1rem",
  lg: "1.5rem",
};

const RADIUS_MAP: Record<CardRadius, string> = {
  none: "0",
  sm: ".25rem",
  md: ".5rem",
  lg: ".75rem",
  xl: "1rem",
};

/**
 * Props for the Card component.
 * Renders a styled card container with optional header, body, and footer sections.
 */
export interface CardProp {
  /** Component rendered in the header section of the card. */
  header?: React.JSX.ElementType;
  /** Component rendered in the body section of the card. */
  body?: React.JSX.ElementType;
  /** Component rendered in the footer section of the card. */
  footer?: React.JSX.ElementType;
  /** Inner padding size. One of `'none'`, `'sm'`, `'md'`, `'lg'`. Defaults to `'md'`. */
  padding?: CardPadding;
  /** Border radius size. One of `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`. Defaults to `'md'`. */
  radius?: CardRadius;
  /** Background color of the card. Defaults to `'rgba(255,255,255,0.05)'`. */
  backgroundColor?: string;
  /** Border and section-divider color. Defaults to `'rgba(255,255,255,0.08)'`. */
  borderColor?: string;
  /** CSS width of the card. Defaults to `'10rem'`. */
  width?: string;
  /** CSS height of the card. Defaults to `'10rem'`. */
  height?: string;
  /** Whether to apply a box shadow. Defaults to `false`. */
  shadow?: boolean;
  /** Color of the box shadow when `shadow` is `true`. Defaults to `'rgba(0,0,0,0.2)'`. */
  shadowColor?: string;
  /** Additional CSS class name(s) to apply to the root element. */
  className?: string;
  /** Inlince css properties for the card header */
  headerStyle?: React.CSSProperties;
  /** Inline css properties for the card body */
  bodyStyle?: React.CSSProperties;
  /** Inline CSS Propties for the card footer */
  footerStyle?: React.CSSProperties;
  /** Inline CSS styles to apply to the root element. */
  style?: React.CSSProperties;
  /** Native HTML div props forwarded to the root element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** Callback invoked with the internal `_Card` instance after construction. */
  onFunc?: (self: _Card) => void;
}

export class _Card {
  header!: ElementType;
  body!: ElementType;
  footer!: ElementType;

  build? = ({ ...a }: CardProp): React.JSX.Element => {
    this.header = a.header as ElementType;
    this.body = a.body as ElementType;
    this.footer = a.footer as ElementType;

    const pad = PADDING_MAP[a.padding || "md"];
    const rad = RADIUS_MAP[a.radius || "md"];

    return (
      <>
        <article
          className={a.className}
          style={{
            width: a.width || "10rem",
            height: a.height || "10rem",
            padding: pad,
            borderRadius: rad,
            backgroundColor: a.backgroundColor || "rgba(255,255,255,0.05)",
            borderColor: a.borderColor || "rgba(255,255,255,0.08)",
            border: `1px solid ${a.borderColor || "rgba(255,255,255,0.08)"}`,
            boxShadow: a.shadow
              ? `0 2px 8px ${a.shadowColor || "rgba(0,0,0,0.2)"}`
              : undefined,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...a.style,
          }}
          {...a.gest}
        >
          {this.header && (
            <header
              style={{
                paddingBottom: pad,
                borderBottom: `1px solid ${a.borderColor || "rgba(255,255,255,0.08)"}`,
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                ...a.headerStyle,
              }}
            >
              <this.header />
            </header>
          )}
          {this.body && (
            <div style={{ flex: 1, padding: pad, ...a.bodyStyle }}>
              <this.body />
            </div>
          )}
          {this.footer && (
            <footer
              style={{
                paddingTop: pad,
                borderTop: `1px solid ${a.borderColor || "rgba(255,255,255,0.08)"}`,
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                ...a.footerStyle,
              }}
            >
              <this.footer />
            </footer>
          )}
        </article>
      </>
    );
  };
}

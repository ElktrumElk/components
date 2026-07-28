import type { ElementType } from "react";

/**
 * Props for the Span component.
 *
 * Renders an inline `<span>` element with shorthand style props for color,
 * font size, weight, padding, and margin.
 *
 * @property child - A React component type rendered as the span's content.
 * @property color - CSS `color` value for the text.
 * @property fontSize - CSS `font-size` value.
 * @property fontWeight - CSS `font-weight` value (string or number).
 * @property padding - CSS `padding` shorthand.
 * @property margin - CSS `margin` shorthand.
 * @property className - Additional CSS class names applied to the `<span>` element.
 * @property style - Inline styles merged onto the `<span>` element.
 * @property gest - Additional HTML attributes spread onto the `<span>` element.
 * @property onFunc - Callback invoked with the internal `_Span` instance after initialization.
 */
export interface _SpanProp {
  child?: React.JSX.ElementType;
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  padding?: string;
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
  onFunc?: (self: _Span) => void;
}

export class _Span {
  child!: ElementType;

  build? = ({ ...a }: _SpanProp): React.JSX.Element => {
    this.child = a.child as ElementType;

    return (
      <>
        <span
          className={a.className}
          style={{
            color: a.color,
            fontSize: a.fontSize,
            fontWeight: a.fontWeight,
            padding: a.padding,
            margin: a.margin,
            ...a.style,
          }}
          {...a.gest}
        >
          {this.child && <this.child />}
        </span>
      </>
    );
  };
}

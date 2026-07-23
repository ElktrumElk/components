import type { ElementType } from "react";

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

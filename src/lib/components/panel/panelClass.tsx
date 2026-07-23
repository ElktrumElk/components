import type { ElementType } from "react";

export interface _PanelProp {
  child?: React.JSX.ElementType;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  onFunc?: (self: _Panel) => void;
}

export class _Panel {
  child!: ElementType;

  build? = ({ ...a }: _PanelProp): React.JSX.Element => {
    this.child = a.child as ElementType;

    return (
      <>
        <div
          className={a.className}
          style={{
            width: a.width || "100%",
            height: a.height,
            padding: a.padding,
            margin: a.margin,
            background: a.color,
            border: a.border,
            borderRadius: a.borderRadius,
            overflow: a.overflow,
            ...a.style,
          }}
          {...a.gest}
        >
          {this.child && <this.child />}
        </div>
      </>
    );
  };
}

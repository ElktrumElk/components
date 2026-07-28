import type { ElementType } from "react";

/**
 * Props for the Panel component.
 * @property {React.JSX.ElementType} [child] - Child component to render inside the panel
 * @property {string} [width] - Width of the panel (default: '100%')
 * @property {string} [height] - Height of the panel
 * @property {string} [padding] - Inner padding of the panel
 * @property {string} [margin] - Outer margin of the panel
 * @property {string} [color] - Background color of the panel
 * @property {string} [border] - Border style for the panel
 * @property {string} [borderRadius] - Border radius of the panel
 * @property {"visible" | "hidden" | "scroll" | "auto"} [overflow] - Overflow behavior
 * @property {string} [className] - CSS class name
 * @property {React.CSSProperties} [style] - Additional inline styles
 * @property {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [gest] - HTML attributes to spread onto the div
 * @property {(self: _Panel) => void} [onFunc] - Callback that receives the Panel instance for imperative access
 */
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

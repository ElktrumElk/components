import type { ElementType } from "react";

export interface ContainerProp {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  padding?: string;
  color?: string
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  child?: React.JSX.ElementType;
  onFunc?: (self: _Container) => void
}

export class _Container {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  padding?: string;
  color?: string
  child!: React.JSX.ElementType;

  build? = ({ ...a }: ContainerProp): React.JSX.Element => {
    this.width = a.width || "auto";
    this.height = a.height || "auto";
    this.style = a.style || {};
    this.className = a?.className;
    this.gest = a?.gest;
    this.padding = a?.padding || '1rem';
    this.color = a?.color
    this.child = a?.child as ElementType
    
    return (
      <>
        <div
          className={this.className}
          style={{
            width: this.width,
            height: this.height,
            padding: this.padding,
            background: this.color,
            ...this.style
          }}
          {...this.gest}
        >
            {a.child && <this.child />}
        </div>
      </>
    );
  };
}

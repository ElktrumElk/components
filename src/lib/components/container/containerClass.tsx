import type { ElementType } from "react";

/**
 * Props for the Container component.
 * A general-purpose layout wrapper that renders a styled `<div>` with
 * configurable dimensions, padding, background, and child content.
 */
export interface ContainerProp {
  /** CSS width of the container. Defaults to `'auto'`. */
  width?: string;
  /** CSS height of the container. Defaults to `'auto'`. */
  height?: string;
  /** Inline CSS styles applied to the container root element. */
  style?: React.CSSProperties;
  /** Additional CSS class name(s) to apply. */
  className?: string;
  /** CSS padding value. Defaults to `'1rem'`. */
  padding?: string;
  /** Background color of the container. */
  color?: string;
  /** Native HTML div props forwarded to the root element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** Component type rendered as the container's child content. */
  child?: React.JSX.ElementType;
  /** Callback invoked with the internal `_Container` instance after construction. */
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

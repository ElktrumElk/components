import type { ElementType } from "react";
import type React from "react";

export interface _TabProp {
  label: React.JSX.ElementType;
  isActive?: boolean;
  onClick?: () => void;
  activeColor?: string;
  inactiveColor?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  onFunc?: (self: _Tab) => void;
}

export class _Tab {
  label!: ElementType;
  isActive?: boolean;
  onClick?: () => void;
  activeColor?: string;
  inactiveColor?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

  build? = ({ ...a }: _TabProp): React.JSX.Element => {
    this.label = a.label as ElementType;
    this.isActive = a.isActive ?? false;
    this.onClick = a.onClick;
    this.activeColor = a.activeColor ?? "#fff";
    this.inactiveColor = a.inactiveColor ?? "rgba(255,255,255,0.5)";
    this.padding = a.padding ?? ".5rem 1rem";
    this.className = a.className;
    this.style = a.style;
    this.gest = a.gest;

    const textColor = this.isActive ? this.activeColor : this.inactiveColor;

    return (
      <>
        <button
          className={this.className}
          style={{
            color: textColor,
            padding: this.padding,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            ...this.style,
          }}
          onClick={this.onClick}
          {...this.gest}
        >
          {a.label && <this.label />}
        </button>
      </>
    );
  };
}

import type { ElementType } from "react";
import type React from "react";

export interface _TextButtonProp {
  child?: React.JSX.ElementType;
  text?: string;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  fontSize?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  onFunc?: (self: _TextButton) => void;
}

export class _TextButton {
  child?: ElementType;
  text?: string;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  fontSize?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

  build? = ({ ...a }: _TextButtonProp): React.JSX.Element => {
    this.child = a.child as ElementType;
    this.text = a.text;
    this.color = a.color ?? "inherit";
    this.hoverColor = a.hoverColor;
    this.activeColor = a.activeColor;
    this.fontSize = a.fontSize;
    this.padding = a.padding ?? "0";
    this.className = a.className;
    this.style = a.style;
    this.gest = a.gest;

    return (
      <>
        <button
          className={this.className}
          style={{
            color: this.color,
            fontSize: this.fontSize,
            padding: this.padding,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            ...this.style,
          }}
          {...this.gest}
        >
          {this.child ? <this.child /> : this.text}
        </button>
      </>
    );
  };
}

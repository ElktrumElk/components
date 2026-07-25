import type { ElementType } from "react";
import type React from "react";

/**
 * Props for the TextButton component.
 * @prop child - Optional React element type to render as button content.
 * @prop text - Optional text content if child is not provided.
 * @prop color - Text color (default: "inherit").
 * @prop hoverColor - Text color on hover.
 * @prop activeColor - Text color when active.
 * @prop fontSize - Font size (e.g., "1rem").
 * @prop padding - Padding (default: "0").
 * @prop className - Optional CSS class name.
 * @prop style - Optional inline CSS styles.
 * @prop gest - Optional HTML button attributes.
 * @prop onFunc - Callback receiving the _TextButton instance.
 */
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

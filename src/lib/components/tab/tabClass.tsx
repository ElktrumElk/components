import type { ElementType } from "react";
import type React from "react";

/**
 * Props for the Tab component.
 *
 * Renders a transparent `<button>` styled as a tab indicator. Text color
 * changes based on the active/inactive state.
 *
 * @property label - A React component type rendered as the tab's visible label. **Required.**
 * @property isActive - Whether this tab is currently selected. Defaults to `false`.
 * @property onClick - Callback invoked when the tab button is clicked.
 * @property activeColor - Text color when `isActive` is `true`. Defaults to `"#fff"`.
 * @property inactiveColor - Text color when `isActive` is `false`. Defaults to `"rgba(255,255,255,0.5)"`.
 * @property padding - CSS padding around the tab. Defaults to `".5rem 1rem"`.
 * @property className - Additional CSS class names applied to the `<button>` element.
 * @property style - Inline styles merged onto the `<button>` element.
 * @property gest - Additional HTML attributes spread onto the `<button>` element.
 * @property onFunc - Callback invoked with the internal `_Tab` instance after initialization.
 */
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

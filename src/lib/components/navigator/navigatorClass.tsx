import type { ElementType } from "react";
import type React from "react";

/**
 * Props for the Navigator component.
 *
 * Renders a semantic `<nav>` element with a flexbox layout that can be arranged
 * horizontally or vertically. Suitable for navigation bars, side menus, and breadcrumbs.
 */
export interface _NavigatorProp {
  /** Component type rendered as the navigation content. */
  child?: React.JSX.ElementType;
  /** Layout direction. `"horizontal"` renders in a row, `"vertical"` in a column. Defaults to `"horizontal"`. */
  direction?: "horizontal" | "vertical";
  /** CSS `gap` between flex items (any valid CSS length). */
  gap?: string;
  /** Additional CSS class name on the `<nav>` element. */
  className?: string;
  /** Inline styles merged onto the `<nav>` element. */
  style?: React.CSSProperties;
  /** Additional HTML attributes spread onto the `<nav>` element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  /** Callback invoked with the `_Navigator` instance after mount. */
  onFunc?: (self: _Navigator) => void;
}

export class _Navigator {
  child?: ElementType;
  direction?: string;
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  build? = ({ ...a }: _NavigatorProp): React.JSX.Element => {
    this.child = a.child as ElementType;
    this.direction = a.direction ?? "horizontal";
    this.gap = a.gap;
    this.className = a.className;
    this.style = a.style;
    this.gest = a.gest;

    const flexDir = this.direction === "vertical" ? "column" : "row";

    return (
      <>
        <nav
          className={this.className}
          style={{
            display: "flex",
            flexDirection: flexDir as React.CSSProperties["flexDirection"],
            gap: this.gap,
            ...this.style,
          }}
          {...this.gest}
        >
          {this.child && <this.child />}
        </nav>
      </>
    );
  };
}

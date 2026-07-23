import type { ElementType } from "react";
import type React from "react";

export interface _NavigatorProp {
  child?: React.JSX.ElementType;
  direction?: "horizontal" | "vertical";
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
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

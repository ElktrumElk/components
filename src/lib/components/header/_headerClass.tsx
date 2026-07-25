import type { ElementType } from "react";
import type React from "react";

/**
 * Props for the Header component, a horizontal navigation/app bar layout.
 *
 * @property style - Additional inline styles applied to the `<header>` element.
 * @property className - CSS class name(s) applied to the `<header>` element.
 * @property underLine - CSS `border-bottom` value (e.g. `"1px solid #ccc"`).
 * @property leading - Component rendered at the start (left) of the header.
 * @property title - Required component rendered as the primary title content.
 * @property subTitle - Component rendered below the title.
 * @property action - Component rendered at the end (right) of the header, typically for buttons.
 * @property titleGap - Gap between title and subtitle (e.g. `"0.5rem"`, `"8px"`, `"0.25em"`).
 */
export interface _HeaderProp {
  style?: React.CSSProperties;
  className?: string;
  underLine?: string;
  leading?: React.JSX.ElementType;
  title: React.JSX.ElementType;
  subTitle?: React.JSX.ElementType;
  action?: React.JSX.ElementType;
  titleGap?: (string & `${string}rem`) | `${string}px` | `${string}em`;

}

export class _Header {
  style: React.CSSProperties = {};
  leading!: React.JSX.ElementType;
  title!: React.JSX.ElementType;
  subTitle!: React.JSX.ElementType;
  action!: React.JSX.ElementType;

  build? = ({ ...a }: _HeaderProp): React.JSX.Element => {
    this.style = a.style || {};

    this.leading = a.leading as ElementType;
    this.action = a.action as ElementType;
    this.subTitle = a.subTitle as ElementType;
    this.title = a.title as ElementType;

    return (
      <>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: ".5rem",
            alignItems: "center",
            gap: ".5rem",
            borderBottom: a.underLine,
            ...this.style,
          }}
          className={a.className}
        >
          {a.leading && <this.leading />}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: a.titleGap,
              flex: "1",
            }}
          >
            {a.title && <this.title />}
            {a.subTitle && <this.subTitle />}
          </div>
          {a.action && <this.action />}
        </header>
      </>
    );
  };
}

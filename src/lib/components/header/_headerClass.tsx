import type { ElementType } from "react";
import type React from "react";

export interface _HeaderProp {
  style?: React.CSSProperties;
  className?: string;
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
    this.style = a.style || {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: ".5rem",
      alignItems: 'center',
      gap: '.5rem'
    };

    this.leading = a.leading as ElementType;
    this.action = a.action as ElementType;
    this.subTitle = a.subTitle as ElementType;
    this.title = a.title as ElementType;
    
    return (
      <>
        <header style={this.style} className={a.className}>
          {a.leading && <this.leading />}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: (a.titleGap),
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

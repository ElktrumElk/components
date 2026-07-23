import type { ElementType } from "react";
import type React from "react";

export interface _ArticleProp {
  title: React.JSX.ElementType;
  body: React.JSX.ElementType;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  onFunc?: (self: _Article) => void;
}

export class _Article {
  title!: ElementType;
  body!: ElementType;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  build? = ({ ...a }: _ArticleProp): React.JSX.Element => {
    this.title = a.title as ElementType;
    this.body = a.body as ElementType;
    this.padding = a.padding;
    this.className = a.className;
    this.style = a.style;
    this.gest = a.gest;

    return (
      <>
        <article
          className={this.className}
          style={{
            padding: this.padding,
            ...this.style,
          }}
          {...this.gest}
        >
          {a.title && <this.title />}
          {a.body && <this.body />}
        </article>
      </>
    );
  };
}

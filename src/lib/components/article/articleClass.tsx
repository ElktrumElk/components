import type { ElementType } from "react";
import type React from "react";

/**
 * Props for the Article component.
 * Renders a semantic <article> element with a title and body section.
 */
export interface _ArticleProp {
  /** Component type rendered as the article title. */
  title: React.JSX.ElementType;
  /** Component type rendered as the article body. */
  body: React.JSX.ElementType;
  /** CSS padding value applied to the article element. */
  padding?: string;
  /** Additional CSS class name for the article element. */
  className?: string;
  /** Custom inline styles applied to the article element. */
  style?: React.CSSProperties;
  /** Additional HTML attributes spread onto the <article> element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  /** Callback invoked after mount, receiving the internal _Article instance. */
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

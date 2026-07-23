import type { ElementType } from "react";
import type React from "react";

export interface _SectionProp {
  title: React.JSX.ElementType;
  child?: React.JSX.ElementType;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  onFunc?: (self: _Section) => void;
}

export class _Section {
  title!: ElementType;
  child!: ElementType;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  build? = ({ ...a }: _SectionProp): React.JSX.Element => {
    this.title = a.title as ElementType;
    this.child = a.child as ElementType;
    this.padding = a.padding;
    this.className = a.className;
    this.style = a.style;
    this.gest = a.gest;

    return (
      <>
        <section
          className={this.className}
          style={{
            padding: this.padding,
            ...this.style,
          }}
          {...this.gest}
        >
          {a.title && <this.title />}
          {a.child && <this.child />}
        </section>
      </>
    );
  };
}

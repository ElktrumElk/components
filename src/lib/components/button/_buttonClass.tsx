import type { ElementType} from "react";
import type { JSX } from "react/jsx-runtime";

export interface ButtonProp {
  child?: React.JSX.ElementType;
  border?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  onFunc?: (self: _Button) => void

}

export class _Button  {
  child!: JSX.ElementType;
  style?: React.CSSProperties;

  build? = ({ ...a }: ButtonProp): React.JSX.Element => {
 
    this.style = a.style || {};

    this.child = a.child as ElementType;

    return (
      <>
        <button
          className={a.className}
          style={{
            color: a.color,
            height: a.height,
            width: a.width,
            padding: a.padding,
            border: a.border,
            borderRadius: a.borderRadius
          }}
          {...a.gest}
        >
            {a.child && <this.child />}
        </button>
      </>
    );
  };
}

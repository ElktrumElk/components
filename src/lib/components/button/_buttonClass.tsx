import type { ElementType} from "react";
import type { JSX } from "react/jsx-runtime";

/**
 * Props for the Button component.
 * A standard HTML <button> with customizable styling and child content.
 */
export interface ButtonProp {
  /** Component type rendered as the button's inner content. */
  child?: React.JSX.ElementType;
  /** CSS border value for the button. */
  border?: string;
  /** Text color of the button. */
  color?: string;
  /** CSS border-radius of the button. */
  borderRadius?: string;
  /** CSS padding inside the button. */
  padding?: string;
  /** CSS width of the button. */
  width?: string;
  /** CSS height of the button. */
  height?: string;
  /** Additional CSS class name for the button element. */
  className?: string;
  /** Custom inline styles applied to the button element. */
  style?: React.CSSProperties;
  /** Additional HTML attributes spread onto the <button> element. */
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  /** Callback invoked after mount, receiving the internal _Button instance. */
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
            borderRadius: a.borderRadius,
            ...this.style
          }}
          {...a.gest}
        >
            {a.child && <this.child />}
        </button>
      </>
    );
  };
}

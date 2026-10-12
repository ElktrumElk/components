import type { ElementType } from "react";
import type { JSX } from "react/jsx-runtime";

/**
 * Props for the Button component.
 * A standard HTML <button> with customizable styling and child content.
 */
export interface ButtonProp {
  id?: string;
  /** Native button behavior. Defaults to `button` to avoid accidental form submission. */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
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
  /** Background color of the button */
  backgroundColor?: string;
  /** Splash color when button is clicked */
  splashColor?: string;
  /** Additional HTML attributes spread onto the <button> element. */
  gest?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  /** Callback invoked after mount, receiving the internal _Button instance. */
  onFunc?: (self: _Button) => void;
}

export class _Button {
  child!: JSX.ElementType;
  style?: React.CSSProperties;
  savedIconBg!: string;

  build? = ({ ...a }: ButtonProp): React.JSX.Element => {
    this.style = a.style || {};

    this.child = a.child as ElementType;
    const {
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      ...gest
    } = a.gest ?? {};

    return (
      <>
        <button
          id={a.id}
          type={a.type ?? "button"}
          className={a.className}
          style={{
            color: a.color,
            height: a.height,
            width: a.width,
            padding: a.padding,
            border: a.border,
            borderRadius: a.borderRadius,
            background: a.backgroundColor || undefined,
            cursor: "pointer",
            transition: "background .4s ease",
            ...this.style,
          }}
          {...gest}
          onMouseDown={(e) => {
            onMouseDown?.(e);
            if (!a.splashColor) return;
            this.savedIconBg = e.currentTarget.style.background;

            e.currentTarget.style.background = this.savedIconBg;
            e.currentTarget.style.transition = "background .1s ease";
            e.currentTarget.style.background = a.splashColor as string;
          }}
          onMouseUp={(e) => {
            onMouseUp?.(e);
            if (!a.splashColor) return;
            const target = e.currentTarget as HTMLButtonElement;
            setTimeout(() => {
              target.style.transition = "background .1s ease";
              target.style.background = this.savedIconBg;
            }, 100);
          }}
          onTouchStart={(e) => {
            onTouchStart?.(e);
            if (!a.splashColor) return;
            this.savedIconBg = e.currentTarget.style.background;
            e.currentTarget.style.background = a.splashColor as string;
          }}
          onTouchEnd={(e) => {
            onTouchEnd?.(e);
            if (a.splashColor) e.currentTarget.style.background = this.savedIconBg;
          }}
        >
          {a.child && <this.child />}
        </button>
      </>
    );
  };
}

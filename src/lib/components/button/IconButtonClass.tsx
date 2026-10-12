import { _Button, type ButtonProp } from "./_buttonClass";
import './buttons.css'
/**
 * Props for the IconButton component.
 * Extends ButtonProp with an icon property for rendering an icon-only button.
 * Inherits all base ButtonProp styling options (border, color, borderRadius, etc.).
 */
export interface IconButtonProp extends ButtonProp {
  /** Component type rendered as the button's icon content. */
  icon?: React.JSX.ElementType;
}

export class _IconButton extends _Button {
  icon!: React.JSX.ElementType;
  declare savedIconBg: string;
  
  override build? = ({ ...a }: IconButtonProp): React.JSX.Element => {
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
          className={a?.className || '---icon-btn'}
          style={{
            width: a?.width,
            height: a?.height,
            color: a.color,
            border: a?.border || 'none',
            borderRadius: a?.borderRadius || '4rem',
            background: a.backgroundColor || 'transparent',
            padding: a.padding || '.3rem',
            cursor: 'pointer',
            ...a?.style,
          }}
          {...gest}
          onMouseDown={(e) => {
            onMouseDown?.(e);
            if (!a.splashColor) return;
            this.savedIconBg = e.currentTarget.style.background;
            e.currentTarget.style.background = a.splashColor;
          }}
          onMouseUp={(e) => {
            onMouseUp?.(e);
            if (a.splashColor) e.currentTarget.style.background = this.savedIconBg;
          }}
          onTouchStart={(e) => {
            onTouchStart?.(e);
            if (!a.splashColor) return;
            this.savedIconBg = e.currentTarget.style.background;
            e.currentTarget.style.background = a.splashColor;
          }}
          onTouchEnd={(e) => {
            onTouchEnd?.(e);
            if (a.splashColor) e.currentTarget.style.background = this.savedIconBg;
          }}
        >
          {a.icon && <a.icon />}
        </button>
      </>
    );
  };
}

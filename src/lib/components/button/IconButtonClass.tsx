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
    
    return (
      <>
        <button
          className={a?.className || '---icon-btn'}
          style={{
            width: a?.width,
            height: a?.height,
            color: a.color,
            border: a?.border || 'none',
            borderRadius: a?.borderRadius || '4rem',
            background: 'transparent',
            padding: a.padding || '.3rem',
            cursor: 'pointer',
            ...a?.style,
          }}
          onMouseDown={(e) => {this.savedIconBg = e.currentTarget.style.background; e.currentTarget.style.background = a.splashColor as string}}
          onMouseUp={(e) => e.currentTarget.style.background = this.savedIconBg}
          onTouchStart={(e) => {this.savedIconBg = e.currentTarget.style.background; e.currentTarget.style.background = a.splashColor as string}}
          onTouchEnd={(e) => e.currentTarget.style.background = this.savedIconBg}
          {...a?.gest}
        >
          {a.icon && <a.icon />}
        </button>
      </>
    );
  };
}

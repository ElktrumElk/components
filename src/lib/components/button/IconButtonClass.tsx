import { _Button, type ButtonProp } from "./_buttonClass";
import './buttons.css'
export interface IconButtonProp extends ButtonProp {
  icon?: React.JSX.ElementType;
}

export class _IconButton extends _Button {
  icon!: React.JSX.ElementType;

  override build? = ({ ...a }: IconButtonProp): React.JSX.Element => {
    return (
      <>
        <button
          className={a?.className || 'icon-btn'}
          style={{
            width: a?.width,
            height: a?.height,
            color: a.color,
            border: a?.border || 'none',
            borderRadius: a?.borderRadius,
            padding: a.padding || '.3rem',
            ...a?.style,
          }}
          {...a?.gest}
        >
          {a.icon && <a.icon />}
        </button>
      </>
    );
  };
}

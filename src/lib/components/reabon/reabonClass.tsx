import type { ElementType } from "react";

/**
 * Props for the Reabon component.
 * @property {React.JSX.ElementType} [child] - Dropdown/popover content component
 * @property {React.JSX.ElementType} [trigger] - Trigger element that toggles the dropdown
 * @property {boolean} [isOpen] - Controlled open state of the dropdown
 * @property {() => void} [onClose] - Callback fired when the dropdown should close (e.g. click outside)
 * @property {string} [width] - Width of the dropdown (default: '200px')
 * @property {string} [backgroundColor] - Background color of the dropdown (default: 'rgba(255,255,255,0.05)')
 * @property {string} [borderRadius] - Border radius of the dropdown (default: '.5rem')
 * @property {string} [padding] - Inner padding of the dropdown (default: '.25rem 0')
 * @property {string} [className] - CSS class name for the wrapper
 * @property {React.CSSProperties} [style] - Additional inline styles for the wrapper
 * @property {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [gest] - HTML attributes to spread onto the wrapper
 * @property {(self: _Reabon) => void} [onFunc] - Callback that receives the Reabon instance for imperative access
 */
export interface ReabonProp {
  child?: React.JSX.ElementType;
  trigger?: React.JSX.ElementType;
  isOpen?: boolean;
  onClose?: () => void;
  width?: string;
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  gest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  onFunc?: (self: _Reabon) => void;
}

export class _Reabon {
  child!: ElementType;
  trigger!: ElementType;
  open: boolean = false;

  build? = ({ ...a }: ReabonProp): React.JSX.Element => {
    this.child = a.child as ElementType;
    this.trigger = a.trigger as ElementType;
    this.open = a.isOpen ?? this.open;

    return (
      <>
        <div
          data-reabon="true"
          className={a.className}
          style={{
            position: "relative",
            display: "inline-block",
            ...a.style,
          }}
          {...a.gest}
        >
          {this.trigger && <this.trigger />}
          {this.open && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: a.width || "200px",
                backgroundColor: a.backgroundColor || "rgba(255,255,255,0.05)",
                borderRadius: a.borderRadius || ".5rem",
                padding: a.padding || ".25rem 0",
                zIndex: 1000,
              }}
            >
              {this.child && <this.child />}
            </div>
          )}
        </div>
      </>
    );
  };
}

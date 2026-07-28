import { useEffect, useRef } from "react";
import { _Reabon, type ReabonProp } from "./reabonClass";

/**
 * Reabon component that renders a dropdown/popover positioned below a trigger element.
 * Automatically closes when clicking outside the component.
 *
 * @example
 * <Reabon
 *   trigger={() => <button>Open Menu</button>}
 *   child={() => <MenuItems />}
 *   isOpen={isMenuOpen}
 *   onClose={() => setIsMenuOpen(false)}
 *   width="240px"
 *   backgroundColor="#2a2a3e"
 * />
 *
 * @see {@link ReabonProp} for available props
 *
 * @param {ReabonProp} props - The reabon configuration props
 * @param {React.JSX.ElementType} [props.child] - Dropdown content component
 * @param {React.JSX.ElementType} [props.trigger] - Trigger element
 * @param {boolean} [props.isOpen] - Controlled open state
 * @param {() => void} [props.onClose] - Close callback
 * @param {string} [props.width] - Dropdown width
 * @param {string} [props.backgroundColor] - Dropdown background color
 * @param {string} [props.borderRadius] - Dropdown border radius
 * @param {string} [props.padding] - Dropdown padding
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [props.gest] - HTML attributes
 * @param {(self: _Reabon) => void} [props.onFunc] - Instance access callback
 */
const InitializeReabon = () => {
  const _reabon = useRef<_Reabon>(null);

  if (!_reabon.current) {
    _reabon.current = new _Reabon();
  }

  return { _reabon };
};

export default function Reabon({ ...a }: ReabonProp) {
  const { _reabon } = InitializeReabon();
  const wrapperRef = useRef<HTMLDivElement>(null);

  a?.onFunc?.(_reabon?.current as _Reabon);

  useEffect(() => {
    if (!a.isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        a.onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [a.isOpen, a.onClose]);

  return (
    <div ref={wrapperRef}>
      {_reabon.current?.build?.({ ...a })}
    </div>
  );
}

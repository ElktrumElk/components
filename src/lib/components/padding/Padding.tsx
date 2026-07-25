import { useRef } from "react";
import { _Padding, type _keypadding, type PaddingProp } from "./PaddingClass";

const InitializePadding = () => {
  const _padding = useRef<_Padding>(null);

  if (!_padding.current) {
    _padding.current = new _Padding();
  }

  return { _padding };
};

/**
 * ## Padding
 * `key?: React.Key;` 
 * 
 * child: React.JSX.ElementType
 * 
 * `left?: string;`
 * 
 * `right?: string;`
 * 
 * `top?: string;`
 * 
 * `bottom?: string;`
 * 
 * `inline?: string;`
 * 
 * `block?: string;`
 * 
 * `blockStart?: string;`
 * 
 * `blockEnd?: string;`
 * 
 * `padding?: string; `
 * @returns 
 */
export default function Padding({ ...a }: PaddingProp & _keypadding) {
  const { _padding } = InitializePadding();
  return _padding?.current?.build?.({ ...a });
}

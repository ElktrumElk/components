import { useEffect, useRef } from "react";
import { _Reabon, type ReabonProp } from "./reabonClass";

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

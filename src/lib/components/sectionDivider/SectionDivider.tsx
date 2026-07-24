import { useRef } from "react";
import { _SectionDivider, type SectionDividerProp } from "./SectionDividerClass";

const InitializeSectionDivider = () => {
  const _sectionDivider = useRef<_SectionDivider>(null);

  if (!_sectionDivider.current) {
    _sectionDivider.current = new _SectionDivider();
  }

  return { _sectionDivider };
};

export default function SectionDivider({ ...a }: SectionDividerProp) {
  const { _sectionDivider } = InitializeSectionDivider();
  a?.onFunc?.(_sectionDivider?.current as _SectionDivider);
  return _sectionDivider.current?.build?.({ ...a });
}

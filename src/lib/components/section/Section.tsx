import { useRef } from "react";
import { _Section, type _SectionProp } from "./sectionClass";

const InitializeSection = () => {
  const _section = useRef<_Section | null>(null);

  if (!_section.current) {
    _section.current = new _Section();
  }

  return { _section };
}

export default function Section({ ...a }: _SectionProp) {
  const { _section } = InitializeSection();
  a?.onFunc?.(_section?.current as _Section);
  return _section.current?.build?.({ ...a });
}

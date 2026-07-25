import { useRef } from "react";
import { _SectionDivider, type SectionDividerProp } from "./SectionDividerClass";

const InitializeSectionDivider = () => {
  const _sectionDivider = useRef<_SectionDivider>(null);

  if (!_sectionDivider.current) {
    _sectionDivider.current = new _SectionDivider();
  }

  return { _sectionDivider };
};


/**
 * ## SectionDivider
 * variant?: DividerVariant;
 * 
 * color?: string;
 * 
 * fillColor?: string;
 * 
 * strokeWidth?: number;
 * 
 * height?: number;
 * 
 * width?: string;
 * 
 * flip?: boolean;
 * 
 * customPath?: string;
 * 
 * className?: string;
 * 
 * style?: React.CSSProperties;
 * 
 * child?: React.JSX.ElementType;
 * 
 * gest?: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>,SVGSVGElement>;
 * 
 * onFunc?: (self: _SectionDivider) => void;
 * 
 */
export default function SectionDivider({ ...a }: SectionDividerProp) {
  const { _sectionDivider } = InitializeSectionDivider();
  a?.onFunc?.(_sectionDivider?.current as _SectionDivider);
  return _sectionDivider.current?.build?.({ ...a });
}

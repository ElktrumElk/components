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
 * An SVG-based decorative section divider component.
 *
 * Renders a full-width SVG divider between content sections. Supports twelve
 * built-in variants (wave, curl, zigzag, dots, tilde, heart, diamond, leaf,
 * curve, pulse, loop, scroll) or a fully custom SVG path.
 *
 * @example
 * <SectionDivider variant="wave" color="#6366f1" height={60} />
 *
 * @example
 * <SectionDivider variant="heart" fillColor="#e11d48" flip height={40} />
 *
 * @example
 * <SectionDivider variant="zigzag" color="#000" strokeWidth={3} width="80%" />
 *
 * @see {@link SectionDividerProp} for all available props.
 *
 * @param variant - Visual style of the divider (`"wave"`, `"curl"`, `"zigzag"`, etc.)
 * @param color - Stroke / fallback fill color
 * @param fillColor - Fill color for filled variants
 * @param strokeWidth - Stroke width in pixels
 * @param height - SVG height in pixels
 * @param width - CSS width string
 * @param flip - Mirror the divider vertically
 * @param customPath - Override the built-in SVG path
 * @param className - CSS class on the root `<svg>`
 * @param style - Inline styles on the root `<svg>`
 * @param child - Child component type
 * @param gest - Extra SVG attributes spread onto the root element
 * @param onFunc - Callback receiving the internal class instance
 */
export default function SectionDivider({ ...a }: SectionDividerProp) {
  const { _sectionDivider } = InitializeSectionDivider();
  a?.onFunc?.(_sectionDivider?.current as _SectionDivider);
  return _sectionDivider.current?.build?.({ ...a });
}

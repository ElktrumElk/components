import { useRef, useEffect } from "react";
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
 * Combine with `animate` and `float` for scroll + bobbing.
 *
 * @example
 * <SectionDivider variant="wave" color="#6366f1" height={60} />
 *
 * @example
 * <SectionDivider variant="heart" fillColor="#e11d48" flip height={40} />
 *
 * @example
 * <SectionDivider variant="curl" animate duration={2000} color="#6366f1" />
 *
 * @example
 * <SectionDivider variant="wave" gesture="hover" animate color="#22c55e" />
 *
 * @example
 * <SectionDivider variant="dots" listen={myStore} animate />
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
 * @param animate - Enable Web Animations API scroll animation on the path(s)
 * @param duration - Animation duration in ms (default variant-specific)
 * @param delay - Delay before animation starts in ms (default 0)
 * @param direction - Scroll direction: "ltr", "rtl", "ttb", "btt" (default "ltr")
 * @param easing - CSS easing for scroll: "linear", "ease-in-out", etc. (default "linear")
 * @param gesture - Gesture that triggers the animation: "click", "hover", "focus", "scroll", or "none"
 * @param listen - A Store instance; when its state changes, the animation replays
 * @param float - Enable continuous vertical undulation (bobbing on water)
 * @param amplitude - Float distance in px from center (default 15)
 * @param frequency - Float oscillation cycles per animation duration (default variant-specific)
 */
export default function SectionDivider({ ...a }: SectionDividerProp) {
  const { _sectionDivider } = InitializeSectionDivider();
  a?.onFunc?.(_sectionDivider?.current as _SectionDivider);

  useEffect(() => {
    return () => {
      _sectionDivider.current?.dispose();
    };
  }, []);

  return _sectionDivider.current?.build?.({ ...a });
}

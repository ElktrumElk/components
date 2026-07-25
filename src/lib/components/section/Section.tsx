import { useRef } from "react";
import { _Section, type _SectionProp } from "./sectionClass";

/**
 * Section component that renders a semantic section element with a title and optional body content.
 *
 * @example
 * <Section
 *   title={() => <h2>Features</h2>}
 *   child={() => <FeatureList />}
 *   padding="2rem"
 *   className="features-section"
 * />
 *
 * @see {@link _SectionProp} for available props
 *
 * @param {_SectionProp} props - The section configuration props
 * @param {React.JSX.ElementType} props.title - Title component (required)
 * @param {React.JSX.ElementType} [props.child] - Body content component
 * @param {string} [props.padding] - Inner padding
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} [props.gest] - HTML attributes
 * @param {(self: _Section) => void} [props.onFunc] - Instance access callback
 */
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

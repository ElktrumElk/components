import { useEffect, useRef } from "react";
import {
  _PageScrollView,
  type PageScrollViewProp,
} from "./pageScrollViewClass";

/**
 * PageScrollView component that provides a full-height scroll container with snap-scrolling sections.
 * Uses IntersectionObserver to track which section is currently in view.
 *
 * @example
 * <PageScrollView
 *   sections={[
 *     { id: 'intro', child: () => <IntroSection /> },
 *     { id: 'features', child: () => <FeaturesSection /> },
 *     { id: 'pricing', child: () => <PricingSection /> },
 *   ]}
 *   activeSection="features"
 *   onSectionChange={(id) => console.log('Current section:', id)}
 *   snap={true}
 *   height="100vh"
 * />
 *
 * @see {@link PageScrollViewProp} for available props
 *
 * @param {PageScrollViewProp} props - The scroll view configuration props
 * @param {React.JSX.ElementType} [props.child] - Single child when not using sections
 * @param {Section[]} [props.sections] - Array of sections with id and child
 * @param {string} [props.activeSection] - Section ID to scroll to programmatically
 * @param {(sectionId: string) => void} [props.onSectionChange] - Callback on section visibility change
 * @param {string} [props.width] - Container width
 * @param {string} [props.height] - Container height
 * @param {boolean} [props.snap] - Enable snap scrolling
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {(self: _PageScrollView) => void} [props.onFunc] - Instance access callback
 */
const InitializePageScrollView = () => {
  const _pageScrollView = useRef<_PageScrollView>(null);

  if (!_pageScrollView.current) {
    _pageScrollView.current = new _PageScrollView();
  }

  return { _pageScrollView };
};

export default function PageScrollView({ ...a }: PageScrollViewProp) {
  const { _pageScrollView } = InitializePageScrollView();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { activeSection, onFunc, onSectionChange, sections } = a;

  useEffect(() => {
    onFunc?.(_pageScrollView.current as _PageScrollView);
  }, [onFunc, _pageScrollView]);

  useEffect(() => {
    const instance = _pageScrollView.current;
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!instance || !sections?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              instance.currentSection = id;
              onSectionChange?.(id);
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    for (const section of sections) {
      const el = instance.sectionRefs.get(section.id);
      if (el) observer.observe(el);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      if (observerRef.current === observer) observerRef.current = null;
    };
  }, [_pageScrollView, sections, onSectionChange]);

  useEffect(() => {
    if (activeSection) {
      _pageScrollView.current?.scrollToSection(activeSection);
    }
  }, [_pageScrollView, activeSection]);

  return _pageScrollView.current?.build?.({ ...a });
}

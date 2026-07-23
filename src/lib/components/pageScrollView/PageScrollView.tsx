import { useEffect, useRef } from "react";
import {
  _PageScrollView,
  type PageScrollViewProp,
} from "./pageScrollViewClass";

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

  a?.onFunc?.(_pageScrollView?.current as _PageScrollView);

  useEffect(() => {
    const instance = _pageScrollView.current;
    if (!instance || !a.sections?.length) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              instance.currentSection = id;
              a.onSectionChange?.(id);
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    for (const section of a.sections) {
      const el = instance.sectionRefs.get(section.id);
      if (el) observer.observe(el);
    }

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [a.sections, a.onSectionChange]);

  useEffect(() => {
    if (a.activeSection) {
      _pageScrollView.current?.scrollToSection(a.activeSection);
    }
  }, [a.activeSection]);

  return _pageScrollView.current?.build?.({ ...a });
}

import type { ElementType } from "react";

export interface Section {
  id: string;
  child: React.JSX.ElementType;
}

/**
 * Props for the PageScrollView component.
 * @property {React.JSX.ElementType} [child] - Single child component to render when no sections are provided
 * @property {Section[]} [sections] - Array of section objects with id and child components for snap scrolling
 * @property {string} [activeSection] - ID of the section to programmatically scroll to
 * @property {(sectionId: string) => void} [onSectionChange] - Callback fired when the visible section changes
 * @property {string} [width] - Width of the scroll container (default: '100%')
 * @property {string} [height] - Height of the scroll container (default: '100vh')
 * @property {boolean} [snap] - Enable vertical snap scrolling (default: true)
 * @property {string} [className] - CSS class name for the container
 * @property {React.CSSProperties} [style] - Additional inline styles
 * @property {(self: _PageScrollView) => void} [onFunc] - Callback that receives the instance for imperative access
 */
export interface PageScrollViewProp {
  child?: React.JSX.ElementType;
  sections?: Section[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  width?: string;
  height?: string;
  snap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFunc?: (self: _PageScrollView) => void;
}

export class _PageScrollView {
  child!: ElementType;
  currentSection: string | null = null;
  sectionRefs: Map<string, HTMLDivElement> = new Map();

  build? = ({ ...a }: PageScrollViewProp): React.JSX.Element => {
    this.child = a.child as ElementType;

    return (
      <>
        <div
          data-page-scroll-view="true"
          className={a.className}
          style={{
            width: a.width || "100%",
            height: a.height || "100vh",
            overflowY: "scroll",
            scrollSnapType: a.snap !== false ? "y mandatory" : undefined,
            scrollBehavior: "smooth",
            ...a.style,
          }}
        >
          {a.sections?.map((section) => (
            <div
              key={section.id}
              ref={(el) => {
                if (el) this.sectionRefs.set(section.id, el);
              }}
              data-section-id={section.id}
              style={{
                scrollSnapAlign: a.snap !== false ? "start" : undefined,
                minHeight: "100%",
                height: "100%",
              }}
            >
              <section.child />
            </div>
          ))}
          {a.child && !a.sections && <this.child />}
        </div>
      </>
    );
  };

  scrollToSection(id: string) {
    const el = this.sectionRefs.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

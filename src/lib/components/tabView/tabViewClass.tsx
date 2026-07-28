import type React from "react";

export interface _TabViewTab {
  id: string;
  label: React.JSX.ElementType;
  content: React.JSX.ElementType;
}

/**
 * Props for the TabView component.
 *
 * A self-contained tabbed interface that renders a row of tab buttons and
 * displays the content of the currently active tab.
 *
 * @property tabs - Array of tab definitions, each with `id`, `label` (component type), and `content` (component type).
 * @property activeTab - The `id` of the currently active tab (controlled mode).
 * @property defaultTab - The `id` of the tab shown on first render (uncontrolled mode). Falls back to the first tab.
 * @property onChange - Callback fired when a tab is clicked, receiving the selected tab's `id`.
 * @property gap - CSS gap between tab buttons.
 * @property className - Additional CSS class names applied to the root container.
 * @property style - Inline styles merged onto the root container.
 * @property onFunc - Callback invoked with the internal `_TabView` instance after initialization.
 */
export interface _TabViewProp {
  tabs?: Array<_TabViewTab>;
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
  onFunc?: (self: _TabView) => void;
}

export class _TabView {
  tabs?: Array<_TabViewTab>;
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  gap?: string;
  className?: string;
  style?: React.CSSProperties;

  build? = ({ ...a }: _TabViewProp): React.JSX.Element => {
    this.tabs = a.tabs;
    this.activeTab = a.activeTab;
    this.defaultTab = a.defaultTab;
    this.onChange = a.onChange;
    this.gap = a.gap;
    this.className = a.className;
    this.style = a.style;

    const currentTabId = this.activeTab ?? this.defaultTab ?? this.tabs?.[0]?.id;
    const activeTabData = this.tabs?.find((t) => t.id === currentTabId);

    return (
      <>
        <div
          className={this.className}
          style={{
            display: "flex",
            flexDirection: "column",
            ...this.style,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: this.gap,
            }}
          >
            {this.tabs?.map((tab) => {
              const Label = tab.label;
              const isActive = tab.id === currentTabId;
              return (
                <button
                  key={tab.id}
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  }}
                  onClick={() => this.onChange?.(tab.id)}
                >
                  <Label />
                </button>
              );
            })}
          </div>
          <div>
            {activeTabData?.content && <activeTabData.content />}
          </div>
        </div>
      </>
    );
  };
}

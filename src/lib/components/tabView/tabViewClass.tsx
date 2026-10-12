import type React from "react";
import { Components } from "../__major/components/__components";

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

interface _TabViewState {
  activeTab?: string;
}

export class _TabView extends Components<_TabViewState> {
  tabs?: Array<_TabViewTab>;
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  gap?: string;
  className?: string;
  style?: React.CSSProperties;

  constructor() {
    super({ activeTab: undefined });
  }

  selectTab = (tabId: string, controlled = false) => {
    if (!controlled) this.set({ activeTab: tabId });
    this.onChange?.(tabId);
  };

  build? = (
    { ...a }: _TabViewProp,
    uncontrolledActiveTab?: string,
    idPrefix = "tab-view",
  ): React.JSX.Element => {
    this.tabs = a.tabs;
    this.activeTab = a.activeTab;
    this.defaultTab = a.defaultTab;
    this.onChange = a.onChange;
    this.gap = a.gap;
    this.className = a.className;
    this.style = a.style;

    const requestedTabId = this.activeTab ?? uncontrolledActiveTab ?? this.defaultTab;
    const currentTabId = this.tabs?.some((tab) => tab.id === requestedTabId)
      ? requestedTabId
      : this.tabs?.[0]?.id;
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
            role="tablist"
            aria-orientation="horizontal"
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
                  id={`${idPrefix}-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${idPrefix}-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  }}
                  onClick={() => this.selectTab(tab.id, a.activeTab !== undefined)}
                  onKeyDown={(event) => {
                    let nextIndex: number | undefined;
                    if (event.key === "ArrowRight") nextIndex = (this.tabs!.indexOf(tab) + 1) % this.tabs!.length;
                    if (event.key === "ArrowLeft") nextIndex = (this.tabs!.indexOf(tab) - 1 + this.tabs!.length) % this.tabs!.length;
                    if (event.key === "Home") nextIndex = 0;
                    if (event.key === "End") nextIndex = this.tabs!.length - 1;
                    if (nextIndex === undefined) return;

                    event.preventDefault();
                    const nextTab = this.tabs![nextIndex];
                    this.selectTab(nextTab.id, a.activeTab !== undefined);
                    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
                    buttons?.[nextIndex]?.focus();
                  }}
                >
                  <Label />
                </button>
              );
            })}
          </div>
          <div
            id={activeTabData ? `${idPrefix}-panel-${activeTabData.id}` : undefined}
            role="tabpanel"
            aria-labelledby={activeTabData ? `${idPrefix}-tab-${activeTabData.id}` : undefined}
          >
            {activeTabData?.content && <activeTabData.content />}
          </div>
        </div>
      </>
    );
  };
}

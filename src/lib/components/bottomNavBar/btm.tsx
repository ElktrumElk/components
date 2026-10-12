import type React from "react";
import { Components } from "../__major/components/__components";

export interface BottomNavigationBarItem {
  /** Stable identifier used as the React key. */
  id: string;
  /** Visible item label. */
  label: React.ReactNode;
  /** Icon or other compact visual rendered above the label. */
  icon?: React.ReactNode;
  /** Optional replacement icon for the active item. */
  activeIcon?: React.ReactNode;
  /** Renders the item as an anchor instead of a button. */
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  disabled?: boolean;
  /** Accessible name when the visible label is not descriptive enough. */
  ariaLabel?: string;
}

export interface BottomNavigationBarProp {
  id?: string;
  items?: readonly BottomNavigationBarItem[];
  /** Controlled active item index. */
  activeIndex?: number;
  /** Initial active item index for uncontrolled usage. Defaults to `0`. */
  defaultActiveIndex?: number;
  onChange?: (index: number, item: BottomNavigationBarItem) => void;
  /** Edge-to-edge or elevated, width-constrained shell placement. */
  mode?: "fixed" | "floating";
  /** Shows a pill-shaped active indicator. */
  isGlider?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
  border?: string;
  borderRadius?: string;
  className?: string;
  gest?: React.HTMLAttributes<HTMLElement>;
  /** Custom navigation content. Used when `items` is omitted. */
  links?: React.ReactNode;
  onFunc?: (self: _BottomNavigationBar) => void;
}

interface BottomNavigationBarBuildProp extends BottomNavigationBarProp {
  resolvedActiveIndex: number;
  selectItem: (index: number, item: BottomNavigationBarItem) => void;
}

interface BottomNavigationBarState {
  activeIndex: number;
}

export class _BottomNavigationBar extends Components<BottomNavigationBarState> {
  items: readonly BottomNavigationBarItem[] = [];
  activeIndex = 0;
  mode: "fixed" | "floating" = "fixed";

  constructor(defaultActiveIndex = 0) {
    super({ activeIndex: defaultActiveIndex });
  }

  select = (
    index: number,
    item: BottomNavigationBarItem,
    controlled: boolean,
    onChange?: BottomNavigationBarProp["onChange"],
  ) => {
    if (item.disabled) return;
    if (!controlled) this.set({ activeIndex: index });
    onChange?.(index, item);
  };

  build = ({
    resolvedActiveIndex,
    selectItem,
    ...props
  }: BottomNavigationBarBuildProp): React.JSX.Element => {
    this.items = props.items ?? [];
    this.activeIndex = resolvedActiveIndex;
    this.mode = props.mode ?? "fixed";

    const {
      id,
      className,
      style,
      border,
      borderRadius,
      gest,
      links,
      ariaLabel = "Primary navigation",
      isGlider = true,
    } = props;
    const itemCount = Math.max(this.items.length, 1);
    const rootClassName = ["elk-bottom-navigation", className]
      .filter(Boolean)
      .join(" ");
    const navStyle = {
      "--elk-bottom-nav-items": itemCount,
      border,
      borderRadius,
      ...style,
    } as React.CSSProperties;

    return (
      <nav
        {...gest}
        id={id}
        aria-label={ariaLabel}
        className={rootClassName}
        data-mode={this.mode}
        data-glider={isGlider ? "true" : "false"}
        style={navStyle}
      >
        {this.items.length > 0 ? (
          <div className="elk-bottom-navigation__items">
            {this.items.map((item, index) => {
              const active = index === resolvedActiveIndex;
              const content = (
                <>
                  {isGlider && (
                    <span
                      aria-hidden="true"
                      className="elk-bottom-navigation__indicator"
                    />
                  )}
                  {item.icon != null && (
                    <span
                      aria-hidden="true"
                      className="elk-bottom-navigation__icon"
                    >
                      {active && item.activeIcon != null
                        ? item.activeIcon
                        : item.icon}
                    </span>
                  )}
                  <span className="elk-bottom-navigation__label">
                    {item.label}
                  </span>
                </>
              );
              const shared = {
                className: "elk-bottom-navigation__item",
                "data-active": active ? "true" : "false",
                "aria-label": item.ariaLabel,
                onClick: () => selectItem(index, item),
              };

              if (item.href != null) {
                return (
                  <a
                    {...shared}
                    key={item.id}
                    href={item.disabled ? undefined : item.href}
                    target={item.target}
                    aria-current={active ? "page" : undefined}
                    aria-disabled={item.disabled || undefined}
                    onClick={(event) => {
                      if (item.disabled) {
                        event.preventDefault();
                        return;
                      }
                      selectItem(index, item);
                    }}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <button
                  {...shared}
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  aria-pressed={active}
                >
                  {content}
                </button>
              );
            })}
          </div>
        ) : (
          links
        )}
      </nav>
    );
  };
}

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { _Navigator } from "./navigatorClass";

const NavContent = () => <span>Nav Item</span>;

function renderNav(props = {}) {
  const instance = new _Navigator();
  return render(instance.build!({ child: NavContent, ...props }));
}

describe("Navigator", () => {
  it("renders a nav element", () => {
    renderNav();
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("renders child content inside nav", () => {
    renderNav();
    expect(screen.getByText("Nav Item")).toBeDefined();
  });

  it("defaults to horizontal direction", () => {
    renderNav();
    const nav = screen.getByRole("navigation");
    expect(nav.style.flexDirection).toBe("row");
  });

  it("applies vertical direction when set", () => {
    renderNav({ direction: "vertical" });
    const nav = screen.getByRole("navigation");
    expect(nav.style.flexDirection).toBe("column");
  });

  it("applies gap and className", () => {
    renderNav({ gap: "1rem", className: "test-nav" });
    const nav = screen.getByRole("navigation");
    expect(nav.style.gap).toBe("1rem");
    expect(nav.classList.contains("test-nav")).toBe(true);
  });
});

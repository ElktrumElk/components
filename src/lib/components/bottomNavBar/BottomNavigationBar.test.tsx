import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BottomNavigationBar from "./BottomNavigationBar";

const items = [
  { id: "home", label: "Home", icon: <span>H</span> },
  { id: "search", label: "Search", icon: <span>S</span> },
  { id: "profile", label: "Profile", href: "/profile" },
];

describe("BottomNavigationBar", () => {
  it("renders semantic buttons and anchors with an active item", () => {
    render(<BottomNavigationBar items={items} ariaLabel="App sections" />);

    expect(screen.getByRole("navigation", { name: "App sections" })).toHaveAttribute(
      "data-mode",
      "fixed",
    );
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("updates uncontrolled selection and reports the selected item", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BottomNavigationBar items={items} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(onChange).toHaveBeenCalledWith(1, items[1]);
  });

  it("reports taps on the already active item", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BottomNavigationBar items={items} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Home" }));

    expect(onChange).toHaveBeenCalledWith(0, items[0]);
  });

  it("keeps selection controlled by activeIndex", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <BottomNavigationBar items={items} activeIndex={0} onChange={onChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(onChange).toHaveBeenCalledWith(1, items[1]);
  });

  it("marks an active anchor as the current page", () => {
    render(<BottomNavigationBar items={items} activeIndex={2} mode="floating" />);

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "data-mode",
      "floating",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not select disabled items", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <BottomNavigationBar
        items={[items[0], { ...items[1], disabled: true }]}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("supports custom content and exposes the class controller", () => {
    const onFunc = vi.fn();
    render(
      <BottomNavigationBar
        links={<a href="/custom">Custom</a>}
        onFunc={onFunc}
        isGlider={false}
      />,
    );

    expect(screen.getByRole("link", { name: "Custom" })).toBeInTheDocument();
    expect(onFunc).toHaveBeenCalledWith(
      expect.objectContaining({ build: expect.any(Function) }),
    );
  });
});

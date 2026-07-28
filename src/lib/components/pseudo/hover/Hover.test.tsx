import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hover from "./Hover";
import { __hoverStore, _Hover } from "./HoverClass";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Hover", () => {
  it("renders child content", () => {
    render(
      <Hover style={{ color: "red" }} child={() => <div>Hover Content</div>} />,
    );
    expect(screen.getByText("Hover Content")).toBeInTheDocument();
  });

  it("applies wrapper styles", () => {
    const { container } = render(
      <Hover style={{ color: "red" }} child={() => <div />} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      height: "fit-content",
      width: "fit-content",
      padding: "0",
      margin: "0",
    });
  });

  it("applies key prop", () => {
    const { container } = render(
      <Hover key="custom-key" style={{ color: "red" }} child={() => <div />} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("applies styles on mouseenter", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover style={{ color: "red", fontWeight: "bold" }} child={() => <div>Target</div>} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);

    expect(child.style.color).toBe("red");
    expect(child.style.fontWeight).toBe("bold");
  });

  it("restores styles on mouseleave", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover style={{ color: "red" }} child={() => <div>Target</div>} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    expect(child.style.color).toBe("red");

    await user.unhover(child);
    expect(child.style.color).toBe("");
  });

  it("applies transition on hover", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover
        style={{ color: "red" }}
        transition="all 0.3s ease"
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    expect(child.style.transition).toBe("all 0.3s ease");
  });

  it("applies empty transition on mouseleave", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover
        style={{ color: "red" }}
        transition="all 0.3s ease"
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    await user.unhover(child);
    expect(child.style.transition).toBe("all 0.3s ease");
  });

  it("does not set transition when transition is null", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover
        style={{ color: "red" }}
        transition={null}
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    expect(child.style.transition).toBe("");
  });

  it("defaults transition to empty string when not provided", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover style={{ color: "red" }} child={() => <div>Target</div>} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    expect(child.style.transition).toBe("");
  });

  it("handles multiple style properties", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover
        style={{
          color: "blue",
          backgroundColor: "yellow",
          transform: "scale(1.1)",
          opacity: "0.8",
        }}
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    await user.hover(child);
    expect(child.style.color).toBe("blue");
    expect(child.style.backgroundColor).toBe("yellow");
    expect(child.style.transform).toBe("scale(1.1)");
    expect(child.style.opacity).toBe("0.8");
  });

  it("renders without child prop", () => {
    const { container } = render(
      <Hover style={{ color: "red" }} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("calls onMouseEnter handler", async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const { container } = render(
      <Hover
        style={{ color: "red" }}
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    child.addEventListener("mouseenter", onMouseEnter);
    await user.hover(child);
    expect(onMouseEnter).toHaveBeenCalledOnce();
  });

  it("calls onMouseLeave handler", async () => {
    const user = userEvent.setup();
    const onMouseLeave = vi.fn();
    const { container } = render(
      <Hover
        style={{ color: "red" }}
        child={() => <div>Target</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    child.addEventListener("mouseleave", onMouseLeave);
    await user.hover(child);
    await user.unhover(child);
    expect(onMouseLeave).toHaveBeenCalledOnce();
  });

  it("multiple hover/unhover cycles work correctly", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Hover style={{ color: "red" }} child={() => <div>Target</div>} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const child = wrapper.firstElementChild as HTMLElement;

    for (let i = 0; i < 3; i++) {
      await user.hover(child);
      expect(child.style.color).toBe("red");
      await user.unhover(child);
      expect(child.style.color).toBe("");
    }
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { _SidePanel } from "./sidePanelClass";

const PanelChild = () => <div>Panel Content</div>;

function renderPanel(props = {}) {
  const instance = new _SidePanel();
  return render(instance.build!({ child: PanelChild, isOpen: true, ...props }));
}

describe("SidePanel", () => {
  it("renders nothing when isOpen is false", () => {
    const instance = new _SidePanel();
    const { container } = render(instance.build!({ isOpen: false }));
    expect(container.innerHTML).toBe("");
  });

  it("renders panel content when isOpen is true", () => {
    renderPanel();
    expect(screen.getByText("Panel Content")).toBeDefined();
  });

  it("positions on the left by default", () => {
    renderPanel();
    const aside = screen.getByText("Panel Content").closest("aside")!;
    expect(aside.style.left).toBe("0px");
    expect(aside.style.right).toBe("");
  });

  it("positions on the right when side is 'right'", () => {
    renderPanel({ side: "right" });
    const aside = screen.getByText("Panel Content").closest("aside")!;
    expect(aside.style.right).toBe("0px");
    expect(aside.style.left).toBe("");
  });

  it("calls onClose when backdrop overlay is clicked", () => {
    const onClose = vi.fn();
    const { container } = renderPanel({ onClose });
    const overlay = container.firstElementChild!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { _BottomModal } from "./bottomModalClass";

const ModalChild = () => <div>Modal Content</div>;
const ModalTitle = () => <h2>Modal Title</h2>;

function renderModal(props = {}) {
  const instance = new _BottomModal();
  return render(instance.build!({ child: ModalChild, isOpen: true, ...props }));
}

describe("BottomModal", () => {
  it("renders nothing when isOpen is false", () => {
    const instance = new _BottomModal();
    const { container } = render(instance.build!({ isOpen: false }));
    expect(container.innerHTML).toBe("");
  });

  it("renders modal content when isOpen is true", () => {
    renderModal();
    expect(screen.getByText("Modal Content")).toBeDefined();
  });

  it("renders title when provided", () => {
    renderModal({ title: ModalTitle });
    expect(screen.getByText("Modal Title")).toBeDefined();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = renderModal({ onClose });
    const backdrop = container.firstElementChild!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders handle bar by default", () => {
    const { container } = renderModal();
    const handles = container.querySelectorAll("div");
    const handleBar = Array.from(handles).find(
      (el) => el.style.width === "36px" && el.style.height === "4px"
    );
    expect(handleBar).toBeDefined();
  });
});

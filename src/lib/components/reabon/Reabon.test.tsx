import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Reabon from "./Reabon";

describe("Reabon", () => {
  it("marks open content as a dialog and closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <Reabon
        isOpen
        onClose={onClose}
        trigger={() => <button type="button">Trigger</button>}
        child={() => <div>Content</div>}
      />,
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("Content");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });
});

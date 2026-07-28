import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Example from "./Example";
import { _Example } from "./ExampleClass";

describe("Example", () => {
  it("should render innerHTML from text prop", () => {
    const { container } = render(<Example text="<b>Bold</b>" />);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.innerHTML).toBe("<b>Bold</b>");
  });

  it("should render empty span when text is not provided", () => {
    const { container } = render(<Example />);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.innerHTML).toBe("");
  });

  it("should apply inline styles from props", () => {
    const { container } = render(
      <Example width="100px" height="50px" borderRadius="8px" />,
    );
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span).toHaveStyle({ width: "100px", height: "50px", borderRadius: "8px" });
  });

  it("should call onFunc with _Example instance", () => {
    const onFunc = vi.fn();
    render(<Example text="test" onFunc={onFunc} />);
    expect(onFunc).toHaveBeenCalledOnce();
    expect(onFunc).toHaveBeenCalledWith(expect.any(_Example));
  });
});

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ScrollView from "./ScrollView";

describe("ScrollView", () => {
  it("places the scrollbar class on the scrolling element without a style tag", () => {
    const { container } = render(<ScrollView hideScrollbar child={() => <div />} />);
    const scroller = container.firstElementChild as HTMLElement;
    expect(scroller).toHaveClass("hide-scrollbar");
    expect(scroller).toHaveStyle({ overflowY: "auto" });
    expect(container.querySelector("style")).not.toBeInTheDocument();
  });
});

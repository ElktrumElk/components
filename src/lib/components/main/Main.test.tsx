import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Main from "./Main";

describe("Semantic main", () => {
  it("Main component successfully renders content provided to the child prop", () => {
    // Pass a unique, easily identifiable element into the prop
    render(
      <Main
        child={() => <div data-testid="verified-child">Content Loaded</div>}
      />,
    );

    // Assert that the contents of the child render-prop exist inside the DOM
    const renderedChild = screen.getByTestId("verified-child");
    expect(renderedChild).toBeInTheDocument();
    expect(renderedChild).toHaveTextContent("Content Loaded");
  });
  it("Main must render internal layout child elements", () => {
    // 1. Render using the library's mandatory functional child prop pattern
    render(<Main child={() => <div data-testid="target-child">Hello</div>} />);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();

    const childElement = within(mainElement).getByTestId("target-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hello");
  });
});

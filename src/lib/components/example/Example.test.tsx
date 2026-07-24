import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Example from "./Example";
import { expect } from "vitest";

describe("Example", () => {
  it("It should format an html tag", () => {
    const { container } = render(
      <Example text="<span style={{color: 'red'}}>{'<Card />'}</span>" />,
    );
    const span = container.querySelector("span");
    setTimeout(() => {
      expect(span).toHaveTextContent("<Card />");
    }, 100);
  });
});

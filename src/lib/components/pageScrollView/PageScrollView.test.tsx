import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { _PageScrollView } from "./pageScrollViewClass";

describe("PageScrollView", () => {
  it("renders the child fallback when sections is empty", () => {
    const instance = new _PageScrollView();
    render(instance.build!({ sections: [], child: () => <div>Fallback</div> }));
    expect(screen.getByText("Fallback")).toBeInTheDocument();
  });

  it("removes section refs when sections unmount", () => {
    const instance = new _PageScrollView();
    const section = { id: "one", child: () => <div>One</div> };
    const { rerender } = render(instance.build!({ sections: [section] }));
    expect(instance.sectionRefs.has("one")).toBe(true);
    rerender(instance.build!({ sections: [] }));
    expect(instance.sectionRefs.has("one")).toBe(false);
  });
});

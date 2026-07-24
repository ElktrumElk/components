import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SectionDivider from "./SectionDivider";
import { _SectionDivider } from "./SectionDividerClass";

describe("SectionDivider", () => {
  it("renders an SVG element", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("defaults to wave variant", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute("d")).toContain("M0,32");
  });

  it("renders curl variant", () => {
    const { container } = render(<SectionDivider variant="curl" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("M0,40 C80,10");
  });

  it("renders zigzag variant as stroke not fill", () => {
    const { container } = render(<SectionDivider variant="zigzag" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("none");
    expect(path?.getAttribute("stroke")).toBeTruthy();
  });

  it("renders dots variant with decorative circles", () => {
    const { container } = render(<SectionDivider variant="dots" />);
    const svg = container.querySelector("svg");
    const paths = svg?.querySelectorAll("path");
    expect(paths?.length).toBe(2);
  });

  it("applies custom color", () => {
    const { container } = render(<SectionDivider color="#ff0000" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("#ff0000");
  });

  it("applies custom height", () => {
    const { container } = render(<SectionDivider height={120} />);
    const svg = container.querySelector("svg");
    expect(svg?.style.height).toBe("120px");
  });

  it("applies custom width", () => {
    const { container } = render(<SectionDivider width="50%" />);
    const svg = container.querySelector("svg");
    expect(svg?.style.width).toBe("50%");
  });

  it("flips vertically when flip is true", () => {
    const { container } = render(<SectionDivider flip />);
    const svg = container.querySelector("svg");
    expect(svg?.style.transform).toBe("scaleY(-1)");
  });

  it("does not flip by default", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    expect(svg?.style.transform).toBe("scaleY(1)");
  });

  it("applies className", () => {
    const { container } = render(
      <SectionDivider className="my-divider" />,
    );
    expect(container.querySelector(".my-divider")).toBeInTheDocument();
  });

  it("applies custom style", () => {
    const { container } = render(
      <SectionDivider style={{ opacity: 0.5 }} />,
    );
    const svg = container.querySelector("svg");
    expect(svg?.style.opacity).toBe("0.5");
  });

  it("calls onFunc with _SectionDivider instance", () => {
    const onFunc = vi.fn();
    render(<SectionDivider onFunc={onFunc} />);
    expect(onFunc).toHaveBeenCalledOnce();
    expect(onFunc).toHaveBeenCalledWith(expect.any(_SectionDivider));
  });

  it("renders heart variant", () => {
    const { container } = render(<SectionDivider variant="heart" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("C180,20");
  });

  it("renders diamond variant as stroke", () => {
    const { container } = render(<SectionDivider variant="diamond" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("none");
    expect(path?.getAttribute("stroke")).toBeTruthy();
  });

  it("supports customPath override", () => {
    const customPath = "M0,0 L1440,0";
    const { container } = render(<SectionDivider customPath={customPath} />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toBe(customPath);
  });

  it("applies custom stroke width", () => {
    const { container } = render(
      <SectionDivider variant="zigzag" strokeWidth={4} />,
    );
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("stroke-width")).toBe("4");
  });

  it("preserves preserveAspectRatio for scaling", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("preserveAspectRatio")).toBe("none");
  });
});

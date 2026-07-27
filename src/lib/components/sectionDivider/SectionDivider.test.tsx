import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SectionDivider from "./SectionDivider";
import { _SectionDivider } from "./SectionDividerClass";
import { createStore } from "../../../hooks/createStore";

const animateMock = vi.fn(() => ({
  play: vi.fn(),
  pause: vi.fn(),
  reverse: vi.fn(),
  cancel: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  Element.prototype.animate = animateMock;
});

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

  // --- Animation tests ---

  it("creates animations on path elements when animate is true", () => {
    const { container } = render(<SectionDivider animate />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path).toBeTruthy();
    expect(animateMock).toHaveBeenCalled();
  });

  it("does not create animations when animate is false", () => {
    render(<SectionDivider />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("creates animations when gesture is set even without animate", () => {
    const { container } = render(<SectionDivider gesture="click" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(animateMock).toHaveBeenCalled();
  });

  it("passes duration to animate()", () => {
    const { container } = render(<SectionDivider animate duration={2000} />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    expect(call[1].duration).toBe(2000);
  });

  it("passes delay to animate()", () => {
    const { container } = render(<SectionDivider animate delay={500} />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    expect(call[1].delay).toBe(500);
  });

  it("defaults to variant-specific duration (wave = 4000ms)", () => {
    const { container } = render(<SectionDivider animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    expect(call[1].duration).toBe(4000);
  });

  it("defaults to Infinity iterations", () => {
    const { container } = render(<SectionDivider animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    expect(call[1].iterations).toBe(Infinity);
  });

  it("uses variant-specific keyframes for curl (scroll with rotation)", () => {
    const { container } = render(<SectionDivider variant="curl" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateX(0) rotate(0deg)" });
    expect(keyframes.length).toBe(5);
  });

  it("uses variant-specific keyframes for heart (double-beat pulse)", () => {
    const { container } = render(<SectionDivider variant="heart" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "scale(1)", opacity: "1" });
    expect(keyframes[1]).toEqual({ transform: "scale(1.15)", opacity: "1" });
    expect(keyframes.length).toBe(5);
  });

  it("uses variant-specific keyframes for dots (opacity + blur flash)", () => {
    const { container } = render(<SectionDivider variant="dots" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ opacity: "0.3", filter: "blur(0px)" });
    expect(keyframes[1]).toEqual({ opacity: "1", filter: "blur(1.5px)" });
    expect(keyframes.length).toBe(5);
  });

  it("uses variant-specific keyframes for leaf (wind sway with rotation + translateY)", () => {
    const { container } = render(<SectionDivider variant="leaf" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "rotate(0deg) translateY(0)" });
    expect(keyframes[1]).toEqual({ transform: "rotate(6deg) translateY(-4px)" });
    expect(keyframes.length).toBe(6);
  });

  it("uses variant-specific keyframes for pulse (electronic spike)", () => {
    const { container } = render(<SectionDivider variant="pulse" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateY(0) scaleY(1)" });
    expect(keyframes[1]).toEqual({ transform: "translateY(-10px) scaleY(1.4)" });
    expect(keyframes.length).toBe(5);
  });

  it("uses variant-specific keyframes for zigzag (skew jitter)", () => {
    const { container } = render(<SectionDivider variant="zigzag" animate />);
    expect(animateMock).toHaveBeenCalled();
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateX(0) skewX(0deg)" });
    expect(keyframes[1]).toEqual({ transform: "translateX(-12px) skewX(3deg)" });
  });

  it("uses variant-specific easing per variant", () => {
    render(<SectionDivider variant="pulse" animate />);
    const pulseEasing = animateMock.mock.calls[0][1].easing;
    animateMock.mockClear();

    render(<SectionDivider variant="curl" animate />);
    const curlEasing = animateMock.mock.calls[0][1].easing;

    expect(pulseEasing).toBe("cubic-bezier(0.22, 1, 0.36, 1)");
    expect(curlEasing).toBe("linear");
    expect(pulseEasing).not.toBe(curlEasing);
  });

  it("uses variant-specific default duration", () => {
    render(<SectionDivider variant="heart" animate />);
    const heartDuration = animateMock.mock.calls[0][1].duration;
    animateMock.mockClear();

    render(<SectionDivider variant="pulse" animate />);
    const pulseDuration = animateMock.mock.calls[0][1].duration;

    expect(heartDuration).toBe(1200);
    expect(pulseDuration).toBe(1000);
    expect(heartDuration).not.toBe(pulseDuration);
  });

  it("user duration overrides variant default", () => {
    render(<SectionDivider variant="heart" animate duration={5000} />);
    expect(animateMock.mock.calls[0][1].duration).toBe(5000);
  });

  it("animates all path elements", () => {
    const { container } = render(<SectionDivider variant="dots" animate />);
    // dots variant has 2 paths (main + decorative dots)
    expect(animateMock).toHaveBeenCalledTimes(2);
  });

  it("binds click gesture", async () => {
    const user = userEvent.setup();
    const { container } = render(<SectionDivider gesture="click" animate />);
    const svg = container.querySelector("svg")!;
    const playMock = animateMock.mock.results[0].value.play;
    await user.click(svg);
    expect(playMock).toHaveBeenCalled();
  });

  it("binds hover gesture", async () => {
    const user = userEvent.setup();
    const { container } = render(<SectionDivider gesture="hover" animate />);
    const svg = container.querySelector("svg")!;
    const playMock = animateMock.mock.results[0].value.play;
    await user.hover(svg);
    expect(playMock).toHaveBeenCalled();
  });

  it("listen prop triggers animation on store change", () => {
    const store = createStore({ trigger: false });
    const { container } = render(<SectionDivider listen={store} animate />);
    const playMock = animateMock.mock.results[0].value.play;

    store.setState({ trigger: true });
    expect(playMock).toHaveBeenCalled();
  });

  it("listen prop triggers animation multiple times", () => {
    const store = createStore({ n: 0 });
    const { container } = render(<SectionDivider listen={store} animate />);
    const playMock = animateMock.mock.results[0].value.play;

    playMock.mockClear();
    store.setState({ n: 1 });
    store.setState({ n: 2 });
    store.setState({ n: 3 });
    expect(playMock).toHaveBeenCalledTimes(3);
  });

  it("play() method starts animations", () => {
    let instance: _SectionDivider;
    render(
      <SectionDivider
        animate
        onFunc={(self) => { instance = self; }}
      />,
    );
    const playMock = animateMock.mock.results[0].value.play;
    instance!.play();
    expect(playMock).toHaveBeenCalled();
  });

  it("stop() method cancels animations", () => {
    let instance: _SectionDivider;
    render(
      <SectionDivider
        animate
        onFunc={(self) => { instance = self; }}
      />,
    );
    const cancelMock = animateMock.mock.results[0].value.cancel;
    instance!.stop();
    expect(cancelMock).toHaveBeenCalled();
  });

  it("cleanup on unmount cancels animations", () => {
    const { unmount } = render(<SectionDivider animate />);
    const cancelMock = animateMock.mock.results[0].value.cancel;
    unmount();
    expect(cancelMock).toHaveBeenCalled();
  });

  it("cleanup on unmount unsubscribes from listen store", () => {
    const store = createStore({ n: 0 });
    const { unmount } = render(<SectionDivider listen={store} animate />);
    unmount();
    // After unmount, store changes should not trigger play
    const playMock = animateMock.mock.results[0].value.play;
    playMock.mockClear();
    store.setState({ n: 1 });
    expect(playMock).not.toHaveBeenCalled();
  });

  it("does not animate when gesture is none", () => {
    const { container } = render(<SectionDivider gesture="none" />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("does not animate when animate is false and no gesture", () => {
    const { container } = render(<SectionDivider animate={false} />);
    expect(animateMock).not.toHaveBeenCalled();
  });
});

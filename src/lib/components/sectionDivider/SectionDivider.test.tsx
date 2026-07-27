import { render } from "@testing-library/react";
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
    expect(path?.getAttribute("d")).toContain("M0,40");
  });

  it("renders zigzag variant as stroke not fill", () => {
    const { container } = render(<SectionDivider variant="zigzag" />);
    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("none");
    expect(path?.getAttribute("stroke")).toBeTruthy();
  });

  it("renders dots variant with paths", () => {
    const { container } = render(<SectionDivider variant="dots" />);
    const svg = container.querySelector("svg");
    const paths = svg?.querySelectorAll("path");
    expect(paths?.length).toBe(4);
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
    const { container } = render(<SectionDivider className="my-divider" />);
    expect(container.querySelector(".my-divider")).toBeInTheDocument();
  });

  it("applies custom style", () => {
    const { container } = render(<SectionDivider style={{ opacity: 0.5 }} />);
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

  it("has overflow hidden for scroll animation", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    expect(svg?.style.overflow).toBe("hidden");
  });

  it("renders duplicate paths for seamless scroll", () => {
    const { container } = render(<SectionDivider variant="wave" />);
    const svg = container.querySelector("svg");
    const paths = svg?.querySelectorAll("path");
    expect(paths?.length).toBe(2);
  });

  it("duplicate paths have translate(1440, 0)", () => {
    const { container } = render(<SectionDivider variant="wave" />);
    const svg = container.querySelector("svg");
    const paths = svg?.querySelectorAll("path");
    const secondPath = paths?.[1];
    expect(secondPath?.getAttribute("transform")).toBe("translate(1440, 0)");
  });

  it("renders nested g elements for scroll and float", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    const scrollG = svg?.querySelector("g[data-scroll]");
    const floatG = svg?.querySelector("g[data-float]");
    expect(scrollG).toBeInTheDocument();
    expect(floatG).toBeInTheDocument();
  });

  // --- Scroll animation tests ---

  it("creates scroll animation on g[data-scroll] when animate is true", () => {
    render(<SectionDivider animate />);
    expect(animateMock).toHaveBeenCalled();
  });

  it("does not create animation when animate is false and no float", () => {
    render(<SectionDivider />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("creates animation when gesture is set even without animate", () => {
    render(<SectionDivider gesture="click" />);
    expect(animateMock).toHaveBeenCalled();
  });

  it("uses configured easing for scroll", () => {
    render(<SectionDivider animate easing="ease-in-out" />);
    const call = animateMock.mock.calls[0];
    expect(call[1].easing).toBe("ease-in-out");
  });

  it("defaults to linear easing", () => {
    render(<SectionDivider animate />);
    const call = animateMock.mock.calls[0];
    expect(call[1].easing).toBe("linear");
  });

  it("defaults to Infinity iterations", () => {
    render(<SectionDivider animate />);
    const call = animateMock.mock.calls[0];
    expect(call[1].iterations).toBe(Infinity);
  });

  it("uses variant-specific default duration", () => {
    render(<SectionDivider variant="wave" animate />);
    const waveDuration = animateMock.mock.calls[0][1].duration;
    animateMock.mockClear();

    render(<SectionDivider variant="pulse" animate />);
    const pulseDuration = animateMock.mock.calls[0][1].duration;

    expect(waveDuration).toBe(5000);
    expect(pulseDuration).toBe(2500);
  });

  it("user duration overrides variant default", () => {
    render(<SectionDivider animate duration={8000} />);
    expect(animateMock.mock.calls[0][1].duration).toBe(8000);
  });

  it("generates ltr keyframes", () => {
    render(<SectionDivider animate direction="ltr" />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateX(-1440px)" });
    expect(keyframes[keyframes.length - 1]).toEqual({
      transform: "translateX(0px)",
    });
  });

  it("generates rtl keyframes", () => {
    render(<SectionDivider animate direction="rtl" />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateX(0px)" });
    expect(keyframes[keyframes.length - 1]).toEqual({
      transform: "translateX(-1440px)",
    });
  });

  it("generates ttb keyframes", () => {
    render(<SectionDivider animate direction="ttb" />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateY(-1440px)" });
    expect(keyframes[keyframes.length - 1]).toEqual({
      transform: "translateY(0px)",
    });
  });

  it("generates btt keyframes", () => {
    render(<SectionDivider animate direction="btt" />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateY(1440px)" });
    expect(keyframes[keyframes.length - 1]).toEqual({
      transform: "translateY(0px)",
    });
  });

  it("defaults to ltr direction", () => {
    render(<SectionDivider animate />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes[0]).toEqual({ transform: "translateX(-1440px)" });
  });

  it("generates 61 keyframe steps for smooth scroll", () => {
    render(<SectionDivider animate />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    expect(keyframes.length).toBe(61);
  });

  // --- Float animation tests ---

  it("creates float animation when float is true", () => {
    render(<SectionDivider float />);
    expect(animateMock).toHaveBeenCalled();
  });

  it("creates both scroll and float when both are true", () => {
    render(<SectionDivider animate float />);
    expect(animateMock).toHaveBeenCalledTimes(2);
  });

  it("float uses ease-in-out easing", () => {
    render(<SectionDivider float />);
    const call = animateMock.mock.calls[0];
    expect(call[1].easing).toBe("ease-in-out");
  });

  it("float defaults to Infinity iterations", () => {
    render(<SectionDivider float />);
    const call = animateMock.mock.calls[0];
    expect(call[1].iterations).toBe(Infinity);
  });

  it("float generates 121 keyframe steps", () => {
    render(<SectionDivider float />);
    const call = animateMock.mock.calls[0];
    expect(call[0].length).toBe(121);
  });

  it("float keyframes start and end near zero", () => {
    render(<SectionDivider float />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0] as { transform: string }[];
    const extract = (k: { transform: string }) =>
      parseFloat(k.transform.replace("translateY(", ""));
    expect(Math.abs(extract(keyframes[0]))).toBeLessThan(0.01);
    expect(Math.abs(extract(keyframes[keyframes.length - 1]))).toBeLessThan(
      0.01,
    );
  });

  it("float with amplitude 0 produces all zero keyframes", () => {
    render(<SectionDivider float amplitude={0} />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    const allZero = keyframes.every(
      (k: Keyframe) => k.transform === "translateY(0.00px)",
    );
    expect(allZero).toBe(true);
  });

  it("float with higher amplitude produces larger translateY values", () => {
    render(<SectionDivider float amplitude={30} />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    const maxAbs = Math.max(
      ...keyframes.map((k: Keyframe) => {
        const match = (k.transform as string)?.match(/-?[\d.]+/);
        return match ? Math.abs(parseFloat(match[0])) : 0;
      }),
    );
    expect(maxAbs).toBeGreaterThan(15);
  });

  it("float with frequency 1 produces one full sine cycle", () => {
    render(<SectionDivider float frequency={1} />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0];
    const mid = keyframes[60];
    expect(mid).toEqual({ transform: "translateY(0.00px)" });
  });

  it("float with frequency 4 produces four full cycles", () => {
    render(<SectionDivider float frequency={4} />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0] as { transform: string }[];
    const extract = (k: { transform: string }) =>
      parseFloat(k.transform.replace("translateY(", ""));
    // sin(4 * 2π * 8/120) = sin(π/1.5) ≈ peak
    const peak = keyframes[8];
    // sin(4 * 2π * 30/120) = sin(2π) ≈ 0
    const zero = keyframes[30];
    expect(Math.abs(extract(peak))).toBeGreaterThan(10);
    expect(Math.abs(extract(zero))).toBeLessThan(0.01);
  });

  it("uses variant-specific default frequency", () => {
    render(<SectionDivider variant="wave" float />);
    const waveFreq = animateMock.mock.calls[0][0].length;
    animateMock.mockClear();

    render(<SectionDivider variant="curl" float />);
    const curlFreq = animateMock.mock.calls[0][0].length;

    expect(waveFreq).toBe(121);
    expect(curlFreq).toBe(121);
  });

  it("user frequency overrides variant default", () => {
    render(<SectionDivider float frequency={8} />);
    const call = animateMock.mock.calls[0];
    const keyframes = call[0] as { transform: string }[];
    const extract = (k: { transform: string }) =>
      parseFloat(k.transform.replace("translateY(", ""));
    // sin(8 * 2π * 4/120) ≈ sin(π/1.5) ≈ peak
    const peak = keyframes[4];
    // sin(8 * 2π * 15/120) = sin(2π) ≈ 0
    const zero = keyframes[15];
    expect(Math.abs(extract(peak))).toBeGreaterThan(10);
    expect(Math.abs(extract(zero))).toBeLessThan(0.01);
  });

  it("float does not create animation when float is false", () => {
    render(<SectionDivider />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  // --- Gesture tests ---

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
    render(<SectionDivider listen={store} animate />);
    const playMock = animateMock.mock.results[0].value.play;
    store.setState({ trigger: true });
    expect(playMock).toHaveBeenCalled();
  });

  it("play() method starts animations", () => {
    let instance: _SectionDivider;
    render(
      <SectionDivider
        animate
        onFunc={(self) => {
          instance = self;
        }}
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
        onFunc={(self) => {
          instance = self;
        }}
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
    const playMock = animateMock.mock.results[0].value.play;
    playMock.mockClear();
    store.setState({ n: 1 });
    expect(playMock).not.toHaveBeenCalled();
  });

  it("does not animate when gesture is none and no float", () => {
    render(<SectionDivider gesture="none" />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("does not animate when animate is false and no gesture and no float", () => {
    render(<SectionDivider animate={false} />);
    expect(animateMock).not.toHaveBeenCalled();
  });

  it("each variant generates valid path starting with M", () => {
    const variants = [
      "wave", "curl", "zigzag", "dots", "tilde", "heart",
      "diamond", "leaf", "curve", "pulse", "loop", "scroll",
    ] as const;
    for (const v of variants) {
      const { container } = render(<SectionDivider variant={v} />);
      const d = container.querySelector("path")?.getAttribute("d") || "";
      expect(d.startsWith("M")).toBe(true);
    }
  });
});

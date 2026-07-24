import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Animation from "./Animation";
import { _Animation } from "./AnimationClass";

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

describe("Animation", () => {
  it("renders child content", () => {
    render(
      <Animation child={() => <div>Animated Content</div>} isAutomatic />,
    );
    expect(screen.getByText("Animated Content")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <Animation className="fade-in" child={() => <div />} isAutomatic />,
    );
    expect(container.querySelector(".fade-in")).toBeInTheDocument();
  });

  it("applies custom style", () => {
    const { container } = render(
      <Animation style={{ padding: "1rem" }} child={() => <div />} isAutomatic />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({ padding: "1rem" });
  });

  it("calls onFunc with _Animation instance", () => {
    const onFunc = vi.fn();
    render(
      <Animation child={() => <div />} isAutomatic onFunc={onFunc} />,
    );
    expect(onFunc).toHaveBeenCalledOnce();
    expect(onFunc).toHaveBeenCalledWith(expect.any(_Animation));
  });

  it("creates animation on mount with default keyframes", () => {
    render(<Animation child={() => <div />} isAutomatic />);
    expect(animateMock).toHaveBeenCalledOnce();
    expect(animateMock).toHaveBeenCalledWith(
      [
        { opacity: "0", transform: "translateY(8px)" },
        { opacity: "1", transform: "translateY(0)" },
      ],
      expect.objectContaining({ duration: 300, fill: "forwards" }),
    );
  });

  it("uses custom keyframes when provided", () => {
    const keyframes = [
      { opacity: "0", transform: "scale(0.5)" },
      { opacity: "1", transform: "scale(1)" },
    ];
    render(
      <Animation child={() => <div />} keyframes={keyframes} isAutomatic />,
    );
    expect(animateMock).toHaveBeenCalledWith(
      keyframes,
      expect.any(Object),
    );
  });

  it("passes animation options to animate()", () => {
    render(
      <Animation
        child={() => <div />}
        isAutomatic
        duration={500}
        delay={100}
        iterations={3}
        direction="alternate"
        fill="both"
        easing="linear"
      />,
    );
    expect(animateMock).toHaveBeenCalledWith(
      expect.any(Array),
      {
        duration: 500,
        delay: 100,
        iterations: 3,
        direction: "alternate",
        fill: "both",
        easing: "linear",
      },
    );
  });

  it("pauses animation when isAutomatic is false", () => {
    const pauseMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: vi.fn(), pause: pauseMock, reverse: vi.fn(), cancel: vi.fn() });

    render(<Animation child={() => <div />} isAutomatic={false} />);
    expect(pauseMock).toHaveBeenCalledOnce();
  });

  it("does not pause when isAutomatic is true", () => {
    const pauseMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: vi.fn(), pause: pauseMock, reverse: vi.fn(), cancel: vi.fn() });

    render(<Animation child={() => <div />} isAutomatic />);
    expect(pauseMock).not.toHaveBeenCalled();
  });

  it("exposes play method via onFunc", () => {
    const playMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn() });

    let instance: _Animation;
    render(
      <Animation
        child={() => <div />}
        isAutomatic={false}
        onFunc={(self) => (instance = self)}
      />,
    );
    instance!.play();
    expect(playMock).toHaveBeenCalledOnce();
  });

  it("exposes reverse method via onFunc", () => {
    const reverseMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: vi.fn(), pause: vi.fn(), reverse: reverseMock, cancel: vi.fn() });

    let instance: _Animation;
    render(
      <Animation
        child={() => <div />}
        isAutomatic={false}
        onFunc={(self) => (instance = self)}
      />,
    );
    instance!.reverse();
    expect(reverseMock).toHaveBeenCalledOnce();
  });

  it("binds click gesture to play animation", async () => {
    const user = userEvent.setup();
    const playMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn() });

    const { container } = render(
      <Animation child={() => <div />} isAutomatic={false} gesture="click" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    await user.click(wrapper);
    expect(playMock).toHaveBeenCalledOnce();
  });

  it("binds hover gesture to play animation", async () => {
    const user = userEvent.setup();
    const playMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn() });

    const { container } = render(
      <Animation child={() => <div />} isAutomatic={false} gesture="hover" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    await user.hover(wrapper);
    expect(playMock).toHaveBeenCalledOnce();
  });

  it("binds focus gesture to play animation", async () => {
    const user = userEvent.setup();
    const playMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn() });

    const { container } = render(
      <Animation
        child={() => <button>Focus me</button>}
        isAutomatic={false}
        gesture="focus"
      />,
    );
    const button = screen.getByRole("button");
    await user.tab();
    expect(playMock).toHaveBeenCalledOnce();
  });

  it("does not bind gesture when gesture is none", () => {
    const playMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn() });

    render(
      <Animation child={() => <div />} isAutomatic={false} gesture="none" />,
    );
    expect(playMock).not.toHaveBeenCalled();
  });

  it("cleans up animation on unmount", () => {
    const cancelMock = vi.fn();
    animateMock.mockReturnValueOnce({ play: vi.fn(), pause: vi.fn(), reverse: vi.fn(), cancel: cancelMock });

    const { unmount } = render(
      <Animation child={() => <div />} isAutomatic />,
    );
    unmount();
    expect(cancelMock).toHaveBeenCalled();
  });
});

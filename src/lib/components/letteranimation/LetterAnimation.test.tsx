import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LetterAnimation from "./LetterAnimation";
import { _LetterAnimation, getPresetKeyframes } from "./LetterAnimationClass";
import type { AnimationPreset } from "./LetterAnimationClass";

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

describe("LetterAnimation", () => {
  describe("text splitting", () => {
    it("renders text by letters by default", () => {
      const { container } = render(<LetterAnimation text="Hi" />);
      const spans = container.querySelectorAll("[data-letter]");
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe("H");
      expect(spans[1].textContent).toBe("i");
    });

    it("renders by letters when type is letters", () => {
      const { container } = render(<LetterAnimation text="Go" type="letters" />);
      const spans = container.querySelectorAll("[data-letter]");
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe("G");
      expect(spans[1].textContent).toBe("o");
    });

    it("renders by words when type is words", () => {
      const { container } = render(
        <LetterAnimation text="Hello World" type="words" />,
      );
      const spans = container.querySelectorAll("[data-letter]");
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe("Hello");
      expect(spans[1].textContent).toBe("World");
    });

    it("preserves whitespace in words mode", () => {
      const { container } = render(
        <LetterAnimation text="A B" type="words" />,
      );
      const all = container.firstElementChild!.children;
      expect(all.length).toBe(3);
      expect(all[0].textContent).toBe("A");
      expect(all[1].textContent).toBe(" ");
      expect(all[2].textContent).toBe("B");
    });

    it("preserves spaces in letters mode", () => {
      const { container } = render(
        <LetterAnimation text="A B" type="letters" />,
      );
      const all = container.firstElementChild!.children;
      expect(all.length).toBe(3);
      expect(all[0].textContent).toBe("A");
      expect(all[1].textContent).toBe(" ");
      expect(all[2].textContent).toBe("B");
    });
  });

  describe("words prop", () => {
    it("renders words from the words array", () => {
      const { container } = render(
        <LetterAnimation
          text="Hello World"
          type="words"
          words={[{ text: "Hello" }, { text: "World" }]}
        />,
      );
      const spans = container.querySelectorAll("[data-letter]");
      expect(spans.length).toBe(2);
      expect(spans[0].textContent).toBe("Hello");
      expect(spans[1].textContent).toBe("World");
    });

    it("calls animate once per word in words array", () => {
      render(
        <LetterAnimation
          text="A B C"
          type="words"
          words={[{ text: "A" }, { text: "B" }, { text: "C" }]}
        />,
      );
      expect(animateMock).toHaveBeenCalledTimes(3);
    });

    it("uses per-word keyframes when provided in words array", () => {
      const customKf: Keyframe[] = [
        { opacity: "0", transform: "rotate(90deg)" },
        { opacity: "1", transform: "rotate(0deg)" },
      ];
      render(
        <LetterAnimation
          text="Hi"
          type="words"
          words={[{ text: "Hi", keyframes: customKf }]}
        />,
      );
      expect(animateMock).toHaveBeenCalledWith(
        customKf,
        expect.any(Object),
      );
    });

    it("each word can have different keyframes", () => {
      const kf1: Keyframe[] = [{ opacity: "0" }, { opacity: "1" }];
      const kf2: Keyframe[] = [{ transform: "scale(0)" }, { transform: "scale(1)" }];

      render(
        <LetterAnimation
          text="A B"
          type="words"
          words={[{ text: "A", keyframes: kf1 }, { text: "B", keyframes: kf2 }]}
        />,
      );
      expect(animateMock).toHaveBeenCalledTimes(2);
      expect(animateMock.mock.calls[0][0]).toEqual(kf1);
      expect(animateMock.mock.calls[1][0]).toEqual(kf2);
    });
  });

  describe("built-in presets", () => {
    const presets: AnimationPreset[] = [
      "fadeUp", "fadeDown", "fadeIn", "slideLeft", "slideRight",
      "scaleUp", "scaleDown", "rotateIn", "flipIn", "bounceIn",
      "typewriter", "blurIn", "swingIn", "wave", "glitch",
      "pop", "dropIn", "foldIn", "elastic", "spiral",
    ];

    presets.forEach((name) => {
      it(`preset "${name}" produces valid keyframes`, () => {
        const kf = getPresetKeyframes(name);
        expect(Array.isArray(kf)).toBe(true);
        expect(kf.length).toBeGreaterThanOrEqual(2);
        kf.forEach((frame) => {
          expect(typeof frame).toBe("object");
        });
      });
    });

    it("uses preset keyframes when animation prop is set", () => {
      const expected = getPresetKeyframes("bounceIn");
      render(<LetterAnimation text="X" animation="bounceIn" />);
      expect(animateMock).toHaveBeenCalledWith(
        expected,
        expect.any(Object),
      );
    });

    it("preset overrides default keyframes", () => {
      const custom = [{ opacity: "0" }, { opacity: "1" }];
      render(<LetterAnimation text="X" animation="pop" keyframes={custom} />);
      expect(animateMock).toHaveBeenCalledWith(
        getPresetKeyframes("pop"),
        expect.any(Object),
      );
    });
  });

  describe("per-letter keyframes", () => {
    it("uses letterKeyframes for each letter", () => {
      const kf1: Keyframe[] = [{ opacity: "0" }, { opacity: "1" }];
      const kf2: Keyframe[] = [{ transform: "scale(0)" }, { transform: "scale(1)" }];

      render(
        <LetterAnimation text="AB" letterKeyframes={[kf1, kf2]} />,
      );
      expect(animateMock).toHaveBeenCalledTimes(2);
      expect(animateMock.mock.calls[0][0]).toEqual(kf1);
      expect(animateMock.mock.calls[1][0]).toEqual(kf2);
    });

    it("falls back to default for letters beyond letterKeyframes length", () => {
      const kf1: Keyframe[] = [{ opacity: "0" }, { opacity: "1" }];
      render(
        <LetterAnimation text="ABC" letterKeyframes={[kf1]} animation="fadeIn" />,
      );
      expect(animateMock).toHaveBeenCalledTimes(3);
      expect(animateMock.mock.calls[0][0]).toEqual(kf1);
      expect(animateMock.mock.calls[1][0]).toEqual(getPresetKeyframes("fadeIn"));
      expect(animateMock.mock.calls[2][0]).toEqual(getPresetKeyframes("fadeIn"));
    });
  });

  describe("animation options", () => {
    it("applies duration, iterations, direction, fill, easing", () => {
      render(
        <LetterAnimation
          text="X"
          duration={500}
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
          delay: 0,
          iterations: 3,
          direction: "alternate",
          fill: "both",
          easing: "linear",
        },
      );
    });

    it("applies stagger delay to each token", () => {
      render(<LetterAnimation text="AB" stagger={100} />);
      expect(animateMock.mock.calls[0][1].delay).toBe(0);
      expect(animateMock.mock.calls[1][1].delay).toBe(100);
    });

    it("combines base delay with stagger", () => {
      render(<LetterAnimation text="AB" delay={200} stagger={50} />);
      expect(animateMock.mock.calls[0][1].delay).toBe(200);
      expect(animateMock.mock.calls[1][1].delay).toBe(250);
    });

    it("calls animate per letter", () => {
      render(<LetterAnimation text="AB" />);
      expect(animateMock).toHaveBeenCalledTimes(2);
    });

    it("calls animate per word", () => {
      render(<LetterAnimation text="A B" type="words" />);
      expect(animateMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("styling", () => {
    it("applies className", () => {
      const { container } = render(
        <LetterAnimation text="Hi" className="my-anim" />,
      );
      expect(container.querySelector(".my-anim")).toBeInTheDocument();
    });

    it("applies custom style", () => {
      const { container } = render(
        <LetterAnimation text="Hi" style={{ fontSize: "2rem" }} />,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveStyle({ fontSize: "2rem" });
    });
  });

  describe("instance API", () => {
    it("calls onFunc with _LetterAnimation instance", () => {
      const onFunc = vi.fn();
      render(<LetterAnimation text="Hi" onFunc={onFunc} />);
      expect(onFunc).toHaveBeenCalledOnce();
      expect(onFunc).toHaveBeenCalledWith(expect.any(_LetterAnimation));
    });

    it("exposes play method", () => {
      const playMock = vi.fn();
      animateMock.mockReturnValue({
        play: playMock, pause: vi.fn(), reverse: vi.fn(), cancel: vi.fn(),
      });
      let instance: _LetterAnimation;
      render(<LetterAnimation text="X" onFunc={(s) => (instance = s)} />);
      instance!.play();
      expect(playMock).toHaveBeenCalledOnce();
    });

    it("exposes pause method", () => {
      const pauseMock = vi.fn();
      animateMock.mockReturnValue({
        play: vi.fn(), pause: pauseMock, reverse: vi.fn(), cancel: vi.fn(),
      });
      let instance: _LetterAnimation;
      render(<LetterAnimation text="X" onFunc={(s) => (instance = s)} />);
      instance!.pause();
      expect(pauseMock).toHaveBeenCalledOnce();
    });

    it("exposes reverse method", () => {
      const reverseMock = vi.fn();
      animateMock.mockReturnValue({
        play: vi.fn(), pause: vi.fn(), reverse: reverseMock, cancel: vi.fn(),
      });
      let instance: _LetterAnimation;
      render(<LetterAnimation text="X" onFunc={(s) => (instance = s)} />);
      instance!.reverse();
      expect(reverseMock).toHaveBeenCalledOnce();
    });

    it("exposes cancel method", () => {
      const cancelMock = vi.fn();
      animateMock.mockReturnValue({
        play: vi.fn(), pause: vi.fn(), reverse: vi.fn(), cancel: cancelMock,
      });
      let instance: _LetterAnimation;
      render(<LetterAnimation text="X" onFunc={(s) => (instance = s)} />);
      instance!.cancel();
      expect(cancelMock).toHaveBeenCalled();
    });

    it("cleans up on unmount", () => {
      const cancelMock = vi.fn();
      animateMock.mockReturnValue({
        play: vi.fn(), pause: vi.fn(), reverse: vi.fn(), cancel: cancelMock,
      });
      const { unmount } = render(<LetterAnimation text="Hi" />);
      unmount();
      expect(cancelMock).toHaveBeenCalled();
    });
  });
});

import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Transition from "./Transition";
import { _Transition } from "./TransitionClass";

describe("Transition", () => {
  it("renders from component by default", () => {
    render(
      <Transition
        from={() => <div>From Content</div>}
        to={() => <div>To Content</div>}
      />,
    );
    expect(screen.getByText("From Content")).toBeInTheDocument();
    expect(screen.queryByText("To Content")).toBeInTheDocument();
  });

  it("from layer is visible and to layer is hidden initially", () => {
    const { container } = render(
      <Transition
        from={() => <div>From</div>}
        to={() => <div>To</div>}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;
    expect(fromLayer.style.visibility).toBe("visible");
    expect(toLayer.style.visibility).toBe("hidden");
  });

  it("applies className", () => {
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        className="my-transition"
      />,
    );
    expect(container.querySelector(".my-transition")).toBeInTheDocument();
  });

  it("applies custom style", () => {
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        style={{ width: "200px", height: "100px" }}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: "200px", height: "100px" });
  });

  it("calls onFunc with _Transition instance", () => {
    const onFunc = vi.fn();
    render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        onFunc={onFunc}
      />,
    );
    expect(onFunc).toHaveBeenCalledOnce();
    expect(onFunc).toHaveBeenCalledWith(expect.any(_Transition));
  });

  it("transitions to active state via active prop", () => {
    vi.useFakeTimers();
    const onTransitionEnd = vi.fn();
    const { container } = render(
      <Transition
        from={() => <div>From</div>}
        to={() => <div>To</div>}
        active={true}
        duration={100}
        onTransitionEnd={onTransitionEnd}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    expect(fromLayer.style.visibility).toBe("visible");
    expect(toLayer.style.visibility).toBe("hidden");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(fromLayer.style.visibility).toBe("hidden");
    expect(toLayer.style.visibility).toBe("visible");
    expect(onTransitionEnd).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("transitions automatically when isAutomatic is true", () => {
    vi.useFakeTimers();
    const onTransitionEnd = vi.fn();
    const { container } = render(
      <Transition
        from={() => <div>From</div>}
        to={() => <div>To</div>}
        isAutomatic={true}
        duration={100}
        onTransitionEnd={onTransitionEnd}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    expect(toLayer.style.visibility).toBe("hidden");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(toLayer.style.visibility).toBe("visible");
    expect(onTransitionEnd).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("transitions on gesture click via fireEvent", () => {
    const { container } = render(
      <Transition
        from={() => <div>From</div>}
        to={() => <div>To</div>}
        gesture="click"
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    expect(toLayer.style.visibility).toBe("hidden");

    act(() => {
      fireEvent.click(wrapper);
    });

    expect(toLayer.style.visibility).toBe("visible");
  });

  it("transitions on gesture hover via fireEvent", () => {
    const { container } = render(
      <Transition
        from={() => <div>From</div>}
        to={() => <div>To</div>}
        gesture="hover"
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    expect(toLayer.style.visibility).toBe("hidden");

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });

    expect(toLayer.style.visibility).toBe("visible");
  });

  it("applies fade effect exit on from layer when active", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        effect="fade"
        duration={100}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    expect(fromLayer.style.opacity).toBe("1");
    expect(toLayer.style.opacity).toBe("0");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(fromLayer.style.opacity).toBe("0");
    expect(toLayer.style.opacity).toBe("1");
    vi.useRealTimers();
  });

  it("applies slide-left effect", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        effect="slide-left"
        duration={100}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(toLayer.style.transform).toContain("0,0,0");
    vi.useRealTimers();
  });

  it("applies liquid effect", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        effect="liquid"
        duration={100}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(toLayer.style.filter).toContain("blur(0px)");
    expect(toLayer.style.transform).toContain("scale(1)");
    vi.useRealTimers();
  });

  it("applies custom duration in transition", () => {
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        duration={500}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;
    expect(fromLayer.style.transition).toContain("500ms");
  });

  it("applies custom easing in transition", () => {
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        easing="linear"
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;
    expect(fromLayer.style.transition).toContain("linear");
  });

  it("sets pointerEvents none on from layer when switched", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        duration={100}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const fromLayer = wrapper.children[0] as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(fromLayer.style.pointerEvents).toBe("none");
    vi.useRealTimers();
  });

  it("sets pointerEvents auto on to layer when switched", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        duration={100}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(toLayer.style.pointerEvents).toBe("auto");
    vi.useRealTimers();
  });

  it("cleans up timer on unmount", () => {
    vi.useFakeTimers();
    const onTransitionEnd = vi.fn();
    const { unmount } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        duration={500}
        onTransitionEnd={onTransitionEnd}
      />,
    );
    unmount();
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onTransitionEnd).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("delay defers the transition", () => {
    vi.useFakeTimers();
    const onTransitionEnd = vi.fn();
    const { container } = render(
      <Transition
        from={() => <div />}
        to={() => <div />}
        active={true}
        duration={100}
        delay={200}
        onTransitionEnd={onTransitionEnd}
      />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const toLayer = wrapper.children[1] as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(toLayer.style.visibility).toBe("hidden");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(toLayer.style.visibility).toBe("visible");
    expect(onTransitionEnd).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});

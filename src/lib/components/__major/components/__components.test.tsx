import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { useComponent } from "../../../../hooks/useComponent";
import { Components } from "./__components";

class CounterController extends Components<{ count: number }> {
  constructor() {
    super({ count: 0 });
  }

  increment = () => this.set(({ count }) => ({ count: count + 1 }));
}

function Counter({ onFunc }: { onFunc?: (self: CounterController) => void }) {
  const [self, state] = useComponent(() => new CounterController(), onFunc);
  return <button onClick={self.increment}>{state.count}</button>;
}

describe("Components", () => {
  it("gets, sets, resets, and subscribes per instance", () => {
    const first = new CounterController();
    const second = new CounterController();
    const listener = vi.fn();
    const unsubscribe = first.subscribe(listener);

    first.increment();
    expect(first.get()).toEqual({ count: 1 });
    expect(second.get()).toEqual({ count: 0 });
    expect(listener).toHaveBeenCalledOnce();

    first.reset();
    unsubscribe();
    first.increment();
    expect(first.get()).toEqual({ count: 1 });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});

describe("useComponent", () => {
  it("reacts to controller state and exposes it after commit", () => {
    const onFunc = vi.fn((self: CounterController) => {
      expect(document.querySelector("button")).not.toBeNull();
      expect(self).toBeInstanceOf(CounterController);
    });

    render(<Counter onFunc={onFunc} />);
    expect(onFunc).toHaveBeenCalledOnce();

    act(() => onFunc.mock.calls[0][0].increment());
    expect(screen.getByRole("button").textContent).toBe("1");
  });

  it("renders on the server without running lifecycle callbacks", () => {
    const onFunc = vi.fn();

    expect(renderToString(<Counter onFunc={onFunc} />)).toContain(">0</button>");
    expect(onFunc).not.toHaveBeenCalled();
  });
});

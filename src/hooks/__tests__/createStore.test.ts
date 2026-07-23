import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { createStore, useStore, useSetState } from "../createStore";

describe("createStore", () => {
  it("creates a store with initial state", () => {
    const store = createStore({ count: 0, name: "test" });

    expect(store.getState()).toEqual({ count: 0, name: "test" });
  });

  it("updates state with partial object", () => {
    const store = createStore({ count: 0, name: "test" });

    store.setState({ count: 5 });

    expect(store.getState()).toEqual({ count: 5, name: "test" });
  });

  it("updates state with function", () => {
    const store = createStore({ count: 0, name: "test" });

    store.setState((prev) => ({ count: (prev.count ?? 0) + 1 }));

    expect(store.getState()).toEqual({ count: 1, name: "test" });
  });

  it("subscribes to state changes", () => {
    const store = createStore({ count: 0 });
    const listener = vi.fn();

    store.subscribe(listener);
    store.setState({ count: 1 });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("unsubscribes from state changes", () => {
    const store = createStore({ count: 0 });
    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.setState({ count: 1 });

    expect(listener).not.toHaveBeenCalled();
  });
});

describe("useStore", () => {
  it("returns current state from store", () => {
    const store = createStore({ count: 0 });

    const { result } = renderHook(() => useStore(store));

    expect(result.current).toEqual({ count: 0 });
  });

  it("updates when store state changes", () => {
    const store = createStore({ count: 0 });

    const { result } = renderHook(() => useStore(store));

    act(() => {
      store.setState({ count: 5 });
    });

    expect(result.current).toEqual({ count: 5 });
  });
});

describe("useSetState", () => {
  it("returns a stable setState function", () => {
    const store = createStore({ count: 0 });

    const { result, rerender } = renderHook(() => useSetState(store));

    const setState1 = result.current;
    rerender();
    const setState2 = result.current;

    expect(setState1).toBe(setState2);
  });

  it("updates store state when called", () => {
    const store = createStore({ count: 0 });

    const { result } = renderHook(() => useSetState(store));

    act(() => {
      result.current({ count: 10 });
    });

    expect(store.getState()).toEqual({ count: 10 });
  });
});

import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useState, useStateLazy } from "../useState";

describe("useState", () => {
  it("returns initial value", () => {
    const { result } = renderHook(() => useState(0));

    expect(result.current.value).toBe(0);
  });

  it("updates value with set", () => {
    const { result } = renderHook(() => useState(0));

    act(() => {
      result.current.set(5);
    });

    expect(result.current.value).toBe(5);
  });

  it("updates value with function", () => {
    const { result } = renderHook(() => useState(0));

    act(() => {
      result.current.set((prev) => prev + 1);
    });

    expect(result.current.value).toBe(1);
  });

  it("resets to initial value", () => {
    const { result } = renderHook(() => useState(0));

    act(() => {
      result.current.set(5);
    });

    expect(result.current.value).toBe(5);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(0);
  });

  it("get returns current value", () => {
    const { result } = renderHook(() => useState(0));

    expect(result.current.get()).toBe(0);

    act(() => {
      result.current.set(10);
    });

    expect(result.current.get()).toBe(10);
  });
});

describe("useStateLazy", () => {
  it("calls initializer only once", () => {
    const initializer = vi.fn(() => 42);

    const { result } = renderHook(() => useStateLazy(initializer));

    expect(initializer).toHaveBeenCalledTimes(1);
    expect(result.current.value).toBe(42);
  });

  it("resets to re-initialized value", () => {
    const initializer = vi.fn(() => ({ data: "initial" }));

    const { result } = renderHook(() => useStateLazy(initializer));

    act(() => {
      result.current.set({ data: "changed" });
    });

    expect(result.current.value).toEqual({ data: "changed" });

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toEqual({ data: "initial" });
  });
});

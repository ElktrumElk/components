import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRef, usePreviousValue } from "../useRef";

describe("useRef", () => {
  it("returns initial value", () => {
    const { result } = renderHook(() => useRef(0));

    expect(result.current.current).toBe(0);
  });

  it("setValue updates current", () => {
    const { result } = renderHook(() => useRef(0));

    act(() => {
      result.current.setValue(5);
    });

    expect(result.current.current).toBe(5);
  });

  it("getValue returns current value", () => {
    const { result } = renderHook(() => useRef(42));

    expect(result.current.getValue()).toBe(42);
  });

  it("isSet returns true when value is not null/undefined", () => {
    const { result } = renderHook(() => useRef(42));

    expect(result.current.isSet()).toBe(true);
  });

  it("isSet returns false when value is null", () => {
    const { result } = renderHook(() => useRef<null>(null));

    expect(result.current.isSet()).toBe(false);
  });

  it("isSet returns false when value is undefined", () => {
    const { result } = renderHook(() => useRef(undefined));

    expect(result.current.isSet()).toBe(false);
  });
});

describe("usePreviousValue", () => {
  it("returns initial value", () => {
    const { result } = renderHook(() => usePreviousValue(0));

    expect(result.current.current).toBe(0);
  });

  it("stores value after update", () => {
    const { result } = renderHook(
      ({ value }) => {
        const ref = usePreviousValue(value);
        return ref;
      },
      { initialProps: { value: 0 } }
    );

    expect(result.current.current).toBe(0);

    act(() => {
      result.current.setValue(1);
    });

    expect(result.current.current).toBe(1);
  });
});

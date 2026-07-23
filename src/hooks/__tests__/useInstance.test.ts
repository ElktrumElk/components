import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInstance, useComponentData, componentRegistry } from "../useInstance";

describe("useInstance", () => {
  it("generates a unique id", () => {
    const { result } = renderHook(() => useInstance());

    expect(result.current.id).toBeDefined();
    expect(typeof result.current.id).toBe("string");
  });

  it("uses provided key as id", () => {
    const { result } = renderHook(() => useInstance("myComponent"));

    expect(result.current.id).toBe("myComponent");
  });

  it("registers and retrieves data", () => {
    const { result } = renderHook(() => useInstance("testComponent"));

    act(() => {
      result.current.setData("count", 42);
    });

    expect(result.current.getData<number>("count")).toBe(42);
  });

  it("registers element", () => {
    const { result } = renderHook(() => useInstance("testComponent"));

    const mockElement = document.createElement("div");

    act(() => {
      result.current.registerElement(mockElement);
    });

    expect(result.current.getElement()).toBe(mockElement);
  });

  it("isMounted returns true when mounted", () => {
    const { result } = renderHook(() => useInstance("testComponent"));

    expect(result.current.isMounted()).toBe(true);
  });

  it("cleans up on unmount", () => {
    const { unmount } = renderHook(() => useInstance("testComponent"));

    expect(componentRegistry.has("testComponent")).toBe(true);

    unmount();

    expect(componentRegistry.has("testComponent")).toBe(false);
  });
});

describe("useComponentData", () => {
  it("returns undefined for non-existent component", () => {
    const { result } = renderHook(() =>
      useComponentData("nonExistent", "data")
    );

    expect(result.current).toBeUndefined();
  });

  it("returns data from registered component", () => {
    const { result: instanceResult } = renderHook(() =>
      useInstance("sourceComponent")
    );

    act(() => {
      instanceResult.current.setData("value", "hello");
    });

    const { result } = renderHook(() =>
      useComponentData("sourceComponent", "value")
    );

    expect(result.current).toBe("hello");
  });
});

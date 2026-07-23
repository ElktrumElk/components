import { useCallback as useReactCallback, useMemo as useReactMemo, useRef as useReactRef } from "react";

/**
 * Enhanced useCallback that provides a stable reference.
 */
export function useCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  deps?: unknown[]
): T {
  return useReactCallback(callback, deps ?? []);
}

/**
 * Memoizes a value based on dependencies.
 */
export function useMemo<T>(factory: () => T, deps?: unknown[]): T {
  return useReactMemo(factory, deps ?? []);
}

/**
 * Memoizes a value that should never change (memoized once).
 */
export function useMemoOnce<T>(factory: () => T): T {
  return useReactMemo(factory, []);
}

/**
 * Creates a stable callback reference that doesn't change between renders.
 */
export function useStableCallback<T extends (...args: never[]) => unknown>(
  callback: T
): T {
  const callbackRef = useReactRef(callback);
  callbackRef.current = callback;

  return useReactCallback((...args: never[]) => {
    return callbackRef.current(...args);
  }, []) as T;
}

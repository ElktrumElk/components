import { useRef as useReactRef, useCallback } from "react";

interface MutableRefObject<T> {
  current: T;
}

interface UseRefReturn<T> {
  current: T;
  setValue: (value: T) => void;
  getValue: () => T;
  isSet: () => boolean;
}

/**
 * Enhanced useRef hook with setter and getter methods.
 * Note: `current` is read-only in the returned interface.
 * Use `setValue` to update the ref value.
 */
export function useRef<T>(initialValue: T): UseRefReturn<T> {
  const ref = useReactRef<T>(initialValue);

  const setValue = useCallback((value: T) => {
    ref.current = value;
  }, [ref]);

  const getValue = useCallback(() => ref.current, [ref]);

  const isSet = useCallback(() => {
    return ref.current !== null && ref.current !== undefined;
  }, [ref]);

  // Create a stable object with a getter for `current`
  const refObject = {
    get current() {
      return ref.current;
    },
    setValue,
    getValue,
    isSet,
  };

  return refObject;
}

/**
 * Hook for creating a ref that persists across renders but doesn't trigger re-renders.
 * Useful for storing previous values.
 */
export function usePreviousValue<T>(initialValue: T): UseRefReturn<T | undefined> {
  return useRef<T | undefined>(initialValue);
}

export type { MutableRefObject, UseRefReturn };

import { useState as useReactState, useCallback, useRef } from "react";

type SetStateAction<T> = T | ((prevState: T) => T);
type SetStateFunction<T> = (value: SetStateAction<T>) => void;

interface UseStateReturn<T> {
  value: T;
  set: SetStateFunction<T>;
  reset: () => void;
  get: () => T;
}

/**
 * Enhanced useState hook with reset and get functionality.
 *
 * @example
 * ```tsx
 * const { value: count, set: setCount, reset } = useState(0);
 *
 * // Set value
 * setCount(5);
 *
 * // Set with previous value
 * setCount(prev => prev + 1);
 *
 * // Reset to initial value
 * reset();
 *
 * // Get current value without triggering re-render
 * const current = get();
 * ```
 */
export function useState<T>(initialValue: T): UseStateReturn<T> {
  const [value, setValue] = useReactState<T>(initialValue);
  const initialValueRef = useRef(initialValue);

  const reset = useCallback(() => {
    setValue(initialValueRef.current);
  }, [setValue]);

  const get = useCallback(() => value, [value]);

  return {
    value,
    set: setValue,
    reset,
    get,
  };
}

/**
 * Lazy initialization version of useState.
 * The initializer function is only called once on first render.
 *
 * @example
 * ```tsx
 * const { value: data, set: setData } = useStateLazy(() => {
 *   return expensiveComputation();
 * });
 * ```
 */
export function useStateLazy<T>(initializer: () => T): UseStateReturn<T> {
  const [value, setValue] = useReactState<T>(initializer);

  const reset = useCallback(() => {
    setValue(initializer);
  }, [setValue, initializer]);

  const get = useCallback(() => value, [value]);

  return {
    value,
    set: setValue,
    reset,
    get,
  };
}

export type { UseStateReturn, SetStateFunction, SetStateAction };

import { useEffect as useReactEffect, useRef } from "react";

type CleanupFn = () => void;

/**
 * Enhanced useEffect that provides cleanup tracking and skip functionality.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const timer = setInterval(() => console.log('tick'), 1000);
 *
 *   // Return cleanup function
 *   return () => clearInterval(timer);
 * }, []);
 * ```
 */
export function useEffect(
  effect: () => void | CleanupFn,
  deps?: unknown[]
): void {
  useReactEffect(effect, deps);
}

/**
 * useEffect that only runs once on mount.
 *
 * @example
 * ```tsx
 * useMountEffect(() => {
 *   console.log('Component mounted');
 *   return () => console.log('Component unmounted');
 * });
 * ```
 */
export function useMountEffect(effect: () => void | CleanupFn): void {
  useReactEffect(effect, []);
}

/**
 * useEffect that runs on every render (no dependencies).
 *
 * @example
 * ```tsx
 * useUpdateEffect(() => {
 *   console.log('Rendered');
 * });
 * ```
 */
export function useUpdateEffect(effect: () => void | CleanupFn): void {
  useReactEffect(effect);
}

/**
 * useEffect that tracks previous dependencies.
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 *
 * usePreviousEffect([count], (prevDeps) => {
 *   const [prevCount] = prevDeps || [0];
 *   console.log(`Count changed from ${prevCount} to ${count}`);
 * }, [count]);
 * ```
 */
export function usePreviousEffect<T extends unknown[]>(
  deps: T,
  effect: (prevDeps: T | undefined) => void | CleanupFn,
  currentDeps?: unknown[]
): void {
  const prevDepsRef = useRef<T | undefined>(undefined);

  useReactEffect(() => {
    const cleanup = effect(prevDepsRef.current);
    prevDepsRef.current = deps;

    return cleanup;
  }, currentDeps);
}

/**
 * useEffect with debounce.
 *
 * @example
 * ```tsx
 * useDebounceEffect(() => {
 *   fetch('/api/search', { q: searchTerm });
 * }, 300, [searchTerm]);
 * ```
 */
export function useDebounceEffect(
  effect: () => void | CleanupFn,
  delay: number,
  deps?: unknown[]
): void {
  useReactEffect(() => {
    const timer = setTimeout(effect, delay);
    return () => clearTimeout(timer);
  }, deps);
}

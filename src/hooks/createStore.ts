import { useSyncExternalStore, useCallback } from "react";

type Listener = () => void;
type StateUpdater<T> = T | ((prev: T) => T);

interface Store<T extends Record<string, unknown>> {
  getState: () => T;
  setState: (partial: StateUpdater<Partial<T>>) => void;
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => T;
}

/**
 * Creates a typed store with state management.
 *
 * @example
 * ```tsx
 * const counterStore = createStore({
 *   count: 0,
 *   increment: () => {},
 * });
 *
 * function Counter() {
 *   const { count } = useStore(counterStore);
 *   return <button onClick={() => counterStore.setState(s => ({ count: s.count + 1 }))}>
 *     Count: {count}
 *   </button>;
 * }
 * ```
 */
export function createStore<T extends Record<string, unknown>>(
  initialState: T
): Store<T> {
  let state = { ...initialState };
  const listeners = new Set<Listener>();

  const getState = (): T => state;

  const setState = (partial: StateUpdater<Partial<T>>) => {
    const nextState =
      typeof partial === "function"
        ? (partial as (prev: T) => Partial<T>)(state)
        : partial;

    const prevState = state;
    state = { ...state, ...nextState };

    if (state !== prevState) {
      listeners.forEach((listener) => listener());
    }
  };

  const subscribe = (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getSnapshot = (): T => state;

  return {
    getState,
    setState,
    subscribe,
    getSnapshot,
  };
}

/**
 * Hook to subscribe to a store and access its state.
 *
 * @example
 * ```tsx
 * const { count, name } = useStore(myStore);
 * ```
 */
export function useStore<T extends Record<string, unknown>>(
  store: Store<T>
): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
}

/**
 * Hook to get a stable setState function for a store.
 *
 * @example
 * ```tsx
 * const setCount = useSetState(counterStore);
 * setCount({ count: 5 });
 * ```
 */
export function useSetState<T extends Record<string, unknown>>(
  store: Store<T>
): (partial: StateUpdater<Partial<T>>) => void {
  return useCallback(
    (partial: StateUpdater<Partial<T>>) => {
      store.setState(partial);
    },
    [store]
  );
}

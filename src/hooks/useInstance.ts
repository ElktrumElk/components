import { useRef, useCallback, useEffect, useState } from "react";

type ComponentId = string;

interface ComponentInstance {
  id: ComponentId;
  element: HTMLElement | null;
  mounted: boolean;
  data: Record<string, unknown>;
}

interface UseInstanceReturn {
  /**
   * Get the component instance ID.
   */
  id: ComponentId;
  /**
   * Register an element with this component.
   */
  registerElement: (el: HTMLElement | null) => void;
  /**
   * Get the registered element.
   */
  getElement: () => HTMLElement | null;
  /**
   * Store custom data on this component.
   */
  setData: <T>(key: string, value: T) => void;
  /**
   * Retrieve custom data from this component.
   */
  getData: <T>(key: string) => T | undefined;
  /**
   * Check if the component is mounted.
   */
  isMounted: () => boolean;
}

const componentRegistry = new Map<ComponentId, ComponentInstance>();

const listeners = new Map<string, Set<() => void>>();

function subscribe(componentKey: string, listener: () => void): () => void {
  if (!listeners.has(componentKey)) {
    listeners.set(componentKey, new Set());
  }
  listeners.get(componentKey)!.add(listener);
  return () => {
    listeners.get(componentKey)?.delete(listener);
  };
}

function notify(componentKey: string) {
  listeners.get(componentKey)?.forEach(l => l());
}

let nextId = 0;

/**
 * Generates a unique component ID.
 */
function generateId(): ComponentId {
  return `component-${++nextId}-${Date.now()}`;
}

/**
 * Hook to access component instances without prop drilling.
 *
 * @example
 * ```tsx
 * // In ComponentA
 * const { id, setData } = useInstance('myComponent');
 * setData('count', 42);
 *
 * // In ComponentB (anywhere in the tree)
 * const { getData } = useInstance('myComponent');
 * const count = getData<number>('count'); // 42
 * ```
 */
export function useInstance(componentKey?: string): UseInstanceReturn {
  const idRef = useRef<ComponentId>(componentKey || generateId());
  const elementRef = useRef<HTMLElement | null>(null);
  const dataRef = useRef<Record<string, unknown>>({});
  const mountedRef = useRef(false);

  useEffect(() => {
    const id = idRef.current;
    mountedRef.current = true;

    // Register in global registry
    componentRegistry.set(id, {
      id,
      element: elementRef.current,
      mounted: true,
      data: dataRef.current,
    });
    notify(id);

    return () => {
      mountedRef.current = false;
      const instance = componentRegistry.get(id);
      if (instance) {
        instance.mounted = false;
      }
      componentRegistry.delete(id);
      notify(id);
    };
  }, []);

  const registerElement = useCallback((el: HTMLElement | null) => {
    elementRef.current = el;

    // Update registry
    const instance = componentRegistry.get(idRef.current);
    if (instance) {
      instance.element = el;
    }
  }, []);

  const getElement = useCallback(() => elementRef.current, []);

  const setData = useCallback(<T,>(key: string, value: T) => {
    dataRef.current[key] = value;

    // Update registry
    const instance = componentRegistry.get(idRef.current);
    if (instance) {
      instance.data[key] = value;
      notify(idRef.current);
    }
  }, []);

  const getData = useCallback(<T,>(key: string): T | undefined => {
    return dataRef.current[key] as T;
  }, []);

  const isMounted = useCallback(() => mountedRef.current, []);

  return {
    id: idRef.current,
    registerElement,
    getElement,
    setData,
    getData,
    isMounted,
  };
}

/**
 * Hook to access another component's data without prop drilling.
 * Requires the target component to use useInstance with a known key.
 *
 * @example
 * ```tsx
 * // In AnyComponent
 * const count = useComponentData<number>('myCounter', 'count');
 * ```
 */
export function useComponentData<T>(
  componentKey: string,
  dataKey: string
): T | undefined {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return subscribe(componentKey, () => forceUpdate(n => n + 1));
  }, [componentKey]);

  const instance = componentRegistry.get(componentKey);

  if (!instance || !instance.mounted) {
    return undefined;
  }

  return instance.data[dataKey] as T;
}

export { componentRegistry };
export type { ComponentId, ComponentInstance, UseInstanceReturn };

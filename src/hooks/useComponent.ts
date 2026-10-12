import { useEffect, useRef, useSyncExternalStore } from "react";
import { Components } from "../lib/components/__major/components/__components";

type SubscribableController = Pick<Components, "get" | "subscribe">;

/** Extracts the reactive state type from a component controller. */
export type ComponentState<Controller extends SubscribableController> =
  ReturnType<Controller["get"]>;

/**
 * Creates one controller per mounted wrapper and subscribes to its state.
 *
 * The factory may run during server rendering, so it must not perform browser
 * side effects. `onFunc` runs after commit and never during server rendering.
 *
 * @param createController - Factory for the wrapper's controller instance.
 * @param onFunc - Optional post-commit callback exposing that instance.
 * @returns The stable controller and its current reactive state.
 *
 * @example
 * ```tsx
 * function Counter({ onFunc }: { onFunc?: (self: CounterController) => void }) {
 *   const [self, state] = useComponent(() => new CounterController(), onFunc);
 *   return <button onClick={self.increment}>{state.count}</button>;
 * }
 * ```
 */
export function useComponent<Controller extends SubscribableController>(
  createController: () => Controller,
  onFunc?: (controller: Controller) => void,
): readonly [controller: Controller, state: ComponentState<Controller>] {
  const controllerRef = useRef<Controller | null>(null);

  if (controllerRef.current === null) {
    controllerRef.current = createController();
  }

  const controller = controllerRef.current;
  const state = useSyncExternalStore(
    controller.subscribe,
    controller.get,
    controller.get,
  ) as ComponentState<Controller>;

  useEffect(() => {
    onFunc?.(controller);
  }, [controller, onFunc]);

  return [controller, state];
}

export { Components };
export type { ComponentListener, ComponentStateUpdate } from "../lib/components/__major/components/__components";

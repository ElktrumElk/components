/** A callback invoked when a component controller's state changes. */
export type ComponentListener = () => void;

/** A state value or a function deriving one from the current state. */
export type ComponentStateUpdate<State> = State | ((current: State) => State);

/**
 * Minimal reactive base for class-based component controllers.
 *
 * Each controller owns its state and subscriptions; no registry or React hook is
 * used by the class. Extend it to expose domain-specific mutation methods.
 *
 * @example
 * ```ts
 * class CounterController extends Components<{ count: number }> {
 *   constructor() {
 *     super({ count: 0 });
 *   }
 *
 *   increment = () => this.set(({ count }) => ({ count: count + 1 }));
 * }
 * ```
 */
export class Components<State = unknown> {
  private readonly initialState: State;
  private state: State;
  private readonly listeners = new Set<ComponentListener>();

  /** Creates a controller with its initial and reset state. */
  constructor(initialState?: State) {
    this.initialState = initialState as State;
    this.state = initialState as State;
  }

  /** Returns the current state snapshot. */
  readonly get = (): State => this.state;

  /** Replaces the state and synchronously notifies subscribers when it changes. */
  readonly set = (update: ComponentStateUpdate<State>): State => {
    const nextState =
      typeof update === "function"
        ? (update as (current: State) => State)(this.state)
        : update;

    if (!Object.is(this.state, nextState)) {
      this.state = nextState;
      this.listeners.forEach((listener) => listener());
    }

    return this.state;
  };

  /** Restores the state supplied to the constructor. */
  readonly reset = (): State => this.set(this.initialState);

  /** Subscribes to state changes and returns an unsubscribe function. */
  readonly subscribe = (listener: ComponentListener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

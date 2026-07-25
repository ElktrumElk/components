/**
 * Props for the Padding component.
 *
 * Provides granular padding controls using both physical and logical CSS properties.
 * The container defaults to `1rem` padding, `100%` width, and `100%` height,
 * with any specified prop overriding the defaults.
 */
export interface PaddingProp {
  /** Physical padding applied to the left side (e.g. `"2rem"`). */
  left?: string;
  /** Physical padding applied to the right side (e.g. `"2rem"`). */
  right?: string;
  /** Physical padding applied to the top (e.g. `"2rem"`). */
  top?: string;
  /** Physical padding applied to the bottom (e.g. `"2rem"`). */
  bottom?: string;
  /** Logical inline (horizontal) padding (e.g. `"1.5rem"`). */
  inline?: string;
  /** Logical block (vertical) padding (e.g. `"1.5rem"`). */
  block?: string;
  /** Logical padding at the start of the block axis (e.g. `"1rem"`). */
  blockStart?: string;
  /** Logical padding at the end of the block axis (e.g. `"1rem"`). */
  blockEnd?: string;
  /** Shorthand CSS `padding` applied to all sides (overrides the default `1rem`). */
  padding?: string;
}
export interface _keypadding {
  key?: React.Key;
  child: React.JSX.ElementType
}

export class _Padding {
  build? = ({ ...a }: PaddingProp & _keypadding): React.JSX.Element => {
    return (
      <>
        <div key={a.key} style={{ padding: "1rem", width: '100%', height: '100%', ...a }}>
            {a.child && <a.child />}
        </div>
      </>
    );
  };
}

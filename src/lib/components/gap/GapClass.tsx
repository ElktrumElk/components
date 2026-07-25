/**
 * Props for the Gap component.
 * Renders an empty `<div>` used as spacing between sibling elements.
 * Accepts width, height, and flex properties.
 */
export interface GapProp {
  /** CSS width of the gap element. */
  width?: string;
  /** CSS height of the gap element. */
  height?: string;
  /** CSS flex value of the gap element. */
  flex?: string;
}


export class _Gap {
  build? = ({ ...a }: GapProp): React.JSX.Element => {
    return <div style={{ ...a }}></div>;
  };
}

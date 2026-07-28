import type React from "react";

/**
 * Props for the GridView component, a CSS Grid wrapper.
 *
 * @property key - React key for list rendering.
 * @property templateRows - CSS `grid-template-rows` value (e.g. `"1fr 2fr"`).
 * @property templateColumns - CSS `grid-template-columns` value. Defaults to `"1fr 1fr"`.
 * @property autoRows - CSS `grid-auto-rows` value for implicitly created rows.
 * @property autoColumn - CSS `grid-auto-columns` value for implicitly created columns.
 * @property area - CSS `grid-area` value for named grid placement.
 * @property autoFlow - CSS `grid-auto-flow` value (e.g. `"row"`, `"column"`, `"dense"`).
 * @property justifyItems - CSS `justify-items` value for child alignment. Defaults to `"center"`.
 * @property style - Additional inline styles applied to the grid container.
 * @property className - string.
 * @property child - A React component type rendered as the grid's children.
 * @property onFunc - Callback invoked with the internal `_GridView` instance after mount.
 */
export interface GridViewProp {
  key?: React.Key;
  templateRows?: string;
  templateColumns?: string;
  autoRows?: string;
  autoColumn?: string;
  area?: string;
  autoFlow?: string;
  justifyItems?: string
  style?: React.CSSProperties;
  className?: string;
  
  child: React.JSX.ElementType;
  onFunc?: (self: _GridView) => void
}

export class _GridView {
  build? = ({ ...a }: GridViewProp): React.JSX.Element => {
    return (
      <>
        <div
          key={a.key}
          className={a.className}
          style={{
            
            gridTemplateColumns: a.templateColumns || '1fr 1fr',
            gridTemplateRows: a.templateRows,
            gridAutoColumns: a.autoColumn,
            gridAutoRows: a.autoRows,
            gridArea: a.area,
            gridAutoFlow: a.autoFlow,
            width: "100%",
            height: "100%",
            justifyItems: a.justifyItems || 'center',
            ...a.style,
            display: 'grid'
          }}
        >
          {a.child && <a.child />}
        </div>
      </>
    );
  };
}

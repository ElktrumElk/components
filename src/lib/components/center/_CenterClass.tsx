import type React from "react";

/**
 * Props for the Center component.
 * Wraps a single child element in a flex container that centers it
 * both horizontally and vertically.
 */
export interface _CenterProp {
  /** Component type to render as the centered child. */
  child: React.JSX.ElementType;
  justifyContent?: boolean;
  alignItems?: boolean;
}

export class _Center {
  // fixed define style behaviour
  private _style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: "1",
  };

  justifyConetent = true
  alignItems = true

  child!: React.JSX.ElementType;

  build? = ({ ...a }: _CenterProp) => {
    this.child = a.child;
    this.justifyConetent = a.justifyContent || true 
    this.alignItems = a.alignItems || true 
    return (
      <>
        <div
          style={{
            justifyContent: this.justifyConetent && "center",
            alignItems: this.alignItems && 'center',
            ...this._style,
          }}
        >
          {a.child && <this.child />}
        </div>
      </>
    );
  };
}

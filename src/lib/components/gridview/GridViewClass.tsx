import type React from "react";

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
  
  child: React.JSX.ElementType;
  onFunc?: (self: _GridView) => void
}

export class _GridView {
  build? = ({ ...a }: GridViewProp): React.JSX.Element => {
    return (
      <>
        <div
          key={a.key}
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

import React from "react";
import { createStore } from "../../../../hooks/createStore";

export interface HoverProp {
  style: React.CSSProperties;
  child?: React.JSX.ElementType;
  key?: React.Key;
  transition?: string | null;
}

export const __hoverStore = createStore({ isHover: false });

export class _Hover {
  savedStyle: string[];

  build? = ({ ...a }: HoverProp): React.JSX.Element => {
    const __key = Object.keys(a.style);
    this.savedStyle = []
    return (
      <>
        <div
          key={a.key}
          style={{
            display: 'flex',
            pointerEvents: 'none',
            height: "fit-content",
            width: "fit-content",
            padding: "0",
            margin: "0",
            
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            this.savedStyle = [];
            Array.from(target.children).map((child) => { 

              const __child = child as HTMLElement
              this.savedStyle.push(__child?.getAttribute("style"))

              if (a.transition !== null) {
                __child.style.transition = a.transition ?? "";
              }
              __key.forEach((key) => {
                (__child.style as unknown as Record<string, string>)[key] = (a.style as unknown as Record<string, string>)[key];
              });
            })
          }}

          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            Array.from(target.children).map((child, idx) => {
              const __child = child as HTMLElement
              __child.setAttribute("style", this.savedStyle[idx] ?? "")
              __child.style.transition = a.transition ?? "";
            })


          }}
        >
          {a.child && <a.child />}
        </div>
      </>
    );
  };
}

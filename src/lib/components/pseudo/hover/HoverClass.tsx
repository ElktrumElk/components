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
  savedStyle: any;

  build? = ({ ...a }: HoverProp): React.JSX.Element => {
    const __key = Object.keys(a.style);

    return (
      <>
        <div
          key={a.key}
          style={{
            height: "fit-content",
            width: "fit-content",
            padding: "0",
            margin: "0",
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;

            this.savedStyle = target.children[0]?.getAttribute("style");
            const __child = target.children[0] as HTMLDivElement;
            if (a.transition !== null) {
              __child.style.transition = a.transition ?? "";
            }
            __key.forEach((key) => {
              (__child.style as unknown as Record<string, string>)[key] = (a.style as unknown as Record<string, string>)[key];
            });
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            const __child = target.children[0] as HTMLDivElement;

            __child.setAttribute("style", this.savedStyle ?? "");
            __child.style.transition = a.transition ?? "";
          }}
        >
          {a.child && <a.child />}
        </div>
      </>
    );
  };
}

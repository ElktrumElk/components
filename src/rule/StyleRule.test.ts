import { afterEach, describe, expect, it, vi } from "vitest";
import { Estyle } from "./StyleRUle";

afterEach(() => {
  vi.unstubAllGlobals();
  document.querySelectorAll("style[data-estyle]").forEach((style) => style.remove());
});

describe("Estyle", () => {
  it("returns only inline declarations from rule accessors", () => {
    const source = {
      button: {
        color: "white",
        paddingTop: 8,
        "&:hover": { color: "black" },
        "& .icon": { opacity: 0.5 },
      },
    };
    const style = new Estyle().defineRules(source);

    expect(style.rule.button({ marginTop: 4 })).toEqual({
      color: "white",
      paddingTop: 8,
      marginTop: 4,
    });
    expect(source.button["&:hover"].color).toBe("black");
  });

  it("generates pseudo, compound, attribute, and descendant selectors", () => {
    const style = new Estyle()
      .defineRules({
        button: {
          backgroundColor: "red",
          "&:hover": { backgroundColor: "blue" },
          "&:focus-visible": { outlineWidth: 2 },
          "&:disabled": { opacity: 0.4 },
          "&[data-active=\"true\"]": { fontWeight: 700 },
          "& .icon": { marginRight: 6 },
        },
      })
      .mount("controls");

    const className = style.classes.button;
    const css = document.querySelector("style[data-estyle]")?.textContent;
    expect(css).toContain(`.${className}{background-color:red;}`);
    expect(css).toContain(`.${className}:hover{background-color:blue;}`);
    expect(css).toContain(`.${className}:focus-visible{outline-width:2px;}`);
    expect(css).toContain(`.${className}:disabled{opacity:0.4;}`);
    expect(css).toContain(`.${className}[data-active="true"]{font-weight:700;}`);
    expect(css).toContain(`.${className} .icon{margin-right:6px;}`);
  });

  it("generates declarative media rules", () => {
    const style = new Estyle()
      .defineRules({ button: { color: "black" } })
      .defineMedia({
        "(max-width: 600px)": {
          button: { color: "red", "&:active": { opacity: 0.8 } },
        },
      })
      .mount("responsive");

    const className = style.className.button;
    const css = document.querySelector("style[data-estyle]")?.textContent;
    expect(css).toContain(
      `@media (max-width: 600px){.${className}{color:red;}.${className}:active{opacity:0.8;}}`,
    );
  });

  it("keeps generated classes stable", () => {
    const first = new Estyle().defineRules({ button: { color: "red" } }).mount("ui");
    const second = new Estyle().defineRules({ button: { color: "blue" } }).mount("ui");

    expect(first.classes.button).toBe(second.classes.button);
    expect(first.className.button).toBe(first.classes.button);
  });

  it("is SSR-safe and removes its stylesheet on destroy", () => {
    const browserStyle = new Estyle()
      .defineRules({ button: { color: "red" } })
      .mount("cleanup");
    const element = document.querySelector("style[data-estyle=\"cleanup\"]");
    expect(element).not.toBeNull();

    browserStyle.destroy();
    expect(element?.isConnected).toBe(false);

    vi.stubGlobal("document", undefined);
    expect(() =>
      new Estyle().defineRules({ button: { color: "red" } }).mount("server"),
    ).not.toThrow();
  });
});

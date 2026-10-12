import type React from "react";
import { createStore } from "../hooks/createStore";

export interface StyleDeclaration extends React.CSSProperties {
  [selector: `&${string}`]: StyleDeclaration | undefined;
  [customProperty: `--${string}`]: string | number | undefined;
}

type StyleRules = Record<string, StyleDeclaration>;
type ThemeTokens = Record<string, string>;
type RuleAccessor<Rules extends StyleRules> = {
  [Key in keyof Rules]: (
    overrides?: StyleDeclaration,
  ) => React.CSSProperties;
};
type ClassAccessor<Rules extends StyleRules> = Readonly<{
  [Key in keyof Rules]: string;
}>;
type MediaRules<Rules extends StyleRules> = Record<
  string,
  Partial<{ [Key in keyof Rules]: StyleDeclaration }>
>;

type ThemeKeys<Light extends ThemeTokens, Dark extends ThemeTokens> = {
  light: Light;
  dark?: Dark;
};

type ActiveMedia = {
  media: MediaQueryList;
  overrides: StyleRules;
};

const unitlessProperties = new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "columnCount",
  "flex",
  "flexGrow",
  "flexShrink",
  "fontWeight",
  "gridArea",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnStart",
  "gridRow",
  "gridRowEnd",
  "gridRowStart",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
]);

const cloneStyle = (style: StyleDeclaration): StyleDeclaration => {
  const clone: Record<string, unknown> = {};
  Object.entries(style).forEach(([property, value]) => {
    clone[property] =
      property.startsWith("&") && value && typeof value === "object"
        ? cloneStyle(value as StyleDeclaration)
        : value;
  });
  return clone as StyleDeclaration;
};

const cloneRules = (rules: StyleRules): StyleRules =>
  Object.fromEntries(
    Object.entries(rules).map(([name, style]) => [name, cloneStyle(style)]),
  );

const inlineStyle = (style?: StyleDeclaration): React.CSSProperties =>
  Object.fromEntries(
    Object.entries(style ?? {}).filter(
      ([property, value]) => !property.startsWith("&") && value != null,
    ),
  );

const mergeStyle = (
  base: StyleDeclaration | undefined,
  override: StyleDeclaration,
): StyleDeclaration => {
  const merged = cloneStyle(base ?? {});
  Object.entries(override).forEach(([property, value]) => {
    if (property.startsWith("&") && value && typeof value === "object") {
      const nested = merged as unknown as Record<string, StyleDeclaration | undefined>;
      nested[property] = mergeStyle(
        nested[property],
        value as StyleDeclaration,
      );
    } else {
      (merged as Record<string, unknown>)[property] = value;
    }
  });
  return merged;
};

const hash = (value: string): string => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36);
};

const safeName = (value: string): string => {
  const normalized = value.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "style";
};

const cssProperty = (property: string): string => {
  if (property.startsWith("--")) return property;
  return property
    .replace(/^ms([A-Z])/, "-ms-$1")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

const cssValue = (property: string, value: string | number): string => {
  if (typeof value !== "number" || value === 0 || unitlessProperties.has(property)) {
    return String(value);
  }
  return property.startsWith("--") ? String(value) : `${value}px`;
};

const declarations = (style: StyleDeclaration): string =>
  Object.entries(style)
    .filter(
      ([property, value]) =>
        !property.startsWith("&") &&
        (typeof value === "string" || typeof value === "number") &&
        (/^--[\w-]+$/.test(property) || /^[a-zA-Z][a-zA-Z0-9]*$/.test(property)),
    )
    .map(([property, value]) => `${cssProperty(property)}:${cssValue(property, value as string | number)};`)
    .join("");

const hasUnsafeSyntax = (value: string): boolean =>
  [...value].some(
    (character) =>
      character.charCodeAt(0) < 32 || "{};@<>".includes(character),
  );

const expandSelector = (parent: string, nested: string): string | undefined => {
  if (
    hasUnsafeSyntax(nested) ||
    nested.split(",").some((part) => !part.trim().startsWith("&"))
  ) {
    return undefined;
  }
  return nested.replaceAll("&", parent);
};

const renderStyle = (selector: string, style: StyleDeclaration): string => {
  const ownDeclarations = declarations(style);
  let css = ownDeclarations ? `${selector}{${ownDeclarations}}` : "";

  Object.entries(style).forEach(([nested, value]) => {
    if (!nested.startsWith("&") || !value || typeof value !== "object") return;
    const expanded = expandSelector(selector, nested);
    if (expanded) css += renderStyle(expanded, value as StyleDeclaration);
  });
  return css;
};

const safeMediaCondition = (condition: string): boolean =>
  condition.trim().length > 0 && !hasUnsafeSyntax(condition);

/** Typed inline rules and optional generated stylesheets, themes, and media rules. */
export class Estyle<
  Rules extends StyleRules = StyleRules,
  Light extends ThemeTokens = ThemeTokens,
  Dark extends ThemeTokens = ThemeTokens,
> {
  private rules: StyleRules = {};
  private baseRules: StyleRules = {};
  private mediaRules: Record<string, StyleRules> = {};
  private theme: { light: ThemeTokens; dark: ThemeTokens } = {
    light: {},
    dark: {},
  };
  private activeMedia: ActiveMedia[] = [];
  private mediaCleanups: Array<() => void> = [];
  private namespace = "estyle";
  private classNames: Readonly<Record<string, string>> = Object.freeze({});
  private styleElement?: HTMLStyleElement;

  defineRules<NextRules extends StyleRules>(
    rules: NextRules,
  ): Estyle<NextRules, Light, Dark> {
    this.baseRules = cloneRules(rules);
    this.applyMediaRules();
    this.buildClassNames();
    this.updateStyleElement();
    return this as unknown as Estyle<NextRules, Light, Dark>;
  }

  defineMedia(media: MediaRules<Rules>): this {
    this.mediaRules = Object.fromEntries(
      Object.entries(media).map(([condition, rules]) => [
        condition,
        cloneRules(rules as StyleRules),
      ]),
    );
    this.updateStyleElement();
    return this;
  }

  setTheme<
    NextLight extends ThemeTokens,
    NextDark extends ThemeTokens = Record<string, never>,
  >(
    theme: ThemeKeys<NextLight, NextDark>,
  ): Estyle<Rules, NextLight, NextDark> {
    this.theme = { light: { ...theme.light }, dark: { ...(theme.dark ?? {}) } };
    return this as unknown as Estyle<Rules, NextLight, NextDark>;
  }

  get rule(): RuleAccessor<Rules> {
    return new Proxy({} as RuleAccessor<Rules>, {
      get: (_target, key) => {
        if (typeof key !== "string") return undefined;
        return (overrides: StyleDeclaration = {}): React.CSSProperties => ({
          ...inlineStyle(this.rules[key]),
          ...inlineStyle(overrides),
        });
      },
    });
  }

  get classes(): ClassAccessor<Rules> {
    return this.classNames as ClassAccessor<Rules>;
  }

  get className(): ClassAccessor<Rules> {
    return this.classes;
  }

  get defineTheme(): { light: Light; dark: Dark } {
    return this.theme as { light: Light; dark: Dark };
  }

  mount(namespace = "estyle"): this {
    this.namespace = safeName(namespace);
    this.buildClassNames();

    if (typeof document === "undefined" || !document.head) return this;
    if (!this.styleElement) {
      this.styleElement = document.createElement("style");
      this.styleElement.setAttribute("data-estyle", this.namespace);
      document.head.append(this.styleElement);
    } else {
      this.styleElement.setAttribute("data-estyle", this.namespace);
    }
    this.updateStyleElement();
    return this;
  }

  mediaQuery(query: Record<string, StyleRules>): this {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return this;
    }

    Object.entries(query).forEach(([condition, overrides]) => {
      const media = window.matchMedia(condition);
      const entry = { media, overrides: cloneRules(overrides) };
      const apply = () => this.applyMediaRules();
      this.activeMedia.push(entry);
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", apply);
        this.mediaCleanups.push(() => media.removeEventListener("change", apply));
      } else {
        media.addListener(apply);
        this.mediaCleanups.push(() => media.removeListener(apply));
      }
    });
    this.applyMediaRules();
    return this;
  }

  dynamicTheme(theme: "light" | "dark" = "light") {
    return this.theme[theme];
  }

  destroy(): void {
    this.mediaCleanups.forEach((cleanup) => cleanup());
    this.mediaCleanups = [];
    this.activeMedia = [];
    this.styleElement?.remove();
    this.styleElement = undefined;
  }

  private applyMediaRules(): void {
    this.rules = cloneRules(this.baseRules);
    this.activeMedia.forEach(({ media, overrides }) => {
      if (!media.matches) return;
      Object.entries(overrides).forEach(([name, style]) => {
        this.rules[name] = mergeStyle(this.rules[name], style);
      });
    });
    this.updateStyleElement();
  }

  private buildClassNames(): void {
    this.classNames = Object.freeze(
      Object.fromEntries(
        Object.keys(this.baseRules).map((name) => [
          name,
          `${this.namespace}-${safeName(name)}-${hash(`${this.namespace}:${name}`)}`,
        ]),
      ),
    );
  }

  private stylesheet(): string {
    const renderRules = (rules: StyleRules): string =>
      Object.entries(rules)
        .map(([name, style]) => {
          const className = this.classNames[name];
          return className ? renderStyle(`.${className}`, style) : "";
        })
        .join("");

    let css = renderRules(this.rules);
    Object.entries(this.mediaRules).forEach(([condition, rules]) => {
      if (!safeMediaCondition(condition)) return;
      const mediaCss = renderRules(rules);
      if (mediaCss) css += `@media ${condition.trim()}{${mediaCss}}`;
    });
    return css;
  }

  private updateStyleElement(): void {
    if (this.styleElement) this.styleElement.textContent = this.stylesheet();
  }
}

export const test = () => {
  const style = new Estyle()
    .defineRules({
      btn: { background: "red", color: "white" },
      form: { height: "100px", width: "200px" },
    })
    .setTheme({
      light: { bgColor: "white", textColor: "orange" },
      dark: { bgColor: "black", textColor: "white" },
    })
    .mediaQuery({
      "(max-width: 400px)": { btn: { color: "orange" } },
      "(max-width: 200px)": { btn: { color: "orange" } },
    });

  return { rules: style.rule, style };
};

export const MediaQuery = createStore({ query: test() });

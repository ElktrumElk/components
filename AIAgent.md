# AI Agent Guide

Reference for AI agents working on the `elk-components` codebase.

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Vite build + tsc declarations |
| `npm run lint` | oxlint |
| `npm run test` | vitest run |
| `npm run test:watch` | vitest watch |
| `npm run dev` | Vite dev server |

**Always run `npm run build` after editing source files.** The build must produce zero TS errors. The `tsconfig.build.json` has `noUnusedLocals` and `noUnusedParameters` enabled — unused variables will fail the build.

---

## Project Structure

```
src/
  components.ts          # Main barrel export (elk-components)
  hooks/index.ts         # Hooks barrel export (elk-components/hooks)
  icons/index.ts         # Icons barrel export (elk-components/icons)
  plugin.ts              # Vite auto-import plugin (elk-components/plugin)
  setup.ts               # JSX intrinsic type declarations + component registry
  lib/components/        # All UI components (42 total)
    <component>/
      <Component>.tsx    # React wrapper (function component)
      <component>Class.tsx  # Class with build() method returning JSX
  hooks/                 # Custom hooks (6 files, 17 exports)
  icons/                 # 205 SVG icon components
```

---

## Architecture: Class-Based Builder Pattern

Every component follows the same pattern:

1. **Class file** (`<component>Class.tsx`): A plain class with a `build()` method that returns JSX. Holds internal state and style logic.
2. **React file** (`<Component>.tsx`): A function component that instantiates the class via `useRef` + lazy init, calls `build()`, and returns the result.

```tsx
// React wrapper pattern (every component):
export default function MyComponent({ ...a }: MyComponentProp) {
  const _ref = useRef<_MyComponent>(null);
  if (!_ref.current) _ref.current = new _MyComponent();
  return _ref.current.build({ ...a });
}
```

**Key rules:**
- The class `build()` method receives all props as a single spread object.
- The class applies all layout via inline `style` objects, not CSS classes.
- `className` is additive — applied alongside the inline styles.
- `gest` is spread onto the root HTML element for native event handlers/attributes.
- `onFunc` receives the class instance for imperative control.

---

## Component File Conventions

### Adding a new component

1. Create `src/lib/components/<name>/<Name>.tsx` (React wrapper)
2. Create `src/lib/components/<name>/<name>Class.tsx` (class with `build()`)
3. Add `export { default as <Name> } from "./lib/components/<name>/<Name>";` to `src/components.ts`
4. If it's a layout component, also add JSX intrinsic type in `src/setup.ts`

### File naming
- React file: PascalCase (`Button.tsx`)
- Class file: camelCase with `Class` suffix (`buttonClass.tsx`)
- Directory: camelCase (`button/`)

### Prop interface naming
- Use `_ComponentName` prefix for the class type (e.g., `_Button`, `_Stack`)
- Use `ComponentNameProp` for the props interface (e.g., `ButtonProp`, `StackProp`)

---

## Shared Props (present on most components)

| Prop | Type | Description |
|------|------|-------------|
| `child` | `ElementType` | Render prop — pass `() => <JSX />`, not raw children |
| `className` | `string` | CSS class name (additive to inline styles) |
| `style` | `CSSProperties` | Inline styles (merged into the class's default styles) |
| `gest` | `HTMLAttributes<...>` | Native HTML attributes spread onto root element |
| `onFunc` | `(self: _Component) => void` | Callback receiving the internal class instance |

**IMPORTANT:** `child` is `ElementType`, not `JSX.Element`. Always pass an arrow function: `child={() => <Text text="Hi" type="p" />}`.

---

## Hooks

All hooks live in `src/hooks/` and are exported from `src/hooks/index.ts`.

| Hook | Source | Purpose |
|------|--------|---------|
| `useState` / `useStateLazy` | `useState.ts` | Enhanced state with `reset()`, `get()` |
| `useRef` / `usePreviousValue` | `useRef.ts` | Refs with `setValue()`, `getValue()`, `isSet()` |
| `useEffect` / `useMountEffect` / `useUpdateEffect` / `usePreviousEffect` / `useDebounceEffect` | `useEffect.ts` | Effect variants |
| `useCallback` / `useMemo` / `useMemoOnce` / `useStableCallback` | `useCallback.ts` | Memoization utilities |
| `createStore` / `useStore` / `useSetState` | `createStore.ts` | External store (useSyncExternalStore) |
| `useInstance` / `useComponentData` | `useInstance.ts` | Cross-component data sharing |

---

## Icons

- 205 SVG icons in `src/icons/`
- Each exports a default function component with `IconProps` interface (`size`, `color`, `className`, `fill`, `fillColor`)
- Icons that don't use `fill`/`fillColor` in their SVG have them prefixed with `_` (e.g., `_fill`, `_fillColor`) to satisfy `noUnusedParameters`
- Icons that DO use `fill`/`fillColor` in JSX keep them unprefixed
- When adding a new icon, follow the existing pattern. Check if the SVG uses `fill`/`fillColor` before deciding whether to prefix them

---

## Build System

- **Vite** for bundling (library mode)
- **tsc** for declaration generation only (`--emitDeclarationOnly`)
- **oxlint** for linting (not ESLint)
- **vitest** for testing
- Entry points: `.` (main), `./hooks`, `./icons`, `./plugin`

The `prepare` script runs `npm run build`, so `npm publish` will trigger a full build. Ensure `tsc` passes cleanly before publishing.

---

## Testing

- Tests use vitest + @testing-library/react
- Test files are `*.test.tsx` co-located with components or in `src/hooks/__tests__/`
- Excluded from build via `tsconfig.build.json` exclude pattern

---

## SectionDivider — Component Deep Dive

### Architecture

The SVG is structured as nested `<g data-scroll>` > `<g data-float>` > paths. Scroll and float animations run independently on separate group elements.

```
<svg viewBox="0 0 1440 80">
  <g data-scroll>       ← scroll animation target (translateX/Y)
    <g data-float>      ← float animation target (sine translateY)
      <path d="..." />
      <path d="..." transform="translate(1440, 0)" />  ← duplicate for seamless loop
    </g>
  </g>
</svg>
```

### Path Generation

Each variant has a hardcoded SVG path in `SVG_PATHS`. Filled variants (wave, curl, tilde, heart, leaf, curve, loop, scroll) render paths with a fill color. Stroked variants (zigzag, diamond, pulse) render paths with a stroke. The dots variant includes decorative dot paths via `DECORATIVE_DOTS`.

### Animation Layers

Two independent animation layers compose on the SVG groups:

1. **Scroll** — applied to `<g data-scroll>`, uses `translateX` (ltr/rtl) or `translateY` (ttb/btt). Duration defaults to the variant's `defaultDuration`.
2. **Float** — applied to `<g data-float>`, uses a sine-wave `translateY` for vertical bobbing. Shares the scroll duration.

### Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `float` | `boolean` | `false` | Enables continuous vertical undulation independent of scroll. |
| `amplitude` | `number` | `15` | Vertical distance in px the float travels from center. |
| `frequency` | `number` | variant-specific | Full oscillation cycles per animation duration for float. |
| `easing` | `Easing` | `"linear"` | CSS easing for scroll animation. |
| `direction` | `Direction` | `"ltr"` | Scroll direction: `ltr`, `rtl`, `ttb`, `btt`. ttb/btt use HEIGHT (80), not WIDTH. |
| `animate` | `boolean` | `false` | Enables continuous scroll animation. |
| `duration` | `number` | variant-specific | Scroll cycle duration in ms. |
| `delay` | `number` | `0` | Delay before animation starts in ms. |
| `gesture` | `Gesture` | — | `click`, `hover`, `focus`, `scroll`, `none`. Implies `animate`. |

### Default Duration and Frequency by Variant

| Variant | Duration | Frequency |
|---------|----------|-----------|
| wave | 5000ms | 2 |
| curl | 4000ms | 4 |
| zigzag | 3000ms | 6 |
| dots | 6000ms | 1 |
| tilde | 4500ms | 3 |
| heart | 4000ms | 3 |
| diamond | 3500ms | 5 |
| leaf | 5500ms | 2 |
| curve | 5000ms | 1 |
| pulse | 2500ms | 3 |
| loop | 4500ms | 4 |
| scroll | 6000ms | 3 |

### Built-in Helpers (exported from Class)

- `play()` — starts all scroll + float animations
- `stop()` — cancels all animations
- `dispose()` — stops animations + removes gesture/store listeners

---

## Common Pitfalls

1. **Unused variables fail the build** — `noUnusedLocals` and `noUnusedParameters` are `true` in `tsconfig.build.json`. Prefix unused params with `_`.
2. **`child` must be `ElementType`** — Pass `() => <JSX />`, not `<JSX />` directly.
3. **Inline styles over CSS** — Components apply layout via `style` objects. `className` is optional/additive.
4. **`gest` type depends on element** — `HTMLDivElement` for divs, `HTMLButtonElement` for buttons, `HTMLInputElement` for inputs, etc.
5. **`build()` is the class entry point** — Never call constructor methods directly. The React wrapper calls `build()`.

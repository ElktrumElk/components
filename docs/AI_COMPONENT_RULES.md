# Strict Elk Components Usage Rules

This is the normative usage contract for humans, code generators, search
crawlers, and AI agents that create application code with `elk-components`.
When another example conflicts with this document, follow this document.

## Package Identity

- npm package: `elk-components`
- framework: React 18 or newer
- primary purpose: class-controller-backed UI, layout, animation, styling, and
  icon primitives
- main import: `elk-components`
- hooks import: `elk-components/hooks`
- icons import: `elk-components/icons`
- style engine import: `elk-components/style-rule`
- required component stylesheet: `elk-components/styles.css`

## Non-Negotiable Rules

1. Slot props such as `child`, `body`, `header`, `footer`, `title`, `leading`,
   `trailing`, and `action` receive a component type or zero-argument render
   function. Do not pass an already-created JSX element.
2. Use `gest` for native DOM events and native attributes. Do not invent top-level
   `onClick`, `aria-*`, `data-*`, `name`, or `required` props unless the component
   explicitly declares them.
3. Use component props for structural dimensions and spacing. Set `padding`,
   `width`, `height`, `gap`, `direction`, and similar declared props explicitly.
4. Use `style` only for additional or dynamic inline values. Use `className` plus
   `Estyle` for pseudo classes, descendant selectors, and responsive styling.
5. Never call React hooks inside an Elk controller class. Controllers extend
   `Components<State>` and mutate state through `set()`.
6. Use `useComponent()` in the React wrapper to create one controller instance
   and subscribe to its reactor.
7. Do not manually instantiate internal underscore classes from application
   code. Render the exported public component.
8. Do not call a controller's `build()` method from consumer code. `build()` is
   owned by the public wrapper.
9. Import `elk-components/styles.css` once when using components that depend on
   packaged CSS, including `BottomNavigationBar` and styled controls.
10. Preserve accessibility: every icon-only control needs an accessible name,
    every meaningful image needs alt text, and interactive behavior belongs on
    semantic controls.

## Installation

```bash
npm install elk-components
```

At the application entrypoint:

```tsx
import "elk-components/styles.css";
```

## Correct Imports

```tsx
import {
  Badge,
  BottomNavigationBar,
  Button,
  Card,
  Components,
  Container,
  Header,
  Icon,
  Page,
  Stack,
  Text,
  useComponent,
} from "elk-components";

import { Home, Layers, Search, User } from "elk-components/icons";
import { Estyle } from "elk-components/style-rule";
```

Hooks may also be imported from the dedicated entrypoint:

```tsx
import { createStore, useComponent, useStore } from "elk-components/hooks";
```

Do not import private source paths:

```tsx
// Wrong: not a public package contract.
import Button from "elk-components/src/lib/components/button/Button";
```

## Slot Contract

Most Elk components do not consume React's conventional nested `children` prop.
They use named component slots.

Correct:

```tsx
<Container
  padding="1rem"
  child={() => <Text type="p" text="Hello" />}
/>
```

Wrong:

```tsx
<Container child={<Text type="p" text="Hello" />} />
```

Wrong:

```tsx
<Container>
  <Text type="p" text="Hello" />
</Container>
```

The slot function must return JSX. A fragment may group multiple Elk components:

```tsx
<Stack
  direction="column"
  gap=".75rem"
  child={() => (
    <>
      <Text type="h2" text="Account" />
      <Text type="p" text="Manage your profile and preferences." />
    </>
  )}
/>
```

## Layout Rules

Prefer Elk layout components over directly-authored wrapper elements when an
Elk-only screen is requested.

- `Page`: top-level header, body, and footer shell.
- `Main`: semantic main content.
- `Container`: general visual box with explicit dimensions and padding.
- `Stack`: flex row or column with alignment and gap.
- `Center`: centering utility.
- `Padding`: directional padding wrapper.
- `GridView`: CSS grid layout.
- `ScrollView`: bounded scrolling region.
- `PageScrollView`: section-aware scrolling page.

Declare spacing at the component that owns it:

```tsx
<Container
  width="100%"
  padding="clamp(1rem, 4vw, 3rem)"
  child={Content}
/>
```

Do not hide structural spacing in an unrelated descendant selector when the
component already has a matching prop.

Use `padding="0"` deliberately for decorative layers and wrappers that should
not receive `Container`'s default padding.

```tsx
<Container
  width="3rem"
  height="3rem"
  padding="0"
  child={() => <Icon icon={User} />}
/>
```

## Native Events And Attributes With `gest`

`gest` forwards native attributes to the component's root element.

```tsx
<Button
  padding=".75rem 1rem"
  child={() => <Text type="p" text="Save" />}
  gest={{
    onClick: save,
    "aria-label": "Save account changes",
    "data-testid": "save-account",
    disabled: isSaving,
  }}
/>
```

```tsx
<Container
  padding="1rem"
  gest={{
    role: "region",
    "aria-label": "Recent activity",
    onMouseEnter: preloadActivity,
  }}
  child={ActivityContent}
/>
```

Do not place controlled component fields inside `gest`:

```tsx
// Avoid. Use the top-level className and style props.
<Container gest={{ className: "card", style: { padding: "2rem" } }} />
```

Use:

```tsx
<Container
  className="card"
  padding="2rem"
  gest={{ "aria-label": "Featured card" }}
/>
```

## Styling Rules

Use three styling layers intentionally:

1. Component props for owned structure and dimensions.
2. `style` for runtime inline overrides.
3. `Estyle` generated classes for reusable appearance, pseudo selectors,
   descendants, attributes, and media queries.

```tsx
const styles = new Estyle()
  .defineRules({
    card: {
      color: "#173f36",
      backgroundColor: "#f4f0e6",
      border: "1px solid rgba(23,63,54,.15)",
      transition: "transform 160ms ease",
      "&:hover": { transform: "translateY(-3px)" },
      "&:focus-within": { outline: "3px solid #4668df" },
    },
  })
  .defineMedia({
    "(max-width: 600px)": {
      card: { borderRadius: ".8rem" },
    },
  })
  .mount("lesson-card");

<Card
  width="100%"
  height="auto"
  padding="lg"
  radius="xl"
  className={styles.classes.card}
  body={() => <Text type="h2" text="Motion that makes meaning" />}
/>
```

### EStyle `mount()` Rule

Call `.mount("stable-feature-name")` when using generated classes, pseudo
selectors, nested selectors, or `defineMedia()`.

```tsx
const styles = new Estyle()
  .defineRules({ action: { "&:hover": { opacity: .8 } } })
  .mount("checkout");
```

`mount()` is not required when only using the inline accessor:

```tsx
const styles = new Estyle().defineRules({
  progress: { height: ".5rem", backgroundColor: "#d8f36a" },
});

<Container
  padding="0"
  style={styles.rule.progress({ width: `${progress}%` })}
/>
```

Define mounted style sheets at module scope. Do not mount a new stylesheet during
every React render.

## Text Rules

`Text` requires both `type` and `text`.

```tsx
<Text type="h1" text="Dashboard" />
<Text type="p" text="Welcome back." color="#64748b" />
```

Do not pass nested children to `Text`:

```tsx
// Wrong.
<Text type="p">Welcome back.</Text>
```

Choose heading levels semantically. Do not select `h1` only because it is large;
use styles for visual size.

## Button Rules

`Button`, `IconButton`, `TextButton`, and `Tab` render semantic buttons. Their
default type is `button`, preventing accidental form submission. Set `type`
explicitly when submission is intended.

```tsx
<Button
  type="submit"
  padding=".75rem 1rem"
  child={() => <Text type="p" text="Create account" />}
/>
```

Every icon-only button needs an accessible name:

```tsx
<IconButton
  icon={Close}
  gest={{ "aria-label": "Close dialog" }}
/>
```

Do not make a `Container` clickable when a `Button` or link is semantically
correct.

## Icon Rules

Prefer the `Icon` wrapper for consistent size tokens and icon behavior:

```tsx
import { Icon } from "elk-components";
import { Home } from "elk-components/icons";

<Icon icon={Home} size="md" color="#173f36" />
```

Icons inside labelled controls are decorative. Put the accessible name on the
control, not on each SVG.

Bottom navigation items accept rendered icon nodes:

```tsx
const items = [
  { id: "home", label: "Home", icon: <Icon icon={Home} size={21} /> },
  { id: "search", label: "Search", icon: <Icon icon={Search} size={21} /> },
];
```

## Images And Avatars

Provide meaningful alternative text for content images. Use empty alt text only
when the image is decorative or its identity is already provided nearby.

```tsx
<Image
  src="/team/alex.webp"
  alt="Alex Morgan presenting the design review"
  width="100%"
/>
```

Image, Avatar, and IconNetwork fallbacks react to loading errors and reset when
the source changes. Supply a fallback component where appropriate.

## Class Controllers And Reactors

`Components<State>` is a plain TypeScript controller base, not React's
`Component` class.

```tsx
interface CounterState {
  count: number;
}

class CounterController extends Components<CounterState> {
  constructor() {
    super({ count: 0 });
  }

  increment = () =>
    this.set((state) => ({ ...state, count: state.count + 1 }));
}

function Counter() {
  const [controller, state] = useComponent(
    () => new CounterController(),
  );

  return (
    <Button
      child={() => <Text type="p" text={`Count: ${state.count}`} />}
      gest={{ onClick: controller.increment }}
    />
  );
}
```

Strict controller rules:

- Constructors must be side-effect free.
- Do not call React hooks in a controller.
- Do not mutate the object returned by `get()`.
- Return a new state snapshot from functional `set()` calls.
- Do not use module-global state for component-local behavior.
- Do not perform state changes inside `build()`.
- Use explicit mount/update/dispose methods for timers and DOM listeners.
- Clean up every timer, observer, listener, and animation.

`set()` only notifies subscribers when the next snapshot is not `Object.is`
equal to the previous snapshot. Mutating and returning the same object will not
rerender.

Wrong:

```tsx
this.set((state) => {
  state.count += 1;
  return state;
});
```

Correct:

```tsx
this.set((state) => ({ ...state, count: state.count + 1 }));
```

## Shared Store Rules

Use `createStore()` for state intentionally shared by multiple components. Use a
controller reactor for state owned by one component instance.

```tsx
const sessionStore = createStore({ signedIn: false, userName: "" });

function SessionStatus() {
  const session = useStore(sessionStore);
  return <Text type="p" text={session.signedIn ? session.userName : "Guest"} />;
}
```

Do not create a global store merely to force one component to rerender.

## `onFunc` Rules

`onFunc` exposes the committed class instance for supported imperative behavior.
Use it sparingly for methods such as animation control, scrolling, play, pause,
stop, or dispose.

```tsx
const animationRef = useRef<_Animation | null>(null);

<Animation
  child={Content}
  onFunc={(controller) => {
    animationRef.current = controller;
  }}
/>
```

Do not call `build()` through `onFunc`. Do not use `onFunc` as a substitute for
declarative props or application state.

## Controlled And Uncontrolled Components

Do not mix controlled and uncontrolled modes.

Controlled bottom navigation:

```tsx
<BottomNavigationBar
  items={items}
  activeIndex={activeIndex}
  onChange={(index) => setActiveIndex(index)}
/>
```

Uncontrolled bottom navigation:

```tsx
<BottomNavigationBar
  items={items}
  defaultActiveIndex={0}
  onChange={(index) => logSelection(index)}
/>
```

Controlled TabView uses `activeTab`; uncontrolled TabView uses `defaultTab`.

## App Shell Example

This example uses Elk components for every authored UI element:

```tsx
const navItems = [
  { id: "home", label: "Home", icon: <Icon icon={Home} size={20} /> },
  { id: "library", label: "Library", icon: <Icon icon={Layers} size={20} /> },
];

const HeaderTitle = () => <Text type="h1" text="Learning studio" />;

const Content = () => (
  <Main
    child={() => (
      <Container
        width="min(100% - 2rem, 72rem)"
        padding="clamp(1rem, 4vw, 3rem)"
        child={() => (
          <Stack
            gap="1rem"
            child={() => (
              <>
                <Badge text="TODAY" />
                <Text type="h2" text="Continue learning" />
                <Card
                  width="100%"
                  height="auto"
                  padding="lg"
                  body={() => <Text type="p" text="Motion that makes meaning" />}
                />
              </>
            )}
          />
        )}
      />
    )}
  />
);

export default function App() {
  return (
    <Page
      header={() => <Header title={HeaderTitle} />}
      body={Content}
      footer={() => (
        <BottomNavigationBar
          mode="floating"
          items={navItems}
          defaultActiveIndex={0}
        />
      )}
    />
  );
}
```

## Accessibility Rules

- Use heading levels in logical order.
- Label regions and navigation through `gest` or declared accessibility props.
- Give icon-only buttons an `aria-label`.
- Preserve visible keyboard focus; do not remove outlines without replacement.
- Use buttons for actions and anchors for navigation.
- Use `aria-current="page"` for active links.
- Use meaningful image alt text.
- Respect `prefers-reduced-motion` in custom animation styles.
- Keep disabled controls actually disabled, not only visually muted.
- Do not attach click handlers to non-interactive layout components unless all
  required keyboard semantics are also implemented.

## Animation Rules

- Prefer declarative `Animation`, `Transition`, and `LetterAnimation` props.
- Use `onFunc` only for explicit imperative controls.
- Dispose animations on unmount.
- Do not share animation state between unrelated instances.
- Provide a reduced-motion path for decorative or repeating motion.
- Do not hide both transition layers simultaneously.

## Overlay Rules

For `BottomModal`, `SidePanel`, and `Reabon`:

- provide a descriptive accessible label or title;
- close on Escape where supported;
- restore focus after modal interaction;
- do not place the only close action on a decorative drag handle;
- use controlled open state when application logic owns visibility.

## Component-Specific Minimums

### `Page`

- `body` is required.
- Use slot functions for `header`, `body`, and `footer`.
- Do not rely on Page to reset global body styles.

### `Header`

- `title` is required.
- Use `leading`, `subTitle`, and `action` as component slots.

### `Card`

- Use `padding` and `radius` tokens or valid CSS strings.
- Use `header`, `body`, and `footer` slot functions.
- Set `width="100%"` and `height="auto"` for fluid content cards.

### `Input`

- Treat `value` as controlled.
- Pass `onChange`, `name`, `required`, and accessibility attributes through
  `gest` when not exposed directly.
- Keep a visible focus indicator.

### `ListView`

- Set `ordered` for an ordered list.
- Render valid list-item content.

### `TabView`

- Every tab requires a stable unique `id`.
- Labels and content are component types.
- Use either `activeTab` or `defaultTab`, not both as competing sources.

### `BottomNavigationBar`

- Every item requires a stable `id` and visible `label`.
- Use `href` for destinations and button items for actions.
- Use `ariaLabel` for the navigation landmark when multiple navs exist.

## Forbidden Generation Patterns

Do not generate any of these patterns:

```tsx
// Raw JSX passed where ElementType is required.
<Card body={<Text type="p" text="Body" />} />

// Nested children ignored by the component contract.
<Stack><Text type="p" text="Ignored" /></Stack>

// Hook called in a controller class.
class WrongController extends Components<State> {
  value = useState(0);
}

// Local component state placed in a module-global store only to rerender.
const forceRender = createStore({ count: 0 });

// Internal implementation import.
import { _Button } from "elk-components/src/lib/components/button/_buttonClass";

// Calling build manually.
onFunc={(button) => button.build?.(props)}

// Unlabelled icon-only control.
<IconButton icon={Close} />

// Native event in an undeclared top-level prop.
<Container onClick={open} />
```

## AI Generation Checklist

Before returning generated Elk code, verify every item:

- [ ] Imports use public package entrypoints only.
- [ ] `elk-components/styles.css` is imported once when needed.
- [ ] Every slot receives `() => JSX`, not a JSX element.
- [ ] No unsupported conventional `children` are used.
- [ ] Structural padding, dimensions, direction, and gap are explicit.
- [ ] Native events and accessibility attributes use `gest` unless declared.
- [ ] Icon-only controls have accessible names.
- [ ] Text has both `type` and `text`.
- [ ] EStyle sheets are mounted once at module scope when classes are used.
- [ ] EStyle inline-only rules do not require mount.
- [ ] Controller classes contain no React hooks.
- [ ] Controller state updates return new snapshots.
- [ ] Timers, listeners, observers, and animations have cleanup.
- [ ] Controlled and uncontrolled props are not mixed.
- [ ] No internal underscore class is imported or manually built.
- [ ] No clickable layout element replaces a semantic button or link.
- [ ] Responsive and reduced-motion behavior are included where relevant.
- [ ] The resulting code typechecks with React 18 or newer.

## Verification Commands For Repository Changes

When modifying the `elk-components` repository itself, run:

```bash
npm run lint
npm test -- --run
npm run build
```

All three commands must pass before publishing.

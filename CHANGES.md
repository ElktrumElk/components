# Component Improvements

## Class Controller Model

- Added `Components<State>`, a per-instance class reactor with `get`, `set`,
  `reset`, and `subscribe`.
- Added `useComponent`, the React bridge for controller construction,
  `useSyncExternalStore` subscription, SSR snapshots, and post-commit `onFunc`.
- Migrated `TabView` and `BottomNavigationBar` to controller-owned state.
- Kept hooks out of controller classes so React lifecycle rules remain valid.

## Style Rules

- Extended `Estyle` with stable generated classes and a single managed style
  element per rule sheet.
- Added typed pseudo, compound, attribute, and descendant selectors through
  nested `&` rules.
- Added declarative `defineMedia` rules, CSS value serialization, SSR-safe
  mounting, source immutability, and stylesheet cleanup.
- Moved the showcase design into `AppStyles.ts`; Elk layout props now declare
  padding and dimensions explicitly at component boundaries.

## New Component

- Added `BottomNavigationBar` with fixed and floating modes, safe-area spacing,
  controlled and uncontrolled selection, active indicators, semantic links and
  buttons, keyboard focus, disabled states, and reduced-motion styling.

## Correctness And Accessibility

- Made image, avatar, and network-icon fallbacks reactive and reset them when
  the source changes.
- Prevented accidental form submission from Button, IconButton, Tab, and
  TextButton.
- Added working uncontrolled state and WAI-ARIA structure to TabView.
- Fixed custom Card dimensions, Header IDs, Center boolean options, Padding
  mappings, ordered ListView output, GridView sizing, and controlled Input
  updates.
- Removed unsafe HTML injection from Example.
- Corrected Hover pointer behavior and scrollbar placement.
- Scoped Page styles so importing the component no longer resets an entire app.
- Added dialog semantics and Escape handling to overlay components.
- Repaired Transition and SectionDivider timing, cleanup, instance isolation,
  custom paths, and reduced-motion behavior.
- Prevented shared LetterAnimation preset mutation and added Unicode grapheme
  segmentation and accessible text.

## Showcase

- Rebuilt `src/App.tsx` as a responsive editorial learning dashboard using an
  `AppController` reactor, overlapping Flutter-inspired surfaces, component
  cards, progress interaction, saved state, and floating bottom navigation.

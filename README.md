# Component Framework

A higher-level React component framework built on class-based state management with render props. All components follow a consistent **class + wrapper** architecture.

---

## Conventions

### Render Props (`child`, `header`, `body`, etc.)

Every slot that accepts content uses `React.JSX.ElementType` — pass an **arrow function returning JSX**, not raw JSX children:

```tsx
// Correct
<Center child={() => <Text text="Hello" type="p" />} />

// Wrong
<Center child={<Text text="Hello" type="p" />} />
```

### Gestures (`gest`)

Native DOM events and attributes are passed via the `gest` prop, typed to the underlying HTML element:

```tsx
<Button gest={{ onClick: () => alert("clicked") }} />
<Container gest={{ onMouseEnter: () => console.log("hover") }} />
<Input gest={{ onChange: (e) => console.log(e.target.value) }} />
```

### Instance Access (`onFunc`)

Components that expose imperative control accept `onFunc`, which receives the internal class instance:

```tsx
<Button onFunc={(self) => { self.build?.({...}) }} />
```

---

## Components

### Page

Top-level layout section. Wraps header, body, and footer.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `header` | `ElementType` | No | — | Header slot |
| `body` | `ElementType` | Yes | — | Body slot |
| `footer` | `ElementType` | No | — | Footer slot |
| `className` | `string` | No | `"page"` | CSS class |
| `style` | `CSSProperties` | No | `{}` | Inline styles |
| `atrib` | `HTMLAttributes<HTMLElement>` | No | — | Native HTML attributes |

```tsx
<Page
  header={() => <Header ... />}
  body={() => <Center child={() => <Text text="Content" type="h1" />} />}
  footer={() => <Text text="Footer" type="p" />}
/>
```

---

### Header

App bar with leading element, title/subtitle, and action slot.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `leading` | `ElementType` | No | — | Left-side element (avatar, icon) |
| `title` | `ElementType` | Yes | — | Title content |
| `subTitle` | `ElementType` | No | — | Subtitle below title |
| `action` | `ElementType` | No | — | Right-side actions |
| `titleGap` | `string` | No | — | Gap between title and subtitle. Typed: `${string}rem` / `${string}px` / `${string}em` |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Override default flex layout |

```tsx
<Header
  leading={() => <Avatar size="sm" />}
  title={() => <Text text="Dashboard" type="h1" />}
  subTitle={() => <Text text="Overview" type="p" />}
  titleGap=".3rem"
  action={() => <Button child={() => <Text text="Settings" type="p" />} />}
/>
```

---

### Text

Polymorphic text element. Renders any heading or paragraph tag.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | — | Text content |
| `type` | `'h1'\|'h2'\|'h3'\|'h4'\|'h5'\|'h6'\|'p'\|'pre'` | Yes | — | HTML tag to render |
| `size` | `string` | No | — | Font size (e.g. `"1rem"`, `"14px"`) |
| `style` | `CSSProperties` | No | — | Inline styles |
| `className` | `string` | No | — | CSS class |

```tsx
<Text text="Title" type="h2" size="1.5rem" />
<Text text="Body text" type="p" style={{ color: "grey" }} />
```

---

### Container

Generic div wrapper with layout props.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Content slot |
| `width` | `string` | No | `"auto"` | Width |
| `height` | `string` | No | `"auto"` | Height |
| `padding` | `string` | No | `"1rem"` | Padding |
| `color` | `string` | No | — | Background color |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Container) => void` | No | — | Instance callback |

```tsx
<Container color="grey" width="50px" height="50px" padding=".5rem">
  <Text text="Box" type="p" />
</Container>
```

---

### Button

Clickable button with content slot.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Button content |
| `border` | `string` | No | — | Border |
| `borderRadius` | `string` | No | — | Border radius |
| `color` | `string` | No | — | Text color |
| `padding` | `string` | No | — | Padding |
| `width` | `string` | No | — | Width |
| `height` | `string` | No | — | Height |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLButtonElement>` | No | — | Native button attributes |
| `onFunc` | `(self: _Button) => void` | No | — | Instance callback |

```tsx
<Button
  borderRadius="1rem"
  padding=".4rem 1rem"
  child={() => <Text text="Click me" type="p" />}
  gest={{ onClick: () => alert("clicked") }}
/>
```

---

### IconButton

Button that renders an icon instead of text content. Extends Button.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `ElementType` | No | — | Icon component to render |
| `borderRadius` | `string` | No | — | Border radius |
| `width` | `string` | No | — | Width |
| `height` | `string` | No | — | Height |
| `color` | `string` | No | — | Icon color |
| `border` | `string` | No | `"none"` | Border |
| `className` | `string` | No | `"icon-btn"` | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLButtonElement>` | No | — | Native button attributes |
| `onFunc` | `(self: _Button) => void` | No | — | Instance callback |

```tsx
<IconButton borderRadius="4rem" icon={() => <Lock />} />
```

---

### Center

Centers content both vertically and horizontally. Uses fixed flex styles.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | Yes | — | Content to center |

```tsx
<Center child={() => <Text text="Centered" type="h2" />} />
```

---

### Stack

Flex container with full direction/alignment/gap control.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Stacked content |
| `direction` | `'column'\|'row'\|'row-reverse'\|'column-reverse'` | No | `"column"` | Flex direction |
| `gap` | `string` | No | `"0"` | Gap between items. Typed: `${string}rem` / `${string}px` / `${string}em` |
| `align` | `'stretch'\|'flex-start'\|'flex-end'\|'center'\|'baseline'` | No | `"stretch"` | Cross-axis alignment |
| `justify` | `'flex-start'\|'flex-end'\|'center'\|'space-between'\|'space-around'\|'space-evenly'` | No | `"flex-start"` | Main-axis alignment |
| `wrap` | `boolean` | No | — | Enable flex-wrap |
| `width` | `string` | No | — | Width |
| `height` | `string` | No | — | Height |
| `padding` | `string` | No | — | Padding |
| `margin` | `string` | No | — | Margin |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Stack) => void` | No | — | Instance callback |

```tsx
<Stack direction="row" gap=".75rem" align="center" justify="space-between" wrap child={() => (
  <>
    <Button child={() => <Text text="A" type="p" />} />
    <Button child={() => <Text text="B" type="p" />} />
  </>
)} />
```

---

### Divider

Horizontal or vertical separator line.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `direction` | `'horizontal'\|'vertical'` | No | `"horizontal"` | Separator orientation |
| `size` | `'xs'\|'sm'\|'md'\|'lg'` | No | `"sm"` | Thickness: xs=1px, sm=2px, md=4px, lg=8px |
| `color` | `string` | No | `"rgba(255,255,255,0.1)"` | Line color |
| `margin` | `string` | No | auto (direction-aware) | Margin |
| `child` | `ElementType` | No | — | Optional center content (e.g. "or") |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |

```tsx
<Divider direction="horizontal" size="sm" color="rgba(255,255,255,0.2)" />
<Divider direction="vertical" size="xs" />
```

---

### Input

Text input with optional prefix/suffix slots.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'text'\|'password'\|'email'\|'number'\|'tel'\|'url'\|'search'` | No | `"text"` | Input type |
| `placeholder` | `string` | No | — | Placeholder text |
| `value` | `string` | No | — | Default value |
| `disabled` | `boolean` | No | — | Disabled state |
| `readOnly` | `boolean` | No | — | Read-only state |
| `prefix` | `ElementType` | No | — | Element before input (icon, label) |
| `suffix` | `ElementType` | No | — | Element after input (icon, button) |
| `width` | `string` | No | `"100%"` | Width |
| `height` | `string` | No | `"2.5rem"` | Height |
| `borderRadius` | `string` | No | `".5rem"` | Border radius |
| `backgroundColor` | `string` | No | `"transparent"` | Background |
| `color` | `string` | No | `"inherit"` | Text color |
| `borderColor` | `string` | No | `"rgba(255,255,255,0.15)"` | Border color |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `InputHTMLAttributes<HTMLInputElement>` | No | — | Native input attributes |
| `onFunc` | `(self: _Input) => void` | No | — | Instance callback |

```tsx
<Input
  type="email"
  placeholder="you@example.com"
  borderRadius=".5rem"
  borderColor="rgba(255,255,255,0.2)"
  gest={{ onChange: (e) => console.log(e.target.value) }}
/>
```

---

### Image

Image with lazy loading, aspect ratio, and error fallback.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | No | — | Image URL |
| `alt` | `string` | No | `""` | Alt text |
| `width` | `string` | No | `"100%"` | Width |
| `height` | `string` | No | `"auto"` | Height |
| `aspectRatio` | `${number}/${number}` | No | — | CSS aspect-ratio (e.g. `"16/9"`) |
| `objectFit` | `'cover'\|'contain'\|'fill'\|'none'\|'scale-down'` | No | `"cover"` | Object-fit |
| `borderRadius` | `string` | No | — | Border radius |
| `placeholder` | `string` | No | `"rgba(255,255,255,0.05)"` | Placeholder background color |
| `loading` | `'lazy'\|'eager'` | No | `"lazy"` | Loading strategy |
| `fallback` | `ElementType` | No | — | Component shown on error |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Image) => void` | No | — | Instance callback |

```tsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width="200px"
  height="150px"
  borderRadius=".5rem"
  objectFit="cover"
  fallback={() => <Text text="No image" type="p" />}
/>
```

---

### Badge

Status or label indicator with variant and size options.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | No | — | Badge text (used when no `child`) |
| `child` | `ElementType` | No | — | Custom content slot |
| `variant` | `'filled'\|'outlined'\|'soft'` | No | `"soft"` | Visual variant |
| `size` | `'xs'\|'sm'\|'md'\|'lg'` | No | `"sm"` | Size preset |
| `color` | `string` | No | `"#fff"` | Text color |
| `backgroundColor` | `string` | No | `"rgba(255,255,255,0.1)"` | Background (filled/soft) |
| `borderColor` | `string` | No | uses `color` | Border color (outlined variant) |
| `borderRadius` | `string` | No | `"9999px"` | Border radius (pill by default) |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Badge) => void` | No | — | Instance callback |

**Variants:**
- `filled` — solid background
- `outlined` — transparent background with border
- `soft` — tinted background (default)

```tsx
<Badge text="Online" variant="filled" size="sm" backgroundColor="green" />
<Badge text="Away" variant="outlined" size="sm" color="yellow" borderColor="yellow" />
<Badge text="Busy" variant="soft" size="sm" backgroundColor="red" />
```

---

### Card

Content container with header, body, and footer sections.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `header` | `ElementType` | No | — | Header slot (separated by border) |
| `body` | `ElementType` | No | — | Body slot |
| `footer` | `ElementType` | No | — | Footer slot (separated by border) |
| `padding` | `'none'\|'sm'\|'md'\|'lg'` | No | `"md"` | Padding preset: none=0, sm=.5rem, md=1rem, lg=1.5rem |
| `radius` | `'none'\|'sm'\|'md'\|'lg'\|'xl'` | No | `"md"` | Border radius preset |
| `backgroundColor` | `string` | No | `"rgba(255,255,255,0.05)"` | Background |
| `borderColor` | `string` | No | `"rgba(255,255,255,0.08)"` | Border color |
| `width` | `string` | No | — | Width |
| `height` | `string` | No | — | Height |
| `shadow` | `boolean` | No | — | Add drop shadow |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Card) => void` | No | — | Instance callback |

```tsx
<Card padding="md" radius="lg" shadow
  header={() => <Text text="Title" type="h3" />}
  body={() => <Text text="Content goes here" type="p" />}
  footer={() => <Text text="Action" type="p" />}
/>
```

---

### Avatar

Circular image with size presets, icon support, and fallback. Content priority: `src` > `icon` > `fallback`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | No | — | Image URL (highest priority) |
| `alt` | `string` | No | `""` | Alt text |
| `icon` | `ElementType` | No | — | SVG icon component (used when no `src`) |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | No | `"md"` | Size preset: xs=1.5rem, sm=2rem, md=2.5rem, lg=3.5rem, xl=5rem |
| `borderRadius` | `string` | No | `"50%"` | Border radius (circular by default) |
| `backgroundColor` | `string` | No | `"rgba(255,255,255,0.1)"` | Background |
| `fallback` | `ElementType` | No | — | Component shown when no src and no icon |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Avatar) => void` | No | — | Instance callback |

```tsx
<Avatar src="/user.jpg" alt="User" size="lg" />
<Avatar icon={Lock} size="md" backgroundColor="rgba(255,255,255,0.05)" />
<Avatar size="sm" fallback={() => <Text text="JD" type="p" />} />
```

---

### Icon

Wraps any SVG icon component, forwarding `size` and `color` props. Pass the component reference directly (not wrapped in an arrow function) so props forward correctly.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `ElementType` | Yes | — | SVG icon component (e.g. `Lock`, `Search`) |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl' \| number` | No | `"md"` | Size preset: xs=12, sm=16, md=24, lg=32, xl=48. Or raw number. |
| `color` | `string` | No | — | Icon color |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _Icon) => void` | No | — | Instance callback |

```tsx
import { Lock, Search, Heart } from "./icons";

<Icon icon={Lock} size="lg" color="white" />
<Icon icon={Search} size={40} />
<Icon icon={Heart} size="sm" color="red" />
```

---

### IconNetwork

Loads an image from a URL as an icon-sized element. Useful for favicons, CDN-hosted icons, or external brand images.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | Yes | — | Image URL |
| `alt` | `string` | No | `""` | Alt text |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl' \| string` | No | `"md"` | Size preset: xs=12px, sm=16px, md=24px, lg=32px, xl=48px. Or custom string. |
| `borderRadius` | `string` | No | `"50%"` | Border radius |
| `backgroundColor` | `string` | No | `"transparent"` | Background |
| `fallback` | `ElementType` | No | — | Component shown on error |
| `loading` | `'lazy'\|'eager'` | No | `"lazy"` | Loading strategy |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _IconNetwork) => void` | No | — | Instance callback |

```tsx
<IconNetwork src="https://cdn.example.com/logo.png" size="lg" />
<IconNetwork src="/favicon.ico" size="16px" borderRadius=".25rem" />
<IconNetwork src="https://brand.com/icon.svg" fallback={() => <Icon icon={Globe} />} />
```

---

## Built-in SVG Icons

The framework includes **205 built-in SVG icons** in `src/icons/`. All icons follow the same `IconProps` interface (`size`, `color`, `className`) and use stroke-based rendering.

### Usage

```tsx
import { Lock, Heart, ShoppingCart, Search } from "./icons";

// With the Icon component (recommended):
<Icon icon={Lock} size="lg" color="white" />

// Directly as a component:
<Lock size={24} color="currentColor" />

// In IconButton:
<IconButton borderRadius="4rem" icon={() => <Search />} />

// In Avatar:
<Avatar icon={Heart} size="md" />
```

### Icon Categories

**Navigation (25)**
`ArrowDown` `ArrowDownLeft` `ArrowDownRight` `ArrowLeft` `ArrowRight` `ArrowUp` `ArrowUpLeft` `ArrowUpRight` `ChevronDown` `ChevronLeft` `ChevronRight` `ChevronUp` `Compass` `ExternalLink` `HambuggerMenu` `Home` `MapPin` `Maximize` `Minimize` `MoreHorizontal` `MoreVertical` `Move` `Navigation` `Refresh` `RotateLeft` `RotateRight`

**Actions (25)**
`Add` `Bug` `Camera` `Clipboard` `ClipboardCheck` `Code` `Code2` `Edit` `Edit2` `Minus` `Mic` `Pencil` `Power` `Printer` `Redo` `Reload` `Repeat` `Save` `Scissors` `Sync` `Terminal` `Trash` `Trash2` `Undo` `Zap`

**Communication (20)**
`Airplay` `AtSign` `Bell` `BellOff` `Bluetooth` `Cast` `Hash` `Headphones` `Inbox` `Mail` `MailOpen` `MessageCircle` `MessageSquare` `Mic` `MicOff` `Phone` `PhoneCall` `Radio` `Send` `Signal` `Voicemail` `Wifi` `WifiOff`

**Social (20)**
`Award` `Bookmark` `BookmarkFill` `Dislike` `Droplet` `Flame` `Gift` `Heart` `HeartFill` `Leaf` `Like` `Medal` `PartyPopper` `Sparkles` `Star` `StarFill` `ThumbsDown` `ThumbsUp` `Tree` `Trophy`

**Media (25)**
`Airplay` `Camera` `Disc` `FastBackward` `FastForward` `Film` `Headphones` `Image` `Image2` `Mic` `MicOff` `Music` `Pause` `Play` `Podcast` `Radio` `ScreenShare` `SkipBack` `SkipForward` `Stop` `Video` `Volume` `Volume1` `Volume2` `VolumeX`

**Status (15)**
`AlertCircle` `AlertOctagon` `AlertTriangle` `Ban` `CheckCircle` `Eye` `EyeOff` `Fingerprint` `HelpCircle` `Info` `Key` `Shield` `ShieldCheck` `ShieldOff` `Unlock` `XCircle`

**Commerce (10)**
`Banknote` `CreditCard` `DollarSign` `Percent` `Receipt` `ShoppingBag` `ShoppingCart` `Tag` `Tags` `Wallet`

**Time (9)**
`AlarmClock` `Calendar` `CalendarDays` `Clock` `Hourglass` `Sunrise` `Sunset` `Timer` `Watch`

**Users (14)**
`Accessibility` `Baby` `Contact` `Crown` `Group` `User` `UserCheck` `UserCog` `UserMinus` `UserPlus` `Users` `Users2` `UserSearch` `UserX`

**Layout (9)**
`AlignCenter` `AlignLeft` `AlignRight` `Columns` `Layout` `Layers` `PanelLeft` `Rows` `Sidebar`

**Code (7)**
`Cpu` `Database` `GitBranch` `GitCommit` `GitMerge` `Server`

**Misc (22)**
`Cloud` `CloudDownload` `CloudUpload` `Copy` `Download` `ExternalLink` `File` `Filter` `Flag` `Folder` `Globe` `GridView` `Key` `Link` `ListView` `Lock` `Map` `Moon` `Paperclip` `Search` `Settings` `ShareButton` `ShareLogo` `Sun` `Upload` `UploadImage` `UploadVideo` `Wind`

---

## Advanced Prop Patterns

### Typed CSS Units

Props like `gap`, `titleGap`, and `borderRadius` use template literal types for autocomplete on valid CSS length values:

```tsx
// TypeScript autocompletes these patterns:
gap=".5rem"
gap="10px"
gap="1.5em"
```

### Enum-based Sizing

Components like `Badge`, `Card`, `Avatar`, `Divider`, `Icon`, and `IconNetwork` use enum props that map to internal size dictionaries. This avoids raw CSS values:

```tsx
// Instead of passing raw values:
<Badge size="sm" />          // maps to padding: .15rem .5rem, fontSize: .75rem
<Card padding="lg" />        // maps to 1.5rem
<Avatar size="xl" />         // maps to 5rem
<Divider size="xs" />        // maps to 1px
<Icon size="lg" />           // maps to 32px
<IconNetwork size="sm" />    // maps to 16px
```

### Render Props vs Children

The framework uses `ElementType` render props instead of React `children`. This enables:
- Lazy evaluation of slot content
- Class-based state management of slot references
- Consistent API across all components

```tsx
// Every slot uses () => JSX pattern
<Card
  header={() => <Text text="Title" type="h2" />}
  body={() => <Text text="Body" type="p" />}
/>
```

### Gesture Passthrough

The `gest` prop accepts the full type definition for the underlying HTML element, so any native event handler or attribute works without the component needing to explicitly support it:

```tsx
// All of these work via gest:
<Input gest={{ onChange: (e) => setSearch(e.target.value) }} />
<Container gest={{ onMouseEnter: () => setHover(true), tabIndex: 0 }} />
<Button gest={{ onClick: submit, disabled: isLoading }} />
```

### Avatar Content Priority

Avatar supports three content sources with a clear priority chain:

```tsx
// 1. Network image (highest priority)
<Avatar src="/user.jpg" alt="User" />

// 2. SVG icon component (used when no src)
<Avatar icon={Lock} size="md" />

// 3. Fallback (used when no src and no icon)
<Avatar fallback={() => <Text text="JD" type="p" />} />

// All three together — src takes priority
<Avatar src="/user.jpg" icon={Lock} fallback={() => <Text text="JD" type="p" />} />
```

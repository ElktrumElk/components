# elk-components

React animation, layout, and styling toolkit. Declarative motion, transitions, letter animations, and composable UI primitives with built-in icons.

---

## Install

```bash
npm install elk-components
```
```bash
npx create-elk-component@latest
```
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
| `atrib` | `HTMLAttributes<HTMLElement>` | No | — | Native HTML| 
| `background` | `color` | No | -- | CSS Color |
attributes |

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
| `titleGap` | `string` | No | — | Gap between title and subtitle |
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
| `backgroundColor` | `string` | No | — | Background color |
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
| `backgroundColor` | `string` | No | `"transparent"` | Background color |
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
| `gap` | `string` | No | `"0"` | Gap between items |
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

## Animation

Dual-mode animation component. Use **Motion mode** (declarative props via `motion/react`) or **Legacy mode** (Web Animations API keyframes). The component auto-detects which mode to use based on which props you pass.

### Motion Mode

When you pass any motion prop (`initial`, `animate`, `exit`, `whileHover`, `whileTap`, `whileInView`, `variants`), the component renders as `motion.div` and uses the Motion library.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | Yes | — | Content to animate |
| `initial` | `Record<string, any>` | No | — | Initial state (e.g. `{ opacity: 0, y: 20 }`) |
| `animate` | `Record<string, any>` | No | — | Target state. Animates when this value changes |
| `exit` | `Record<string, any>` | No | — | Exit state (use with `AnimatePresence`) |
| `whileHover` | `Record<string, any>` | No | — | State on hover |
| `whileTap` | `Record<string, any>` | No | — | State on tap/click |
| `whileInView` | `Record<string, any>` | No | — | State when entering viewport |
| `transition` | `MotionTransition` | No | spring | Spring or tween config |
| `variants` | `Record<string, any>` | No | — | Named animation states |
| `layout` | `boolean \| "position" \| "size" \| "preserve"` | No | — | Layout animations |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all" }` | No | — | Viewport config for `whileInView` |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |

```tsx
import { Animation } from "elk-components";

// Basic fade-in
<Animation
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  child={() => <MyCard />}
/>

// Spring transition
<Animation
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  child={() => <Hero />}
/>

// Hover + tap gestures
<Animation
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  child={() => <Button />}
/>

// Scroll-triggered entrance
<Animation
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
  child={() => <Section />}
/>

// Layout animation (auto-animate size/position changes)
<Animation layout child={() => <ExpandingBox />} />
```

### Legacy Mode (Web Animations API)

When no motion props are present, the component uses the native Web Animations API with keyframes.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | Yes | — | Content to animate |
| `keyframes` | `Keyframe[]` | No | fade-up | Array of Keyframe objects |
| `duration` | `number` | No | 300 | Duration in ms |
| `delay` | `number` | No | 0 | Delay in ms |
| `iterations` | `number` | No | 1 | Repeat count (`Infinity` for loop) |
| `direction` | `PlaybackDirection` | No | "normal" | Play direction |
| `fill` | `FillMode` | No | "forwards" | Style retention after animation |
| `easing` | `string` | No | "ease" | CSS timing function |
| `isAutomatic` | `boolean` | No | true | Play immediately on mount |
| `gesture` | `"click" \| "hover" \| "focus" \| "scroll" \| "none"` | No | "none" | Trigger gesture |

```tsx
// Play on hover
<Animation
  keyframes={[{ opacity: 0 }, { opacity: 1 }]}
  duration={500}
  gesture="hover"
  isAutomatic={false}
  child={() => <FadeInOnHover />}
/>

// Imperative control via onFunc
<Animation
  keyframes={[{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }]}
  duration={1000}
  iterations={Infinity}
  onFunc={(self) => {
    self.play(); // or self.pause(), self.reverse(), self.cancel()
  }}
  child={() => <Spinner />}
/>
```

---

## Transition

Switches between two elements (`from` and `to`) with built-in CSS transition effects or Motion-based enter/exit animations.

### CSS Mode (default)

Uses CSS transitions with 13 built-in effect presets.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `from` | `ElementType` | Yes | — | Initial element |
| `to` | `ElementType` | Yes | — | Target element |
| `active` | `boolean` | No | — | Manual control (true = show `to`) |
| `effect` | `TransitionEffect` | No | "fade" | Built-in effect preset |
| `duration` | `number` | No | 300 | Duration in ms |
| `delay` | `number` | No | 0 | Delay in ms |
| `easing` | `string` | No | cubic-bezier(0.4,0,0.2,1) | CSS easing |
| `isAutomatic` | `boolean` | No | false | Transition on mount |
| `gesture` | `"click" \| "hover" \| "focus" \| "scroll" \| "none"` | No | "none" | Trigger gesture |
| `origin` | `string` | No | "top left" | Transform origin |
| `threshold` | `number` | No | — | Threshold for gesture timing calculations |
| `onTransitionEnd` | `() => void` | No | — | Callback fired when the transition animation ends |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |

**Built-in effects:** `fade`, `slide-left`, `slide-right`, `slide-up`, `slide-down`, `zoom`, `flip`, `liquid`, `smooth`, `morph`, `glide`, `reveal`, `pop`

```tsx
import { Transition } from "elk-components";

// Fade between two views
<Transition
  from={() => <LoginView />}
  to={() => <RegisterView />}
  effect="fade"
  duration={400}
  gesture="click"
/>

// Slide on hover
<Transition
  from={() => <DefaultState />}
  to={() => <HoverState />}
  effect="slide-left"
  gesture="hover"
  duration={250}
/>

// Controlled with active prop
const [isOn, setIsOn] = useState(false);
<Transition
  from={() => <Off />}
  to={() => <On />}
  active={isOn}
  effect="zoom"
  duration={350}
/>
<Button gest={{ onClick: () => setIsOn(!isOn) }}
  child={() => <Text text="Toggle" type="p" />}
/>
```

### Motion Mode

Enable with `useMotion` to use `AnimatePresence` + `motion.div` for enter/exit animations. Built-in effects are auto-converted to Motion-compatible values.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `useMotion` | `boolean` | Yes | false | Enable Motion mode |
| `motionInitial` | `Record<string, any>` | No | from effect | Custom Motion initial state |
| `motionExit` | `Record<string, any>` | No | from effect | Custom Motion exit state |
| `motionTransition` | `MotionTransition` | No | spring | Motion transition config |

```tsx
<Transition
  useMotion
  from={() => <StepOne />}
  to={() => <StepTwo />}
  effect="slide-right"
  duration={400}
  gesture="click"
/>

// Custom Motion states
<Transition
  useMotion
  from={() => <PanelA />}
  to={() => <PanelB />}
  motionInitial={{ opacity: 0, x: -100, rotateY: -90 }}
  motionExit={{ opacity: 0, x: 100, rotateY: 90 }}
  motionTransition={{ type: "spring", stiffness: 120, damping: 20 }}
  gesture="click"
/>
```

---

## LetterAnimation

Animates individual letters or words of a text string with 20 built-in presets, per-letter/word keyframe overrides, and staggered timing.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | — | Text to animate |
| `type` | `"letters" \| "words"` | No | "letters" | Animation granularity |
| `animation` | `AnimationPreset` | No | "fadeUp" | Built-in preset name |
| `keyframes` | `Keyframe[]` | No | fadeUp | Custom keyframes for all tokens |
| `letterKeyframes` | `Keyframe[][]` | No | — | Per-letter keyframes (letters mode) |
| `words` | `WordSegment[]` | No | — | Word segments with per-word keyframes |
| `size` | `string` | No | — | Font size (e.g. `"2rem"`) |
| `textType` | `"h1" \| "h2" \| ... \| "p" \| "pre"` | No | "div" | HTML element type |
| `duration` | `number` | No | 300 | Animation duration in ms |
| `delay` | `number` | No | 0 | Base delay in ms |
| `stagger` | `number` | No | 50 | Delay between tokens in ms |
| `iterations` | `number` | No | 1 | Repeat count |
| `direction` | `PlaybackDirection` | No | "normal" | Play direction |
| `fill` | `FillMode` | No | "forwards" | Style retention |
| `easing` | `string` | No | "ease" | CSS timing function |
| `isOpacity` | `boolean` | No | — | Force opacity to 1 (transform-only animation, no fade) |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |

**Built-in presets:** `fadeUp`, `fadeDown`, `fadeIn`, `slideLeft`, `slideRight`, `scaleUp`, `scaleDown`, `rotateIn`, `flipIn`, `bounceIn`, `typewriter`, `blurIn`, `swingIn`, `wave`, `glitch`, `pop`, `dropIn`, `foldIn`, `elastic`, `spiral`

```tsx
import { LetterAnimation } from "elk-components";

// Basic letter animation
<LetterAnimation
  text="Hello World"
  animation="bounceIn"
  size="3rem"
  stagger={60}
  duration={400}
/>

// Word-level animation
<LetterAnimation
  text="Welcome to elk-components"
  type="words"
  animation="slideLeft"
  size="2rem"
  stagger={80}
/>

// Per-letter custom keyframes
<LetterAnimation
  text="CUSTOM"
  size="4rem"
  letterKeyframes={[
    [{ opacity: 0, transform: "rotate(-180deg)" }, { opacity: 1, transform: "rotate(0)" }],
    [{ opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2 }, { opacity: 1, scale: 1 }],
    // ... one array per letter
  ]}
/>

// Word segments with per-word overrides
<LetterAnimation
  type="words"
  size="2.5rem"
  words={[
    { text: "Bold", keyframes: [{ opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.2 }, { opacity: 1, scale: 1 }] },
    { text: " " },
    { text: "Text", keyframes: [{ opacity: 0, y: 30 }, { opacity: 1, y: 0 }] },
  ]}
/>

// Imperative control
<LetterAnimation
  text="Controlled"
  animation="elastic"
  size="2rem"
  onFunc={(self) => {
    self.play();
    // self.pause(), self.reverse(), self.cancel()
  }}
/>
```

---

### Panel

Styled container `<div>` with layout, color, and border properties.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Content slot |
| `width` | `string` | No | `"100%"` | Width |
| `height` | `string` | No | — | Height |
| `padding` | `string` | No | — | Inner padding |
| `margin` | `string` | No | — | Outer margin |
| `color` | `string` | No | — | Background color |
| `border` | `string` | No | — | Border style |
| `borderRadius` | `string` | No | — | Border radius |
| `overflow` | `'visible'\|'hidden'\|'scroll'\|'auto'` | No | — | Overflow behavior |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Panel) => void` | No | — | Instance callback |

```tsx
<Panel width="300px" padding="1rem" border="1px solid rgba(255,255,255,0.1)" borderRadius=".5rem">
  <Text text="Panel content" type="p" />
</Panel>
```

---

### Span

Inline `<span>` element with shorthand style props for color, font, and spacing.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Content slot |
| `color` | `string` | No | — | Text color |
| `fontSize` | `string` | No | — | Font size |
| `fontWeight` | `string \| number` | No | — | Font weight |
| `padding` | `string` | No | — | Padding |
| `margin` | `string` | No | — | Margin |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLSpanElement>` | No | — | Native span attributes |
| `onFunc` | `(self: _Span) => void` | No | — | Instance callback |

```tsx
<Span color="red" fontSize="1.2rem" fontWeight="bold">
  <Text text="inline styled text" type="p" />
</Span>
```

---

### ScrollView

Scrollable container with configurable direction and optional hidden scrollbar.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Content slot |
| `direction` | `'vertical'\|'horizontal'\|'both'` | No | `"vertical"` | Scroll direction |
| `width` | `string` | No | `"100%"` | Width |
| `height` | `string` | No | `"100%"` | Height |
| `padding` | `string` | No | — | Inner padding |
| `hideScrollbar` | `boolean` | No | — | Hide scrollbar via CSS |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _ScrollView) => void` | No | — | Instance callback |

```tsx
<ScrollView direction="vertical" height="400px" hideScrollbar>
  <Stack direction="column" gap="1rem" child={() => (
    <>
      <Text text="Item 1" type="p" />
      <Text text="Item 2" type="p" />
      <Text text="Item 3" type="p" />
    </>
  )} />
</ScrollView>
```

---

### Section

Semantic `<section>` element with a required title and optional body content.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `ElementType` | Yes | — | Section heading |
| `child` | `ElementType` | No | — | Body content |
| `padding` | `string` | No | — | Inner padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLElement>` | No | — | Native section attributes |
| `onFunc` | `(self: _Section) => void` | No | — | Instance callback |

```tsx
<Section
  title={() => <Text text="Settings" type="h2" />}
  child={() => <Text text="Configure your preferences here" type="p" />}
/>
```

---

### Article

Semantic `<article>` element with required title and body.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `ElementType` | Yes | — | Article title |
| `body` | `ElementType` | Yes | — | Article body |
| `padding` | `string` | No | — | Padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLElement>` | No | — | Native article attributes |
| `onFunc` | `(self: _Article) => void` | No | — | Instance callback |

```tsx
<Article
  title={() => <Text text="Getting Started" type="h2" />}
  body={() => <Text text="Follow these steps to set up your project." type="p" />}
/>
```

---

### Navigator

Semantic `<nav>` element with flexbox layout for navigation bars.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Navigation content |
| `direction` | `'horizontal'\|'vertical'` | No | `"horizontal"` | Flex direction |
| `gap` | `string` | No | — | Gap between items |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLElement>` | No | — | Native nav attributes |
| `onFunc` | `(self: _Navigator) => void` | No | — | Instance callback |

```tsx
<Navigator direction="horizontal" gap="1rem">
  <Button child={() => <Text text="Home" type="p" />} />
  <Button child={() => <Text text="About" type="p" />} />
  <Button child={() => <Text text="Contact" type="p" />} />
</Navigator>
```

---

### TextButton

Transparent `<button>` with text content and hover/active color states.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Custom content (renders instead of `text`) |
| `text` | `string` | No | — | Plain text content |
| `color` | `string` | No | `"inherit"` | Text color |
| `hoverColor` | `string` | No | — | Text color on hover |
| `activeColor` | `string` | No | — | Text color when active |
| `fontSize` | `string` | No | — | Font size |
| `padding` | `string` | No | `"0"` | Padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLButtonElement>` | No | — | Native button attributes |
| `onFunc` | `(self: _TextButton) => void` | No | — | Instance callback |

```tsx
<TextButton text="Learn more" color="blue" hoverColor="darkblue" />
<TextButton child={() => <Text text="Cancel" type="p" />} padding="0 .5rem" />
```

---

### Tiles

Flexible list-item layout with leading, title, subtitle, and trailing sections.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `leading` | `ElementType` | No | — | Leading content (icon, avatar) |
| `title` | `ElementType` | No | — | Title content |
| `subtitle` | `ElementType` | No | — | Subtitle content |
| `trailing` | `ElementType` | No | — | Trailing content (action button) |
| `padding` | `string` | No | `".75rem 1rem"` | Container padding |
| `gap` | `string` | No | `".75rem"` | Gap between sections |
| `borderBottom` | `string` | No | — | Bottom border style |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Tiles) => void` | No | — | Instance callback |

```tsx
<Tiles
  leading={() => <Avatar src="/user.jpg" size="sm" />}
  title={() => <Text text="John Doe" type="h3" />}
  subtitle={() => <Text text="john@example.com" type="p" />}
  trailing={() => <IconButton icon={() => <MoreVertical />} />}
  borderBottom="1px solid rgba(255,255,255,0.1)"
/>
```

---

### List

Single `<li>` list item element for use inside `ListView`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | List item content |
| `padding` | `string` | No | — | Padding |
| `margin` | `string` | No | — | Margin |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLLIElement>` | No | — | Native li attributes |
| `onFunc` | `(self: _List) => void` | No | — | Instance callback |

```tsx
<ListView child={() => (
  <>
    <List child={() => <Text text="First item" type="p" />} />
    <List child={() => <Text text="Second item" type="p" />} />
    <List child={() => <Text text="Third item" type="p" />} />
  </>
)} />
```

---

### ListView

Unordered `<ul>` list container with `listStyle: none`. Use with `List` children.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | List items content |
| `padding` | `string` | No | — | Padding |
| `margin` | `string` | No | — | Margin |
| `gap` | `string` | No | — | Gap between items |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _ListView) => void` | No | — | Instance callback |

```tsx
<ListView gap=".5rem" child={() => (
  <>
    <List child={() => <Text text="Item A" type="p" />} />
    <List child={() => <Text text="Item B" type="p" />} />
  </>
)} />
```

---

### ListMenu

Vertical menu container. Delegates to `Stack` with `direction: "column"`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Menu content |
| `gap` | `string` | No | `"0rem"` | Gap between items |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _ListMenu) => void` | No | — | Instance callback |

```tsx
<ListMenu gap=".5rem">
  <Button child={() => <Text text="Profile" type="p" />} />
  <Button child={() => <Text text="Settings" type="p" />} />
  <Button child={() => <Text text="Logout" type="p" />} />
</ListMenu>
```

---

### BottomModal

Full-screen overlay with a bottom-anchored panel that slides up. Renders nothing when closed.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Modal body content |
| `title` | `ElementType` | No | — | Modal title |
| `isOpen` | `boolean` | No | — | Controls visibility |
| `onClose` | `() => void` | No | — | Close callback |
| `height` | `string` | No | `"80vh"` | Max panel height |
| `padding` | `string` | No | `"1rem"` | Panel padding |
| `showHandle` | `boolean` | No | `true` | Show drag handle indicator |
| `backgroundColor` | `string` | No | `"rgba(0,0,0,0.8)"` | Backdrop color |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _BottomModal) => void` | No | — | Instance callback |

```tsx
const [open, setOpen] = useState(false);

<BottomModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title={() => <Text text="Select Option" type="h3" />}
  height="60vh"
  child={() => (
    <Stack direction="column" gap=".5rem" child={() => (
      <>
        <Button child={() => <Text text="Option A" type="p" />} />
        <Button child={() => <Text text="Option B" type="p" />} />
      </>
    )} />
  )}
/>
```

---

### SidePanel

Fixed-position slide-in `<aside>` panel anchored to the left or right edge. Renders nothing when closed.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Panel content |
| `side` | `'left'\|'right'` | No | `"left"` | Which edge to anchor to |
| `width` | `string` | No | `"280px"` | Panel width |
| `isOpen` | `boolean` | No | — | Controls visibility |
| `onClose` | `() => void` | No | — | Close callback (backdrop click) |
| `backgroundColor` | `string` | No | `"rgba(255,255,255,0.05)"` | Panel background |
| `padding` | `string` | No | `"1rem"` | Panel padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLElement>` | No | — | Native aside attributes |
| `onFunc` | `(self: _SidePanel) => void` | No | — | Instance callback |

```tsx
const [open, setOpen] = useState(false);

<SidePanel
  isOpen={open}
  side="right"
  onClose={() => setOpen(false)}
  child={() => (
    <Stack direction="column" gap="1rem" child={() => (
      <>
        <Text text="Menu" type="h2" />
        <Button child={() => <Text text="Settings" type="p" />} />
        <Button child={() => <Text text="Help" type="p" />} />
      </>
    )} />
  )}
/>
```

---

### Reabon

Dropdown/popover component positioned absolutely below a trigger element. Auto-closes on outside click.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Dropdown content |
| `trigger` | `ElementType` | No | — | Trigger element |
| `isOpen` | `boolean` | No | — | Controlled open state |
| `onClose` | `() => void` | No | — | Close callback (outside click) |
| `width` | `string` | No | `"200px"` | Dropdown width |
| `backgroundColor` | `string` | No | `"rgba(255,255,255,0.05)"` | Dropdown background |
| `borderRadius` | `string` | No | `".5rem"` | Dropdown border radius |
| `padding` | `string` | No | `".25rem 0"` | Dropdown padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLDivElement>` | No | — | Native div attributes |
| `onFunc` | `(self: _Reabon) => void` | No | — | Instance callback |

```tsx
const [open, setOpen] = useState(false);

<Reabon
  isOpen={open}
  onClose={() => setOpen(false)}
  trigger={() => <Button child={() => <Text text="Menu" type="p" />} />}
  width="180px"
  child={() => (
    <ListMenu gap="0rem" child={() => (
      <>
        <Button child={() => <Text text="Edit" type="p" />} />
        <Button child={() => <Text text="Delete" type="p" />} />
      </>
    )} />
  )}
/>
```

---

### Tab

Transparent `<button>` styled as a tab indicator. Color toggles based on `isActive`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `ElementType` | Yes | — | Tab label |
| `isActive` | `boolean` | No | `false` | Whether tab is selected |
| `onClick` | `() => void` | No | — | Click handler |
| `activeColor` | `string` | No | `"#fff"` | Text color when active |
| `inactiveColor` | `string` | No | `"rgba(255,255,255,0.5)"` | Text color when inactive |
| `padding` | `string` | No | `".5rem 1rem"` | Button padding |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `gest` | `HTMLAttributes<HTMLButtonElement>` | No | — | Native button attributes |
| `onFunc` | `(self: _Tab) => void` | No | — | Instance callback |

```tsx
<Tab
  label={() => <Text text="Tab 1" type="p" />}
  isActive={activeTab === "tab1"}
  onClick={() => setActiveTab("tab1")}
/>
```

---

### TabView

Self-contained tabbed interface with tab buttons and content panel. Supports controlled and uncontrolled modes.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `Array<{ id: string; label: ElementType; content: ElementType }>` | No | — | Tab definitions |
| `activeTab` | `string` | No | — | Controlled active tab id |
| `defaultTab` | `string` | No | — | Uncontrolled default tab id |
| `onChange` | `(tabId: string) => void` | No | — | Tab change callback |
| `gap` | `string` | No | — | Spacing between tab buttons |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _TabView) => void` | No | — | Instance callback |

```tsx
<TabView
  tabs={[
    { id: "info", label: () => <Text text="Info" type="p" />, content: () => <Text text="Info content" type="p" /> },
    { id: "settings", label: () => <Text text="Settings" type="p" />, content: () => <Text text="Settings content" type="p" /> },
  ]}
  defaultTab="info"
  onChange={(id) => console.log("Switched to", id)}
  gap="1rem"
/>
```

---

### PageScrollView

Full-height scroll container with snap-scrolling sections and IntersectionObserver-based section tracking.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | No | — | Single child (non-section mode) |
| `sections` | `Array<{ id: string; child: ElementType }>` | No | — | Snap-scroll sections |
| `activeSection` | `string` | No | — | Section ID to scroll to programmatically |
| `onSectionChange` | `(sectionId: string) => void` | No | — | Callback when visible section changes |
| `width` | `string` | No | `"100%"` | Width |
| `height` | `string` | No | `"100vh"` | Height |
| `snap` | `boolean` | No | `true` | Enable vertical snap scrolling |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _PageScrollView) => void` | No | — | Instance callback |

```tsx
<PageScrollView
  sections={[
    { id: "hero", child: () => <Center child={() => <Text text="Welcome" type="h1" />} /> },
    { id: "features", child: () => <Center child={() => <Text text="Features" type="h1" />} /> },
    { id: "pricing", child: () => <Center child={() => <Text text="Pricing" type="h1" />} /> },
  ]}
  onSectionChange={(id) => console.log("Current section:", id)}
/>
```

---

### Gap

Empty spacer `<div>` for spacing between sibling elements.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string` | No | — | CSS width |
| `height` | `string` | No | — | CSS height |
| `flex` | `string` | No | — | CSS flex value |

```tsx
<Stack direction="row" child={() => (
  <>
    <Button child={() => <Text text="Left" type="p" />} />
    <Gap flex="1" />
    <Button child={() => <Text text="Right" type="p" />} />
  </>
)} />
```

---

### Example

Lightweight placeholder `<span>` for prototyping. Renders HTML via `dangerouslySetInnerHTML`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string` | No | — | CSS width |
| `height` | `string` | No | — | CSS height |
| `background` | `string` | No | — | Background color |
| `border` | `string` | No | — | CSS border |
| `borderRadius` | `string` | No | — | CSS border radius |
| `text` | `string` | No | `""` | HTML string |
| `onFunc` | `(self: _Example) => void` | No | — | Instance callback |

```tsx
<Example width="100px" height="100px" background="rgba(255,255,255,0.1)" text="<b>Bold</b>" />
```

---

### SectionDivider

SVG-based decorative divider between content sections. 12 built-in visual variants with continuous scroll animation and floating undulation.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'wave'\|'curl'\|'zigzag'\|'dots'\|'tilde'\|'heart'\|'diamond'\|'leaf'\|'curve'\|'pulse'\|'loop'\|'scroll'` | No | `"wave"` | Visual style |
| `color` | `string` | No | `"#e2e8f0"` | Stroke/fallback fill color |
| `fillColor` | `string` | No | uses `color` | Fill color for filled variants |
| `strokeWidth` | `number` | No | `2` | Stroke width in px |
| `height` | `number` | No | `80` | SVG height in px |
| `width` | `string` | No | `"100%"` | CSS width |
| `flip` | `boolean` | No | — | Mirror vertically |
| `customPath` | `string` | No | — | Override built-in SVG path |
| `className` | `string` | No | — | CSS class |
| `style` | `CSSProperties` | No | — | Inline styles |
| `child` | `ElementType` | No | — | Child component |
| `gest` | `SVGAttributes<SVGSVGElement>` | No | — | SVG attributes |
| `onFunc` | `(self: _SectionDivider) => void` | No | — | Instance callback |
| `animate` | `boolean` | No | — | Enable continuous scroll animation |
| `duration` | `number` | No | variant-specific | Scroll animation duration per cycle in ms |
| `delay` | `number` | No | `0` | Delay before animation starts in ms |
| `direction` | `'ltr'\|'rtl'\|'ttb'\|'btt'` | No | `"ltr"` | Scroll direction |
| `easing` | `'linear'\|'ease'\|'ease-in'\|'ease-out'\|'ease-in-out'\|string` | No | `"linear"` | Scroll easing function |
| `gesture` | `'click'\|'hover'\|'focus'\|'scroll'\|'none'` | No | — | Gesture that triggers the animation |
| `listen` | `Store` | No | — | A store; when its state changes the animation replays |
| `float` | `boolean` | No | — | Enable continuous vertical undulation (bobbing on water) |
| `amplitude` | `number` | No | `15` | Float distance in px from center. Higher = more dramatic |
| `frequency` | `number` | No | variant-specific | Float oscillation cycles per animation duration |

```tsx
static
<SectionDivider variant="wave" color="#6366f1" height={60} />
<SectionDivider variant="dots" color="rgba(255,255,255,0.3)" />
<SectionDivider variant="heart" fillColor="#ec4899" flip />
```

```tsx
continuous scroll animation
<SectionDivider variant="wave" animate color="#6366f1" height={60} />
<SectionDivider variant="curl" animate direction="rtl" easing="ease-in-out" />
<SectionDivider variant="heart" fillColor="#ec4899" animate direction="ttb" />
```

```tsx
floating undulation (bobbing on water)
<SectionDivider variant="wave" float color="#6366f1" height={60} />
<SectionDivider variant="curl" float amplitude={25} frequency={6} />
<SectionDivider variant="tilde" float amplitude={10} frequency={2} />
```

```tsx
combine scroll + float
<SectionDivider variant="wave" animate float color="#6366f1" />
<SectionDivider variant="curl" animate float amplitude={20} frequency={4} direction="rtl" easing="ease-in-out" />
```

```tsx
gesture-triggered
<SectionDivider variant="dots" gesture="hover" animate float color="#6366f1" />
<SectionDivider variant="wave" gesture="click" animate float />
```

---

### Padding

Wrapper `<div>` applying configurable padding using both physical and logical CSS properties.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | Yes | — | Content slot |
| `left` | `string` | No | — | Left padding |
| `right` | `string` | No | — | Right padding |
| `top` | `string` | No | — | Top padding |
| `bottom` | `string` | No | — | Bottom padding |
| `inline` | `string` | No | — | Logical inline (horizontal) padding |
| `block` | `string` | No | — | Logical block (vertical) padding |
| `blockStart` | `string` | No | — | Logical block-start padding |
| `blockEnd` | `string` | No | — | Logical block-end padding |
| `padding` | `string` | No | `"1rem"` | Shorthand padding (overrides all sides) |

```tsx
<Padding padding="2rem">
  <Text text="Padded content" type="p" />
</Padding>
<Padding inline="1.5rem" block=".5rem">
  <Text text="Logically padded" type="p" />
</Padding>
```

---

### GridView

CSS Grid container with configurable template and auto-placement properties.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `child` | `ElementType` | Yes | — | Grid children |
| `templateRows` | `string` | No | — | `grid-template-rows` |
| `templateColumns` | `string` | No | `"1fr 1fr"` | `grid-template-columns` |
| `autoRows` | `string` | No | — | `grid-auto-rows` |
| `autoColumn` | `string` | No | — | `grid-auto-columns` |
| `area` | `string` | No | — | `grid-area` |
| `autoFlow` | `string` | No | — | `grid-auto-flow` |
| `justifyItems` | `string` | No | `"center"` | `justify-items` |
| `style` | `CSSProperties` | No | — | Inline styles |
| `onFunc` | `(self: _GridView) => void` | No | — | Instance callback |

```tsx
<GridView templateColumns="repeat(3, 1fr)" gap="1rem" autoRows="minmax(100px, auto)">
  <Card body={() => <Text text="Cell 1" type="p" />} />
  <Card body={() => <Text text="Cell 2" type="p" />} />
  <Card body={() => <Text text="Cell 3" type="p" />} />
</GridView>
```

---

## Pseudo Components

Import pseudo components from `elk-components`:

```ts
import { Hover } from "elk-components";
```

### Hover

A pseudo component that applies inline styles on mouseenter and restores original styles on mouseleave. Useful for building hover effects without CSS.

```tsx
<Hover style={{ color: "red" }} transition="color 0.3s">
  <span>Hover me</span>
</Hover>
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `style` | `CSSProperties` | Yes | — | Inline styles applied on hover |
| `child` | `ElementType` | No | — | Component type to render as wrapper |
| `key` | `string` | No | — | React key |
| `transition` | `string \| null` | No | `""` | CSS transition string. `null` skips setting transition on leave |

---

## Hooks

Import hooks from `elk-components/hooks`:

```ts
import { useState, useRef, useEffect, useCallback, createStore, useInstance, useComponentData } from "elk-components/hooks";
```

### useState

Enhanced version of React's `useState` with `reset()` and `get()` methods. Returns a named object instead of a tuple.

```ts
const state = useState<T>(initialValue);
```

| Property | Type | Description |
|----------|------|-------------|
| `value` | `T` | Current state value |
| `set` | `(value: SetStateAction<T>) => void` | Set value (accepts value or updater function) |
| `reset` | `() => void` | Reset to original `initialValue` |
| `get` | `() => T` | Get current value (stable reference, no re-render dependency) |

```tsx
const count = useState(0);

count.set(1);               // set value
count.set(prev => prev + 1); // updater function
count.get();                // read without re-render dependency
count.reset();              // back to 0
```

### useStateLazy

Lazy-initialization variant. The initializer function only runs on first render.

```ts
const state = useStateLazy<T>(() => expensiveCompute());
```

Same return shape as `useState`. Note: `reset()` re-executes the initializer (unlike `useState` which resets to the captured initial value).

---

### useRef

Enhanced `useRef` with `setValue`, `getValue`, and `isSet` methods. Use `setValue()` to mutate — direct `.current` assignment is not supported.

```ts
const ref = useRef<T>(initialValue);
```

| Property | Type | Description |
|----------|------|-------------|
| `current` | `T` | Read-only getter for current value |
| `setValue` | `(value: T) => void` | Update the ref |
| `getValue` | `() => T` | Returns current value (stable callback) |
| `isSet` | `() => boolean` | `true` if current is not `null` or `undefined` |

```tsx
const inputRef = useRef<HTMLInputElement>(null);

inputRef.setValue(document.getElementById("my-input"));
inputRef.getValue();  // HTMLElement | null
inputRef.isSet();     // true
```

### usePreviousValue

Convenience wrapper around `useRef` for tracking previous values.

```ts
const prev = usePreviousValue<T>(initialValue);
// Returns same UseRefReturn shape as useRef
```

---

### useEffect

Enhanced effect hooks wrapping React's `useEffect` with additional patterns.

#### useEffect (basic)

Thin wrapper around `React.useEffect`. Defaults `deps` to `undefined` (runs every render).

```ts
useEffect(effect, deps?);
```

#### useMountEffect

Runs `effect` once on mount. Cleanup function supported.

```ts
useMountEffect(() => {
  init();
  return () => cleanup();
}, []);
```

#### useUpdateEffect

Runs `effect` on every render (no deps array).

```ts
useUpdateEffect(() => {
  console.log("rendered");
});
```

#### usePreviousEffect

Tracks previous dependency values. The effect receives the previous deps array.

```ts
usePreviousEffect(
  deps,                        // deps to track
  (prevDeps) => { /* ... */ }, // called with previous deps (undefined on first run)
  currentDeps                  // actual React dependency array
);
```

#### useDebounceEffect

Debounced effect. Waits `delay` ms before calling `effect`. Clears timeout on cleanup or deps change.

```ts
useDebounceEffect(
  () => { fetchData(query); },
  300,                          // delay in ms
  [query]                       // deps
);
```

---

### useCallback / useMemo

Enhanced memoization hooks. When `deps` is omitted, defaults to `[]` (empty array) — differs from React which means "every render."

#### useCallback

```ts
const fn = useCallback(() => doSomething(), deps?);
```

#### useMemo

```ts
const value = useMemo(() => computeExpensive(), deps?);
```

#### useMemoOnce

Memoizes a value that **never recalculates**. Use for constants.

```ts
const CONSTANT = useMemoOnce(() => ({ key: "value" }));
```

#### useStableCallback

Returns a **permanently stable** callback reference. Always calls the latest `callback` but the returned function identity never changes.

```ts
const stableFn = useStableCallback((data) => {
  console.log(data);
});

// stableFn identity is always the same across renders
```

---

### createStore / useStore / useSetState

A lightweight external store compatible with `useSyncExternalStore`.

#### createStore

Creates a vanilla JS store (no React dependency).

```ts
const store = createStore<T>(initialState);
```

| Method | Type | Description |
|--------|------|-------------|
| `getState` | `() => T` | Get current state |
| `setState` | `(partial: Partial<T> \| (prev) => Partial<T>) => void` | Shallow-merge update |
| `subscribe` | `(listener: () => void) => () => void` | Subscribe (returns unsubscribe) |
| `getSnapshot` | `() => T` | Get snapshot (for `useSyncExternalStore`) |

#### useStore

Hook that subscribes to a `Store`. Returns the full state object. Re-renders only when state reference changes.

```ts
const state = useStore(store);
```

#### useSetState

Returns a stable `setState` callback bound to the given store.

```ts
const setState = useSetState(store);
setState({ count: 1 });            // partial update
setState(prev => ({ count: prev.count + 1 })); // updater
```

```tsx
// Full example:
const counterStore = createStore({ count: 0 });

function Counter() {
  const { count } = useStore(counterStore);
  const setCount = useSetState(counterStore);

  return (
    <Button
      child={() => <Text text={`Count: ${count}`} type="p" />}
      gest={{ onClick: () => setCount(prev => ({ count: prev.count + 1 })) }}
    />
  );
}
```

---

### useInstance / useComponentData

Cross-component data sharing without prop drilling.

#### useInstance

Creates or retrieves a named component instance in a global registry. Auto-registers on mount, auto-deletes on unmount.

```ts
const instance = useInstance(componentKey?);
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Component's unique ID |
| `registerElement` | `(el: HTMLElement \| null) => void` | Associate a DOM element |
| `getElement` | `() => HTMLElement \| null` | Get the registered element |
| `setData` | `<T>(key: string, value: T) => void` | Store arbitrary data |
| `getData` | `<T>(key: string) => T \| undefined` | Read data by key |
| `isMounted` | `() => boolean` | Check if component is mounted |

#### useComponentData

Read-only accessor to another component's `useInstance` data. Reads directly from the global registry — does **not** re-render when source data changes.

```ts
const data = useComponentData<T>(componentKey, dataKey);
```

```tsx
// Component A — registers data
function Sidebar() {
  const { setData } = useInstance("sidebar");
  useEffect(() => { setData("width", 280); }, []);
  return <SidePanel ... />;
}

// Component B — reads data (no prop drilling needed)
function Content() {
  const width = useComponentData<number>("sidebar", "width");
  return <Text text={`Sidebar width: ${width}`} type="p" />;
}
```

---

## Advanced Prop Patterns

### CSS Values

All style props accept any valid CSS string. Gap, margin, padding, and dimension props are typed as `string` and accept any CSS length value (`rem`, `px`, `em`, `%`, etc.).

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

---

## AI Agent Guidelines

Strict rules for AI coding assistants when using elk-components:

### Render Prop Pattern (MANDATORY)

ALL content slots (`child`, `header`, `body`, `footer`, `title`, `subtitle`, `leading`, `trailing`, `icon`, `trigger`, `label`, etc.) accept `React.JSX.ElementType` — pass an arrow function, NEVER raw JSX.

```tsx
// CORRECT
<Button child={() => <Text text="Click" type="p" />} />
<Card header={() => <Text text="Title" type="h2" />} body={() => <Text text="Body" type="p" />} />
<Stack direction="row" gap="1rem" child={() => (
  <>
    <Button child={() => <Text text="A" type="p" />} />
    <Button child={() => <Text text="B" type="p" />} />
  </>
)} />

// WRONG — will break
<Button child={<Text text="Click" type="p" />} />
<Card header={<Text text="Title" type="h2" />} />
```

### Event Handlers via `gest`

All native DOM events MUST be passed through the `gest` prop, NOT as direct props.

```tsx
// CORRECT
<Button gest={{ onClick: () => handleClick() }} />
<Input gest={{ onChange: (e) => setValue(e.target.value) }} />
<Container gest={{ onMouseEnter: () => setHover(true) }} />

// WRONG
<Button onClick={() => handleClick()} />
<Input onChange={(e) => setValue(e.target.value)} />
```

### State Management via elk-components Hooks

Use `elk-components/hooks` for state — not React's `useState`, `useEffect`, `useRef`, or `useCallback`.

```tsx
// CORRECT — import from elk-components/hooks
import { useState, useRef, useEffect, useCallback, createStore } from "elk-components/hooks";

// WRONG — do not import from React
import { useState, useEffect } from "react";
```

### Component Naming (Case-Sensitive)

Components must be referenced by their exact PascalCase names. The auto-import plugin injects them at build time — no manual imports needed.

```tsx
// These are auto-imported — just use them:
<Page>, <Header>, <Text>, <Container>, <Stack>, <Center>, <Divider>,
<Panel>, <Span>, <ScrollView>, <Section>, <Article>, <Navigator>,
<Button>, <IconButton>, <TextButton>, <Card>, <Badge>, <Avatar>,
<Image>, <Input>, <Tiles>, <List>, <ListView>, <ListMenu>,
<BottomModal>, <SidePanel>, <Reabon>, <Tab>, <TabView>,
<Icon>, <IconNetwork>, <Gap>, <Example>, <Padding>, <GridView>,
<Hover>, <Main>, <Animation>, <Transition>, <LetterAnimation>,
<SectionDivider>, <PageScrollView>
```

### Icons Usage

Import icon components from the `elk-components` package or use as arrow functions.

```tsx
// With the Icon wrapper (recommended):
<Icon icon={() => <Lock />} size="lg" color="white" />

// In IconButton:
<IconButton icon={() => <Search />} gest={{ onClick: search }} />

// Direct usage (size/color forwarded automatically):
<Lock size={24} color="currentColor" />
```

### Gap Prop

The `gap` prop accepts any valid CSS length string (`string` type). No type enforcement on units.

```tsx
// All valid:
gap="1rem"
gap="8px"
gap="1.5em"
gap="10%"
gap="0"
```

### Do NOT Use Regular JSX Children

elk-components does NOT support `children` prop. Always use named render props.

```tsx
// CORRECT
<Panel child={() => <Text text="Content" type="p" />} />

// WRONG
<Panel><Text text="Content" type="p" /></Panel>
```

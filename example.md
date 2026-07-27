# Examples

Practical usage examples for elk-components.

---

## Page Layout

```tsx
import { Page, Header, Text, Stack, Card, Badge } from "elk-components";
import { Home, Settings, Bell } from "elk-components/icons";

<Page
  header={() => (
    <Header
      leading={() => <Icon icon={Home} size="md" />}
      title={() => <Text text="Dashboard" type="h1" />}
      subTitle={() => <Text text="Overview" type="p" />}
      titleGap=".3rem"
      action={() => <IconButton icon={() => <Bell />} borderRadius="4rem" />}
    />
  )}
  body={() => (
    <Stack direction="column" gap="1rem" padding="1rem">
      <Card
        padding="md"
        radius="lg"
        header={() => <Text text="Recent Activity" type="h2" />}
        body={() => <Text text="No new notifications." type="p" />}
      />
    </Stack>
  )}
  footer={() => <Text text="© 2026 elk-components" type="p" />}
/>
```

---

## Form Layout

```tsx
import { Stack, Input, Button, Text, Divider } from "elk-components";

function LoginForm() {
  return (
    <Stack direction="column" gap="1rem" width="350px" padding="2rem">
      <Text text="Sign In" type="h2" size="1.5rem" />
      <Input type="email" placeholder="Email" borderRadius=".5rem" />
      <Input type="password" placeholder="Password" borderRadius=".5rem" />
      <Button
        borderRadius=".5rem"
        padding=".6rem"
        child={() => <Text text="Log In" type="p" />}
        gest={{ onClick: () => console.log("submit") }}
      />
      <Divider direction="horizontal" size="xs" />
      <Button
        borderRadius=".5rem"
        padding=".6rem"
        color="rgba(255,255,255,0.6)"
        child={() => <Text text="Forgot password?" type="p" />}
      />
    </Stack>
  );
}
```

---

## Settings Page with Tabs

```tsx
import { TabView, Card, Text, Stack, Input, Badge } from "elk-components";

function SettingsPage() {
  return (
    <Card padding="lg" radius="lg" width="600px">
      <TabView
        tabs={[
          {
            id: "profile",
            label: () => <Text text="Profile" type="p" />,
            content: () => (
              <Stack direction="column" gap="1rem">
                <Input placeholder="Display name" borderRadius=".5rem" />
                <Input placeholder="Email" type="email" borderRadius=".5rem" />
                <Badge text="Pro Plan" variant="filled" size="sm" backgroundColor="#6366f1" />
              </Stack>
            ),
          },
          {
            id: "notifications",
            label: () => <Text text="Notifications" type="p" />,
            content: () => (
              <Stack direction="column" gap="1rem">
                <Text text="Email notifications" type="p" />
                <Text text="Push notifications" type="p" />
              </Stack>
            ),
          },
        ]}
        defaultTab="profile"
        gap="1rem"
      />
    </Card>
  );
}
```

---

## Animated List

```tsx
import { Animation, Card, Text, Stack, Avatar } from "elk-components";

function AnimatedList({ items }) {
  return (
    <Stack direction="column" gap=".75rem">
      {items.map((item, i) => (
        <Animation
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
          child={() => (
            <Card padding="md" radius="md">
              <Stack direction="row" gap="1rem" align="center">
                <Avatar src={item.avatar} size="sm" />
                <Text text={item.name} type="p" />
              </Stack>
            </Card>
          )}
        />
      ))}
    </Stack>
  );
}
```

---

## Bottom Sheet Modal

```tsx
import { useState } from "react";
import { BottomModal, Button, Text, Stack, Divider } from "elk-components";

function ShareSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        borderRadius="1rem"
        padding=".5rem 1.5rem"
        child={() => <Text text="Share" type="p" />}
        gest={{ onClick: () => setOpen(true) }}
      />
      <BottomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={() => <Text text="Share to..." type="h3" />}
        showHandle
      >
        <Stack direction="column" gap=".5rem">
          <Button borderRadius=".5rem" padding=".75rem" child={() => <Text text="Copy Link" type="p" />} />
          <Divider size="xs" />
          <Button borderRadius=".5rem" padding=".75rem" child={() => <Text text="Messages" type="p" />} />
          <Button borderRadius=".5rem" padding=".75rem" child={() => <Text text="Email" type="p" />} />
        </Stack>
      </BottomModal>
    </>
  );
}
```

---

## Dropdown Menu (Reabon)

```tsx
import { useState } from "react";
import { Reabon, Button, Text, ListMenu } from "elk-components";
import { MoreVertical, Edit, Trash, Copy } from "elk-components/icons";

function DropdownDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Reabon
      isOpen={open}
      onClose={() => setOpen(false)}
      trigger={() => (
        <IconButton borderRadius="4rem" icon={() => <MoreVertical />} gest={{ onClick: () => setOpen(!open) }} />
      )}
      width="160px"
      child={() => (
        <ListMenu gap="0">
          <Button borderRadius="0" padding=".5rem .75rem" child={() => <Text text="Edit" type="p" />} />
          <Button borderRadius="0" padding=".5rem .75rem" child={() => <Text text="Copy" type="p" />} />
          <Button borderRadius="0" padding=".5rem .75rem" color="#ef4444" child={() => <Text text="Delete" type="p" />} />
        </ListMenu>
      )}
    />
  );
}
```

---

## Section Divider Between Content

```tsx
import { Stack, Text, SectionDivider, Card } from "elk-components";

function LandingPage() {
  return (
    <Stack direction="column">
      <Card padding="lg" radius="0" backgroundColor="#1e1b4b">
        <Text text="Hero Section" type="h1" size="3rem" />
      </Card>
      <SectionDivider variant="wave" fillColor="#1e1b4b" height={60} />
      <Card padding="lg" radius="0">
        <Text text="Features Section" type="h2" />
      </Card>
      <SectionDivider variant="dots" color="rgba(255,255,255,0.2)" height={40} />
      <Card padding="lg" radius="0" backgroundColor="#0f172a">
        <Text text="Footer" type="p" />
      </Card>
    </Stack>
  );
}
```

---

## Animated Section Dividers

```tsx
import { Stack, Text, SectionDivider, Card } from "elk-components";

function AnimatedPage() {
  return (
    <Stack direction="column">
      <Card padding="lg" radius="0" backgroundColor="#1e1b4b">
        <Text text="Hero Section" type="h1" size="3rem" />
      </Card>
      <SectionDivider
        variant="wave"
        fillColor="#1e1b4b"
        height={60}
        animate
        duration={2000}
      />
      <Card padding="lg" radius="0">
        <Text text="Features Section" type="h2" />
      </Card>
      <SectionDivider
        variant="heart"
        fillColor="#ec4899"
        animate
        delay={300}
      />
      <Card padding="lg" radius="0">
        <Text text="Testimonials" type="h2" />
      </Card>
      <SectionDivider
        variant="dots"
        color="#6366f1"
        animate
        duration={4000}
      />
      <Card padding="lg" radius="0" backgroundColor="#0f172a">
        <Text text="Footer" type="p" />
      </Card>
    </Stack>
  );
}
```

---

## Gesture-Triggered Dividers

```tsx
import { Stack, Text, SectionDivider, Card } from "elk-components";

function InteractivePage() {
  return (
    <Stack direction="column">
      <Card padding="lg" radius="0" backgroundColor="#0c1a2a">
        <Text text="Scroll down" type="p" />
      </Card>
      <SectionDivider
        variant="curl"
        color="#22c55e"
        animate
        gesture="hover"
      />
      <Card padding="lg" radius="0">
        <Text text="Hover the divider above!" type="h2" />
      </Card>
      <SectionDivider
        variant="zigzag"
        color="#f59e0b"
        animate
        gesture="click"
      />
      <Card padding="lg" radius="0">
        <Text text="Click the divider above!" type="h2" />
      </Card>
    </Stack>
  );
}
```

---

## Cross-Component Divider Trigger

```tsx
import { createStore } from "elk-components";
import { useState } from "react";
import { Stack, Text, SectionDivider, Button, Card } from "elk-components";

const dividerStore = createStore({ play: false });

function TriggerButton() {
  return (
    <Button
      borderRadius="8px"
      padding=".6rem 1.5rem"
      gest={{
        onClick: () =>
          dividerStore.setState((s) => ({ play: !(s.play as boolean) })),
      }}
      child={() => <Text text="Toggle Divider Animation" type="p" />}
    />
  );
}

function AnimatedDivider() {
  return (
    <SectionDivider
      variant="loop"
      color="#a855f7"
      animate
      listen={dividerStore}
    />
  );
}

function Page() {
  return (
    <Stack direction="column" gap="1rem">
      <Card padding="md" radius="md">
        <TriggerButton />
      </Card>
      <AnimatedDivider />
      <Card padding="md" radius="md">
        <Text text="The divider animates when you click the button" type="p" />
      </Card>
    </Stack>
  );
}
```

---

## Imperative Divider Control

```tsx
import { useRef } from "react";
import { SectionDivider, Button, Stack, Text } from "elk-components";
import type { _SectionDivider } from "elk-components";

function ControlledDivider() {
  const dividerRef = useRef<_SectionDivider>(null);

  return (
    <Stack direction="column" gap="1rem">
      <SectionDivider
        variant="wave"
        color="#6366f1"
        animate
        onFunc={(self) => {
          dividerRef.current = self;
        }}
      />
      <Stack direction="row" gap=".5rem">
        <Button
          borderRadius="8px"
          padding=".5rem 1rem"
          gest={{ onClick: () => dividerRef.current?.play() }}
          child={() => <Text text="Play" type="p" />}
        />
        <Button
          borderRadius="8px"
          padding=".5rem 1rem"
          gest={{ onClick: () => dividerRef.current?.stop() }}
          child={() => <Text text="Stop" type="p" />}
        />
      </Stack>
    </Stack>
  );
}
```

---

## Scroll Snapping Sections

```tsx
import { PageScrollView, Center, Text } from "elk-components";

function FullPageScroll() {
  return (
    <PageScrollView
      sections={[
        {
          id: "hero",
          child: () => (
            <Center child={() => <Text text="Welcome" type="h1" size="4rem" />} />
          ),
        },
        {
          id: "about",
          child: () => (
            <Center child={() => <Text text="About Us" type="h1" size="3rem" />} />
          ),
        },
        {
          id: "contact",
          child: () => (
            <Center child={() => <Text text="Get in Touch" type="h1" size="3rem" />} />
          ),
        },
      ]}
      onSectionChange={(id) => console.log("Current:", id)}
    />
  );
}
```

---

## Cross-Component State (createStore)

```tsx
import { createStore, useStore, useSetState, Button, Text, Stack } from "elk-components";

const authStore = createStore({
  isLoggedIn: false,
  user: null as { name: string } | null,
});

function LoginButton() {
  const setAuth = useSetState(authStore);
  return (
    <Button
      borderRadius=".5rem"
      padding=".5rem 1rem"
      gest={{ onClick: () => setAuth({ isLoggedIn: true, user: { name: "Alice" } }) }}
      child={() => <Text text="Log In" type="p" />}
    />
  );
}

function UserGreeting() {
  const { isLoggedIn, user } = useStore(authStore);
  return (
    <Text
      text={isLoggedIn ? `Hello, ${user?.name}` : "Not logged in"}
      type="p"
    />
  );
}
```

---

## Imperative Control via onFunc

```tsx
import { Animation, Button, Text } from "elk-components";
import { useRef } from "react";

function ControlledAnimation() {
  const animRef = useRef(null);

  return (
    <>
      <Animation
        keyframes={[{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }]}
        duration={1000}
        iterations={Infinity}
        isAutomatic={false}
        gesture="click"
        onFunc={(self) => { animRef.current = self; }}
        child={() => (
          <div style={{ width: 50, height: 50, background: "#6366f1", borderRadius: "50%" }} />
        )}
      />
      <Button
        borderRadius=".5rem"
        padding=".4rem 1rem"
        gest={{ onClick: () => animRef.current?.play() }}
        child={() => <Text text="Play" type="p" />}
      />
    </>
  );
}
```

---

## Debounced Search Input

```tsx
import { useState, useDebounceEffect, Input, Stack, Text } from "elk-components";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useDebounceEffect(
    () => {
      if (query.value) {
        fetch(`/api/search?q=${query.value}`)
          .then((r) => r.json())
          .then((data) => setResults(data));
      }
    },
    300,
    [query.value]
  );

  return (
    <Stack direction="column" gap="1rem">
      <Input
        placeholder="Search..."
        borderRadius=".5rem"
        gest={{ onChange: (e) => query.set(e.target.value) }}
      />
      {results.map((r, i) => (
        <Text key={i} text={r} type="p" />
      ))}
    </Stack>
  );
}
```

---

## Side Panel Navigation

```tsx
import { useState } from "react";
import { SidePanel, Stack, Text, Button, IconButton, Header } from "elk-components";
import { Menu, Home, Settings, User } from "elk-components/icons";

function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        borderRadius="4rem"
        gest={{ onClick: () => setOpen(true) }}
        child={() => <IconButton icon={() => <Menu />} borderRadius="4rem" />}
      />
      <SidePanel
        isOpen={open}
        onClose={() => setOpen(false)}
        width="260px"
        child={() => (
          <Stack direction="column" gap=".5rem">
            <Header title={() => <Text text="Menu" type="h2" />} />
            <Button borderRadius=".5rem" padding=".6rem 1rem" child={() => <Text text="Home" type="p" />} />
            <Button borderRadius=".5rem" padding=".6rem 1rem" child={() => <Text text="Settings" type="p" />} />
            <Button borderRadius=".5rem" padding=".6rem 1rem" child={() => <Text text="Profile" type="p" />} />
          </Stack>
        )}
      />
    </>
  );
}
```

---

## GridView Layout

```tsx
import { GridView, Card, Text, Image } from "elk-components";

function PhotoGrid() {
  const photos = [
    { id: 1, src: "/photo1.jpg", title: "Sunset" },
    { id: 2, src: "/photo2.jpg", title: "Mountain" },
    { id: 3, src: "/photo3.jpg", title: "Ocean" },
    { id: 4, src: "/photo4.jpg", title: "Forest" },
  ];

  return (
    <GridView templateColumns="repeat(2, 1fr)" gap="1rem" autoRows="minmax(200px, auto)">
      {photos.map((p) => (
        <Card key={p.id} radius="md" padding="none">
          <Image src={p.src} alt={p.title} aspectRatio="4/3" objectFit="cover" borderRadius="md" />
          <div style={{ padding: ".75rem" }}>
            <Text text={p.title} type="p" />
          </div>
        </Card>
      ))}
    </GridView>
  );
}
```

---

## Letter Animation Hero

```tsx
import { LetterAnimation, Center, Stack, Button, Text } from "elk-components";

function HeroSection() {
  return (
    <Center child={() => (
      <Stack direction="column" gap="2rem" align="center">
        <LetterAnimation
          text="Build Faster"
          type="letters"
          animation="bounceIn"
          size="4rem"
          stagger={60}
          duration={400}
        />
        <LetterAnimation
          text="Ship beautiful UIs with elk-components"
          type="words"
          animation="fadeUp"
          size="1.5rem"
          stagger={80}
        />
        <Button
          borderRadius="2rem"
          padding=".75rem 2rem"
          child={() => <Text text="Get Started" type="p" />}
        />
      </Stack>
    )} />
  );
}
```

---

## Tile List with Badges

```tsx
import { Tiles, Badge, Avatar, IconButton, Divider } from "elk-components";
import { ChevronRight, Bell, Heart, Star } from "elk-components/icons";

function NotificationList() {
  const items = [
    { icon: Bell, title: "New message", subtitle: "2 min ago", badge: "New", badgeColor: "#6366f1" },
    { icon: Heart, title: "Like from user", subtitle: "1 hour ago", badge: null, badgeColor: null },
    { icon: Star, title: "Mentioned in thread", subtitle: "Yesterday", badge: "3", badgeColor: "#f59e0b" },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <Tiles
            leading={() => <Avatar icon={item.icon} size="sm" backgroundColor="rgba(255,255,255,0.1)" />}
            title={() => <Text text={item.title} type="p" />}
            subtitle={() => <Text text={item.subtitle} type="p" size=".8rem" />}
            trailing={() =>
              item.badge ? <Badge text={item.badge} size="xs" backgroundColor={item.badgeColor} /> : null
            }
          />
          {i < items.length - 1 && <Divider size="xs" />}
        </div>
      ))}
    </div>
  );
}
```

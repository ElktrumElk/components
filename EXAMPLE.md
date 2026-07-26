# elk-components Example

A quick-start guide showing how to use elk-components for animation, transitions, and text effects.

## Install

```bash
npm install elk-components
```

## Setup

```tsx
import {
  Animation,
  Transition,
  LetterAnimation,
  Button,
  Text,
  Card,
  Center,
} from "elk-components";
```

---

## 1. Animated Page Entry

Fade in sections as they scroll into view:

```tsx
import { Animation, Card, Text } from "elk-components";

function HeroSection() {
  return (
    <Animation
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      child={() => (
        <Card padding="lg" radius="xl">
          {() => <Text text="Welcome" type="h1" size="2rem" />}
        </Card>
      )}
    />
  );
}

function FeatureCard({ title, description }) {
  return (
    <Animation
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      child={() => (
        <Card padding="md" radius="lg">
          {() => (
            <>
              <Text text={title} type="h3" size="1.2rem" />
              <Text text={description} type="p" size="0.9rem" />
            </>
          )}
        </Card>
      )}
    />
  );
}
```

---

## 2. Interactive Button with Hover/Tap

```tsx
import { Animation, Button, Text } from "elk-components";

function ActionButton({ label, onClick }) {
  return (
    <Animation
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      child={() => (
        <Button
          borderRadius="0.75rem"
          padding="0.6rem 1.5rem"
          gest={{ onClick }}
          child={() => <Text text={label} type="p" />}
        />
      )}
    />
  );
}
```

---

## 3. Tab / View Transitions

Switch between two views with a smooth effect:

```tsx
import { useState } from "react";
import { Transition, Button, Text, Stack } from "elk-components";

function Tabs() {
  const [tab, setTab] = useState<"home" | "settings">("home");

  return (
    <Stack direction="column" gap="1rem">
      <Stack direction="row" gap="0.5rem">
        <Button
          gest={{ onClick: () => setTab("home") }}
          child={() => <Text text="Home" type="p" />}
        />
        <Button
          gest={{ onClick: () => setTab("settings") }}
          child={() => <Text text="Settings" type="p" />}
        />
      </Stack>

      <Transition
        useMotion
        from={() => (
          <div>
            <Text text="Home Content" type="h2" />
          </div>
        )}
        to={() => (
          <div>
            <Text text="Settings Content" type="h2" />
          </div>
        )}
        effect="slide-right"
        duration={350}
        active={tab === "settings"}
      />
    </Stack>
  );
}
```

---

## 4. Hero Title with Letter Animation

```tsx
import { LetterAnimation } from "elk-components";

function HeroTitle() {
  return (
    <LetterAnimation
      text="Build faster"
      animation="bounceIn"
      size="4rem"
      stagger={60}
      duration={500}
    />
  );
}
```

---

## 5. Staggered Feature List

Words animate in one by one:

```tsx
import { LetterAnimation } from "elk-components";

function FeatureTagline() {
  return (
    <LetterAnimation
      type="words"
      text="Fast. Smooth. Beautiful."
      animation="fadeUp"
      size="1.8rem"
      stagger={100}
      duration={400}
    />
  );
}
```

---

## 6. Auto-playing Carousel with Transitions

```tsx
import { useState, useEffect } from "react";
import { Transition, Text } from "elk-components";

const slides = ["Slide One", "Slide Two", "Slide Three"];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <Transition
      useMotion
      from={() => <Text text={slides[current]} type="h2" size="2rem" />}
      to={() => (
        <Text
          text={slides[(current + 1) % slides.length]}
          type="h2"
          size="2rem"
        />
      )}
      effect="fade"
      duration={400}
      active
    />
  );
}
```

---

## 7. Scroll-triggered Sections

Combine Animation with layout for a scroll-driven page:

```tsx
import { Animation, Card, Text, Stack } from "elk-components";

const features = [
  { title: "Animation", desc: "Declarative motion or Web Animations API" },
  { title: "Transition", desc: "13 built-in CSS effects + Motion mode" },
  { title: "LetterAnimation", desc: "20 presets, per-letter/word keyframes" },
];

function FeaturesPage() {
  return (
    <Stack direction="column" gap="2rem" padding="2rem">
      {features.map((f, i) => (
        <Animation
          key={f.title}
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          child={() => (
            <Card padding="md" radius="lg">
              {() => (
                <>
                  <Text text={f.title} type="h3" size="1.3rem" />
                  <Text text={f.desc} type="p" size="0.9rem" />
                </>
              )}
            </Card>
          )}
        />
      ))}
    </Stack>
  );
}
```

---

## Props Reference

### MotionTransition

```tsx
type MotionTransition = {
  type?: "spring" | "tween";     // Animation type
  duration?: number;              // Duration in seconds (tween)
  ease?: string | number[];       // Easing (tween)
  bounce?: number;                // Bounce amount (spring)
  stiffness?: number;             // Spring stiffness
  damping?: number;               // Spring damping
  mass?: number;                  // Spring mass
  delay?: number;                 // Delay in seconds
  repeat?: number;                // Repeat count (Infinity for loop)
  repeatType?: "loop" | "reverse" | "mirror";
};
```

### Animation Presets (LetterAnimation)

| Preset | Effect |
|--------|--------|
| `fadeUp` | Fade in from below |
| `fadeDown` | Fade in from above |
| `fadeIn` | Simple fade |
| `slideLeft` | Slide in from left |
| `slideRight` | Slide in from right |
| `scaleUp` | Scale from 0 to 1 |
| `scaleDown` | Scale from 1.6 to 1 |
| `rotateIn` | Rotate + scale in |
| `flipIn` | 3D flip entrance |
| `bounceIn` | Bouncy scale entrance |
| `typewriter` | Typewriter reveal |
| `blurIn` | Blur to sharp |
| `swingIn` | Swing pendulum entrance |
| `wave` | Wave with 3D tilt |
| `glitch` | Glitch jitter |
| `pop` | Pop scale overshoot |
| `dropIn` | Drop from above with squash |
| `foldIn` | 3D fold entrance |
| `elastic` | Elastic overshoot bounce |
| `spiral` | Spiral spin entrance |

### Transition Effects

| Effect | Description |
|--------|-------------|
| `fade` | Crossfade opacity |
| `slide-left` | Slide out left, slide in from left |
| `slide-right` | Slide out right, slide in from right |
| `slide-up` | Slide out up, slide in from top |
| `slide-down` | Slide out down, slide in from bottom |
| `zoom` | Scale down out, scale up in |
| `flip` | 3D rotateY out, rotateY in |
| `liquid` | Blur + saturate morph |
| `smooth` | Scale + translate smooth shift |
| `morph` | Scale + rotate + border-radius morph |
| `glide` | Skew translate glide |
| `reveal` | Clip-path reveal wipe |
| `pop` | Scale down out, pop in |

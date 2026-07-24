import Animation from "../animation/Animation";
import { _Animation } from "../animation/AnimationClass";
import Container from "../container/Container";
import Text from "../text/Text";
import Stack from "../stack/Stack";
import Button from "../button/Button";

// 1. Basic fade-in on mount (automatic)
export function FadeInExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="200px"
          height="100px"
          color="rgba(59, 130, 246, 0.2)"
          child={() => <Text text="Fade In" type="p" color="white" />}
        />
      )}
      isAutomatic
    />
  );
}

// 2. Slide-up with custom duration and easing
export function SlideUpExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="200px"
          height="100px"
          color="rgba(16, 185, 129, 0.2)"
          child={() => <Text text="Slide Up" type="p" color="white" />}
        />
      )}
      keyframes={[
        { opacity: "0", transform: "translateY(40px)" },
        { opacity: "1", transform: "translateY(0)" },
      ]}
      duration={600}
      easing="cubic-bezier(0.16, 1, 0.3, 1)"
      isAutomatic
    />
  );
}

// 3. Looping rotation
export function SpinLoopExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="80px"
          height="80px"
          color="rgba(249, 115, 22, 0.3)"
          style={{ borderRadius: "12px" }}
          child={() => <Text text="Spin" type="p" color="white" />}
        />
      )}
      keyframes={[{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }]}
      duration={1200}
      iterations={Infinity}
      easing="linear"
      isAutomatic
    />
  );
}

// 4. Ping-pong (alternate direction)
export function PingPongExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="200px"
          height="100px"
          color="rgba(168, 85, 247, 0.2)"
          child={() => <Text text="Ping Pong" type="p" color="white" />}
        />
      )}
      keyframes={[
        { transform: "translateX(0)" },
        { transform: "translateX(100px)" },
      ]}
      duration={500}
      iterations={Infinity}
      direction="alternate"
      isAutomatic
    />
  );
}

// 5. Scale pulse
export function PulseExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="120px"
          height="120px"
          color="rgba(239, 68, 68, 0.25)"
          style={{ borderRadius: "50%" }}
          child={() => <Text text="Pulse" type="p" color="white" />}
        />
      )}
      keyframes={[
        { transform: "scale(1)", opacity: "1" },
        { transform: "scale(1.15)", opacity: "0.7" },
      ]}
      duration={800}
      iterations={Infinity}
      direction="alternate"
      easing="ease-in-out"
      isAutomatic
    />
  );
}

// 6. Trigger on click
export function ClickTriggerExample() {
  return (
    <Animation
      child={() => (
        <Button
          child={() => <Text text="Click Me" type="p" color="white" />}
          gest={{
            onClick: () => console.log("clicked"),
          }}
        />
      )}
      
      keyframes={[
        { transform: "scale(1)" },
        { transform: "scale(0.92)" },
        { transform: "scale(1)" },
      ]}
      duration={200}
      gesture="click"
      isAutomatic={false}
    />
  );
}

// 7. Trigger on hover
export function HoverTriggerExample() {
  return (
    <Animation
      child={() => (
        <Container
          width="200px"
          height="100px"
          color="rgba(34, 197, 94, 0.2)"
          child={() => <Text text="Hover Me" type="p" color="white" />}
        />
      )}
      keyframes={[
        { transform: "translateY(0)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
        { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
      ]}
      duration={250}
      easing="ease-out"
      gesture="hover"
      isAutomatic={false}
    />
  );
}

// 8. Programmatic control via onFunc
export function ProgrammaticExample() {
  return (
    <Stack
      direction="column"
      gap="1rem"
      child={() => (
        <>
          <Animation
            child={() => (
              <Container
                width="200px"
                height="100px"
                color="rgba(99, 102, 241, 0.2)"
                child={() => <Text text="Controlled" type="p" color="white" />}
              />
            )}
            keyframes={[
              { opacity: "0", transform: "scale(0.8)" },
              { opacity: "1", transform: "scale(1)" },
            ]}
            duration={400}
            isAutomatic={false}
            onFunc={(self: _Animation) => {
              self.play();
            }}
          />
        </>
      )}
    />
  );
}

// 9. Staggered list entrance
export function StaggeredListExample() {
  const items = ["First", "Second", "Third", "Fourth"];

  return (
    <Stack
      direction="column"
      gap="0.5rem"
      child={() =>
        items.map((item, i) => (
          <Animation
            key={item}
            child={() => (
              <Container
                width="100%"
                height="48px"
                color="rgba(251, 191, 36, 0.15)"
                child={() => <Text text={item} type="p" color="white" />}
              />
            )}
            keyframes={[
              { opacity: "0", transform: "translateX(-20px)" },
              { opacity: "1", transform: "translateX(0)" },
            ]}
            duration={300}
            delay={i * 100}
            easing="ease-out"
            isAutomatic
          />
        ))
      }
    />
  );
}

import { createStore, useStore } from "elk-components";
import {
  Container,
  Center,
  Stack,
  Text,
  Button,
  Icon,
  Icons,
  Animation,
  Transition,
  Badge,
  LetterAnimation,
} from "elk-components";

const counter = createStore({ count: 0 });

function Orb() {
  return (
    <Animation
      child={() => (
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
      )}
      keyframes={[
        { transform: "translateX(-50%) scale(1)", opacity: "0.6" },
        { transform: "translateX(-50%) scale(1.15)", opacity: "1" },
        { transform: "translateX(-50%) scale(1)", opacity: "0.6" },
      ]}
      duration={4000}
      iterations={Infinity}
      isAutomatic
    />
  );
}

function Counter() {
  const { count } = useStore(counter);

  return (
    <Transition
      from={() => (
        <Button
          borderRadius="16px"
          padding=".85rem 2.2rem"
          border="1px solid rgba(99,102,241,0.3)"
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            boxShadow: "0 4px 24px rgba(99,102,241,0.25)",
            cursor: "pointer",
          }}
          child={() => (
            <Stack
              direction="row"
              gap=".6rem"
              align="center"
              child={() => (
                <>
                  <Icon icon={Icons.icon.Zap} size="sm" color="#fff" />
                  <Text
                    text={`Tapped ${count} time${count !== 1 ? "s" : ""}`}
                    type="p"
                    size=".9rem"
                    color="#fff"
                    style={{ fontWeight: 600 }}
                  />
                </>
              )}
            />
          )}
          gest={{
            onClick: () =>
              counter.setState((s) => ({ count: (s.count as number) + 1 })),
          }}
        />
      )}
      to={() => (
        <Button
          borderRadius="16px"
          padding=".85rem 2.2rem"
          border="1px solid rgba(168,85,247,0.5)"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            boxShadow: "0 8px 32px rgba(168,85,247,0.35)",
            cursor: "pointer",
          }}
          child={() => (
            <Stack
              direction="row"
              gap=".6rem"
              align="center"
              child={() => (
                <>
                  <Icon icon={Icons.icon.Zap} size="sm" color="#fff" />
                  <Text
                    text={`Tapped ${count} time${count !== 1 ? "s" : ""}`}
                    type="p"
                    size=".9rem"
                    color="#fff"
                    style={{ fontWeight: 600 }}
                  />
                </>
              )}
            />
          )}
          gest={{
            onClick: () =>
              counter.setState((s) => ({ count: (s.count as number) + 1 })),
          }}
        />
      )}
      gesture="hover"
      effect="smooth"
      duration={300}
    />
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: typeof Icons.icon.Zap;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Animation
      child={() => (
        <div
          style={{
            padding: "1.2rem",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}22`,
            width: "220px",
            textAlign: "center",
          }}
        >
          <Icon icon={icon} size="md" color={color} />
          <Text
            text={title}
            type="h3"
            size="1rem"
            color="#fff"
            style={{ fontWeight: 600, marginTop: ".6rem", display: "block" }}
          />
          <Text
            text={desc}
            type="p"
            size=".78rem"
            color="rgba(255,255,255,0.4)"
            style={{ lineHeight: 1.5, marginTop: ".3rem", display: "block" }}
          />
        </div>
      )}
      keyframes={[
        { opacity: "0", transform: "translateY(24px)" },
        { opacity: "1", transform: "translateY(0)" },
      ]}
      duration={500}
      isAutomatic
    />
  );
}

export default function App() {
  return (
    <Container
      width="100%"
      height="100%"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #0f0d1f 0%, #000 70%)",
        overflow: "hidden",
      }}
      child={() => (
        <Center
          child={() => (
            <Stack
              direction="column"
              gap="2rem"
              align="center"
              child={() => (
                <>
                  <Orb />

                  <Animation
                    child={() => (
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "18px",
                          background: "linear-gradient(135deg, #6366f1, #a855f7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 60px rgba(99,102,241,0.3)",
                        }}
                      >
                        <Icon icon={Icons.icon.Layers} size={36} color="#fff" />
                      </div>
                    )}
                    keyframes={[
                      {
                        opacity: "0",
                        transform: "scale(0.4) rotate(-15deg)",
                      },
                      { opacity: "1", transform: "scale(1) rotate(0deg)" },
                    ]}
                    duration={600}
                    isAutomatic
                  />

                  <LetterAnimation
                    text="Welcome to Elk"
                    animation="bounceIn"
                    size="3.2rem"
                    stagger={60}
                    duration={500}
                  />

                  <Animation
                    child={() => (
                      <Text
                        text="Build fluid, animated interfaces with class-based components, 200+ icons, and GPU-accelerated motion."
                        type="p"
                        size="1rem"
                        color="rgba(255,255,255,0.4)"
                        style={{
                          textAlign: "center",
                          maxWidth: "460px",
                          lineHeight: 1.6,
                        }}
                      />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(16px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    delay={400}
                    isAutomatic
                  />

                  <Animation
                    child={() => <Counter />}
                    keyframes={[
                      { opacity: "0", transform: "translateY(16px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    delay={550}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Stack direction="row" gap=".75rem" child={() => (
                        <>
                          <Badge text="Animate" size="sm" color="#6366f1" backgroundColor="rgba(99,102,241,0.12)" />
                          <Badge text="Transition" size="sm" color="#22c55e" backgroundColor="rgba(34,197,94,0.12)" />
                          <Badge text="200+ Icons" size="sm" color="#f59e0b" backgroundColor="rgba(245,158,11,0.12)" />
                        </>
                      )} />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(12px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    delay={700}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Stack direction="row" gap="1rem" child={() => (
                        <>
                          <FeatureCard
                            icon={Icons.icon.Sparkles}
                            title="Motion"
                            desc="GPU-accelerated animations with the Web Animations API"
                            color="#6366f1"
                          />
                          <FeatureCard
                            icon={Icons.icon.Layers}
                            title="Components"
                            desc="Class-based builder pattern with full TypeScript support"
                            color="#22c55e"
                          />
                          <FeatureCard
                            icon={Icons.icon.Star}
                            title="Icons"
                            desc="205 hand-crafted SVG icons ready to use anywhere"
                            color="#f59e0b"
                          />
                        </>
                      )} />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(20px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={600}
                    delay={850}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Text
                        text="npx create-elk-component my-app"
                        type="p"
                        size=".8rem"
                        color="rgba(255,255,255,0.25)"
                        style={{
                          fontFamily: "monospace",
                          padding: ".5rem 1.2rem",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          marginTop: ".5rem",
                        }}
                      />
                    )}
                    keyframes={[{ opacity: "0" }, { opacity: "1" }]}
                    duration={800}
                    delay={1000}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <a
                        href="https://github.com/elktrumelk/components"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Transition
                          from={() => (
                            <Button
                              borderRadius="10px"
                              padding=".55rem 1.3rem"
                              border="1px solid rgba(255,255,255,0.08)"
                              style={{
                                background: "rgba(255,255,255,0.03)",
                                cursor: "pointer",
                              }}
                              child={() => (
                                <Stack direction="row" gap=".45rem" align="center" child={() => (
                                  <>
                                    <Icon icon={Icons.icon.ExternalLink} size="xs" color="rgba(255,255,255,0.4)" />
                                    <Text
                                      text="GitHub"
                                      type="p"
                                      size=".78rem"
                                      color="rgba(255,255,255,0.4)"
                                      style={{ fontWeight: 500 }}
                                    />
                                  </>
                                )} />
                              )}
                            />
                          )}
                          to={() => (
                            <Button
                              borderRadius="10px"
                              padding=".55rem 1.3rem"
                              border="1px solid rgba(255,255,255,0.15)"
                              style={{
                                background: "rgba(255,255,255,0.07)",
                                cursor: "pointer",
                              }}
                              child={() => (
                                <Stack direction="row" gap=".45rem" align="center" child={() => (
                                  <>
                                    <Icon icon={Icons.icon.ExternalLink} size="xs" color="rgba(255,255,255,0.7)" />
                                    <Text
                                      text="GitHub"
                                      type="p"
                                      size=".78rem"
                                      color="rgba(255,255,255,0.7)"
                                      style={{ fontWeight: 500 }}
                                    />
                                  </>
                                )} />
                              )}
                            />
                          )}
                          gesture="hover"
                          effect="smooth"
                          duration={250}
                        />
                      </a>
                    )}
                    keyframes={[{ opacity: "0" }, { opacity: "1" }]}
                    duration={600}
                    delay={1100}
                    isAutomatic
                  />
                </>
              )}
            />
          )}
        />
      )}
    />
  );
}

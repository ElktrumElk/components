import { createStore, useStore } from "elk-components";
import {
  Button,
  Center,
  Container,
  Stack,
  Text,
  Animation,
  Transition,
  Icon,
  Icons,
  Badge,
} from "elk-components";

const counter = createStore({ count: 0 });

function ReactiveButton() {
  const { count } = useStore(counter);

  return (
    <Transition
      from={() => (
        <Button
          borderRadius="14px"
          padding=".85rem 2rem"
          border="1px solid rgba(34,197,94,0.3)"
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 24px rgba(34,197,94,0.2)",
            cursor: "pointer",
          }}
          child={() => (
            <Stack direction="row" gap=".6rem" align="center" child={() => (
              <>
                <Icon icon={Icons.icon.Zap} size="sm" color="#fff" />
                <Text
                  text={`Clicked ${count} time${count !== 1 ? "s" : ""}`}
                  type="p"
                  size=".9rem"
                  color="#fff"
                  style={{ fontWeight: 600 }}
                />
              </>
            )} />
          )}
          gest={{
            onClick: () =>
              counter.setState((s) => ({ count: (s.count as number) + 1 })),
          }}
        />
      )}
      to={() => (
        <Button
          borderRadius="14px"
          padding=".85rem 2rem"
          border="1px solid rgba(34,197,94,0.6)"
          style={{
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            boxShadow: "0 8px 32px rgba(34,197,94,0.35)",
            cursor: "pointer",
          }}
          child={() => (
            <Stack direction="row" gap=".6rem" align="center" child={() => (
              <>
                <Icon icon={Icons.icon.Zap} size="sm" color="#fff" />
                <Text
                  text={`Clicked ${count} time${count !== 1 ? "s" : ""}`}
                  type="p"
                  size=".9rem"
                  color="#fff"
                  style={{ fontWeight: 600 }}
                />
              </>
            )} />
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

export default function Body() {
  return (
    <Container
      width="100%"
      height="100%"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #0c1a2a 0%, #000 70%)",
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
                  <Animation
                    child={() => (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "20px",
                          background: "linear-gradient(135deg, #22c55e, #16a34a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 60px rgba(34,197,94,0.25)",
                        }}
                      >
                        <Icon icon={Icons.icon.Layers} size={40} color="#fff" />
                      </div>
                    )}
                    keyframes={[
                      { opacity: "0", transform: "scale(0.5) rotate(-10deg)" },
                      { opacity: "1", transform: "scale(1) rotate(0deg)" },
                    ]}
                    duration={600}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Text
                        text="Components"
                        type="h1"
                        size="3rem"
                        color="#fff"
                        style={{
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          textAlign: "center",
                        }}
                      />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(30px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Text
                        text="A modern React component library with class-based architecture, GPU-accelerated animations, and 200+ icons"
                        type="p"
                        size="1.1rem"
                        color="rgba(255,255,255,0.45)"
                        style={{
                          textAlign: "center",
                          maxWidth: "480px",
                          lineHeight: 1.6,
                        }}
                      />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(20px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    isAutomatic
                  />

                  <Animation
                    child={() => <ReactiveButton />}
                    keyframes={[
                      { opacity: "0", transform: "translateY(20px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
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
                              padding=".6rem 1.4rem"
                              border="1px solid rgba(255,255,255,0.1)"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                cursor: "pointer",
                              }}
                              child={() => (
                                <Stack direction="row" gap=".5rem" align="center" child={() => (
                                  <>
                                    <Icon icon={Icons.icon.ExternalLink} size="xs" color="rgba(255,255,255,0.5)" />
                                    <Text
                                      text="View on GitHub"
                                      type="p"
                                      size=".8rem"
                                      color="rgba(255,255,255,0.5)"
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
                              padding=".6rem 1.4rem"
                              border="1px solid rgba(255,255,255,0.2)"
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                cursor: "pointer",
                              }}
                              child={() => (
                                <Stack direction="row" gap=".5rem" align="center" child={() => (
                                  <>
                                    <Icon icon={Icons.icon.ExternalLink} size="xs" color="rgba(255,255,255,0.8)" />
                                    <Text
                                      text="View on GitHub"
                                      type="p"
                                      size=".8rem"
                                      color="rgba(255,255,255,0.8)"
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
                    keyframes={[
                      { opacity: "0" },
                      { opacity: "1" },
                    ]}
                    duration={600}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Stack direction="row" gap=".75rem" child={() => (
                        <>
                          <Badge text="Animation" size="sm" color="#3b82f6" backgroundColor="rgba(59,130,246,0.12)" />
                          <Badge text="Transition" size="sm" color="#22c55e" backgroundColor="rgba(34,197,94,0.12)" />
                          <Badge text="Icons" size="sm" color="#a855f7" backgroundColor="rgba(168,85,247,0.12)" />
                        </>
                      )} />
                    )}
                    keyframes={[
                      { opacity: "0", transform: "translateY(10px)" },
                      { opacity: "1", transform: "translateY(0)" },
                    ]}
                    duration={500}
                    isAutomatic
                  />

                  <Animation
                    child={() => (
                      <Text
                        text="npm install elk-components"
                        type="p"
                        size=".8rem"
                        color="rgba(255,255,255,0.3)"
                        style={{
                          fontFamily: "monospace",
                          padding: ".5rem 1rem",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    )}
                    keyframes={[
                      { opacity: "0" },
                      { opacity: "1" },
                    ]}
                    duration={800}
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

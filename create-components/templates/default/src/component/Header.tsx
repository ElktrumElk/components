import { Header, Text, Icon, Icons, Animation } from "elk-components";

export default function Head() {
  return (
    <Header
      title={() => (
        <Animation
          child={() => (
            <Text
              text="Components"
              type="h1"
              size="1rem"
              color="#fff"
              style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
            />
          )}
          keyframes={[
            { opacity: "0", transform: "translateX(-10px)" },
            { opacity: "1", transform: "translateX(0)" },
          ]}
          duration={400}
          isAutomatic
        />
      )}
      leading={() => (
        <Animation
          child={() => (
            <Icon icon={Icons.icon.Zap} size="sm" color="#22c55e" />
          )}
          keyframes={[
            { opacity: "0", transform: "scale(0.5)" },
            { opacity: "1", transform: "scale(1)" },
          ]}
          duration={400}
          isAutomatic
        />
      )}
      style={{
        maxWidth: "1200px",
        width: "100%",
        alignSelf: "center",
        padding: "1rem",
        display: "flex",
        gap: "0.75rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

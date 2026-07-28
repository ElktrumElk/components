import {
  Animation,
  Card,
  LetterAnimation,
  Page,
  SectionDivider,
  Text,
} from "./components";
import GridView from "./lib/components/gridview/GridView";
import Padding from "./lib/components/padding/Padding";
import Hover from "./lib/components/pseudo/hover/Hover";

export default function App() {
  return (
    <Page
      body={() => (
        <Padding
          padding="10rem"
          child={() => (
            <>
              <GridView
                child={() => (
                  <>
                    <Hover
                      transition="transform .3s ease"
                      style={{ color: "orange", transform: "scale(1.3)" }}
                      child={() => (
                        <Text text="Hover Wassup" type="h1" color="white" />
                      )}
                    />
                    <SectionDivider
                      animate
                      variant="wave"
                      direction="ltr"
                      duration={1000}
                      flip
                      fillColor="#02c8ff"
                    />

                    <Animation
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{ width: "auto", height: "max-content" }}
                      child={() => (
                        <>
                          <Hover
                            style={{ color: "blue" }}
                            transition="color 1s ease"
                            child={() => (
                              <LetterAnimation
                                animation="glitch"
                                textType="h1"
                                text="Hello how are you doing"
                                style={{ color: "red" }}
                                iterations={Infinity}
                                duration={3000}
                              />
                            )}
                          />
                        </>
                      )}
                    />
                    <Card />
                  </>
                )}
              />
            </>
          )}
        />
      )}
    />
  );
}

import {
  Center,
  Gap,
  Page,
  ScrollView,
  SectionDivider,
  Text,
} from "./components";
import "./App.css";
import { Service } from "./cmp/service";

export default function App() {
  return (
    <Page
      background="black"
      body={() => (
        <>
          <SectionDivider
            color="#131313"
            variant="curl"
            animate
            style={{ transform: "scaleX(3) scaleY(-1)" }}
            flip
            amplitude={20}
            frequency={4}
            height={80}
          />
          <ScrollView
          padding="1rem"
          style={{border: '1px solid blue'}}
            child={() => (
              <Center
                child={() => (
                  <>
                    <Text
                      type="h1"
                      text="Service Right at Your Door"
                      color="white"
                    />
                    <Gap height="1rem" />
                    <Service />
                  </>
                )}
              />
            )}
          />
        </>
      )}
    />
  );
}

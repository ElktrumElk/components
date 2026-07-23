import { Layout} from "./icons";
import Button from "./lib/components/button/Button";
import Center from "./lib/components/center/Center";
import Container from "./lib/components/container/Container";

import Icon from "./lib/components/icon/Icon";
import Page from "./lib/components/page/Page";

import Text from "./lib/components/text/Text";
import { createStore, useStore } from "./hooks";

const store = createStore<{ count: number }>({ count: 0 });

function Counter() {
  const { count } = useStore(store);

  return (
    <Button
      padding=".5rem 1rem"
      borderRadius="1rem"
      border="1px solid #0a6e7d"
      color="#d5f6fb"
      style={{ background: "#0f77775a" }}
      gest={{
        onClick: () => store.setState(prev => ({ count: (prev.count ?? 0) + 1 }))
      }}
      child={() => <Text text={`counter: ${count ?? 0}`} type="p" />}
    />
  );
}

export default function App() {
  return (
    <Page
      body={() => (
        <Container
          width="100%"
          height="100%"
          child={() => (
            <Center
              child={() => (
                <>
                  <Container
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                    child={() => (
                      <>
                        <Icon icon={Layout} color="#0275c7" size={30} />
                        <Text
                          text="Component"
                          type="h1"
                          size="1.4rem"
                          color="white"
                          style={{ fontFamily: "sans-serif" }}
                        />
                      </>
                    )}
                  />

                  <Text
                    text="React Class Base Control"
                    color="white"
                    type="h2"
                    size="4rem"
                    style={{ fontFamily: "sans-serif" }}
                  />

                  <Counter />
                </>
              )}
            />
          )}
        />
      )}
    />
  );
}

import Center from "./lib/components/center/Center";
import Container from "./lib/components/container/Container";
import Header from "./lib/components/header/Header";
import Page from "./lib/components/page/Page";
import Text from "./lib/components/text/Text";

export default function App() {
  return (
    <>
      <Page
        header={() => (
          <Header
            title={() => (
              <Text color="white" text="Component" size="1rem" type="h1" />
            )}
            subTitle={() => (
              <Text color="grey" text="Component"  size=".9rem" type="h2" />
            )}
            style={{ maxWidth: "400px" }}
          />
        )}
        body={() => <Center child={() => <Container />} />}
      />
    </>
  );
}

import { Lock } from "./icons";
import Button from "./lib/components/button/Button";
import IconButton from "./lib/components/button/IconButton";
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
          // ===============================================================================
          // Header
          // ================================================================================
          <Header
            // ======================
            // LEADING
            // ====================
            leading={() => (
              <Container color="grey" width="50px" height="50px" />
            )}
            // =================================
            // HEADER TITLE
            // ================================
            title={() => <Text size="1rem" text="Component" type="h1" />}
            // ====================================
            // SUBTITLE
            // ====================================
            subTitle={() => (
              <Text
                style={{ color: "grey" }}
                size=".98rem"
                text="Welcome to Component"
                type="p"
              />
            )}
            // Title gap
            titleGap=".3rem"
            // ============================================================================================
            // Header action
            // =============================================================================================
            action={() => {
              return (
                <>
                  <Button
                    borderRadius="1rem"
                    padding=".4rem 1rem"
                    child={() => (
                      <Center child={() => <Text text="Github" type="p" />} />
                    )}
                    gest={{
                      onClick: () => alert('GitHub')
                    }}
                  />
                  <Button
                    borderRadius="1rem"
                    padding=".4rem 1rem"
                    child={() => (
                      <Center child={() => <Text text="X" type="p" />} />
                    )}
                    gest={{
                      onClick: () => alert('X')
                    }}
                  />
                  <IconButton borderRadius="4rem" icon={() => <Lock />}/>
                </>
              );
            }}
          />
        )}
        // =====================================================================================================
        // The body
        // =====================================================================================================
        body={() => (
          <Center
            child={() => <Text text="Welcome to Component" type="h2" />}
          />
        )}
      />
    </>
  );
}

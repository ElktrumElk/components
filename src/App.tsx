import { Lock } from "./icons";
import Avatar from "./lib/components/avatar/Avatar";
import Badge from "./lib/components/badge/Badge";
import Button from "./lib/components/button/Button";
import Card from "./lib/components/card/Card";
import IconButton from "./lib/components/button/IconButton";
import Center from "./lib/components/center/Center";
import Divider from "./lib/components/divider/Divider";
import Header from "./lib/components/header/Header";
import Image from "./lib/components/image/Image";
import Input from "./lib/components/input/Input";
import Page from "./lib/components/page/Page";
import Stack from "./lib/components/stack/Stack";
import Text from "./lib/components/text/Text";

export default function App() {
  return (
    <>
      <Page
        header={() => (
          <Header
            leading={() => (
              <Avatar size="sm" />
            )}
            title={() => <Text size="1rem" text="Components" type="h1" />}
            subTitle={() => (
              <Text
                style={{ color: "grey" }}
                size=".98rem"
                text="Advanced UI Framework"
                type="p"
              />
            )}
            titleGap=".3rem"
            action={() => {
              return (
                <>
                  <Badge text="v1.0" variant="soft" size="sm" />
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
                  <IconButton borderRadius="4rem" icon={() => <Lock />}/>
                </>
              );
            }}
          />
        )}

        body={() => (
          <Stack
            direction="column"
            gap="1rem"
            padding="1rem"
            width="100%"
            height="100%"
            child={() => (
              
              <>
                {/* Stack Demo */}
                
                <Card
                  padding="md"
                  radius="lg"
                  shadow
                  header={() => (
                    <Stack direction="row" align="center" justify="space-between" gap=".5rem" child={() => (
                      <>
                        <Text text="Stack Layout" type="h3" />
                        <Badge text="Layout" variant="outlined" size="xs" />
                      </>
                    )} />
                  )}
                  body={() => (
                    <Stack direction="row" gap=".75rem" wrap child={() => (
                      <>
                        <Button
                          borderRadius=".5rem"
                          padding=".5rem 1rem"
                          child={() => <Text text="Item 1" type="p" />}
                          gest={{ onClick: () => alert('Item 1') }}
                        />
                        <Button
                          borderRadius=".5rem"
                          padding=".5rem 1rem"
                          child={() => <Text text="Item 2" type="p" />}
                          gest={{ onClick: () => alert('Item 2') }}
                        />
                        <Button
                          borderRadius=".5rem"
                          padding=".5rem 1rem"
                          child={() => <Text text="Item 3" type="p" />}
                          gest={{ onClick: () => alert('Item 3') }}
                        />
                      </>
                    )} />
                  )}
                />

                <Divider direction="horizontal" size="sm" />

                {/* Input Demo */}
                <Card
                  padding="md"
                  radius="lg"
                  shadow
                  header={() => <Text text="Input Fields" type="h3" />}
                  body={() => (
                    <Stack direction="column" gap=".75rem" child={() => (
                      <>
                        <Input
                          placeholder="Search..."
                          borderRadius=".5rem"
                          borderColor="rgba(255,255,255,0.2)"
                          gest={{ onChange: (e) => console.log(e.target.value) }}
                        />
                        <Input
                          type="password"
                          placeholder="Password"
                          borderRadius=".5rem"
                          borderColor="rgba(255,255,255,0.2)"
                        />
                      </>
                    )} />
                  )}
                />

                {/* Avatar + Badge Demo */}
                <Card
                  padding="md"
                  radius="lg"
                  shadow
                  header={() => <Text text="Avatars & Badges" type="h3" />}
                  body={() => (
                    <Stack direction="row" align="center" gap="1rem" child={() => (
                      <>
                        <Avatar size="xs" />
                        <Avatar size="sm" />
                        <Avatar size="md" />
                        <Avatar size="lg" />
                        <Avatar size="xl" />
                        <Divider direction="vertical" size="sm" />
                        <Badge text="Online" variant="filled" size="sm" backgroundColor="green" />
                        <Badge text="Away" variant="outlined" size="sm" color="yellow" borderColor="yellow" />
                        <Badge text="Busy" variant="soft" size="sm" backgroundColor="red" color="white" />
                      </>
                    )} />
                  )}
                />

                {/* Image Demo */}
                <Card
                  padding="md"
                  radius="lg"
                  shadow
                  header={() => <Text text="Images" type="h3" />}
                  body={() => (
                    <Stack direction="row" gap=".75rem" wrap child={() => (
                      <>
                        <Image
                          width="120px"
                          height="80px"
                          borderRadius=".5rem"
                          objectFit="cover"
                        />
                        <Image
                          width="120px"
                          height="80px"
                          borderRadius=".5rem"
                          aspectRatio="16/9"
                          objectFit="contain"
                        />
                      </>
                    )} />
                  )}
                />

                {/* Footer */}
                <Divider direction="horizontal" size="xs" />
                <Center child={() => (
                  <Text
                    text="Built with the Component Framework"
                    type="p"
                    style={{ color: 'grey', fontSize: '.85rem' }}
                  />
                )} />
              </>
            )}
          />
        )}
      />
    </>
  );
}

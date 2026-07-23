import { Page } from 'components'
import { Header } from 'components'
import { Text } from 'components'
import { Center } from 'components'
import { Stack } from 'components'
import { Button } from 'components'

export default function App() {
  return (
    <Page
      header={() => (
        <Header
          title={() => <Text text="Components" type="h1" size="1rem" color="#fff" />}
        />
      )}
      body={() => (
        <Center child={() => (
          <Stack direction="column" gap="1rem" align="center" child={() => (
            <>
              <Text text="Welcome to Components" type="h1" size="2rem" color="#fff" />
              <Text text="No imports needed — just start building."
                type="p" size="1rem" color="rgba(255,255,255,0.5)" />
              <Button
                borderRadius=".5rem"
                padding=".5rem 1.5rem"
                color="#fff"
                child={() => <Text text="Get Started" type="p" size=".9rem" color="#fff" />}
                gest={{ onClick: () => console.log('Hello!') }}
              />
            </>
          )} />
        )} />
      )}
    />
  )
}

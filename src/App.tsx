import { Center, Container,   Page,   Text } from "./components";


export default function App() {
  return (
    <Page
    background="black"
      body={() => (
        <>
          <Container width="100%" height="100%" style={{border: '1px solid red'}} child={() => (
            <Center child={() => (
              <Text text="Welcome" type="h1"/>
            )}/>
          )}/>
        </>
  )}
  />
  )
}

import { Page, Text } from "./components";


export default function App () {

  return (
    <Page 
      body = {() => <Text text="Component" type="h1"/>}
    />
  )

}
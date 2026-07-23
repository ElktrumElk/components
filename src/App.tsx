import { Layout } from "./icons";
import Center from "./lib/components/center/Center";
import Container from "./lib/components/container/Container";
import Header from "./lib/components/header/Header";
import Icon from "./lib/components/icon/Icon";
import Page from "./lib/components/page/Page";

import Text from "./lib/components/text/Text";
//import { createStore, useStore} from "./hooks";
//import { Layout } from "./icons";

//const store = createStore<{ count: number }>({ count: 0 });

export default function App() {
  return (
    <Page
     

      body={() => (
        
      <Container width="100%" height="100%" child={() => <Center child={() => (
        <>
          
        </>
      )}/>
      }/>
      )}
    />
  );
}

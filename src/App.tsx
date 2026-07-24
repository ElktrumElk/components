import {  ArrowRight, Layout, MapPin } from "./icons";

import Center from "./lib/components/center/Center";
import Container from "./lib/components/container/Container";
import Page from "./lib/components/page/Page";
import Text from "./lib/components/text/Text";

//import { createStore, } from "./hooks";
import {
  createStore,
  
  Icons,
  
  Icon,
  IconButton,
  ListView,
  Tiles,
  useStore,
  
} from "./components";

//const store = createStore<{ count: number }>({ count: 0 });

const tiles = createStore({
  datas: [
    {
      id: 1,
      title: "Location",
      subtitle: "Know Your location",
      leadinicon: <MapPin size={30} color="blue" />,
      trailingIcon: <ArrowRight color="#3a5971" size={30} />,
    },

    {
      id: 2,
      title: "Layouts",
      subtitle: "Align Items Properly",
      leadinicon: <Layout size={30} color="orange" />,
      trailingIcon: Icons.icon.ArrowRight({}),
    },
  ],
});

export default function App() {
  const { datas } = useStore(tiles);
  
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
                  <IconButton
                    icon={Icons.icon.Layout}
                    gest={{
                      onClick: () => tiles.setState({datas: [...datas.filter(x => x.id != 2)]}),
                    }}
                  />

                  <ListView
                    style={{ display: "flex", gap: "1rem" }}
                    child={() =>
                      datas?.map((data, key) => (
                        <Tiles
                          key={key}
                          leading={() => <Icon icon={data?.leadinicon} />}
                          title={() => (
                            <Text text={data.title} type="h3" color="white" />
                          )}
                          subtitle={() => (
                            <Text
                              text={data.subtitle}
                              color="#3a5971"
                              type="p"
                            />
                          )}
                          borderBottom="1px solid #3a5971"
                          trailing={() => (
                            <IconButton
                              icon={() => data.trailingIcon}
                              gest={{
                                onClick: () => alert(data.title),
                              }}
                            />
                          )}
                          style={{ minWidth: "300px" }}
                        />
                      ))
                    }
                  />
                </>
              )}
            />
          )}
        />
      )}
    />
  );
}

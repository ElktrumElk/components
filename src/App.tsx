import {
  Card,
  Center,
  Container,
  Gap,
  GridView,
  Icon,
  Icons,
  Main,
  Page,
  Text,
} from "./components";
import './App.css'

export default function App() {
  return (
    <Page
      background="black"
      body={() => (
        <>
          <Container
            width="100%"
            height="100%"
            child={() => (
              <Main
                child={() => (
                  <Center
                    child={() => (
                      <>
                        <Text type="h1" text="Easy Service With High Security" color="white" size="clamp(2rem, 3svw, 3.2svw  )"/>
                        <Text type="p" text="Choose your service and get the job done with less wories and stress." color="#9cb6b5" size="clamp(1rem, 1svw, 1.5rem)"/>
                        <Gap height="2rem"/>
                        <GridView
                          style={{width: 'auto', height: 'auto', gap: '6rem', maxWidth: '700px'}}
                          templateColumns="1fr 1fr"
                          
                          child={() => (
                            <>
                              <Card
                                width="100%"
                                header={() => (
                                  <>
                                  <Icon icon={Icons.icon.MapPin} color="orange" />
                                    <Text
                                      text="Location"
                                      type="h3"
                                      color="white"
                                    />
                                  </>
                                )}
                                body={() => <Text text="Track down your lost phone and get the precise location of it where about." type="p" color="#d2d9e2"/>}
                              />
                              <Card
                                width="100%"
                                header={() => (
                                  <>
                                  <Icon icon={Icons.icon.Mail} color="#a600ff" />
                                    <Text
                                      text="Email"
                                      type="h3"
                                      color="white"
                                    />
                                  </>
                                )}
                              />
                              <Card
                              width="100%"
                              header={() => (
                                <>
                                  <Icon icon={Icons.icon.Search} color="#19aeff" />
                                  <Text
                                    text="Smart Search"
                                    type="h3"
                                    color="white"
                                  />
                                </>
                              )}
                            />
                            <Card
                              width="100%"
                              header={() => (
                                <>
                                  <Icon icon={Icons.icon.Bookmark} color="#00fffb" />
                                  <Text
                                    text="Ticket Booked"
                                    type="h3"
                                    color="white"
                                  />
                                </>
                              )}
                            />
                            </>
                          )}
                        />
                      </>
                    )}
                  />
                )}
              />
            )}
          />
        </>
      )}
    />
  );
}

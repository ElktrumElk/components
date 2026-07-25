import { Animation, Card, Page, Transition } from "./components";
import GridView from "./lib/components/gridview/GridView";
import Padding from "./lib/components/padding/Padding";

export default function App() {
  return (
    <Page
      body={() => (
        <Padding
          padding="10rem"
          child={() => (
            <>
              <GridView
                child={() => (
                  <>
                    <Animation
                      isAutomatic
                      duration={1000}
                      iterations={Infinity}
                      easing="linear"
                      
                      keyframes={[
                        { transform: "translateY(2%)" },
                        { transform: "translateY(0%)" },
                        { transform: "translateY(2%)" },
                      ]}
                      
                      style={{width: 'auto', height: 'max-content'}}

                      child={() => (
                        <>
                          <Transition

                            style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}
                            from={() => <Card  shadow shadowColor="#072d24" />}
                            to={() => <Card shadow backgroundColor="red"  />}
                            duration={400}
                            delay={1000}
                            active = {false}
                            gesture="click"
                            threshold={3.5}
                            effect="slide-right"
                            origin="top right"
                          
                            
                          />
                        </>
                      )}
                    />
                    <Card />
                  </>
                )}
              />
            </>
          )}
        />
      )}
    />
  );
}

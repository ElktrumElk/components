import { Page } from "./components";
import "./App.css";
import TransitionWrapper from "./cmp/TransitionWrapper";

export default function App() {
  return (
    <Page
      background="black"
      style={{ overflowX: "hidden" }}
      body={() => <TransitionWrapper />}
    />
  );
}

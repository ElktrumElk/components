import { Page } from "elk-components";
import Head from "./component/Header";
import Body from "./component/Body";

export default function App() {
  return (
    <Page
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      header={Head}
      body={Body}
    />
  );
}

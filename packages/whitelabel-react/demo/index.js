import * as React from "react";
import ReactDOM from "react-dom";
import { Test } from "../dist/index";

export default function App() {
  return <Test />;
}

ReactDOM.render(<App />, document.getElementById("app"));

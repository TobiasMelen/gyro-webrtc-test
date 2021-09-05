import { render } from "react-dom";
import React from "react";
import App from "./components/App";
import { setup } from "goober";

setup(React.createElement);
render(<App />, document.getElementById("app"));

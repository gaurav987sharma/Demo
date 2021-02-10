import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Routers />
  </StrictMode>,
  rootElement
);

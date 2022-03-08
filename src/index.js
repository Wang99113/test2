import { StrictMode } from "react";
import ReactDOM from "react-dom";
// import store from "./redux/store";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

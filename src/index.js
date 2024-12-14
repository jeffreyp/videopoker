
import React from "react";
import * as ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import configureStore from "./store";
import initReactFastClick from "react-fastclick";
import viewportUnitsBuggyfill from "viewport-units-buggyfill";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
);
registerServiceWorker();
initReactFastClick();

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    viewportUnitsBuggyfill.init();
});


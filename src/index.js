
import React from "react";
import * as ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { GameProvider } from "./context/GameContext";
import initReactFastClick from "react-fastclick";
import viewportUnitsBuggyfill from "viewport-units-buggyfill";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </React.StrictMode>
);
registerServiceWorker();
initReactFastClick();

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    viewportUnitsBuggyfill.init();
});


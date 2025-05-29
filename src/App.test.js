import React from "react";
import { render } from "@testing-library/react";
import { GameProvider } from "./context/GameContext";
import App from "./App";

// Mock IntersectionObserver which isn't available in test environment
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
};

it("renders without crashing", () => {
    render(
        <GameProvider>
            <App />
        </GameProvider>
    );
});
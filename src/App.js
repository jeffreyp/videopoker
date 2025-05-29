import React from "react";
import "./styles/App.scss";
import CardContainer from "./components/CardContainer";
import CreditContainer from "./components/CreditContainer";
import DealBtnContainer from "./components/DealBtnContainer";
import HandStatusContainer from "./components/HandStatusContainer";
import ImagePreload from "./components/ImagePreload";
import PayTableContainer from "./components/PayTableContainer";
import WinContainer from "./components/WinContainer";

const App = () => {
	return (
		<main className="App">
		<ImagePreload />
		<PayTableContainer />
		<section className="hand">
			<HandStatusContainer />
			<CardContainer />
		</section>
		<section className="bottomRow padded">
			<span className="bet">BET 5</span>
			<WinContainer />
			<CreditContainer />
		</section>
		<section className="buttonRow">
			<button onClick={() => window.location.href="#"}>HELP</button>
			<DealBtnContainer />
		</section>
		</main>
	);
};

export default App;

import React from "react";
import "./styles/App.scss";
import BetContainer from "./components/BetContainer";
import CardContainer from "./components/CardContainer";
import CreditContainer from "./components/CreditContainer";
import DealBtnContainer from "./components/DealBtnContainer";
import HandStatusContainer from "./components/HandStatusContainer";
import ImagePreload from "./components/ImagePreload";
import PayTableContainer from "./components/PayTableContainer";
import OddsDisplay from "./components/OddsDisplay";
import WinContainer from "./components/WinContainer";
import { useGameContext } from "./context/GameContext";

const App = () => {
	const { state } = useGameContext();
	const isGameOver = state.game.isGameOver;

	return (
		<main className="App">
		<ImagePreload />
		<PayTableContainer />
		<OddsDisplay />
		<section className="hand">
			<HandStatusContainer />
			<CardContainer />
		</section>
		<section className="bottomRow padded">
			<BetContainer />
			<WinContainer />
			<CreditContainer />
		</section>
		<section className="buttonRow">
			<button 
				onClick={(e) => {
					e.preventDefault();
					console.log("Help button clicked");
				}}
				aria-label="Show game help"
			>
				HELP
			</button>
			<DealBtnContainer />
		</section>
		{isGameOver && (
			<div className="game-over-overlay">
				<div className="game-over-content">
					<h2>GAME OVER</h2>
					<p>You have run out of credits!</p>
					<p>Click RESTART to play again.</p>
				</div>
			</div>
		)}
		</main>
	);
};

export default App;

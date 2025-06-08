import React from 'react';
import { useGameContext } from '../context/GameContext';
import { useGameActions } from '../hooks/useGameActions';

const BetContainer = () => {
    const { state } = useGameContext();
    const { setBetAmount } = useGameActions();
    const betAmount = state.game.betAmount;
    const roundEnded = state.game.roundEnded;
    const isGameOver = state.game.isGameOver;
    const credits = state.credit.amount;

    const handleBetClick = (amount) => {
        if (roundEnded && !isGameOver && credits >= amount) {
            setBetAmount(amount);
        }
    };

    return (
        <div className="bet-container">
            <div className="bet-buttons">
                {[1, 2, 3, 4].map(amount => (
                    <button
                        key={amount}
                        onClick={() => handleBetClick(amount)}
                        className={`bet-btn ${betAmount === amount ? 'active' : ''} ${credits < amount ? 'insufficient' : ''}`}
                        disabled={!roundEnded || isGameOver || credits < amount}
                        aria-label={`Bet ${amount} credit${amount > 1 ? 's' : ''}`}
                    >
                        {amount}
                    </button>
                ))}
                <button
                    onClick={() => handleBetClick(5)}
                    className={`bet-btn bet-max ${betAmount === 5 ? 'active' : ''} ${credits < 5 ? 'insufficient' : ''}`}
                    disabled={!roundEnded || isGameOver || credits < 5}
                    aria-label="Bet max 5 credits"
                >
                    MAX
                </button>
            </div>
            <div className="bet-display">
                BET {betAmount}
            </div>
        </div>
    );
};

export default BetContainer;
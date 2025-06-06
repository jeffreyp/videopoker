import React from 'react';
import { useGameContext } from '../context/GameContext';
import { useGameActions } from '../hooks/useGameActions';

const BetContainer = () => {
    const { state } = useGameContext();
    const { setBetAmount } = useGameActions();
    const betAmount = state.game.betAmount;
    const roundEnded = state.game.roundEnded;

    const handleBetClick = (amount) => {
        if (roundEnded) {
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
                        className={`bet-btn ${betAmount === amount ? 'active' : ''}`}
                        disabled={!roundEnded}
                        aria-label={`Bet ${amount} credit${amount > 1 ? 's' : ''}`}
                    >
                        {amount}
                    </button>
                ))}
                <button
                    onClick={() => handleBetClick(5)}
                    className={`bet-btn bet-max ${betAmount === 5 ? 'active' : ''}`}
                    disabled={!roundEnded}
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
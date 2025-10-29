import React, { useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import { useGameActions } from '../hooks/useGameActions';

const DealBtnContainer = () => {
    const { state } = useGameContext();
    const { newHand, dealNextCards, revealCards, subtractCredits, restartGame } = useGameActions();
    const roundEnded = state.game.roundEnded;
    const imagesLoaded = state.ui.cardImageLoaded;
    const isGameOver = state.game.isGameOver;
    const credits = state.credit.amount;
    const betAmount = state.game.betAmount;

    const handleButton = useCallback(() => {
        if (!imagesLoaded) return;
        
        if (isGameOver) {
            restartGame();
            return;
        }
        
        if (roundEnded) {
            if (credits < betAmount) return;
            subtractCredits();
            newHand();
            revealCards(); // Removed 50ms delay for instant response
        } else {
            dealNextCards();
            revealCards(); // Removed 50ms delay for instant response
        }
    }, [roundEnded, subtractCredits, newHand, revealCards, dealNextCards, imagesLoaded, isGameOver, restartGame, credits, betAmount]);

    const getButtonText = () => {
        if (!imagesLoaded) return "Loading...";
        if (isGameOver) return "RESTART";
        if (roundEnded && credits < betAmount) return "INSUFFICIENT FUNDS";
        return "DEAL";
    };

    const isDisabled = !imagesLoaded || (roundEnded && credits < betAmount && !isGameOver);

    return (
        <button 
            onClick={handleButton} 
            className={roundEnded && !isGameOver ? "flash" : ""} 
            disabled={isDisabled}
            aria-label={isGameOver ? "Restart game" : roundEnded ? "Deal new hand" : "Draw cards"}
        >
            {getButtonText()}
        </button>
    );
};

export default DealBtnContainer;

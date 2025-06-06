import React, { useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import { useGameActions } from '../hooks/useGameActions';

const DealBtnContainer = () => {
    const { state } = useGameContext();
    const { newHand, dealNextCards, revealCards, subtractCredits } = useGameActions();
    const roundEnded = state.game.roundEnded;
    const imagesLoaded = state.ui.cardImageLoaded;

    const handleButton = useCallback(() => {
        if (!imagesLoaded) return;
        
        if (roundEnded) {
            subtractCredits();
            newHand();
            setTimeout(() => {
                revealCards();
            }, 50);
        } else {
            dealNextCards();
            setTimeout(() => {
                revealCards();
            }, 50);
        }
    }, [roundEnded, subtractCredits, newHand, revealCards, dealNextCards, imagesLoaded]);

    return (
        <button 
            onClick={handleButton} 
            className={roundEnded ? "flash" : ""} 
            disabled={!imagesLoaded}
            aria-label={roundEnded ? "Deal new hand" : "Draw cards"}
        >
            {imagesLoaded ? "DEAL" : "Loading..."}
        </button>
    );
};

export default DealBtnContainer;

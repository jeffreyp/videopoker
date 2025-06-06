import React, { useCallback } from "react";
import Card from "./Card";
import CardHold from "./CardHold";
import { useGameContext } from "../context/GameContext";
import { useGameActions } from "../hooks/useGameActions";

const CardContainer = () => {
    const { state } = useGameContext();
    const { holdCard } = useGameActions();
    
    const { hand, hold, roundEnded } = state.game;
    const { cardRevealed } = state.ui;

    const handleCardClick = useCallback((id) => {
        if (!roundEnded) holdCard(id);
    }, [roundEnded, holdCard]);

    return (
        <div className="cardContainer padded" role="group" aria-label="Playing cards">
            {Object.keys(hand).map((key) => {
                const isHeld = hold[key];
                return (
                    <figure 
                        key={key}
                        onClick={() => handleCardClick(key)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCardClick(key);
                            }
                        }}
                        tabIndex={roundEnded ? -1 : 0}
                        role="button"
                        aria-label={`Card ${parseInt(key) + 1}${isHeld ? ', held' : ', click to hold'}`}
                        aria-pressed={isHeld}
                    >
                        <CardHold hold={isHeld} />
                        <Card 
                            id={key}
                            card={hand[key]}
                            revealed={cardRevealed[key]}
                        />
                    </figure>   
                );
            })}
        </div>
    );
};

export default CardContainer;


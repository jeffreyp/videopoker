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
        <div className="cardContainer padded">
            {Object.keys(hand).map((key) => {
                return (
                    <figure key={key}
                            onClick={() => handleCardClick(key)}>
                        <CardHold hold={hold[key]} />
                        <Card id={key}
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


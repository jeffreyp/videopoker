import React from "react";
import { useGameContext } from '../context/GameContext';

const WinContainer = () => {
    const { state } = useGameContext();
    const { roundEnded, win } = {
        roundEnded: state.game.roundEnded,
        win: state.game.handWin.win
    };
    
    if (roundEnded) {
        return <span className="winContainer">WIN {win}</span>;
    }
    return <span>&nbsp;</span>;
};

export default React.memo(WinContainer);
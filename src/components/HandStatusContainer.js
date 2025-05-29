import React from 'react';
import { useGameContext } from '../context/GameContext';

const HandStatusContainer = () => {
    const { state } = useGameContext();
    const status = state.game.handWin.name;
    
    return (
        <header className="handStatusContainer padded">
            <span>{status ? status.toUpperCase() : ' '}</span>
        </header>
    );
};

export default React.memo(HandStatusContainer);
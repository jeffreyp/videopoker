import React, { createContext, useContext, useReducer } from 'react';
import { gameReducer, initialGameState } from '../reducers/gameReducer';
import { creditReducer, initialCreditState } from '../reducers/creditReducer';
import { uiReducer, initialUiState } from '../reducers/uiReducer';

// Combine all reducers into one
const combineReducers = (reducers) => (state, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
    }, {});
};

const rootReducer = combineReducers({
    game: gameReducer,
    credit: creditReducer,
    ui: uiReducer
});

const initialState = {
    game: initialGameState,
    credit: initialCreditState,
    ui: initialUiState
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

export default GameContext;
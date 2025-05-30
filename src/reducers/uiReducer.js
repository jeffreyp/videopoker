import {
    UI_CARD_IMAGE_LOADED,
    UI_CARD_REVEAL,
    UI_CARD_RESET,
    NEW_HAND,
    HOLD_CARD
} from "../actions/index";

export const initialUiState = {
    cardImageLoaded: false,
    cardRevealed: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
    }
};

export const uiReducer = (state = initialUiState, action) => {
    switch (action.type) {
        case NEW_HAND:
            return {
                ...state, 
                cardRevealed: {
                    0: false,
                    1: false,
                    2: false,
                    3: false,
                    4: false
                }
            };
        case HOLD_CARD:
            return state;
        case UI_CARD_IMAGE_LOADED:
            return {
                ...state,
                cardImageLoaded: true
            };
        case UI_CARD_REVEAL:
            return {
                ...state,
                cardRevealed: { ...state.cardRevealed, [action.payload]: true }
            };
        case UI_CARD_RESET:
            return {
                ...state,
                cardRevealed: { ...state.cardRevealed, [action.payload]: false }
            };
        default:
            return state;
    }
}
import { UI_CARD_IMAGE_LOADED, UI_CARD_REVEAL, UI_CARD_RESET } from "./index";

export const cardImageLoaded = () => {
    return {
        type: UI_CARD_IMAGE_LOADED
    };
};

export const hideDiscardedCards = () => {
    return function(dispatch, getState) {
        let heldCards = getState().game.hold;
        for (let i = 0; i < 5; i++) {
            if (!heldCards[i]) {
                dispatch({
                    type: UI_CARD_RESET,
                    payload: i
                });
            }
        }
    };
};

export const revealCards = () => {
    return (dispatch, getState) => {
        let cardRevealState = getState().ui.cardRevealed;
        let toReveal = Object.keys(cardRevealState).filter(function(key) {
            return !cardRevealState[key];
        });
        let ms = 0;
        for (let i of toReveal) {
            setTimeout(() => {
                dispatch({
                    type: UI_CARD_REVEAL,
                    payload: i
                });
            }, ms);
            ms += 110;
        }
    };
};


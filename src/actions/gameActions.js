import { NEW_HAND, HOLD_CARD, DEAL_NEXT_CARDS, hideDiscardedCards, ADD_CREDIT, SUBTRACT_CREDIT } from "./index";
import CardList from "../lib/CardList";
import _ from "lodash";

export const newHand = () => {
    let deck = _.shuffle(CardList);
    let hand = [];
    for (let i = 0; i < 5; i++) {
        hand[i] = deck.pop();
    }
    return {
        type: NEW_HAND,
        payload: { hand, deck }
    };
};

export const holdCard = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: HOLD_CARD,
            payload: index
        }); 
    };
};

export const dealNextCards = () => {
    return (dispatch, getState) => {
        let deck = getState().game.deck;
        let hand = [...getState().game.hand];
        for (let i = 0; i < 5; i++) {
            if (!getState().game.hold[i]) {
                hand[i] = deck.pop();
            }
        }
        dispatch({
            type: DEAL_NEXT_CARDS,
            payload: { hand, deck }
        });
        dispatch(hideDiscardedCards());
        
        // Get updated state after DEAL_NEXT_CARDS
        const updatedState = getState();
        if (updatedState.game.handWin && updatedState.game.handWin.win > 0) {
            setTimeout(() => {
                dispatch({ type: ADD_CREDIT, payload: updatedState.game.handWin.win });
            }, 600); // Wait for card reveal animation
        }
    };
};

export const addCredits = () => {
    return (dispatch, getState) => {
        const handWin = getState().game.handWin;
        if (handWin && handWin.win) {
            dispatch({ type: ADD_CREDIT, payload: handWin.win });
        }
    };
};

export const subtractCredits = () => {
    return (dispatch, getState) => {
        dispatch({ type: SUBTRACT_CREDIT, payload: 5 });
    };
};

import { NEW_HAND, HOLD_CARD, DEAL_NEXT_CARDS, SET_BET_AMOUNT, hideDiscardedCards, ADD_CREDIT, SUBTRACT_CREDIT } from "./index";
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
        let deck = [...getState().game.deck];
        let hand = [...getState().game.hand];
        for (let i = 0; i < 5; i++) {
            if (!getState().game.hold[i]) {
                if (deck.length > 0) {
                    hand[i] = deck.pop();
                } else {
                    // If deck is empty, reshuffle remaining cards
                    deck = _.shuffle(CardList.filter(card => !hand.includes(card)));
                    hand[i] = deck.pop();
                }
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
            // Use requestAnimationFrame for better timing control
            requestAnimationFrame(() => {
                setTimeout(() => {
                    // Verify state hasn't changed before adding credits
                    const currentState = getState();
                    if (currentState.game.handWin && currentState.game.handWin.win === updatedState.game.handWin.win) {
                        dispatch({ type: ADD_CREDIT, payload: currentState.game.handWin.win });
                    }
                }, 600);
            });
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
        const betAmount = getState().game.betAmount;
        dispatch({ type: SUBTRACT_CREDIT, payload: betAmount });
    };
};

export const setBetAmount = (amount) => {
    return {
        type: SET_BET_AMOUNT,
        payload: amount
    };
};

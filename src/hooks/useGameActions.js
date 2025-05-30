import { useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import CardList from "../lib/CardList";
import _ from "lodash";
import { evaluateHand } from "../lib/Evaluator";
import { 
    NEW_HAND, 
    HOLD_CARD, 
    DEAL_NEXT_CARDS, 
    ADD_CREDIT, 
    SUBTRACT_CREDIT, 
    UI_CARD_REVEAL, 
    UI_CARD_RESET,
    UI_CARD_IMAGE_LOADED 
} from '../actions/index';

export const useGameActions = () => {
    const { state, dispatch } = useGameContext();

    const newHand = useCallback(() => {
        let deck = _.shuffle(CardList);
        let hand = [];
        for (let i = 0; i < 5; i++) {
            hand[i] = deck.pop();
        }
        dispatch({
            type: NEW_HAND,
            payload: { hand, deck }
        });
    }, [dispatch]);

    const holdCard = useCallback((index) => {
        dispatch({
            type: HOLD_CARD,
            payload: index
        });
    }, [dispatch]);

    const dealNextCards = useCallback(() => {
        let deck = [...state.game.deck];
        let hand = [...state.game.hand];
        for (let i = 0; i < 5; i++) {
            if (!state.game.hold[i]) {
                hand[i] = deck.pop();
            }
        }
        
        dispatch({
            type: DEAL_NEXT_CARDS,
            payload: { hand, deck }
        });

        // Hide discarded cards
        for (let i = 0; i < 5; i++) {
            if (!state.game.hold[i]) {
                dispatch({ type: UI_CARD_RESET, payload: i });
            }
        }

        // Add credits after animation
        const handWin = evaluateHand(hand);
        if (handWin && handWin.win > 0) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    dispatch({ type: ADD_CREDIT, payload: handWin.win });
                }, 600);
            });
        }
    }, [state.game.deck, state.game.hand, state.game.hold, dispatch]);

    const addCredits = useCallback((amount) => {
        dispatch({ type: ADD_CREDIT, payload: amount });
    }, [dispatch]);

    const subtractCredits = useCallback((amount = 5) => {
        dispatch({ type: SUBTRACT_CREDIT, payload: amount });
    }, [dispatch]);

    const revealCards = useCallback(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                dispatch({ type: UI_CARD_REVEAL, payload: i });
            }, i * 100);
        }
    }, [dispatch]);

    const hideDiscardedCards = useCallback(() => {
        for (let i = 0; i < 5; i++) {
            if (!state.game.hold[i]) {
                dispatch({ type: UI_CARD_RESET, payload: i });
            }
        }
    }, [state.game.hold, dispatch]);

    const cardImageLoaded = useCallback(() => {
        dispatch({ type: UI_CARD_IMAGE_LOADED });
    }, [dispatch]);

    return {
        newHand,
        holdCard,
        dealNextCards,
        addCredits,
        subtractCredits,
        revealCards,
        hideDiscardedCards,
        cardImageLoaded
    };
};
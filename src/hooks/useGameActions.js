import { useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import CardList from "../lib/CardList";
import _ from "lodash";
import { evaluateHand } from "../lib/Evaluator";
import { 
    NEW_HAND, 
    HOLD_CARD, 
    DEAL_NEXT_CARDS, 
    SET_BET_AMOUNT,
    ADD_CREDIT, 
    SUBTRACT_CREDIT, 
    GAME_OVER,
    RESTART_GAME,
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
    }, [dispatch, state.game.hold]);

    const dealNextCards = useCallback(() => {
        let deck = [...state.game.deck];
        let hand = [...state.game.hand];
        for (let i = 0; i < 5; i++) {
            if (!state.game.hold[i]) {
                if (deck.length > 0) {
                    const newCard = deck.pop();
                    hand[i] = newCard;
                } else {
                    // If deck is empty, reshuffle remaining cards
                    deck = _.shuffle(CardList.filter(card => !hand.includes(card)));
                    const newCard = deck.pop();
                    hand[i] = newCard;
                }
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
        const handWin = evaluateHand(hand, state.game.betAmount);
        if (handWin && handWin.win > 0) {
            setTimeout(() => {
                dispatch({ type: ADD_CREDIT, payload: handWin.win });
            }, 600);
        }
    }, [dispatch, state.game.hold, state.game.hand, state.game.deck, state.game.betAmount]);

    const addCredits = useCallback((amount) => {
        dispatch({ type: ADD_CREDIT, payload: amount });
    }, [dispatch]);

    const subtractCredits = useCallback(() => {
        const betAmount = state.game.betAmount;
        const currentCredits = state.credit.amount;
        
        dispatch({ type: SUBTRACT_CREDIT, payload: betAmount });
        
        // Check if this would result in game over (no credits left for next minimum bet)
        if (currentCredits - betAmount < 1) {
            setTimeout(() => {
                dispatch({ type: GAME_OVER });
            }, 100);
        }
    }, [dispatch, state.game.betAmount, state.credit.amount]);

    const setBetAmount = useCallback((amount) => {
        dispatch({ type: SET_BET_AMOUNT, payload: amount });
    }, [dispatch]);

    const revealCards = useCallback(() => {
        const timeouts = [];
        for (let i = 0; i < 5; i++) {
            const timeoutId = setTimeout(() => {
                dispatch({ type: UI_CARD_REVEAL, payload: i });
            }, i * 100);
            timeouts.push(timeoutId);
        }
        
        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [dispatch]);

    const hideDiscardedCards = useCallback(() => {
        for (let i = 0; i < 5; i++) {
            if (!state.game.hold[i]) {
                dispatch({ type: UI_CARD_RESET, payload: i });
            }
        }
    }, [dispatch, state.game.hold]);

    const cardImageLoaded = useCallback(() => {
        dispatch({ type: UI_CARD_IMAGE_LOADED });
    }, [dispatch]);

    const restartGame = useCallback(() => {
        dispatch({ type: RESTART_GAME });
    }, [dispatch]);

    return {
        newHand,
        holdCard,
        dealNextCards,
        addCredits,
        subtractCredits,
        setBetAmount,
        revealCards,
        hideDiscardedCards,
        cardImageLoaded,
        restartGame
    };
};
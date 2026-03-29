import { useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import CardList from "../lib/CardList";
import { evaluateHand } from "../lib/Evaluator";
import createProbabilityWorker from '../workers/createProbabilityWorker';
import {
    NEW_HAND,
    HOLD_CARD,
    DEAL_NEXT_CARDS,
    SET_BET_AMOUNT,
    UPDATE_PROBABILITIES,
    CALCULATING_PROBABILITIES,
    ADD_CREDIT,
    SUBTRACT_CREDIT,
    GAME_OVER,
    RESTART_GAME,
    UI_CARD_REVEAL,
    UI_CARD_RESET,
    UI_CARD_IMAGE_LOADED
} from '../actions/index';

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Debounce timer for probability calculations
let probabilityCalculationTimer = null;

// Singleton Web Worker for off-thread probability calculations
let probabilityWorker = null;
function getProbabilityWorker() {
    if (!probabilityWorker) {
        probabilityWorker = createProbabilityWorker();
    }
    return probabilityWorker;
}

export const useGameActions = () => {
    const { state, dispatch } = useGameContext();

    const newHand = useCallback(() => {
        // Cancel any pending probability calculations
        if (probabilityCalculationTimer) {
            clearTimeout(probabilityCalculationTimer);
            probabilityCalculationTimer = null;
        }

        let deck = shuffle(CardList);
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
        // Immediately update the hold state for instant UI feedback
        dispatch({
            type: HOLD_CARD,
            payload: index
        });

        // Debounce probability calculation to avoid blocking on rapid clicks
        if (probabilityCalculationTimer) {
            clearTimeout(probabilityCalculationTimer);
        }

        probabilityCalculationTimer = setTimeout(() => {
            const hand = state.game.hand;
            const hold = [...state.game.hold];
            // Toggle the hold state for this card
            hold[index] = !hold[index];

            // Only calculate if at least one card is held
            const numHeld = hold.filter(h => h).length;
            if (numHeld === 0) {
                // Don't calculate for 0 held cards - too expensive
                return;
            }

            // Signal that calculation is starting
            dispatch({
                type: CALCULATING_PROBABILITIES,
                payload: true
            });

            // Run calculation off the main thread via Web Worker
            const worker = getProbabilityWorker();
            worker.onmessage = (e) => {
                dispatch({
                    type: UPDATE_PROBABILITIES,
                    payload: e.data
                });
            };
            worker.onerror = (err) => {
                console.error('Probability worker error:', err);
                dispatch({ type: CALCULATING_PROBABILITIES, payload: false });
            };
            worker.postMessage({ hand, hold });
        }, 50);
    }, [dispatch, state.game.hold, state.game.hand]);

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
                    deck = shuffle(CardList.filter(card => !hand.includes(card)));
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
            }, 300);
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
            }, 50);
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
            }, i * 40);
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

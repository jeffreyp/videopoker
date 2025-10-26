import { NEW_HAND, HOLD_CARD, DEAL_NEXT_CARDS, SET_BET_AMOUNT, GAME_OVER, RESTART_GAME } from "../actions/index";
import { evaluateHand } from "../lib/Evaluator";
import { calculateProbabilities } from "../lib/ProbabilityCalculator";

// Check if device is touch-enabled (mobile/tablet)
const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

export const initialGameState = {
    hand: [null, null, null, null, null],
    hold: [false, false, false, false, false],
    deck: [],
    roundEnded: true,
    handWin: { name: "", win: 0 },
    betAmount: 5,
    isGameOver: false,
    probabilities: null
};

export const gameReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case NEW_HAND:
            const initialHold = [false, false, false, false, false];
            // Skip probability calculation on touch devices for performance
            const initialProbs = isTouchDevice() ? null : calculateProbabilities(action.payload.hand, initialHold);
            return {
                ...initialGameState,
                betAmount: state.betAmount,
                hand: action.payload.hand,
                deck: action.payload.deck,
                roundEnded: false,
                handWin: evaluateHand(action.payload.hand, state.betAmount),
                probabilities: initialProbs
            };
        case HOLD_CARD:
            let newHold = [...state.hold];
            newHold[action.payload] = !state.hold[action.payload];
            // Skip probability calculation on touch devices for performance
            const newProbs = isTouchDevice() ? null : calculateProbabilities(state.hand, newHold);
            return {
                ...state,
                hold: newHold,
                probabilities: newProbs
            };
        case DEAL_NEXT_CARDS: {
            return {
                ...state,
                hand: action.payload.hand,
                hold: [false, false, false, false, false],
                roundEnded: true,
                handWin: evaluateHand(action.payload.hand, state.betAmount),
                deck: action.payload.deck,
                probabilities: null
            };
        }
        case SET_BET_AMOUNT:
            return {
                ...state,
                betAmount: action.payload
            };
        case GAME_OVER:
            return {
                ...state,
                isGameOver: true
            };
        case RESTART_GAME:
            return {
                ...initialGameState
            };
        default:
            return state;
    }
};
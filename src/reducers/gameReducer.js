import { NEW_HAND, HOLD_CARD, DEAL_NEXT_CARDS, SET_BET_AMOUNT, UPDATE_PROBABILITIES, CALCULATING_PROBABILITIES, GAME_OVER, RESTART_GAME } from "../actions/index";
import { evaluateHand } from "../lib/Evaluator";

export const initialGameState = {
    hand: [null, null, null, null, null],
    hold: [false, false, false, false, false],
    deck: [],
    roundEnded: true,
    handWin: { name: "", win: 0 },
    betAmount: 5,
    isGameOver: false,
    probabilities: null,
    isCalculatingProbabilities: false
};

export const gameReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case NEW_HAND:
            // Don't calculate probabilities on initial deal (0 cards held = 1.5M combinations)
            // Wait for user to hold at least one card before calculating
            return {
                ...initialGameState,
                betAmount: state.betAmount,
                hand: action.payload.hand,
                deck: action.payload.deck,
                roundEnded: false,
                handWin: evaluateHand(action.payload.hand, state.betAmount),
                probabilities: null,
                isCalculatingProbabilities: false
            };
        case HOLD_CARD:
            let newHold = [...state.hold];
            newHold[action.payload] = !state.hold[action.payload];
            return {
                ...state,
                hold: newHold
                // Probabilities will be updated asynchronously via UPDATE_PROBABILITIES action
            };
        case CALCULATING_PROBABILITIES:
            return {
                ...state,
                isCalculatingProbabilities: action.payload
            };
        case UPDATE_PROBABILITIES:
            return {
                ...state,
                probabilities: action.payload,
                isCalculatingProbabilities: false
            };
        case DEAL_NEXT_CARDS: {
            return {
                ...state,
                hand: action.payload.hand,
                hold: [false, false, false, false, false],
                roundEnded: true,
                handWin: evaluateHand(action.payload.hand, state.betAmount),
                deck: action.payload.deck
                // Keep probabilities visible until next NEW_HAND
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
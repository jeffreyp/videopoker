import { NEW_HAND, HOLD_CARD, DEAL_NEXT_CARDS, SET_BET_AMOUNT, GAME_OVER, RESTART_GAME } from "../actions/index";
import { evaluateHand } from "../lib/Evaluator";

export const initialGameState = {
    hand: [null, null, null, null, null],
    hold: [false, false, false, false, false],
    deck: [],
    roundEnded: true,
    handWin: { name: "", win: 0 },
    betAmount: 5,
    isGameOver: false
};

export const gameReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case NEW_HAND:
            return {
                ...initialGameState,
                betAmount: state.betAmount,
                hand: action.payload.hand,
                deck: action.payload.deck,
                roundEnded: false,
                handWin: evaluateHand(action.payload.hand, state.betAmount)
            };
        case HOLD_CARD:
            let newHold = [...state.hold];
            newHold[action.payload] = !state.hold[action.payload];
            return {
                ...state,
                hold: newHold
            };
        case DEAL_NEXT_CARDS: {
            return {
                ...state,
                hand: action.payload.hand,
                roundEnded: true,
                handWin: evaluateHand(action.payload.hand, state.betAmount),
                deck: action.payload.deck
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
import { ADD_CREDIT, SUBTRACT_CREDIT, RESTART_GAME } from "../actions/index";

export const initialCreditState = {
    amount: 50
};

export const creditReducer = (state = initialCreditState, action) => {
    switch (action.type) {
        case ADD_CREDIT:
            return { ...state, amount: state.amount + action.payload };
        case SUBTRACT_CREDIT:
            const newAmount = Math.max(0, state.amount - action.payload);
            return { ...state, amount: newAmount };
        case RESTART_GAME:
            return { ...initialCreditState };
        default:
            return state;
    }
};
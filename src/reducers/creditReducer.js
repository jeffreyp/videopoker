import { ADD_CREDIT, SUBTRACT_CREDIT } from "../actions/index";

export const initialCreditState = {
    amount: 50
};

export const creditReducer = (state = initialCreditState, action) => {
    switch (action.type) {
        case ADD_CREDIT:
            return { ...state, amount: state.amount + action.payload };
        case SUBTRACT_CREDIT:
            return { ...state, amount: state.amount - action.payload };
        default:
            return state;
    }
};
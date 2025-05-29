import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers/index";
import { loadState, saveState } from "./lib/storage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const persistedState = loadState();
    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(applyMiddleware(thunk))
    );

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
}

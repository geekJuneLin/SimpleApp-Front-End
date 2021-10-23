import { Actions } from "./Actions"
import { AppContextState } from "./Context"

export const AppReducer = (state: AppContextState, action: Actions) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "LOADED":
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
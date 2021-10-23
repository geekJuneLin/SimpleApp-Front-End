import { createContext } from "react"

export interface AppContextState {
    isLoading: boolean
}

export const AppContext = createContext<AppContextState | null>(null);

export const intialState: AppContextState = {
  isLoading: false,
};
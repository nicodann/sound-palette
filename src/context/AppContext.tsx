import { createContext } from "react";

export type UiState = "empty" | "loginRegister" | "login" | "register";

type AppContextValue = {
  uiState: UiState;
  setUiState: (state: UiState) => void;
  loggedInUser?: string;
  setLoggedInUser: (user?: string) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

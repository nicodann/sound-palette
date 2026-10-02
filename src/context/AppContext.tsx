import { createContext, useContext, useState, type ReactNode } from "react";

type UiState = "empty" | "paletteForm" | "loginRegister" | "login" | "register";

type AppContextValue = {
  uiState: UiState;
  setUiState: (state: UiState) => void;
  loggedInUser?: string;
  setLoggedInUser: (user?: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [uiState, setUiState] = useState<UiState>("paletteForm");

  return (
    <AppContext value={{ uiState, setUiState, loggedInUser, setLoggedInUser }}>
      {children}
    </AppContext>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");
  return context;
}

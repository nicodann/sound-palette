import { useState, type ReactNode } from "react";
import { AppContext, type UiState } from "./AppContext";

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [uiState, setUiState] = useState<UiState>("empty");

  return (
    <AppContext value={{ uiState, setUiState, loggedInUser, setLoggedInUser }}>
      {children}
    </AppContext>
  );
}

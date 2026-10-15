import { useEffect, useState, type ReactNode } from "react";
import { AppContext, type SaveStatus, type UiState } from "./AppContext";
import type { CurrentPalette, SavedPalette } from "../types";
import { getCurrentUser } from "../api/auth";
import { ApiError } from "../api/client";

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [uiState, setUiState] = useState<UiState>("empty");
  const [currentPalette, setCurrentPalette] = useState<CurrentPalette | null>(
    null,
  );
  const [pendingSave, setPendingSave] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [userPalettes, setUserPalettes] = useState<SavedPalette[]>([]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setLoggedInUser(user.email))
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) return;
        console.error("Couldn't check login status:", error);
      });
  }, []);

  return (
    <AppContext
      value={{
        uiState,
        setUiState,
        loggedInUser,
        setLoggedInUser,
        currentPalette,
        setCurrentPalette,
        pendingSave,
        setPendingSave,
        saveStatus,
        setSaveStatus,
        userPalettes,
        setUserPalettes,
      }}
    >
      {children}
    </AppContext>
  );
}

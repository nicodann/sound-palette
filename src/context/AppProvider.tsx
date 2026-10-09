import { useEffect, useState, type ReactNode } from "react";
import { AppContext, type UiState } from "./AppContext";
import type { AiResponse } from "../types";
import { getCurrentUser } from "../api/auth";
import { ApiError } from "../api/client";

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [uiState, setUiState] = useState<UiState>("empty");
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [pendingSave, setPendingSave] = useState(false);
  const [savePaletteError, setSavePaletteError] = useState("");

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
        aiResponse,
        setAiResponse,
        submittedPrompt,
        setSubmittedPrompt,
        pendingSave,
        setPendingSave,
        savePaletteError,
        setSavePaletteError,
      }}
    >
      {children}
    </AppContext>
  );
}

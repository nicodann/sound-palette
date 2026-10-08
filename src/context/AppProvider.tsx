import { useState, type ReactNode } from "react";
import { AppContext, type UiState } from "./AppContext";
import type { AiResponse } from "../types";

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [uiState, setUiState] = useState<UiState>("empty");
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [submittedPrompt, setSubmittedPrompt] = useState("");

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
      }}
    >
      {children}
    </AppContext>
  );
}

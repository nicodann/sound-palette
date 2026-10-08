import { createContext } from "react";
import type { AiResponse } from "../types";

export type UiState = "empty" | "loginRegister" | "login" | "register";

type AppContextValue = {
  uiState: UiState;
  setUiState: (state: UiState) => void;
  loggedInUser?: string;
  setLoggedInUser: (user?: string) => void;
  aiResponse: AiResponse;
  setAiResponse: (response: AiResponse) => void;
  submittedPrompt: string;
  setSubmittedPrompt: (prompt: string) => void;
  pendingSave: boolean;
  setPendingSave: (boolean: boolean) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

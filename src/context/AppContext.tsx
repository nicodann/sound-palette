import { createContext } from "react";
import type { AiResponse } from "../types";

export type UiState = "empty" | "loginRegister" | "login" | "register";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

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
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

import { createContext, type Dispatch, type SetStateAction } from "react";
import type { CurrentPalette, SavedPalette } from "../types";

export type UiState = "empty" | "loginRegister" | "login" | "register";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type AppContextValue = {
  uiState: UiState;
  setUiState: Dispatch<SetStateAction<UiState>>;
  loggedInUser?: string;
  setLoggedInUser: Dispatch<SetStateAction<string | undefined>>;
  currentPalette: CurrentPalette | null;
  setCurrentPalette: Dispatch<SetStateAction<CurrentPalette | null>>;
  // submittedPrompt: string;
  // setSubmittedPrompt: Dispatch<SetStateAction<string>>;
  pendingSave: boolean;
  setPendingSave: Dispatch<SetStateAction<boolean>>;
  saveStatus: SaveStatus;
  setSaveStatus: Dispatch<SetStateAction<SaveStatus>>;
  userPalettes: SavedPalette[];
  setUserPalettes: Dispatch<SetStateAction<SavedPalette[]>>;
  // currentPaletteId?: string;
  // setCurrentPaletteId: Dispatch<SetStateAction<string | undefined>>;
};

export const AppContext = createContext<AppContextValue | null>(null);

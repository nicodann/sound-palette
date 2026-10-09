import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import { createPaletteName } from "../lib/createPaletteName";
import type { NewPalette } from "../types";

export default function useSavePalette() {
  const { submittedPrompt, aiResponse, setPendingSave, setUiState } =
    useAppContext();

  const submittedPalette: NewPalette = {
    name: createPaletteName(submittedPrompt),
    prompt: submittedPrompt,
    palette: aiResponse,
  };

  return async () => {
    try {
      const savedPalette = await savePalette(submittedPalette);
      console.log("Saved Palette:", savedPalette);
      setUiState("empty");
    } catch (error) {
      console.log("error saving palette", error);
    } finally {
      setPendingSave(false);
    }
  };
}

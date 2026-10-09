import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import { createPaletteName } from "../lib/createPaletteName";
import type { NewPalette } from "../types";

export default function useSavePalette() {
  const { submittedPrompt, aiResponse, setPendingSave, setSaveStatus } =
    useAppContext();

  const submittedPalette: NewPalette = {
    name: createPaletteName(submittedPrompt),
    prompt: submittedPrompt,
    palette: aiResponse,
  };

  const saveCurrentPalette = async () => {
    setSaveStatus("saving");
    try {
      const savedPalette = await savePalette(submittedPalette);
      setSaveStatus("saved");
      console.log("Saved Palette:", savedPalette);
    } catch (error) {
      setSaveStatus("error");
      console.error("Palette save failed: ", error);
    } finally {
      setPendingSave(false);
    }
  };

  return saveCurrentPalette;
}

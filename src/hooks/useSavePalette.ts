import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import { createPaletteName } from "../lib/createPaletteName";
import type { NewPalette } from "../types";

export default function useSavePalette() {
  const { submittedPrompt, aiResponse, setPendingSave, setSavePaletteError } =
    useAppContext();

  const submittedPalette: NewPalette = {
    name: createPaletteName(submittedPrompt),
    prompt: submittedPrompt,
    palette: aiResponse,
  };

  const saveCurrentPalette = async () => {
    setSavePaletteError("");
    try {
      const savedPalette = await savePalette(submittedPalette);
      console.log("Saved Palette:", savedPalette);
    } catch (error) {
      setSavePaletteError(`Couldn't save your palette, please try again.`);
      console.error("Palette save failed: ", error);
    } finally {
      setPendingSave(false);
    }
  };

  return saveCurrentPalette;
}

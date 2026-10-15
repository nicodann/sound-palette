import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import { createPaletteName } from "../lib/createPaletteName";
import type { NewPalette } from "../types";

export default function useSavePalette() {
  const {
    submittedPrompt,
    aiResponse,
    setPendingSave,
    setSaveStatus,
    setUserPalettes,
    setCurrentPaletteId,
  } = useAppContext();

  const submittedPalette: NewPalette = {
    name: createPaletteName(submittedPrompt),
    prompt: submittedPrompt,
    palette: aiResponse,
  };

  const saveCurrentPalette = async () => {
    setSaveStatus("saving");
    try {
      const savedPalette = await savePalette(submittedPalette);
      setUserPalettes((prev) => [savedPalette, ...prev]);
      setSaveStatus("saved");
      setCurrentPaletteId(savedPalette.id);
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

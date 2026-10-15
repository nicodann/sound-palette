import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import { createPaletteName } from "../lib/createPaletteName";
import type { NewPalette } from "../types";

export default function useSavePalette() {
  const {
    currentPalette,
    setPendingSave,
    setSaveStatus,
    setUserPalettes,
    setCurrentPalette,
  } = useAppContext();

  const saveCurrentPalette = async () => {
    if (!currentPalette) return;

    const submittedPalette: NewPalette = {
      name: createPaletteName(currentPalette.prompt),
      prompt: currentPalette.prompt,
      palette: currentPalette.palette,
    };

    setSaveStatus("saving");
    try {
      const savedPalette = await savePalette(submittedPalette);
      setUserPalettes((prev) => [savedPalette, ...prev]);
      setSaveStatus("saved");
      setCurrentPalette(savedPalette);
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

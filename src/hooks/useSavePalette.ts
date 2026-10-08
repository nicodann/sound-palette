import { savePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";
import type { NewPalette } from "../types";

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const createName = (prompt: string) =>
  prompt
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((string, i) => {
      const lower = string.toLowerCase();
      return i === 0 ? lower : capitalize(lower);
    })
    .join("");

export default function useSavePalette() {
  const { submittedPrompt, aiResponse, setPendingSave, setUiState } =
    useAppContext();

  const submittedPalette: NewPalette = {
    name: createName(submittedPrompt),
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

import type { NewPalette, SavedPalette } from "../types";
import { apiFetch } from "./client";

export const getPalettes = () => apiFetch<SavedPalette[]>("/palettes");

export function savePalette({ name, prompt, palette }: NewPalette) {
  return apiFetch<SavedPalette>("/palettes", {
    method: "POST",
    body: JSON.stringify({
      name,
      prompt,
      palette,
    }),
  });
}

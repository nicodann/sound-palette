import { apiFetch } from "../api/client";
import type { PaletteColours } from "../types";

export function postAiQuery({ query }: { query: string }) {
  // const url = import.meta.env.VITE_API_URL;

  return apiFetch<PaletteColours>("/ai-query", {
    method: "POST",
    body: JSON.stringify({ input: query }),
  });
}

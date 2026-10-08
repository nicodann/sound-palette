import { apiFetch } from "../api/client";
import type { AiResponse } from "../types";

export async function postAiQuery({ query }: { query: string }) {
  // const url = import.meta.env.VITE_API_URL;

  return apiFetch<AiResponse>("/ai-query", {
    method: "POST",
    body: JSON.stringify({ input: query }),
  });
}

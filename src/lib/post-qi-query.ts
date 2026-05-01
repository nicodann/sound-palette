export async function postAiQuery({ query }: { query: string }) {
  const url = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${url}/?input=${query}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("There was an error querying the API: ", error.message);
    }
  }
}

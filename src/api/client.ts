export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { "Content-type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.status === 204 ? (undefined as T) : response.json();
}

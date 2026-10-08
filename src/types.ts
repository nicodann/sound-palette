export type User = {
  id: string;
  email: string;
};

export type SavedPalette = {
  id: string;
  name: string;
  prompt: string;
  palette: AiResponse;
  created_at: string;
};

export type NewPalette = Omit<SavedPalette, "id" | "created_at">;

export type AiResponse = {
  adjective: string;
  colour: string;
}[];

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = LoginValues & {
  confirmPassword: string;
};

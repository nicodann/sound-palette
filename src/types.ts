export type User = {
  id: string;
  email: string;
};

export type SavedPalette = {
  id: string;
  prompt: string;
  colours: string[];
  adjectives: string[];
  createAt: string;
};

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

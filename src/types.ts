export type User = {
  id: string;
  email: string;
};

export type PaletteColour = {
  adjective: string;
  colour: string;
};

export type PaletteColours = PaletteColour[];

export type SavedPalette = {
  id: string;
  name: string;
  prompt: string;
  palette: PaletteColours;
  created_at: string;
};

export type CurrentPalette = {
  id?: string;
  name?: string;
  prompt: string;
  palette: PaletteColours;
};

export type NewPalette = Omit<SavedPalette, "id" | "created_at">;

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = LoginValues & {
  confirmPassword: string;
};

export type DeleteStatus = "idle" | "deleting" | "deleted" | "error";

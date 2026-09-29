export type User = {
  id: number;
  email: string;
  password: string;
};

export type SavedPalette = {
  id: number;
  prompt: string;
  colours: string[];
  adjectives: string[];
  createAt: string;
};

export type AiResponse = {
  adjective: string;
  colour: string;
}[];
